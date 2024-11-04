import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auctionSchema.js";
import { Bid } from "../models/bidSchema.js";
import { User } from "../models/userSchema.js";

export const placeBid = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction Item not found.", 404));
  }

  const { amount } = req.body;
  const bidAmount = Number(amount); // Ensure amount is a number

  if (!bidAmount) {
    return next(new ErrorHandler("Please place your bid.", 404));
  }
  if (bidAmount <= auctionItem.currentBid) {
    return next(
      new ErrorHandler("Bid amount must be greater than the current bid.", 404)
    );
  }
  if (bidAmount < auctionItem.startingBid) {
    return next(
      new ErrorHandler("Bid amount must be greater than the starting bid.", 404)
    );
  }

  try {
    const userId = req.user._id;
    const bidderDetail = await User.findById(userId);

    // Check for existing bids in both Bid collection and auctionItem.bids array
    const existingBid = await Bid.findOne({
      "bidder.id": userId,
      auctionItem: auctionItem._id,
    });

    const existingBidInAuction = auctionItem.bids.find(
      (bid) => bid.userId.toString() === userId.toString()
    );

    if (existingBid && existingBidInAuction) {
      // If bid exists, update bid amount in both places
      existingBidInAuction.amount = bidAmount;
      existingBid.amount = bidAmount;

      await existingBid.save(); // Save bid in Bid collection
    } else {
      // If no existing bid, create a new bid
      const bid = await Bid.create({
        amount: bidAmount,
        bidder: {
          id: bidderDetail._id,
          userName: bidderDetail.userName,
          profileImage: bidderDetail.profileImage?.url,
        },
        auctionItem: auctionItem._id,
      });

      // Add new bid to the auction's bids array
      auctionItem.bids.push({
        userId: userId,
        userName: bidderDetail.userName,
        profileImage: bidderDetail.profileImage?.url,
        amount: bidAmount,
      });
    }

    // Update the auction's current bid
    auctionItem.currentBid = bidAmount;

    // Update user's moneySpent field
    bidderDetail.moneySpent += bidAmount; // Add the bid amount to moneySpent

    // Save the updated user details
    await bidderDetail.save();

    // Save the updated auction item with updated bid array
    await auctionItem.save();

    res.status(201).json({
      success: true,
      message: "Bid placed.",
      currentBid: auctionItem.currentBid,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message || "Failed to place bid.", 500));
  }
});



export const concludeAuction = async (auctionId) => {
  try {
    // Find the auction by ID
    const auction = await Auction.findById(auctionId).populate('highestBidder');

    if (!auction) {
      throw new Error("Auction not found.");
    }

    // Check if there is a highest bidder
    if (auction.highestBidder) {
      // Increment auctionWon for the user who won the auction
      await User.findByIdAndUpdate(auction.highestBidder._id, {
        $inc: { auctionWon: 1 }
      });

      // Optionally, update moneySpent if needed
      await User.findByIdAndUpdate(auction.highestBidder._id, {
        $inc: { moneySpent: auction.currentBid }
      });
    }

    // Optionally, mark auction as concluded or update its status
    auction.isConcluded = true; // Assuming you add a field to track auction status
    await auction.save();

    console.log(`Auction won by ${auction.highestBidder.userName}`);
  } catch (error) {
    console.error("Error concluding auction:", error);
  }
};
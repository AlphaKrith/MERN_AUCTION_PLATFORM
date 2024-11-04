import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

//Register function
export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Profile Image Required", 400));
  }

  const { profileImage } = req.files;
  
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(new ErrorHandler("File format not supported."));
  }

  const {
    userName,
    email,
    password,
    phone,
    address,
    role,
    IFSC,
    bankAccountNumber,
    bankName,
    paypalEmail,
    upiId,
  } = req.body;

  if (!userName || !email || !phone || !password || !address || !role) {
    return next(new ErrorHandler("Please fill full form.", 400));
  }
  if (role === "Auctioneer") {
    if (!bankAccountNumber || !IFSC || !bankName) {
      return next(new ErrorHandler("Please provide your bank details."));
    }
    if (!paypalEmail) {
      return next(
        new ErrorHandler("Please provide your PayPal Email Id.")
      );
    }
    if (!paypalEmail) {
      return next(new ErrorHandler("Please provide your Paypal Email."));
    }
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered."));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    profileImage.tempFilePath,
    {
      folder: "MERN_AUCTION_PLATFORM_USERS",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unkonwn cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload image to cloudinary", 500));
  }

  const user = await User.create({
    userName,
    email,
    password,
    phone,
    address,
    role,
    profileImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    paymentMethod: {
      bankTransfer: {
        bankAccountNumber,
        IFSC,
        bankName,
      },
      paypal: {
        paypalEmail,
      },
      upiId: {
        upiId,
      },
    },
  });
  generateToken(user, "User registered successfully.", 201, res);
});

//Login function
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please fill complete details."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Password is invalid", 400));
  }
  generateToken(user, "Login successfully", 200, res);
});

//Get profile function
export const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

//Logout function
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("Token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout successfully.",
    });
});

//Leader board function
export const fetchLeaderboard = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ moneySpent: { $gt: 0 } });
  const leaderboard = users.sort((a, b) => b.moneySpent - a.moneySpent);
  res.status(200).json({
    success: true,
    leaderboard,
  });
});


import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";

const Home = () => {
  const howItWorks = [
    {
      title: "Post Items",
      description: "The auctioneer lists items available for bidding.",
    },
    {
      title: "Place Bids",
      description: "Bidders submit their bids on the listed items.",
    },
    {
      title: "Winning Notification",
      description:
        "The highest bidder is notified via email of their successful bid.",
    },
    {
      title: "Payment & Fees",
      description:
        "The winning bidder completes the payment, and the auctioneer pays a 5% service fee to the platform.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-gray-50">
      <div className="text-center mb-12">
        

        <p className="text-[#58727f] font-bold text-xl mb-2">
          Transparency Leads to Your Victory!
        </p>
        <h1 className="text-black text-3xl font-bold mb-2 md:text-6xl">
          Transparent Auctions
        </h1>
        <h1 className="text-[#d6482b] text-3xl font-bold mb-6 md:text-6xl">
          Be The Winner
        </h1>
        <div className="flex justify-center gap-4">
          {!isAuthenticated && (
            <>
              <Link
                to="/sign-up"
                className="bg-[#d6482b] hover:bg-[#b8381e] text-white py-2 px-6 rounded-md text-xl transition-all duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-[#e0caba] border-2 border-[#dfc4af] hover:text-[#fdb883] py-2 px-6 rounded-md font-bold text-xl transition-all duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-[#34505f] italic text-2xl font-semibold mb-4 text-center">
          How it works:
        </h3>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.map((element) => (
            <div
              key={element.title}
              className="bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg text-center"
            >
              <h5 className="font-bold text-lg">{element.title}</h5>
              <p className="text-sm text-gray-600">{element.description}</p>
            </div>
          ))}
        </div>
      </div>

      <FeaturedAuctions />
      <UpcomingAuctions />
      <Leaderboard />
    </section>
  );
};

export default Home;

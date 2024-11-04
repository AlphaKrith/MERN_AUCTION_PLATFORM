import React from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const howItWorksSteps = [
    {
      icon: <FaUser />,
      title: "Create an Account",
      description: "Sign up with your email to get started on PrimeBid.",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        "User can register either as Auctioneer or Bidder. Bidders can place their bids on available items, while Auctioneers can post items for auction.",
    },
    {
      icon: <FaEnvelope />,
      title: "Receive Notifications",
      description:
        "Receive real-time alerts to your registered email when you win an auction or get outbid, ensuring you never miss a moment.",
    },
    {
      icon: <FaDollarSign />,
      title: "Make Payments",
      description:
        "If the Bidder makes a payment, the Auctioneer must pay 5% of that payment to the platform. Failure to do so will block them from posting new items, and a legal notice will be issued.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Payment Proof",
      description:
        "The platform receives a screenshot as proof of payment along with the total amount sent. Once the Administrator approves it, the auctioneer's unpaid commission will be updated.",
    },
    {
      icon: <FaRedo />,
      title: "Bid Again!",
      description:
        "Keep bidding on other items and enjoy the auction experience.",
    },
  ];

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <h1
          className={`text-[#d6482b] text-xl font-bold mb-2 min-[480px]:text-4xl md:text-4xl xl:text-7xl 2xl:text-8xl`}
        >
          Discover How PrimeBid Works.
        </h1>
        <div className="flex flex-col gap-4 my-5">
          {howItWorksSteps.map((element, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-md p-2 lg:p-5 flex flex-col gap-2 group hover:-translate-y-2 hover:shadow-lg hover:bg-black transition-all duration-300"
              >
                <div className="bg-black text-white p-3 text-xl rounded-full w-fit group-hover:bg-[#D6482b] transition-all duration-300">
                  {element.icon}
                </div>
                <h3 className="text-[#D6482B] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  {element.title}
                </h3>
                <p className="text-xl text-stone-700 group-hover:text-white transition-all duration-300">
                  {element.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HowItWorks;

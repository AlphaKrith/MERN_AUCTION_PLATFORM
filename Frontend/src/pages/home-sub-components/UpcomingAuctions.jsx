import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const UpcomingAuctions = () => {
  // Ensure allAuctions is defined and fallback to an empty array if undefined
  const { allAuctions = [] } = useSelector((state) => state.auction);

  const today = new Date();
  const todayString = today.toDateString();

  // Only attempt to filter if allAuctions is an array
  const auctionsStartingToday = Array.isArray(allAuctions)
    ? allAuctions.filter((item) => {
        const auctionDate = new Date(item.startTime);
        return auctionDate.toDateString() === todayString;
      })
    : [];

  return (
    <>
      <section className="my-8">
        <h3 className="text-[#34505f] italic text-xl font-bold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          Auctions For Today:
        </h3>
        <div className="flex flex-col gap-6">
          <div className="bg-[#161613] w-full p-2 gap-10 rounded-md flex flex-col justify-between lg:flex-1 lg:h-auto lg:p-6 2xl:flex-none">
            <span className="rounded-full bg-[#cd5c46] text-white w-fit p-3">
              <RiAuctionFill />
            </span>
            <div>
              <h3 className="text-[#fdb8aa] italic text-xl font-bold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                Auctions For
              </h3>
              <div>
                <h3 className="text-[#fff] italic text-xl font-bold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                  Today:
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:flex-1 2xl:flex-none 2xl:basis-64 2xl:flex-grow">
            {auctionsStartingToday.slice(0, 2).map((element) => {
              return (
                <div
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-4 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10"
                    />
                    <p className="font-light text-[14px]">{element.title}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-stone-600 font-semibold italic">
                      Starting Bid:
                    </p>{" "}
                    <p className="text-[#fdba88] font-semibold">
                      Rs. {element.startingBid}
                    </p>{" "}
                  </div>

                  <div className="flex flex-col">
                    <p className="stext-stone-600 font-bold">Starting Time:</p>
                    <p className="text-black">{element.startTime}</p>
                  </div>
                </div>
              );
            })}
          </div>

          

          <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
            {auctionsStartingToday.slice(2, 4).map((element) => {
              return (
                <div
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-4 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10"
                    />
                    <p className="font-light text-[14px]">{element.title}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-stone-600 font-semibold italic">
                      Starting Bid:
                    </p>{" "}
                    <p className="text-[#fdba88] font-semibold">
                      Rs. {element.startingBid}
                    </p>{" "}
                  </div>

                  <div className="flex flex-col">
                    <p className="stext-stone-600 font-bold">Starting Time:</p>
                    <p className="text-black">{element.startTime}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 w-full 2xl:basis-64 2xl:flex-grow">
            {auctionsStartingToday.slice(4, 6).map((element) => {
              return (
                <div
                  key={element._id}
                  className="w-full flex flex-col gap-4 bg-white p-4 rounded-md 2xl:gap-2 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="w-16 h-16 2xl:w-10 2xl:h-10"
                    />
                    <p className="font-light text-[14px]">{element.title}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-stone-600 font-semibold italic">
                      Starting Bid:
                    </p>{" "}
                    <p className="text-[#fdba88] font-semibold">
                      Rs. {element.startingBid}
                    </p>{" "}
                  </div>

                  <div className="flex flex-col">
                    <p className="stext-stone-600 font-bold">Starting Time:</p>
                    <p className="text-black">{element.startTime}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default UpcomingAuctions;

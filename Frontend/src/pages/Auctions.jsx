import Card from "@/custom-components/Card";
import Spinner from "@/custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading, error } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Spinner />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-auto mt-10 max-w-lg text-center shadow-lg">
          <span className="block sm:inline">
            Failed to load auctions. Please try again later.
          </span>
          <button
            onClick={() => window.location.reload()}
            className="absolute right-0 top-0 mt-2 mr-4 text-red-500"
          >
            
          </button>
        </div>
      ) : (
        <article className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col bg-white">
          <section className="my-8">
            <h1 className="text-[#d6482b] text-2xl font-bold mb-4 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
              Auctions
            </h1>
            {allAuctions && allAuctions.length > 0 ? (
              <div className="flex flex-wrap gap-6">
                {allAuctions.map((element) => (
                  <Card
                    title={element.title}
                    startTime={element.startTime}
                    endTime={element.endTime}
                    imgSrc={element.image?.url}
                    startingBid={element.startingBid}
                    id={element._id}
                    key={element._id}
                    className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-gray-50"
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 mt-10 text-xl">
                No auctions available at the moment.
              </p>
            )}
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;

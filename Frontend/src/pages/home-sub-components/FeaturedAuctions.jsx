import Card from "@/custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="my-8">
        <h3 className="text-[#34505f] italic text-xl font-bold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          Featured Auctions:
        </h3>
        <div className="flex flex-wrap gap-6">
          {Array.isArray(allAuctions) && allAuctions.length > 0 ? (
            allAuctions.slice(0, 8).map((element) => (
              <Card
                title={element.title}
                imgSrc={element.image?.url}
                startTime={element.startTime}
                endTime={element.endTime}
                startingBid={element.startingBid}
                id={element._id}
                key={element._id}
              />
            ))
          ) : (
            <div>No auctions available at the moment.</div>
          )}
        </div>
      </section>
    </>
  );
};

export default FeaturedAuctions;

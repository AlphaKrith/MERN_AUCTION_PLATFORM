import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for every user.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually enhance our platform with cutting-edge technologies and features to provide users with a seamless and efficient auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    },
  ];
  
  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] gap-12 flex flex-col min-h-screen py-4 justify-center bg-gray-50">
        <div className="mb-10">
          <h1 className="text-[#d6482b] text-3xl font-bold mb-4 md:text-5xl xl:text-7xl">
            About Us
          </h1>
          <p className="text-lg text-stone-600 md:text-xl">
            Welcome to PrimeBid, the ultimate destination for online auctions and bidding excitement. 
            Founded in 2024, we are dedicated to providing a dynamic and user-friendly platform for buyers and sellers 
            to connect, explore, and transact in a secure and seamless environment.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-[#2f3e46] italic text-2xl font-semibold mb-4">
            Our Mission
          </h3>
          <p className="text-lg text-stone-600 md:text-xl">
            At PrimeBid, our mission is to revolutionize the way people buy and sell items online. We strive to create 
            an engaging and trustworthy marketplace that empowers individuals and businesses to discover unique products, 
            make informed decisions, and enjoy the thrill of competitive bidding.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-[#2f3e46] italic text-2xl font-semibold mb-4">
            Our Values
          </h3>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {values.map((element) => (
              <div
                key={element.id}
                className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
              >
                <h4 className="font-bold text-xl text-black mb-2">
                  {element.title}
                </h4>
                <p className="text-stone-600 text-sm">{element.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-[#2f3e46] italic text-2xl font-semibold mb-4">
            Our Story
          </h3>
          <p className="text-lg text-stone-600 md:text-xl">
            Founded by Team-Kritarth, PrimeBid was born out of a passion for connecting people with unique and valuable items. 
            With years of experience in the auction industry, our team is committed to creating a platform that offers 
            an unparalleled auction experience for users worldwide.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-[#2f3e46] italic text-2xl font-semibold mb-4">
            Join Us
          </h3>
          <p className="text-lg text-stone-600 md:text-xl">
            Whether you're looking to buy, sell, or simply explore, PrimeBid invites you to join our growing community 
            of auction enthusiasts. Discover new opportunities, uncover hidden gems, and experience the thrill of winning 
            your next great find.
          </p>
        </div>

        <div className="text-center">
          <p className="text-[#D6482B] text-lg font-bold md:text-xl">
            Thank you for choosing PrimeBid. We look forward to being a part of your auction journey!
          </p>
        </div>
      </section>
    </>
  );
};

export default About;

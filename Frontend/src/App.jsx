import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideDrawer from "./layout/SideDrawer.jsx";
import Home from "./pages/Home.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import SubmitCommission from "./pages/SubmitCommission.jsx";
import { useDispatch } from "react-redux";
import { fetchLeaderboard, fetchUser } from "./store/slices/userSlice.js";
import HowItWorks from "./pages/HowItWorks.jsx";
import About from "./pages/About.jsx";
import { getAllAuctionItems } from "./store/slices/auctionSlice.js";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import Auctions from "./pages/Auctions.jsx";
import AuctionItem from "./pages/AuctionItem.jsx";
import CreateAuction from "./pages/CreateAuction.jsx";
import ViewMyAuction from "./pages/ViewMyAuction.jsx";
import ViewAuctionDetails from "./pages/ViewAuctionDetails.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Contact  from "./pages/Contact.jsx";
import UserProfile from "./pages/UserProfile.jsx";

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUser());
    dispatch(getAllAuctionItems());
    dispatch(fetchLeaderboard());
    
  }, [])
  return (
    <Router>
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/submit-commission" element={<SubmitCommission />} />
        <Route path="/how-it-works-info" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auction/item/:id" element={<AuctionItem />} />
        <Route path="/create-auction" element={<CreateAuction />} />
        <Route path="/view-my-auctions" element={<ViewMyAuction />} />
        <Route path="/auction/details/:id" element={<ViewAuctionDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/me" element={<UserProfile />} />

      </Routes>
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default App;

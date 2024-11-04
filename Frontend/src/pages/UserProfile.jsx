import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "@/store/slices/userSlice"; // Ensure fetchUser includes auctionWon data

const UserProfile = () => {
  
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const InfoField = ({ label, value, type = "text" }) => (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-600">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        disabled
      />
    </div>
  );

  return (
    <section className="w-full h-full px-5 pt-20 lg:pl-[320px] flex flex-col items-center min-h-screen bg-gray-50">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-lg mx-auto w-full max-w-4xl h-auto p-6 flex flex-col gap-6 items-center justify-center rounded-2xl">
          <img
            src={user.profileImage?.url || "/imageHolder.jpg"}
            alt={`Profile image of ${user.username}`}
            className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.username}</h2>
          <p className="text-sm text-gray-500 mb-6">Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoField label="Username" value={user.userName} />
            <InfoField label="Email ID" value={user.email} type="email" />
            <InfoField label="Phone" value={user.phone} type="tel" />
            <InfoField label="Address" value={user.address} />
            <InfoField label="Role" value={user.role} />
          </div>

          {user.role === "Auctioneer" && (
            <div className="w-full mt-8">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Payment Details</h3>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Bank Name" value={user.paymentMethod?.bankTransfer?.bankName} />
                <InfoField label="IFSC Code" value={user.paymentMethod?.bankTransfer?.IFSC} />
                <InfoField label="Bank Account Number" value={user.paymentMethod?.bankTransfer?.bankAccountNumber} />
                <InfoField label="PayPal Email" value={user.paymentMethod?.paypal?.paypalEmail} />
                <InfoField label="UPI ID" value={user.paymentMethod?.upiId?.upiId} />
              </div>
            </div>
          )}

          {user.role === "Bidder" && (
            <div className="w-full mt-8">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Other User Details</h3>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Auctions Won" value={user.auctionWon || 0} />
                <InfoField label="Money Spent" value={`$${user.moneySpent || 0}`} />
              </div>
            </div>
          )}

          {user.role === "Auctioneer" && (
            <div className="w-full mt-8">
              <h3 className="text-xl font-bold text-indigo-600 mb-4">Other User Details</h3>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Unpaid Commissions" value={`$${user.unpaidCommission || 0}`} />
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UserProfile;

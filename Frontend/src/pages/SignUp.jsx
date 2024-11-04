import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !userName || !password || !role) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);

    if (role === "Auctioneer") {
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("IFSC", IFSC);
      formData.append("bankName", bankName);
      formData.append("upiId", upiId);
      formData.append("paypalEmail", paypalEmail);
    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated, navigateTo]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      <section className="w-full h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white shadow-lg mx-auto w-full max-w-lg p-8 flex flex-col gap-6 items-center rounded-md">
          <h1 className="text-[#d6482b] text-4xl font-bold mb-4">Create Your Account</h1>
          
          {error && <p className="text-red-500">{error}</p>}

          <form className="flex flex-col gap-6 w-full" onSubmit={handleRegister}>
            {/* Personal Details */}
            <p className="font-semibold text-xl text-gray-800">Personal Details</p>

            <div className="flex flex-col gap-6">
              {/* Full Name and Email */}
              <div className="flex flex-col gap-4">
                <label className="text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                  required
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                  required
                />
              </div>

              {/* Phone and Address */}
              <div className="flex flex-col gap-4">
                <label className="text-gray-600">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-gray-600">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                />
              </div>
            </div>

            {/* Role and Password */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <label className="text-gray-600">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Auctioneer">Auctioneer</option>
                  <option value="Bidder">Bidder</option>
                </select>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-gray-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                  required
                />
              </div>
            </div>

            {/* Profile Image Upload */}
            <div className="flex flex-col gap-4">
              <label className="text-gray-600">Profile Image</label>
              <div className="flex items-center gap-4">
                <img
                  src={profileImagePreview || "/imageHolder.jpg"}
                  alt="Profile Preview"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <input
                  type="file"
                  onChange={imageHandler}
                  className="text-base"
                />
              </div>
            </div>

            {/* Payment Method Section (Auctioneer) */}
            {role === "Auctioneer" && (
              <>
                <p className="font-semibold text-xl text-gray-800">
                  Payment Method Details
                  <span className="block text-sm text-gray-500">
                    (Only required for Auctioneers)
                  </span>
                </p>

                {/* Bank Details */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                    >
                      <option value="" className="italic bg-gray-300" disabled>Select Bank</option>
                      <option value="SBI">State Bank of India</option>
                      <option value="UBI">Union Bank of India</option>
                      <option value="HDFC">HDFC Bank</option>
                      <option value="Axis">Axis Bank</option>
                      <option value="PNB">Punjab National Bank</option>
                      <option value="BoB">Bank of Baroda</option>
                      <option value="BoM">Bank of Maharashtra</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="Canera">Canera Bank</option>
                      
                    </select>
                  </div>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={IFSC}
                      placeholder="IFSC"
                      onChange={(e) => setIFSC(e.target.value)}
                      className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={bankAccountNumber}
                      placeholder="Account Number"
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                    />
                  </div>

                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      value={upiId}
                      placeholder="UPI ID"
                      onChange={(e) => setUpiId(e.target.value)}
                      className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                    />
                    <input
                      type="email"
                      value={paypalEmail}
                      placeholder="PayPal Email"
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="text-base py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6482b]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#d6482b] hover:bg-[#e16c4e] text-white font-semibold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;

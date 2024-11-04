import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    // Construct email parameters
    const templateParams = {
      to_name: "Team-Kritarth",   // Replace this with the recipient's name
      from_name: name,            // Sender's name from the form
      subject: subject,           // Subject from the form
      message: message,           // Message content
      phone: phone,               // Sender's phone number
      email: email,               // Sender's email
    };

    // Use EmailJS to send email
    emailjs
      .send(
        "service_0f3lxvf",        // Service ID
        "template_41cnlol",       // Template ID
        templateParams,           // Parameters for the email
        "ka5BwZSLF_XFHtk-4"       // Public API key
      )
      .then(() => {
        toast.success("Thank you! Your message has been sent successfully.");
        setLoading(false);
        navigate("/");  // Navigate back to home after successful submission
      })
      .catch((error) => {
        toast.error("Failed to send message. Please try again later.");
        setLoading(false);
        console.error("EmailJS error:", error);  // Log any errors for debugging
      });
  };

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleContactForm}
          >
            <h3 className="text-[#D6482B] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
              Contact Us
            </h3>

            {/* Name input */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600 italic">Your Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                required
              />
            </div>

            {/* Email input */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600 italic">Your Email ID:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                required
              />
            </div>

            {/* Phone input */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600 italic">Phone Number:</label>
              <input
                type="tel"    // Changed from number to tel for better phone number input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                required
              />
            </div>

            {/* Subject input */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600 italic">Subject:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                required
              />
            </div>

            {/* Message textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-600 italic">Message:</label>
              <textarea
                rows={7}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
                required
              />
            </div>

            {/* Submit button */}
            <button
              className="bg-[#d6482b] mx-auto font-semibold hover:bg-[#b8381e] text-xl transition-all duration-300 py-2 px-4 rounded-md text-white my-4"
              type="submit"
              disabled={loading}  // Disable button while loading
            >
              {loading ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;

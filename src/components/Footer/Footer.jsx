import React from "react";
import amazon from "./../../assets/images/amazon-pay.png";
import americanExpress from "../../assets/images/American-Express-Color.png";
import apple from "../../assets/images/get-apple-store.png";
import googlePay from "../../assets/images/get-google-play.png";
import masterCard from "../../assets/images/mastercard.webp";
import paypal from "../../assets/images/paypal.png";

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-8 ">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">
            Get the Best of FreshCart App
          </h2>
          <p className="text-sm text-gray-600">
            Download the app for Android and iOS mobile phones.
          </p>
        </div>

        {/* Subscription Section */}
        <div className="flex  md:flex-row gap-4 my-4 justify-center items-center">
          <label htmlFor="email" className="sr-only">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="form-control w-full md:w-auto px-4 py-2 border rounded-md text-gray-700 flex-grow"
            aria-label="Email Address"
          />
          <button className="btn-primary">Subscribe</button>
        </div>

        {/* Partners and Download Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-b border-slate-300 py-4 gap-4">
          {/* Payment Partners */}
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-700">
              Payment Partners:
            </p>
            <img
              src={amazon}
              alt="Amazon Pay"
              className="w-20 md:w-24"
              loading="lazy"
            />
            <img
              src={americanExpress}
              alt="American Express"
              className="w-20 md:w-24"
              loading="lazy"
            />
            <img
              src={masterCard}
              alt="MasterCard"
              className="w-20 md:w-24"
              loading="lazy"
            />
            <img
              src={paypal}
              alt="PayPal"
              className="w-20 md:w-24"
              loading="lazy"
            />
          </div>

          {/* Download Options */}
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-700">Download with:</p>
            <img
              src={apple}
              alt="Download from Apple Store"
              className="w-20 md:w-24"
              loading="lazy"
            />
            <img
              src={googlePay}
              alt="Download from Google Play"
              className="w-20 md:w-24"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

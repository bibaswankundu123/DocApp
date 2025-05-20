import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="px-6 md:px-10 bg-white text-gray-700">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr] py-20 border-b">
        {/* Logo & Description */}
        <div>
          <img src={assets.logo} alt="Company Logo" className="w-40 mb-6" />
          <p className="max-w-md text-sm leading-relaxed text-gray-600">
            We are committed to connecting patients with top-tier healthcare professionals through an intuitive and secure platform.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Contact Us</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Get in Touch</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 +1-212-456-7890</li>
            <li>✉️ clientmail@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-6 text-sm text-gray-500">
        &copy; 2025 AIM Digitalise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

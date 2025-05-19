import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <p className="text-sm text-gray-600 text-justify">
            
          </p>
        </div>

        {/* Services */}
        <div>
         
          <ul className="space-y-2 text-gray-600">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/gallery">Doctors</a>
            </li>
            <li>
              <a href="/gallery">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
           
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-gray-400">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-400">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Map & Address */}
        
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center border-t border-gray-600 pt-4 text-gray-600 text-sm">
        Copyright &copy; 2025. All Rights Reserved by{" "}
        <a
          href="https://aimdigitalise.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 underline"
        >
          AIM Digitalise
        </a>
        .
      </div>
    </footer>
  );
};

export default Footer;

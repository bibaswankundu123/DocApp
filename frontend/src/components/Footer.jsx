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
    <footer className="bg-gray-950 text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <p className="text-sm text-gray-300 text-justify">
            Kepro exists to serve the lifting Industry and our customers with
            products and services which are developed in an environment that
            places maximum focus on Safety, High Quality, Innovation,
            Performance, Integrity and Values. Best Chain Block India
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">Lifting</a>
            </li>
            <li>
              <a href="/gallery">Welding</a>
            </li>
            <li>
              <a href="/gallery">Accessories</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              Email:{" "}
              <a href="mailto:anirudh@kepro.in" className="hover:underline">
                anirudh@kepro.in
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:8479803917" className="hover:underline">
                +91 77750 89988
              </a>
            </li>
            <li>
              <a href="/login" className="text-white hover:underline">
                Login
              </a>
            </li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-400">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Map & Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Location</h3>
          <div className="w-full h-40 overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3683.9727849033166!2d88.34708387507796!3d22.5801211794864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sKepro%20Technologies%20Pvt.%20Ltd.%2040%2C%20N.%20S.%20Road%2C%201st%20Floor%20Kolkata%20-%20700%20001%2C%20WB%2C%20India!5e0!3m2!1sen!2sin!4v1744791391451!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p className="mt-2 text-gray-300">
            Kepro Technologies Pvt. Ltd. 40, N. S. Road, 1st Floor Kolkata - 700
            001, WB, India
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center border-t border-gray-600 pt-4 text-gray-300 text-sm">
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

import React from "react";

const Footer = () => {
  return (
    <footer className="px-6 md:px-10 bg-white text-gray-700">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr] py-20 border-b">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center mb-6">
            <img src="/company-logo.png" alt="Company Logo" className="w-10" />
            <span className="ml-4 text-2xl font-semibold text-gray-800">
              Medicaid
            </span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600">
            We are committed to connecting patients with top-tier healthcare
            professionals through an intuitive and secure platform.
          </p>
        </div>

        {/* Company Links */}
      <div>
  <h3 className="text-lg font-semibold mb-4 text-gray-800">Company</h3>
  <ul className="space-y-2 text-sm text-gray-600">
    <li>
      <a href="/" className="hover:text-black">Home</a>
    </li>
    <li>
      <a href="/about" className="hover:text-black">About Us</a>
    </li>
    <li>
      <a href="/contact" className="hover:text-black">Contact Us</a>
    </li>
    <li>
      <a href="#" className="hover:text-black">Privacy Policy</a>
    </li>
    <li>
      <a href="https://docapp-admin.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-black">Admin Login</a>
    </li>
  </ul>
</div>


        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm">
            <li>📞  <span>7585817053 / 03412301000 / 03412303612</span></li>
            <li>✉️ msmedicaid.asansol98@gmail.com</li>
            <li>
              📍 132/60(88/1) Room No-1, Ward No-46, SB Gorai Road Asansol-,<br />
              Paschim Burdwan, West Bengal
            </li>
          </ul>
        </div>
      </div>

  
      {/* <div className="w-full mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.9786949977747!2d86.96607197511273!3d23.67671987872069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f71edb02e52acd%3A0xdda4ee4c4ddc2880!2sSB%20Gorai%20Rd%2C%20Asansol%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1748261236877!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </div> */}

      {/* Footer Bottom */}
      <div className="text-center py-6 text-sm text-gray-500">
        &copy; 2025 AIM Digitalise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

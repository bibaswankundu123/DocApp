import React from "react";
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="w-full bg-primary text-white px-0">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 lg:px-20 py-10 md:py-16 lg:py-20 max-w-screen-2xl mx-auto">
        
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug md:leading-tight">
            Book Appointment
            <br />
            With Trusted Doctors.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl">
            <span className="text-yellow-300 font-bold text-2xl md:text-3xl">DocApp</span> is now just a click away!
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3 text-sm font-light">
            <img
              src={assets.group_profiles}
              alt="Profiles"
              className="w-28"
            />
            <p>
              Simply browse through our extensive list of trusted doctors,
              <br className="hidden sm:block" />
              schedule your appointment hassle-free.
            </p>
          </div>

          <a
            href="#speciality"
            className="flex items-center gap-2 bg-white px-4 md:px-6 py-3 rounded-full text-gray-600 text-sm w-fit m-auto md:m-0 hover:scale-105 transition-all duration-300"
          >
            Book Appointment
            <img src={assets.arrow_icon} alt="Arrow" className="w-3" />
          </a>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0 md:w-1/2">
          <img
            src={assets.header_img}
            alt="Doctor Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
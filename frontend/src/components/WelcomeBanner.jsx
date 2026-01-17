import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomeBanner = () => {
  const navigate = useNavigate();

  

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 py-10">
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full rounded-xl overflow-hidden h-[28rem] shadow-md">
          <img
            src="/about.jpg"
            alt="Welcome to Docapp"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Text Content */}
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Welcome to DocApp
          </h2>
          <p className="text-gray-600 text-lg">
            Your trusted healthcare partner for quality medical services and
            compassionate care.
          </p>
          <p className="text-gray-700 bg-gray-50 p-5 rounded-lg leading-relaxed">
            DocApp provides comprehensive healthcare services with a network
            of experienced professionals dedicated to your wellbeing. Our
            patient-centered approach ensures you receive personalized care
            tailored to your specific needs. With state-of-the-art facilities
            and cutting-edge technology, we're committed to delivering
            exceptional medical services to our community.
          </p>
          <button
           onClick={() =>{navigate('/about');scrollTo(0,0)}}
            className="bg-primary text-white px-6 py-3 rounded-full w-fit hover:bg-primary-dark transition-colors duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;

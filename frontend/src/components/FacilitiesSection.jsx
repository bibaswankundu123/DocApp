import React from "react";
import { assets } from "../assets/assets";
import {
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaUserMd,
  FaHospital,
  FaMicroscope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FacilitiesSection = () => {
  const navigate = useNavigate();
  const facilities = [
    {
      icon: <FaHospital className="text-primary text-2xl" />,
      title: "Emergency Care",
      description: "24/7 emergency services with quick response",
    },
    {
      icon: <FaCalendarAlt className="text-primary text-2xl" />,
      title: "Easy Appointment",
      description: "Book appointments with top specialists easily",
    },
    {
      icon: <FaUserMd className="text-primary text-2xl" />,
      title: "Expert Doctors",
      description: "Experienced and qualified medical professionals",
    },
    {
      icon: <FaMicroscope className="text-primary text-2xl" />,
      title: "Advanced Technology",
      description: "State-of-the-art medical equipment and facilities",
    },
  ];

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left Side - Images */}
          <div className="lg:w-1/2 flex flex-col lg:flex-row gap-6">
            {/* Main Image (Left) */}
            <div className="lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
              <img
                src={assets.about_image}
                alt="Medical Facility"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Two Images Stacked (Right of main image) */}
            <div className="lg:w-1/2 flex flex-col gap-6">
              <div className="rounded-xl overflow-hidden shadow-lg h-1/2">
                <img
                  src={assets.contact_image}
                  alt="Facility Detail 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-1/2">
                <img
                  src={assets.header_img}
                  alt="Facility Detail 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Facilities for <span className="text-primary">Patients</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We provide comprehensive healthcare services with patient-centered
              facilities designed for your comfort and speedy recovery.
            </p>

            {/* Facility Tabs with React Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <div className="p-2 bg-primary bg-opacity-10 rounded-full">
                    {facility.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {facility.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {facility.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Helpdesk with React Icons */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-800 mb-3">Helpdesk</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <FaPhone className="text-primary" />
                  <span>7980231951</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <FaEnvelope className="text-primary" />
                  <span>bibaswankundu4@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <button
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors shadow-md flex items-center gap-2"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;

import React from "react";
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets";



const SpecialityMenu = () => {
  return (
    <div id="speciality" className="px-6 md:px-10 lg:px-20 py-14">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Find by Speciality
        </h1>
        <p className="text-gray-600 mt-3">
          Simply browse through our extensive list of trusted doctors, <br />
          schedule your appointment
        </p>
      </div>

      {/* Speciality Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {specialityData.map((item, index) => (
          <Link  
             onClick={() =>scrollTo(0,0)}
            to={`/doctors/${item.speciality.toLowerCase().replace(/ /g, "-")}`}
            key={index}
            className="flex flex-col items-center text-center bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-20 h-20 object-contain mb-2"
            />
            <p className="text-sm font-medium text-gray-700">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;

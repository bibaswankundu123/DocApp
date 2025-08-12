// SpecialityMenu.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const SpecialityMenu = () => {
  const { specialties } = useContext(AppContext);

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
        {specialties.map((item) => (
          <Link  
            onClick={() => window.scrollTo(0, 0)}
            to={`/doctors/${item.name}`}
            key={item._id}
            className="flex flex-col items-center text-center bg-white rounded-xl p-4 shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain mb-2"
              />
            )}
            <p className="text-sm font-medium text-gray-700">
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
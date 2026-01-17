import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/doctors", label: "BOOK DOCTOR" },
    { path: "/blogs", label: "BLOGS" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              className="w-10 h-10"
              src="/company-logo.png"
              alt="DocApp Logo"
            />
            <span className="text-2xl font-bold text-primary">DocApp</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `py-2 font-medium text-gray-700 hover:text-primary transition-colors ${
                        isActive ? "text-primary border-b-2 border-primary" : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-6">
            {token && userData ? (
              <div className="relative flex items-center gap-3">
                <span className="hidden md:inline font-medium text-gray-700">
                  Welcome{" "}
                  <span className="text-primary font-semibold">
                    {userData.name}
                  </span>
                </span>

                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    src={userData.image}
                    alt="User profile"
                  />
                  <img
                    className={`w-3 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                    src={assets.dropdown_icon}
                    alt="Dropdown"
                  />
                </div>

                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-20 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <button
                      onClick={() => {
                        navigate("/my-profile");
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/my-appointments");
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Appointments
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                Create Account
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMenu(true)}
              className="md:hidden text-gray-700 focus:outline-none"
              aria-label="Open menu"
            >
              <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-2">
                <img
                  className="w-10 h-10"
                  src="/company-logo.png"
                  alt="DocApp Logo"
                />
                <span className="text-xl font-bold text-primary">DocApp</span>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close menu"
              >
                <img src={assets.cross_icon} alt="Close" className="w-6 h-6" />
              </button>
            </div>

            <nav className="p-6">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={() => setShowMenu(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-lg font-medium rounded-md ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {!token && (
                <button
                  onClick={() => {
                    navigate("/login");
                    setShowMenu(false);
                  }}
                  className="w-full mt-6 bg-primary text-white py-3 rounded-full font-medium"
                >
                  Create Account
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
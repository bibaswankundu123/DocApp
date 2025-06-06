import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from "./pages/Contact";
import MyAppointments from './pages/MyAppointments';
import MyProfile from './pages/MyProfile';
import Appointment from './pages/Appointment';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blogs from "./pages/Blog";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={isHomePage ? "mx-0" : "mx-4 sm:mx-[10%]"}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;

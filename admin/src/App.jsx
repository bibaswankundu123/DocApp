import React,{useContext} from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar';
import { Routes,Route,Navigate } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import DoctorDashboard from "./pages/Doctor/DoctorDashboard"
import { DoctorContext } from './context/DoctorContext';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import ContactMessages from './pages/Admin/ContactMessages';
import Reports from './pages/Admin/Reports';
  

const App = () => {

  const {aToken} = useContext(AdminContext) 
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
   
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
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* Admin Route*/}
          <Route
                path="/"
                element={
                  aToken ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/doctor-dashboard" replace />
                  )
                }
              />
          <Route path='/admin-dashboard'  element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />
          <Route path='/reports' element={<Reports/>} />


          <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
          <Route path='/doctor-appointments' element={<DoctorAppointments/>} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />
          <Route path='/contact-messages' element={<ContactMessages/>} />
        </Routes>
        
      </div>
    </div>
  ) : (
    <>
     <Login/>
      <ToastContainer/>
    
    </>
  )
}

export default App

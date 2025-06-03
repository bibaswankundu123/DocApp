import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorAppointments = () => {


  const {dToken,appointments,getAppointments} = useContext(DoctorContext)

  useEffect(() =>{
    if (dToken) {
      getAppointments()
    }
  },[dToken])


  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text:sm max-h-[80vh]'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3'>
          <p>#</p>
          <p>Booking Details</p>
          <p>Customer Details</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.map((item,index)=>(
            <div key={index}>
            <p>{index+1}</p>
            <div>
              <img src={item.userData.image} alt=''/> <p>{item.userData.name}</p>
            </div>
            <div>
              <p>
                {item.payment }
              </p>
            </div>
            </div>
          ))
        }
      </div>
        
    </div>
  )
}

export default DoctorAppointments
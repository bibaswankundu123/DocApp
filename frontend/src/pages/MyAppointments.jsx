import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
    const { backendUrl, token, getDoctorsData } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        reason: ''
    });

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    };

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
                getDoctorsData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const confirmBooking = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/confirm-booking',
                { appointmentId: selectedAppointmentId, customerDetails: formData },
                { headers: { token } }
            );
            if (data.success) {
                toast.success(data.message);
                setShowModal(false);
                setFormData({ name: '', phone: '', address: '', reason: '' });
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
            <div>
                {appointments.slice(0, 3).map((item, index) => (
                    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                        <div>
                            <img className='w-32 bg-indigo-50' src={item.docData.image} alt="doctor" />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                            <p className='text-xs'>{item.docData.address.line1}</p>
                            <p className='text-xs'>{item.docData.address.line2}</p>
                            <p className='text-xs mt-1'>
                                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                            </p>
                        </div>
                        <div>
                            <div className='flex flex-col gap-2 justify-end'>
                                {!item.cancelled && !item.customerDetails?.name && (
                                    <button
                                        className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300 rounded'
                                        onClick={() => {
                                            setSelectedAppointmentId(item._id);
                                            setShowModal(true);
                                        }}
                                    >
                                        Confirm Booking
                                    </button>
                                )}
                                {!item.cancelled && item.customerDetails?.name && (
                                    <p className='text-sm text-green-500'>Booking Confirmed</p>
                                )}
                                {!item.cancelled && (
                                    <button
                                        onClick={() => cancelAppointment(item._id)}
                                        className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 rounded'
                                    >
                                        Cancel Appointment
                                    </button>
                                )}
                                {item.cancelled && (
                                    <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                                        Appointment Cancelled
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Customer Form */}
            {showModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-lg w-full max-w-md'>
                        <h2 className='text-lg font-medium mb-4'>Enter Your Details</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                confirmBooking();
                            }}
                        >
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700'>Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className='mt-1 p-2 w-full border rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700'>Phone</label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className='mt-1 p-2 w-full border rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700'>Address</label>
                                <input
                                    type='text'
                                    name='address'
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className='mt-1 p-2 w-full border rounded'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700'>Reason for Visit</label>
                                <textarea
                                    name='reason'
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    className='mt-1 p-2 w-full border rounded'
                                    required
                                />
                            </div>
                            <div className='flex justify-end gap-2'>
                                <button
                                    type='button'
                                    onClick={() => setShowModal(false)}
                                    className='px-4 py-2 border rounded hover:bg-gray-100'
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark'
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyAppointments;
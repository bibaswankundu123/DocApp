import React, { useEffect, useContext, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from "react-toastify";
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        docId: profileData._id,
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return profileData && (
    <div className="p-5 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Doctor Profile</h2>

      <div className="bg-white border rounded shadow p-6 flex flex-col sm:flex-row gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={profileData.image}
            alt="Doctor"
            className="w-40 h-40 rounded-full object-cover border"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{profileData.name}</h3>
            <p className="text-sm text-gray-500">{profileData.speciality}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-medium">Email:</span> {profileData.email}</p>
            <p><span className="font-medium">Degree:</span> {profileData.degree}</p>
            <p><span className="font-medium">Experience:</span> {profileData.experience}</p>
            <p className='text-gray-600 font-medium mt-4'>
              Appointment Fee:{' '}
              {isEdit ? (
                <input
                  type="number"
                  className="border p-1 rounded w-24"
                  value={profileData.fees || ''}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                  min="0"
                />
              ) : (
                <span className='text-gray-800'>{currency}{profileData.fees}</span>
              )}
            </p>
          </div>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-800">About:</p>
            {isEdit ? (
              <textarea
                className="border w-full p-2 rounded"
                value={profileData.about || ''}
                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600">{profileData.about}</p>
            )}
          </div>

          <div className="flex gap-1 pt-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={(e) => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
            />
            <label className="text-sm text-gray-700">Available</label>
          </div>

          {
            isEdit
              ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
              : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
          }
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
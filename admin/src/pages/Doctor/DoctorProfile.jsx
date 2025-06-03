import React, { useEffect, useContext, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';


const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData } = useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setEditData(profileData);
    }
  }, [profileData]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/doctor/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          dToken,
        },
        body: JSON.stringify(editData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success('Profile updated successfully!');
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  if (!editData) return <div className="p-5">Loading profile...</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Doctor Profile</h2>

      <div className="bg-white border rounded shadow p-6 flex flex-col sm:flex-row gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={editData.image}
            alt="Doctor"
            className="w-40 h-40 rounded-full object-cover border"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{editData.name}</h3>
            <p className="text-sm text-gray-500">{editData.speciality}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-medium">Email:</span> {editData.email}</p>
            <p><span className="font-medium">Degree:</span> {editData.degree}</p>
            <p><span className="font-medium">Experience:</span> {editData.experience}</p>
            <p>
              <span className="font-medium">Fees:</span>{' '}
              {isEdit ? (
                <input
                  type="number"
                  className="border px-2 py-1 rounded w-24"
                  value={editData.fees}
                  onChange={(e) => setEditData(prev => ({ ...prev, fees: e.target.value }))}
                />
              ) : (
                `${currency}${editData.fees}`
              )}
            </p>
          </div>

          {editData.address && (
            <div>
              <p className="font-medium text-gray-800">Address:</p>
              <p className="text-gray-600">
                {editData.address.line1}, {editData.address.line2}
              </p>
            </div>
          )}

          <div>
            <p className="font-medium text-gray-800">About:</p>
            {isEdit ? (
              <textarea
                className="border w-full p-2 rounded"
                value={editData.about || ''}
                onChange={(e) => setEditData(prev => ({ ...prev, about: e.target.value }))}
              />
            ) : (
              <p className="text-gray-600">{editData.about}</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              checked={editData.available}
              onChange={(e) => setEditData(prev => ({ ...prev, available: e.target.checked }))}
            />
            <label className="text-sm text-gray-700">Available</label>
          </div>

          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                className="px-4 py-1 bg-primary text-white text-sm rounded-full hover:opacity-90 transition-all"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditData(profileData);
                  setIsEdit(false);
                }}
                className="px-4 py-1 border border-gray-400 text-sm rounded-full hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

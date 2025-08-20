import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, updateDoctor, deleteDoctor, specialties, getSpecialties } = useContext(AdminContext);
  const [editDoctor, setEditDoctor] = useState(null);
  const [formData, setFormData] = useState({
    docImg: false,
    name: '',
    email: '',
    password: '',
    experience: '1 Year',
    fees: '',
    about: '',
    speciality: 'General physician',
    degree: '',
    address1: '',
    address2: '',
  });

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getSpecialties();
    }
  }, [aToken]);

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setFormData({
      docImg: false,
      name: doctor.name,
      email: doctor.email,
      password: '',
      experience: doctor.experience,
      fees: doctor.fees,
      about: doctor.about,
      speciality: doctor.speciality,
      degree: doctor.degree,
      address1: doctor.address.line1,
      address2: doctor.address.line2,
    });
  };

  const handleDelete = async (docId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await deleteDoctor(docId);
      getAllDoctors();
    }
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData();
      if (formData.docImg) form.append('image', formData.docImg);
      form.append('docId', editDoctor._id);
      form.append('name', formData.name);
      form.append('email', formData.email);
      if (formData.password) form.append('password', formData.password);
      form.append('experience', formData.experience);
      form.append('fees', Number(formData.fees));
      form.append('about', formData.about);
      form.append('speciality', formData.speciality);
      form.append('degree', formData.degree);
      form.append('address', JSON.stringify({ line1: formData.address1, line2: formData.address2 }));

      await updateDoctor(editDoctor._id, form);
      setEditDoctor(null);
      setFormData({
        docImg: false,
        name: '',
        email: '',
        password: '',
        experience: '1 Year',
        fees: '',
        about: '',
        speciality: 'General physician',
        degree: '',
        address1: '',
        address2: '',
      });
      getAllDoctors();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden" key={index}>
            <img className="bg-indigo-50" src={item.image} alt={item.name} />
            <div className="p-4">
              <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
              <p className="text-zinc-600 text-sm"><strong>Speciality:</strong> {item.speciality}</p>
              <p className="text-zinc-600 text-sm"><strong>Email:</strong> {item.email}</p>
              <p className="text-zinc-600 text-sm"><strong>Experience:</strong> {item.experience}</p>
              <p className="text-zinc-600 text-sm"><strong>Fees:</strong> {item.fees}</p>
              <p className="text-zinc-600 text-sm"><strong>Degree:</strong> {item.degree}</p>
              <p className="text-zinc-600 text-sm"><strong>Address:</strong> {item.address.line1}, {item.address.line2}</p>
              <p className="text-zinc-600 text-sm"><strong>About:</strong> {item.about}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmitEdit} className="m-5 w-full max-w-4xl bg-white px-8 py-8 border rounded max-h-[80vh] overflow-y-scroll">
            <p className="mb-3 text-lg font-medium">Edit Doctor</p>
            <div className="flex items-center gap-4 mb-8 text-gray-500">
              <label htmlFor="doc-img">
                <img
                  className="w-16 bg-gray-100 rounded-full cursor-pointer"
                  src={formData.docImg ? URL.createObjectURL(formData.docImg) : editDoctor.image}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setFormData((prev) => ({ ...prev, docImg: e.target.files[0] }))}
                type="file"
                id="doc-img"
                hidden
              />
              <p>Upload doctor picture</p>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p>Doctor Name</p>
                  <input
                    name="name"
                    onChange={handleInputChange}
                    value={formData.name}
                    className="border rounded px-3 py-2"
                    type="text"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Doctor Email</p>
                  <input
                    name="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    className="border rounded px-3 py-2"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Doctor Password (leave blank to keep unchanged)</p>
                  <input
                    name="password"
                    onChange={handleInputChange}
                    value={formData.password}
                    className="border rounded px-3 py-2"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Experience</p>
                  <select
                    name="experience"
                    onChange={handleInputChange}
                    value={formData.experience}
                    className="border rounded px-3 py-2"
                  >
                    <option value="1 Year">1 Year</option>
                    <option value="2 Year">2 Years</option>
                    <option value="3 Year">3 Years</option>
                    <option value="4 Year">4 Years</option>
                    <option value="5 Year">5 Years</option>
                    <option value="6 Year">6 Years</option>
                    <option value="7 Year">7 Years</option>
                    <option value="8 Year">8 Years</option>
                    <option value="9 Year">9 Years</option>
                    <option value="10 Year">10 Years</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Fees</p>
                  <input
                    name="fees"
                    onChange={handleInputChange}
                    value={formData.fees}
                    className="border rounded px-3 py-2"
                    type="number"
                    placeholder="Fees"
                    required
                  />
                </div>
              </div>
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p>Speciality</p>
                  <select
                    name="speciality"
                    onChange={handleInputChange}
                    value={formData.speciality}
                    className="border rounded px-3 py-2"
                  >
                    {specialties.map((spec, index) => (
                      <option key={index} value={spec.name || spec}>
                        {spec.name || spec}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Education</p>
                  <input
                    name="degree"
                    onChange={handleInputChange}
                    value={formData.degree}
                    className="border rounded px-3 py-2"
                    type="text"
                    placeholder="Education"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <p>Address</p>
                  <input
                    name="address1"
                    onChange={handleInputChange}
                    value={formData.address1}
                    className="border rounded px-3 py-2"
                    type="text"
                    placeholder="Address 1"
                    required
                  />
                  <input
                    name="address2"
                    onChange={handleInputChange}
                    value={formData.address2}
                    className="border rounded px-3 py-2"
                    type="text"
                    placeholder="Address 2"
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="mt-4 mb-2">About Doctor</p>
              <textarea
                name="about"
                onChange={handleInputChange}
                value={formData.about}
                className="w-full px-4 pt-2 border rounded"
                placeholder="Write about doctor"
                rows={5}
                required
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-primary px-10 py-3 text-white rounded-full"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditDoctor(null)}
                className="bg-gray-500 px-10 py-3 text-white rounded-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
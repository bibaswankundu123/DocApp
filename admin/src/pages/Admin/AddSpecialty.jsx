import React, { useState, useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const AddSpecialty = () => {
  const [name, setName] = useState("");
  const [specialtyImg, setSpecialtyImg] = useState(false);
  const [editSpecialty, setEditSpecialty] = useState(null);
  const { addSpecialty, specialties, getSpecialties, deleteSpecialty, updateSpecialty } = useContext(AdminContext);

  useEffect(() => {
    getSpecialties();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Specialty name is required");
    }

    const formData = new FormData();
    formData.append("name", name);
    if (specialtyImg) formData.append("image", specialtyImg);

    await addSpecialty(formData);
    setName("");
    setSpecialtyImg(false);
  };

  const handleEdit = (specialty) => {
    setEditSpecialty(specialty);
    setName(specialty.name);
    setSpecialtyImg(false);
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Specialty name is required");
    }

    const formData = new FormData();
    formData.append("id", editSpecialty._id);
    formData.append("name", name);
    if (specialtyImg) formData.append("image", specialtyImg);

    try {
      await updateSpecialty(editSpecialty._id, formData);
      setEditSpecialty(null);
      setName("");
      setSpecialtyImg(false);
      getSpecialties();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this specialty?")) {
      try {
        const response = await deleteSpecialty(id);
        if (response && response.success) {
          toast.success(response.message);
          getSpecialties();
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="m-5 w-full">
      <form onSubmit={onSubmitHandler}>
        <p className="mb-3 text-lg font-medium">Add Specialty</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl mb-8">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="specialty-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={specialtyImg ? URL.createObjectURL(specialtyImg) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => setSpecialtyImg(e.target.files[0])}
              type="file"
              id="specialty-img"
              hidden
            />
            <p>
              Upload specialty image <br /> (optional)
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Specialty Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="e.g. Cardiologist"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
            >
              Add Specialty
            </button>
          </div>
        </div>
      </form>

      {editSpecialty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmitEdit} className="m-5 w-full max-w-4xl bg-white px-8 py-8 border rounded max-h-[80vh] overflow-y-scroll">
            <p className="mb-3 text-lg font-medium">Edit Specialty</p>
            <div className="flex items-center gap-4 mb-8 text-gray-500">
              <label htmlFor="edit-specialty-img">
                <img
                  className="w-16 bg-gray-100 rounded-full cursor-pointer"
                  src={specialtyImg ? URL.createObjectURL(specialtyImg) : editSpecialty.image || assets.upload_area}
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setSpecialtyImg(e.target.files[0])}
                type="file"
                id="edit-specialty-img"
                hidden
              />
              <p>Upload specialty image (optional)</p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Specialty Name</p>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="e.g. Cardiologist"
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
                  onClick={() => setEditSpecialty(null)}
                  className="bg-gray-500 px-10 py-3 text-white rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
        <p className="mb-3 text-lg font-medium">Specialty List</p>
        {specialties.length === 0 ? (
          <p className="text-gray-500">No specialties added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialties.map((specialty) => (
              <div key={specialty._id} className="border rounded p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {specialty.image && (
                    <img 
                      src={specialty.image} 
                      alt={specialty.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <span>{specialty.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(specialty)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(specialty._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSpecialty;
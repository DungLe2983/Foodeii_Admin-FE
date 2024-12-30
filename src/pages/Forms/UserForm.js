import React, { useState, useEffect } from "react";

const UserForm = ({ closeForm, onSubmit, initialData = null }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setAddress(initialData.address || "");
      setPhone(initialData.phone || "");
      setEmail(initialData.email || "");
      setRole(initialData.role || "");
    }
  }, [initialData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      address,
      phone,
      email, // Include email in the form data
      role, // Include role in the form data
      oldPassword,
      newPassword,
    };

    onSubmit(formData); // Submit the form data
    closeForm(); // Close the form after submission
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative'>
        <h2 className='text-heading4-bold mb-8 text-center text-primary'>
          {initialData ? "Edit User" : "Create User"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>

          {/* Role */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Role
            </label>
            <input
              type='role'
              value={role}
              readOnly
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>

          {/* Phone Number */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <input
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
              required
            />
          </div>

          {/* Address */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Address
            </label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </div>

          {/* Old Password */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Old Password
            </label>
            <input
              type='password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </div>

          {/* New Password */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              New Password
            </label>
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </div>

          <div className='flex justify-end'>
            <button
              type='button'
              onClick={closeForm}
              className='px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 mr-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

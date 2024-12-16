import React, { useState, useEffect } from "react";

const SupplierForm = ({ closeForm, onSubmit, initialData = null }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhone(initialData.phone);
      setAddress(initialData.address);
      setEmail(initialData.email);
      setWebsite(initialData.website);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      id: initialData ? initialData.id : new Date().getTime().toString(),
      name,
      phone,
      address,
      email,
      website,
    };
    onSubmit(formData);

    closeForm();
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-[30rem] p-6 rounded-lg shadow-lg relative'>
        <h2 className='text-heading4-bold mb-8 text-center text-primary'>
          {initialData ? "Edit Publisher" : "Create Publisher"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter publisher name'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Phone
            </label>
            <input
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter phone number'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Address
            </label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter address'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter email'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Website
            </label>
            <input
              type='url'
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter website URL'
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
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierForm;

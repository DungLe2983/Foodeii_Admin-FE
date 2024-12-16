import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ProductForm = ({
  closeForm,
  reload,
  initialData,
  suppliers,
  categories,
}) => {
  const [productData, setProductData] = useState({
    id: initialData?.id || null,
    name: initialData?.name || "",
    supplier: initialData?.supplier?.id || "",
    category: initialData?.category?.id || "",
    stockQuantity: initialData?.stockQuantity || 0,
    price: initialData?.price || 0,
    image: initialData?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !productData.name ||
      !productData.price ||
      !productData.supplier ||
      !productData.category
    ) {
      toast.error("All fields are required");
      return;
    }

    const newProduct = {
      ...productData,
      id: productData.id || new Date().getTime().toString(),
      supplier: suppliers.find((s) => s.id === productData.supplier),
      category: categories.find((c) => c.id === productData.category),
    };

    reload(newProduct);

    toast.success(
      `Product ${productData.id ? "updated" : "created"} successfully!`
    );
    closeForm();
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-heading4-bold mb-4'>
          {productData.id ? "Edit Product" : "Create Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Product Name
            </label>
            <input
              type='text'
              name='name'
              value={productData.name}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
              placeholder='Enter product name'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Supplier
            </label>
            <select
              name='supplier'
              value={productData.supplier}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
            >
              <option value='' disabled>
                Select supplier
              </option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Category
            </label>
            <select
              name='category'
              value={productData.category}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
            >
              <option value='' disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Stock Quantity
            </label>
            <input
              type='number'
              name='stockQuantity'
              value={productData.stockQuantity}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
              placeholder='Enter stock quantity'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Price
            </label>
            <input
              type='number'
              name='price'
              value={productData.price}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
              placeholder='Enter price'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Image URL
            </label>
            <input
              type='text'
              name='image'
              value={productData.image}
              onChange={handleChange}
              className='w-full border border-gray-300 rounded px-3 py-2 mt-1'
              placeholder='Enter image URL'
            />
          </div>

          <div className='flex justify-end space-x-2'>
            <button
              type='button'
              onClick={closeForm}
              className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

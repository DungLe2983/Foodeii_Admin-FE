import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getAllCategories } from "../../services/categoryService"; // Lấy danh sách categories từ service
import { createProduct, editProduct } from "../../services/productService"; // Tạo và cập nhật sản phẩm
import { uploadToCloudinary } from "../../services/uploadService"; // Dịch vụ tải ảnh lên Cloudinary

const ProductForm = ({ closeForm, reload, initialData = null }) => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Chỉ lưu một category ID duy nhất
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Thêm trường imageUrl
  const [categories, setCategories] = useState([]); // Danh sách các category có sẵn

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategoryId(initialData.categories?.[0]?.id || ""); // Chỉ lấy 1 category khi edit
      setPrice(initialData.price);
      setStockQuantity(initialData.stockQuantity);
      setDescription(initialData.description);
      setImageUrl(initialData.imageUrl || ""); // Thiết lập giá trị mặc định cho imageUrl
    }
  }, [initialData]);

  // Hàm xử lý việc tải ảnh lên Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Lấy tệp người dùng chọn
    if (file) {
      const uploadedImageUrl = await uploadToCloudinary(file);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl); // Cập nhật imageUrl với URL ảnh mới
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity, 10),
      description,
      category: { id: categoryId }, // Đảm bảo gửi đúng định dạng với đối tượng category
      imageUrl,
    };

    try {
      if (initialData) {
        await editProduct(initialData.id, formData);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(formData);
        toast.success("Product created successfully!");
      }
      reload(); // Reload danh sách sản phẩm
      closeForm(); // Đóng form sau khi thành công
    } catch (error) {
      toast.error("Failed to create or update product");
      console.error(error);
    }
  };

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]'>
        <h2 className='text-heading4-bold mb-8 text-center text-primary'>
          {initialData ? "Edit Product" : "Create Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Product Name
            </label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter product name'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Categories
            </label>
            <select
              value={categoryId || ""}
              onChange={(e) => setCategoryId(e.target.value)} // Cập nhật categoryId với giá trị mới
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            >
              <option value='' disabled>
                Select a category
              </option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Price
            </label>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter product price'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Stock Quantity
            </label>
            <input
              type='number'
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter stock quantity'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              placeholder='Enter product description'
              required
            />
          </div>

          {/* Thay thế input URL ảnh bằng input tải lên ảnh */}
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Product Image
            </label>
            <input
              type='file'
              onChange={handleImageUpload} // Gọi hàm upload ảnh khi người dùng chọn tệp
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
            {imageUrl && (
              <div className='mt-2'>
                <img
                  src={imageUrl}
                  alt='Product Preview'
                  className='max-w-full h-auto'
                />
              </div>
            )}
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
              className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700'
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

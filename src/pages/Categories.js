import React, { useEffect, useState } from "react";
import CategoriesForm from "../pages/Forms/CategoriesForm.js";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        toast.error("Không thể tải danh mục");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Lọc danh sách theo từ khóa tìm kiếm
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = () => {
    setEditData(null);
    setIsFormOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditData(category);
    setIsFormOpen(true);
  };

  const confirmDeleteCategory = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleSubmitCategory = async (categoryData) => {
    setIsLoading(true);
    try {
      if (editData) {
        const updatedCategory = await updateCategory(editData.id, categoryData);
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === editData.id ? updatedCategory : category
          )
        );
        toast.success("Danh mục được cập nhật thành công");
      } else {
        const newCategory = await createCategory(categoryData);
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        toast.success("Danh mục được tạo thành công");
      }
    } catch (error) {
      toast.error("Không thể lưu danh mục");
    } finally {
      setIsFormOpen(false); // Đóng form sau khi hoàn thành
      setIsLoading(false); // Set lại trạng thái loading
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      toast.success("Xóa danh mục thành công");
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>Danh Mục Sản Phẩm</h2>
      <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
          <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
          <input
            type='text'
            placeholder='Tìm kiếm...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
          />
        </div>
        <button
          onClick={handleCreateCategory}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'
        >
          Thêm Danh Mục
        </button>
      </div>

      <div className='overflow-x-auto mt-6'>
        {isLoading ? (
          <p className='text-center text-gray-600'>Đang tải...</p>
        ) : (
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-100 border-b border-gray-200'>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                  Tên Danh Mục
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                  Mô Tả
                </th>
                <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category) => (
                <tr
                  key={category.id}
                  className='border-b hover:bg-gray-100 transition-colors'
                >
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {category.name}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700'>
                    {category.description}
                  </td>
                  <td className='px-4 py-3 text-sm text-gray-700 space-x-2'>
                    <button
                      onClick={() => handleEditCategory(category)}
                      className='text-blue-600 hover:text-blue-800'
                    >
                      <i className='ri-edit-line'></i>
                    </button>
                    <button
                      onClick={() => confirmDeleteCategory(category)}
                      className='text-red-600 hover:text-red-800'
                    >
                      <i className='ri-delete-bin-line'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isFormOpen && (
        <CategoriesForm
          closeForm={() => setIsFormOpen(false)}
          onSubmit={handleSubmitCategory}
          initialData={editData}
        />
      )}
      {deleteModalOpen && selectedCategory && (
        <DeleteButton
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeleteCategory(selectedCategory.id)}
          itemName={selectedCategory.name}
        />
      )}
    </div>
  );
};

export default Categories;

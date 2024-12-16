import React, { useEffect, useState } from "react";
import CategoriesForm from "../pages/Forms/CategoriesForm.js";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";

const Categories = () => {
  // Dữ liệu giả cho website bán thực phẩm sạch
  const initialCategories = [
    {
      id: "1",
      name: "Rau Củ Quả",
      description: "Các loại rau củ quả tươi sạch, không chất bảo quản.",
    },
    {
      id: "2",
      name: "Thịt Sạch",
      description: "Các loại thịt bò, thịt heo, gà đảm bảo chất lượng.",
    },
    {
      id: "3",
      name: "Hải Sản Tươi",
      description: "Hải sản tươi sống, đánh bắt từ các vùng biển sạch.",
    },
    {
      id: "4",
      name: "Trái Cây Hữu Cơ",
      description: "Trái cây hữu cơ được trồng theo tiêu chuẩn quốc tế.",
    },
    {
      id: "5",
      name: "Đồ Uống Lành Mạnh",
      description: "Các loại nước ép, sinh tố, và đồ uống tốt cho sức khỏe.",
    },
  ];

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy dữ liệu giả
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCategories(initialCategories); // Sử dụng dữ liệu giả
      setIsLoading(false);
    }, 500); // Giả lập thời gian tải dữ liệu
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

  const handleSubmitCategory = (categoryData) => {
    setIsLoading(true);
    try {
      if (editData) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === editData.id
              ? { ...category, ...categoryData }
              : category
          )
        );
        toast.success("Danh mục được cập nhật thành công");
      } else {
        const newCategory = {
          id: Date.now().toString(), // ID tạm thời dựa trên timestamp
          ...categoryData,
        };
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        toast.success("Danh mục được tạo mới thành công");
      }
    } catch (error) {
      toast.error("Không thể lưu danh mục");
    } finally {
      setIsFormOpen(false);
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = (id) => {
    setIsLoading(true);
    try {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
      toast.success("Danh mục đã được xóa thành công");
    } catch (error) {
      toast.error("Không thể xóa danh mục");
    } finally {
      setDeleteModalOpen(false);
      setSelectedCategory(null);
      setIsLoading(false);
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

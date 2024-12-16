import React, { useEffect, useState } from "react";
import ProductForm from "./Forms/ProductForm.js";
import DeleteButton from "../components/DeleteButton.js";
import toast from "react-hot-toast";

const mockProducts = [
  {
    id: "1",
    name: "Product 1",
    supplier: { name: "Supplier A" },
    categories: [{ name: "Category A" }, { name: "Category B" }],
    stockQuantity: 50,
    price: 100000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Product 2",
    supplier: { name: "Supplier B" },
    categories: [{ name: "Category C" }],
    stockQuantity: 30,
    price: 200000,
    image: "https://via.placeholder.com/150",
  },
  // Add more mock products as needed
];

const mockSuppliers = [
  { id: "1", name: "Supplier A" },
  { id: "2", name: "Supplier B" },
];

const mockCategories = [
  { id: "1", name: "Category A" },
  { id: "2", name: "Category B" },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // Load mock data
  useEffect(() => {
    const fetchData = () => {
      const totalItems = mockProducts.length;
      setTotalPages(Math.ceil(totalItems / pageSize));
      const startIndex = (currentPage - 1) * pageSize;
      const paginatedProducts = mockProducts.slice(
        startIndex,
        startIndex + pageSize
      );
      setProducts(paginatedProducts);
    };

    fetchData();
  }, [currentPage, pageSize]);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const handleCreateProduct = () => {
    setEditData(null);
    setIsFormOpen(true);
  };
  const reloadProducts = (newProduct) => {
    setProducts((prev) =>
      newProduct.id
        ? prev.map((p) => (p.id === newProduct.id ? newProduct : p))
        : [...prev, newProduct]
    );
  };

  const handleEditProduct = (product) => {
    setEditData(product);
    setIsFormOpen(true);
  };

  const confirmDeleteProduct = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = mockProducts.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    toast.success("Product deleted successfully");
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 flex-1'>
      <h2 className='text-heading3-bold mb-4'>List of Products</h2>
      <div className='bg-white h-16 flex justify-between items-center border-b border-gray-200'>
        <div className='relative'>
          <i className='ri-search-line text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'></i>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm pl-11 pr-4'
          />
        </div>
        <button
          onClick={handleCreateProduct}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'
        >
          Create Product
        </button>
      </div>

      <div className='mt-6 overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr className='bg-gray-100 border-b border-gray-200'>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Name
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Supplier
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Categories
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Stock Quantity
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Price
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600 '>
                Image
              </th>
              <th className='px-4 py-2 text-left text-sm font-medium text-gray-600'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className='border-b hover:bg-gray-50'>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {product.name}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {product.supplier.name}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {product.categories
                    .map((category) => category.name)
                    .join(", ")}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  {product.stockQuantity}
                </td>
                <td className='px-4 py-3 text-sm text-red-500 font-semibold'>
                  {product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className='px-4 py-3 text-sm text-gray-700'>
                  <img
                    src={product.image}
                    className='w-40 h-40 object-cover'
                    alt='product'
                  />
                </td>
                <td className='py-3 px-4 space-x-4'>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className='text-blue-600 hover:text-blue-800 text-[18px]'
                  >
                    <i className='ri-edit-line'></i>
                  </button>
                  <button
                    onClick={() => confirmDeleteProduct(product)}
                    className='text-red-600 hover:text-red-800 text-[18px]'
                  >
                    <i className='ri-delete-bin-line'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center items-center mt-4 space-x-2'>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 border rounded ${
              page + 1 === currentPage
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page + 1}
          </button>
        ))}
      </div>

      {isFormOpen && (
        <ProductForm
          closeForm={() => setIsFormOpen(false)}
          reload={reloadProducts}
          initialData={editData}
          suppliers={mockSuppliers}
          categories={mockCategories}
        />
      )}
      {deleteModalOpen && selectedProduct && (
        <DeleteButton
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={() => handleDeleteProduct(selectedProduct.id)}
          itemName={selectedProduct.name}
        />
      )}
    </div>
  );
};

export default Products;

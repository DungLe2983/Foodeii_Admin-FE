import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../src/assets/logo.png";

const Sidebar = () => (
  <nav className='w-64 bg-gray-800 text-white flex flex-col'>
    <img src={logo} alt='logo' width={180} className='p-4 pb-8' />
    <ul className='space-y-2 text-lg'>
      <li>
        <NavLink
          to='/'
          className={({ isActive }) =>
            `flex items-center space-x-2 py-4 pl-4 ${
              isActive
                ? "bg-gray-600 text-primary"
                : "hover:bg-gray-600 hover:text-primary"
            }`
          }
        >
          <i className='ri-dashboard-line text-xl'></i>
          <span>Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/orders'
          className={({ isActive }) =>
            `flex items-center space-x-2 py-4 pl-4 ${
              isActive
                ? "bg-gray-600 text-primary"
                : "hover:bg-gray-600 hover:text-primary"
            }`
          }
        >
          <i className='ri-file-list-line text-xl'></i>
          <span>Orders</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/categories'
          className={({ isActive }) =>
            `flex items-center space-x-2 py-4 pl-4 ${
              isActive
                ? "bg-gray-600 text-primary"
                : "hover:bg-gray-600 hover:text-primary"
            }`
          }
        >
          <i className='ri-openai-fill text-xl'></i>
          <span>Categories</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to='/products'
          className={({ isActive }) =>
            `flex items-center space-x-2 py-4 pl-4 ${
              isActive
                ? "bg-gray-600 text-primary"
                : "hover:bg-gray-600 hover:text-primary"
            }`
          }
        >
          <i className='ri-book-open-fill text-xl'></i>
          <span>Products</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/users'
          className={({ isActive }) =>
            `flex items-center space-x-2 py-4 pl-4 ${
              isActive
                ? "bg-gray-600 text-primary"
                : "hover:bg-gray-600 hover:text-primary"
            }`
          }
        >
          <i className='ri-group-fill'></i>
          <span>Users</span>
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Sidebar;

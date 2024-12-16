import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import User from "./pages/User";
import Supplier from "./pages/Supplier";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
          <Route path='users' element={<User />} />
          <Route path='categories' element={<Categories />} />
          <Route path='suppliers' element={<Supplier />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

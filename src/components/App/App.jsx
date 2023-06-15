import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { fetchCategories } from "@store/categoriesSlice/categoriesSlice";
import { fetchProducts } from "@store/productsSlice/productsSlice";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import UserForm from "../User/UserForm";

import AppRoutes from "../Routes/Routes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      <UserForm />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;

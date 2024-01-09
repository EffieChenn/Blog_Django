import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import Home from "./components/Home";
import Blog from "./components/Blog";
import BlogDetail from "./components/BlogDetail";
import Category from "./components/Category";
import AddForm from "./components/AddForm";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blog/add" element={<AddForm />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  );
};

export default App;

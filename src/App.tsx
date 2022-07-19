import React, { useEffect } from "react";
import Home from "./Pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/SignUp";
import { fetchProducts } from "./Store/products/products.action";
import { useAppDispatch } from "./Hooks";
import Product from "./Pages/Product";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path={"/product/:productId"} element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

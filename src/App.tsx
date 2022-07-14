import React, { useEffect } from 'react';
import Home from './pages/Home';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Login from "./components/Login";
import Signup from './components/SignUp';
import {fetchProducts} from "./store/products/products.action"
import { useAppDispatch } from './hooks';
import Product from './pages/Product/Product'

const App:React.FC = ()=> {
   const dispatch = useAppDispatch()
   useEffect(()=>{
    dispatch(fetchProducts())
   },[])

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/SignUp' element={<Signup/>} />
        <Route path={'/product/:productId'} element={<Product />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

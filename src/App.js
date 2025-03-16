import React, { useState } from 'react';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard'
import ProductDetail from './Components/productDetail'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Cart from './Componentsind/NewCart';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/Fashiquecomstore01' element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path= '/login' element={<Login/>}/>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/newcart" element={<Cart/>} />
        </Routes>
      </Router>

    </>
  );
}

export default App

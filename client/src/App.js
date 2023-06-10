import React from 'react'
import { BrowserRouter,Route,NavLink,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify' 

import Menu from './Components/Util/Menu'
import Home from './Components/Default/Home'
import Contact from './Components/Default/Home'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import UserDashboard from './Components/User/UserDashboard'
import AdminDashboard from './Components/Admin/AdminDashboard';
import Pnf from './Components/Util/Pnf'


function App() {
  return (
    <BrowserRouter>
        <Menu/>
        <ToastContainer position={'top-center'} autoClose={4000}/>
        <Routes>
          <Route path={`/`} element={<Home/>}/>
          <Route path={`/contact`} element={<Contact/>}/>
          <Route path={`/login`} element={<Login/>}/>
          <Route path={`/register`} element={<Register/>}/>
          <Route path={`/user/dashboard`} element={<UserDashboard/>}/>
          <Route path={`/admin/dashboard`} element={<AdminDashboard/>}/>
          <Route path ={`/*`} element= {<Pnf/>}/>
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;

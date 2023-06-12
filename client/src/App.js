import React, { useContext } from 'react'
import { BrowserRouter, Route, NavLink, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GlobalContext } from './GlobalContext'

import Menu from './Components/Util/Menu'
import Home from './Components/Default/Home'
import Contact from './Components/Default/Contact'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import UserDashboard from './Components/User/UserDashboard'
import AdminDashboard from './Components/Admin/AdminDashboard'
import Pnf from './Components/Util/Pnf'
import ProtectedRoute from './AuthGaurd/ProtectedRoute'

function App() {
  const context = useContext(GlobalContext)
  const [isLogged] = context.auth.isLogged
  const [isUser] =  context.auth.isUser
  const [isAdmin] = context.auth.isAdmin

  return (
    <BrowserRouter>
          <Menu/>
          <ToastContainer position={'top-center'} autoClose={4000} />
          <Routes>
              <Route path={`/`} element={<Home/>} />
              <Route path={`/contact`} element={<Contact/>} />
              <Route path={`/login`} element={<Login/>} />
              <Route path={`/register`} element={<Register/>} />
                {
                    isLogged && isUser ? (
                        <Route element={<ProtectedRoute/>}>
                               <Route path={`/user/dashboard`} element={<UserDashboard/>} />
                        </Route>
                    ): null 
                }
                {
                    isLogged && isAdmin ? (
                        <Route element={<ProtectedRoute/>}>
                              <Route path={`/admin/dashboard`} element={<AdminDashboard/>} />
                        </Route>
                    ): null 
                }
              
              <Route path={`/*`} element={<Pnf/>} />
          </Routes>
    </BrowserRouter>
  )
}

export default App
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
import Header from './Components/Util/Header'
import Footer from './Components/Util/Footer'
import Books from './Components/Admin/screens/Books'
import Category from './Components/Admin/screens/Category'
import Rent from './Components/Admin/screens/Rent'
import Customer from './Components/Admin/screens/Customers'
import UpdateBook from './Components/Admin/screens/book/UpdateBook'
import BookDetails from './Components/Admin/screens/book/BookDetails.jsx'
import AddBook from './Components/Admin/screens/book/AddBook'
import AddCategory from './Components/Admin/screens/category/AddCategory'
import UpdateCategory from './Components/Admin/screens/category/UpdateCategory'

function App() {
  const context = useContext(GlobalContext)
  const [isLogged] = context.auth.isLogged
  const [isUser] =  context.auth.isUser
  const [isAdmin] = context.auth.isAdmin

  return (
    <BrowserRouter>
          <Header/>
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
                              <Route path={`/admin/books/list`} element={<Books/>} />
                              <Route path={`/admin/book/add`} element={<AddBook/>} />
                              <Route path={`/admin/book/details/:id`} element={<BookDetails/>} />
                              <Route path={`/admin/book/edit/:id`} element={<UpdateBook/>} />
                              <Route path={`/admin/category/list`} element={<Category/>} />
                              <Route path={`/admin/category/add`} element={<AddCategory/>} />
                              <Route path={`/admin/category/edit/:id`} element={<UpdateCategory/>} />
                              <Route path={`/admin/rented/list`} element={<Rent/>} />
                              <Route path={`/admin/customers/list`} element={<Customer/>} />
                        </Route>
                    ): null 
                }
              
              <Route path={`/*`} element={<Pnf/>} />
          </Routes>
          <Footer/>
    </BrowserRouter>
  )
}

export default App
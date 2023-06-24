import React, { useCallback, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../GlobalContext'
import { toast } from 'react-toastify'


function AdminDashboard() {
  const [books,setBooks] = useState([])
  const [categories,setCategories] = useState([])
  const [rent,setRent] = useState([])
  const [users,setUsers] = useState([])

  const context = useContext(GlobalContext)
  const [token] = context.auth.token
  
  // books list
  const readBooks = useCallback(() => {
    const getBooks = async () => {
          const res = await axios.get(`/api/book/all`, {
            headers: {
                Authorization: token
            }
        })
        setBooks(res.data.books)
      }
      getBooks()
  },[])

  // categories list
  const readCategories = async () => {
    const res = await axios.get(`/api/category/all`, {
        headers: {
            Authorization: token
        }
    })
    setCategories(res.data.categories)
}

  // rented list
  const readrentList = async () => {
    const res = await axios.get(`/api/rent/all`, {
        headers: {
            Authorization: token
        }
    })
    setRent(res.data.rents)
}

// users list
const readUsers = async () => {
  const res = await axios.get(`/api/auth/all/users`, {
      headers: {
          Authorization: token
      }
  })
  setUsers(res.data.users)
}

useEffect(() => {
    readBooks()
    readCategories()
    readrentList()
    readUsers()
},[])

  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Admin Dashboard</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3 mt-2">
            <div className="card bg-success">
              <div className="card-body">
                  <h2 className="text-light">Books</h2>
                  <h4 className="text-dark float-end"> {books.length} </h4>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-2">
            <div className="card bg-info">
              <div className="card-body">
                  <h2 className="text-light">Categories</h2>
                  <h4 className="text-dark float-end"> {categories.length} </h4>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-2">
            <div className="card bg-danger">
              <div className="card-body">
                  <h2 className="text-light">Rented Books</h2>
                  <h4 className="text-dark float-end"> { rent.length } </h4>
              </div>
            </div>
          </div>

          <div className="col-md-3 mt-2 mb-5">
            <div className="card bg-warning">
              <div className="card-body">
                  <h2 className="text-light">Users</h2>
                  <h4 className="text-dark float-end"> { users.length } </h4>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default AdminDashboard
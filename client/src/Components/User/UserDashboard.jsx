import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../GlobalContext';
import {toast} from 'react-toastify'

function UserDashboard() {
  const context = useContext(GlobalContext)
  const [token] = context.auth.token
  const [currentUser] = context.auth.currentUser

  const [rent,setRent] = useState([])

  const readRent = useCallback(() => {
      const getRent = async () => {
          const res = await axios.get(`/api/rent/books/${currentUser._id}`, {
              headers: {
                Authorization: token
              }
          })
          setRent(res.data.rents)
      }
      getRent()
  },[])

  useEffect(() => {
    readRent()
  },[])


  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="display-3 text-success">User Dashboard</div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <table className="table table-bordered table-striped table-hovered">
            <thead>
            <tr>
              <th>Book Title</th>
              <th>Image</th>
              <th>Amount</th>
              <th>Rented Date</th>
              <th>Return Date</th>
             
              </tr>
              </thead>
           
            <tbody>
              {
                rent&& rent.map((item,index) => {
                  const { book, user, amount, rentDate,returnDate} = item
                  return(
                    <tr className='text-center' key={index}>
                      <td>{book.title? book.title : ''}</td>
                      <td>
                        {book.image? (<img src={ book.image.url } alt="not found" width={100} height={80}/>): ''}
                      </td>
                      <td> &#8377;{amount}</td>
                      <td>{ new Date(rentDate).toLocaleString()}</td>
                      <td>{new Date(returnDate).toLocaleString()}</td>
                     
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
}

export default UserDashboard

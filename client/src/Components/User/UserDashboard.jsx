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
    <div>
      userDashboard
    </div>
  )
}

export default UserDashboard

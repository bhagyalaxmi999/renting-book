import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { toast  } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../../GlobalContext'

// logic to find diff between 2 dates
const diffDays  = (d1,d2) => {
    let y =  Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
    let x =  Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())
     let res =  Math.floor((y - x) / (1000 * 60 *60 * 24))
     if(res > 0) {
        toast.warning(`Select Proper return date`)
        return 0
     } else {
        return res
     }
}


function NewRent() {
    const [rent,setRent] = useState({
        bookId: '',
        amount: 0,
        returnDate: '',
        paymentStatus: ''
    })

    const [books,setBooks] = useState([])
    const context = useContext(GlobalContext)
    const [token] = context.auth.token
    const [currentUser] = context.auth.currentUser

    const readValue = (e) => {
        const { name, value } = e.target;
        
        if(name === "returnDate") {
            let today = new Date();
            let retDate = new Date(value);
            let days = Math.abs(diffDays(today,retDate))
            console.log('diff days = ', days)
            let book = books.find((item) => item._id === rent.bookId)
            console.log('selected book =', book)
            let totalAmount = days * book.rentCost
                console.log('totalAmount =', totalAmount)
            setRent({...rent, ["amount"]: totalAmount })
        }

        setRent({...rent , [name]: value })
    }

    const readBooks =  useCallback(() => {
        let getBooks = async () => {
            const res = await axios.get(`/api/book/all`, {
                headers: { Authorization: token }
            })
            setBooks(res.data.books)
        }

        getBooks()
    },[])

    useEffect(() => {
        readBooks()
    },[])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            let newRent = {
                ...rent,
                userId: currentUser._id, 
            }
            console.log('newRet =', newRent)
        } catch (err) {
            toast.error(err.msg)
        }
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">New Book Rent</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler} >
                            <div className="form-group mt-2">
                                <label htmlFor="bookId">BookId</label>
                                <select name="bookId" id="bookId" className="form-select" value={rent.bookId} onChange={readValue} >
                                    <option value="">Choose Book</option>
                                    {
                                        books && books.map((item,index) => {
                                            const { _id, title } = item
                                            return (
                                                <option value={_id} key={index} > { title } </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" name="amount" value={rent.amount} onChange={readValue} id="amount" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="returnDate">Return Date</label>
                                <input type="datetime-local" name="returnDate" value={rent.returnDate} onChange={readValue} id="returnDate" className="form-control" />
                            </div>
                            <div className="form-group mt-2"></div>
                            <div className="form-group mt-2"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewRent
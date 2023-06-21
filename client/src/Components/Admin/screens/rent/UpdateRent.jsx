import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { toast  } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
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


function UpdateRent() {
    const [rent,setRent] = useState({
        userId: '',
        bookId: '',
        returnDate: '',
        paymentStatus: ''
    })
    const [amount,setAmount] = useState(0)

    const [books,setBooks] = useState([])
    const [users,setUsers] = useState([])

    const context = useContext(GlobalContext)
    const [token] = context.auth.token
    const [currentUser] = context.auth.currentUser

    const navigate = useNavigate()
    const params = useParams()

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
                setAmount(totalAmount)
        }

        setRent({...rent , [name]: value })
    }

    // reading book details
    const readBooks =  useCallback(() => {
        let getBooks = async () => {
            const res = await axios.get(`/api/book/all`, {
                headers: { Authorization: token }
            })
            setBooks(res.data.books)
        }

        getBooks()
    },[])

    // read users details
    const readUsers =  useCallback(() => {
        let getUsers = async () => {
            const res = await axios.get(`/api/auth/all/users`, {
                headers: { Authorization: token }
            })
            setUsers(res.data.users)
            
        }

        getUsers()
    },[])

    // read single rent details
    const readRent =  useCallback(() => {
        let getRent = async () => {
            const res = await axios.get(`/api/rent/single/${params.id}`, {
                headers: { Authorization: token }
            })
            setRent(res.data.rent)
            setAmount(res.data.rent.amount)
        }

        getRent()
    },[])

    useEffect(() => {
      readRent()
        readBooks()
        readUsers()
    },[])

    // update book info
    // const updateBookInfo = async (id) => {
    //     let book = books.find(item => item._id === id)
    //         if(book.numberOfCopy === 0) {
    //             toast.warning(`No more copies are available for rent`)
    //         } else {
    //             book.numberOfCopy = book.numberOfCopy - 1;
    //             book.rentedCopies = book.rentedCopies + 1;

    //             await axios.patch(`/api/book/update/${id}`, book, {
    //                 headers: {
    //                     Authorization: token
    //                 }
    //             })
    //         }
    // }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            let newRent = {
                ...rent,
                amount
            }
            console.log('newRet =', newRent)
            // updateBookInfo(rent.bookId)
            await axios.patch(`/api/rent/update/${params.id}`, newRent, {
                headers: { Authorization: token }
            }).then(res => {
                toast.success(res.data.msg)
                navigate(`/admin/rented/list`)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.msg)
        }
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Update Book Rent</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler} >
                            <div className="form-group mt-2">
                                <label htmlFor="bookId">BookId</label>
                                <select name="bookId" id="bookId" className="form-select" value={rent.bookId} onChange={readValue} disabled>
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
                                <label htmlFor="userId">UserId</label>
                                <select name="userId" id="userId" className="form-select" value={rent.userId} onChange={readValue} disabled>
                                    <option value="">Choose User</option>
                                    {
                                        users && users.map((item,index) => {
                                            const { _id, name } = item
                                            return (
                                                <option value={_id} key={index}>
                                                    { name }
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="amount">Amount</label>
                                <input type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} id="amount" className="form-control" readOnly required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="returnDate">Return Date = <span className="text-success"> {new Date(rent.returnDate).toLocaleString()} </span> </label>
                                <input type="datetime-local" name="returnDate" value={rent.returnDate} onChange={readValue} id="returnDate" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="paymentStatus">PaymentStatus</label>
                                <select name="paymentStatus" id="paymentStatus" className="form-select" value={rent.paymentStatus} onChange={readValue} required>
                                    <option value="unpaid">Un-Paid</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Update" className="btn btn-outline-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateRent












































// import React, { useState, useEffect, useCallback, useContext } from 'react'
// import axios from 'axios'
// import { toast  } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// import { GlobalContext } from '../../../../GlobalContext'

// // logic to find diff between 2 dates
// const diffDays  = (d1,d2) => {
//     let y =  Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
//     let x =  Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())
//      let res =  Math.floor((y - x) / (1000 * 60 *60 * 24))
//      if(res > 0) {
//         toast.warning(`Select Proper return date`)
//         return 0
//      } else {
//         return res
//      }
// }

// function NewRent() {
//     const [rent,setRent] = useState({
//         bookId: '',   
//         returnDate: '',
//         paymentStatus: ''
//     })
//     const [amount,setAmount] = useState(0)

//     const [books,setBooks] = useState([])
//     const context = useContext(GlobalContext)
//     const [token] = context.auth.token
//     const [currentUser] = context.auth.currentUser

//     const navigate = useNavigate()

//     const readValue = (e) => {
//         const { name, value } = e.target;
        
//         if(name === "returnDate") {
//             let today = new Date();
//             let retDate = new Date(value);
//             let days = Math.abs(diffDays(today,retDate))
//             console.log('diff days = ', days)
//             let book = books.find((item) => item._id === rent.bookId)
//             console.log('selected book =', book)
//             let totalAmount = days * book.rentCost
//                 console.log('totalAmount =', totalAmount)
//                  setAmount(totalAmount)
//         }

//         setRent({...rent , [name]: value })
//     }

//     const readBooks =  useCallback(() => {
//         let getBooks = async () => {
//             const res = await axios.get(`/api/book/all`, {
//                 headers: { Authorization: token }
//             })
//             setBooks(res.data.books)
//         }

//         getBooks()
//     },[])

//     useEffect(() => {
//         readBooks()
//     },[])
//     // update book info
//     const updateBookInfo = async (id) => {
//         let book = books.find(item => item._id === id)
//             if(book.numberOfCopy === 0) {
//                 toast.warning("no more copies are available for rent")
//             } else {
//                  book.numberOfCopy = book.numberOfCopy - 1;
//                  book.rentedCopies = book.rentedCopies + 1;

//                  await axios.patch(`/api/book/update/${id}`,book,{
//                     headers:{
//                         Authorization:token

//                     }
//                  })
//             }
//     }

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             let newRent = {
//                 ...rent,
//                 userId: currentUser._id,
//                 amount
//             }
//             console.log('newRet =', newRent)
//             updateBookInfo(rent.bookId)
//             await axios.post(`/api/rent/create`, newRent,{
//                 headers: {
//                     Authorization:token
//                 }
//             }).then(res => {
//                 toast.success('new book rented successfully')
//                 navigate(`/admin/rented/new`)
//             }).catch(err => toast.error(err.response.data.msg))
//         } catch (err) {
//             toast.error(err.msg)
//         }
//     }

//   return (
//     <div className='container'>
//         <div className="row">
//             <div className="col-md-12 text-center">
//                 <h3 className="display-3 text-success">New Book Rent</h3>
//             </div>
//         </div>

//         <div className="row">
//             <div className="col-md-6 offset-md-3">
//                 <div className="card">
//                     <div className="card-body">
//                         <form autoComplete="off" onSubmit={submitHandler} >
//                             <div className="form-group mt-2">
//                                 <label htmlFor="bookId">BookId</label>
//                                 <select name="bookId" id="bookId" className="form-select" value={rent.bookId} onChange={readValue} >
//                                     <option value="">Choose Book</option>
//                                     {
//                                         books && books.map((item,index) => {
//                                             const { _id, title } = item
//                                             return (
//                                                 <option value={_id} key={index} > { title } </option>
//                                             )
//                                         })
//                                     }
//                                 </select>
//                             </div>
//                             <div className="form-group mt-2">
//                                 <label htmlFor="amount">Amount</label>
//                                 <input type="number" name="amount" value={amount} onChange={(e)=> setAmount(e.target.value)} id="amount" className="form-control" required />
//                             </div>
//                             <div className="form-group mt-2">
//                                 <label htmlFor="returnDate">Return Date</label>
//                                 <input type="datetime-local" name="returnDate" value={rent.returnDate} onChange={readValue} id="returnDate" className="form-control" />
//                             </div>
//                             <div className="form-group mt-2">
//                                 <label htmlFor="paymentStatus">PaymentStatus</label>
//                                 <select name="paymentStatus" id="paymentStatus" className="form-select" value={rent.paymentStatus}>
//                                     <option value="unpaid">un-paid</option>
//                                     <option value="padid">paid</option>
//                                 </select>
//                             </div>
//                             <div className="form-group mt-2">
//                                 <input type="submit" value="Rent Book" className='btn btn-outline-success' />
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default NewRent



// tanu***************************************************************

// import React,{ useEffect, useCallback, useContext, useState } from 'react'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// import { GlobalContext } from '../../../../GlobalContext'

// //logic to find diff between 2 dates
// const diffDays = (d1,d2) =>{
//     let y = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate())
//     let x = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate())

//  let res = Math.floor((x-y) / (1000 * 60 * 60 * 24 ))
//  if(res < 0){
//     toast.warning(`Select proper return date`)
//     return 0
//  } else {
//     return res
//  }
// }
// function UpdateRent() {

//     const [rent,setRent] = useState({
//         userId:'',
//         bookId:'',
//         returnDate:"",
//         paymentStatus : ""
//     })

//     const [amount,setAmount] = useState(0)

//     const [books,setBooks] = useState([])
//     const [users,setUsers] = useState([])
//     const context = useContext(GlobalContext)
//     const [token] = context.auth.token
//     const [currentUser] = context.auth.currentUser
    

//     const readValue = (e) =>{
//         const {name,value} = e.target ;

       
//         if(name === "returnDate"){
//             let today = new Date();
//             let retDate= new Date(value);
//             let days = diffDays(today,retDate)
//             console.log('diff between days = ',days)
    
//                 let book = books.find((item) => item._id === rent.bookId )
//                 console.log('selected book',book)
//             let totalAmount = days * book.rentCost;
//             console.log('totalAmount = ',totalAmount)
//             setAmount(totalAmount)
//         }
//         setRent({...rent, [name]: value})
//     }
  
//     const readBooks = useCallback(() => {
//         let getBooks = async() =>{
//             const res = await axios.get(`/api/book/all`,{
//                 headers: {
//                     Authorization: token
//                 }
//             })
//             setBooks(res.data.books)
//         }
//         getBooks()
//     },[])

//     const readUsers = useCallback(() =>{
//         let getUsers = async () => {
//             const res = await axios.get(`/api/auth/all/users`,{
//                 headers: {
//                     Authorization: token
//                 }
           
//             })
//             setUsers(res.data.users)
//         }
//         getUsers()
//     },[])

//     const readRent = useCallBack(() => {
//       let getRent = async() => {
//         const res = await axios.get(`/api/rent/single/${params.id}`{
//           headers: {
//             Authorization:token
//           }
          
//         })
//         setRent(res.data.rent)
//         setAmount(res.data.rent.amount)

//       }
//       getRent()
//     })

//     useEffect(() => {
//       readRent()
//         readBooks()
//         readUsers()
//     },[])
//     // update book info
//     const updateBookInfo = async (id) => {
//         let book = books.find(item => item._id === id)
//             if(book.numberOfCopy === 0){
//                 toast.warning(`No more copies are availabel for rent `)
//             } else {
//                 book.numberOfCopy = book.numberOfCopy - 1;
//                 book.rentedCopies = book.rentedCopies + 1;
//                 await axios.patch(`/api/book/update/${id}`,book,{
//                     headers:{
//                         Authorization : token
//                     }
//                 })
//             }
//     }
// const navigate = useNavigate()
//     const submitHandler = async(e) => {
//         e.preventDefault()
//         try {
//             let newRent = {
//                 ...rent,
//                 amount
//             }
//             console.log(newRent)
//         updateBookInfo(rent.bookId)
//             await axios.patch(`/api/rent/update/${params.id}`, newRent,{
//               headers: {Authorization: token}
//             }
//             }).then(res => {
//                 toast.success('New Book Rented successfully')
//                 navigate(`/admin/rented/list`)
//             }).catch(err => toast.error(err.response.data.msg))
//         } catch (err) {
//             toast.error(err.msg)
//         }
//     }
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12 text-center">
//                     <h3 className="display-3 text-success">New Book Rent</h3>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-md-6 offset-md-3">
//                     <div className="card">
//                         <div className="card-body">
//                             <form autoComplete='off' onSubmit={submitHandler}>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="bookId">BookId</label>
//                                     <select name="bookId" id="bookId" className='form-select' value={rent.bookId} onChange={readValue}>
//                                         <option value="null">Choose Book</option>
//                                         {
//                                             books && books.map((item,index) =>{
//                                                 const {_id, title} = item
//                                                 return (
//                                                     <option value={_id} key={index}> {title} </option>
//                                                 )
//                                             })
//                                         }    
//                                     </select>
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="userId"> UserId</label>
//                                     <select name="userId" id="userId" className='form-select' value={rent.userId} onChange={readValue}>
//                                         <option value=""> Choose  user</option>
//                                         {
//                                             users && users.map((item,index) => {
//                                                 const {_id, name} = item
//                                                 return(
//                                                     <option value={_id} key={index}>
//                                                         {name}
//                                                     </option>
//                                                 )
//                                             })
//                                         }
//                                     </select>
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="amount">Amount</label>
//                                     <input type="number" name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className='form-control' required/>
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="returnDate">Return Date</label>
//                                     <input type="datetime-local" name="returnDate" id="returnDate" value={rent.returnDate} onChange={readValue} className='form-control' required/>
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <label htmlFor="paymentStatus">Payment Status</label>
//                                     <select name="paymentStatus" id="paymentStatus" value={rent.paymentStatus} onChange={readValue} required className='form-select'>
//                                         <option value="unpaid">Un-Paid</option>
//                                         <option value="paid">Paid</option>
//                                     </select>
//                                 </div>
//                                 <div className="form-group mt-2">
//                                     <input type="submit" value="rent book" className='btn btn-outline-success' />
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//   )
// }

// export default UpdateRent
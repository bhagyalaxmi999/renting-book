import React, { useCallback, useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GlobalContext  } from '../../../../GlobalContext'



function RentDetails() {
  const [rent,setRent] = useState(false)
  const params = useParams()
  const context = useContext(GlobalContext)
  const [token] = context.auth.token

  const readSingle = async () => {
      try {
          const res = await axios.get(`/api/rent/single/${params.id}`, {
              headers: {
                  Authorization: token
              }
          });
          setRent(res.data.rent)
      } catch (err) {
          toast.error(err.response.data.msg)
      }
  }

  useEffect(() => {
      readSingle()
  },[])


  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-success">Rent Details</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                        <strong>User</strong>
                        <span className="text-warning text-capitalize float-end"> {rent.user? rent.user.name: ''} </span>
                    </li>
                    <li className="list-group-item">
                        <strong>Book</strong>
                        <span className="text-warning float-end"> {rent.book ? rent.book.title : ''} </span>
                    </li>
                    <li className="list-group-item">
                        <strong>Amount</strong>
                        <span className="text-warning float-end"> &#8377; {rent.amount} </span>
                    </li>
                    <li className="list-group-item">
                        <strong>Rent Date</strong>
                        <span className="text-warning float-end"> {new Date(rent.rentDate).toLocaleString()} </span>
                    </li>
                    <li className="list-group-item">
                        <strong>Return Date</strong>
                        <span className="text-warning float-end"> {new Date(rent.returnDate).toLocaleString()} </span>
                    </li>
                    <li className="list-group-item">
                        <strong>Payment Status</strong>
                        <span className="text-warning float-end"> {rent.paymentStatus} </span>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default RentDetails





























// import React, {useCallback, useState, useEffect, useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { GlobalContext  } from '../../../../GlobalContext'



// function RentDetails() {
//   const [rent,setRent] = useState(false)
//     const params = useParams()
//     const context = useContext(GlobalContext)
//     const [token] = context.auth.token

//     const readSingle = async () => {
//         try {
//             const res = await axios.get(`/api/rent/single/${params.id}`, {
//                 headers: {
//                     Authorization: token
//                 }
//             });
//             setRent(res.data.rent)
//         } catch (err) {
//             toast.error(err.response.data.msg)
//         }
//     }

//     useEffect(() => {
//         readSingle()
//     },[])

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12 text-center">
//           <div className="display-3 text-success">Rent Details</div>
//         </div>
//       </div>

//       <div className="row">
//         <div className="col-md-6 offset-md-3">
//           <div className="card">
//             <div className="card-body">
//               <ul className="list-group">
//                 <li className="list-group-item">
//                   <strong>
//                     user
//                   </strong>
//                   <span className="text-warning text-capitalize float-end">{ rent.user? rent.user.name: ''}</span>
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Book</strong>
//                   <span className="text-warning float-end">{rent.book? rent.book.title: ''}</span>
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Amount</strong>
//                   <span className="text-warning float-end">&#8377; {rent.amount}</span>
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Return Date</strong>
//                   <span className="text-warning float-end">{ new Date(rent.rentDate).toLocaleString()}</span>
//                 </li>
//                 <li className="list-group-item">
//                   <strong>Payment Status</strong>
//                   <span className="text-warning float-end">{ rent.paymentStatus}</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RentDetails
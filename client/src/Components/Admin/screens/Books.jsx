import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../../GlobalContext'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

function Books() {
    const context = useContext(GlobalContext)
    const [token] = context.auth.token

    const [books,setBooks] = useState([])

    const readBooks = async () => {
        const res = await axios.get(`/api/book/all`, {
            headers: {
                Authorization: token
            }
        })
        setBooks(res.data.books)
    }

    useEffect(() => {
        readBooks()
    }, [])

    // delete book
    const deleteHandler = async (id) => {
        if(window.confirm(`Are you sure to delete a book info?`)) {
            await axios.delete(`/api/book/delete/${id}`, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                    toast.success(res.data.msg)
                    window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
        }
    }


  if(books.length === 0) {
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-12 text-center">
                    <h5 className="display-5 text-secondary">No Books List</h5>
                </div>
            </div>
        </div>
    )
  }


  return (
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h5 className="display-5 text-success">Books List</h5>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <table className="table table-bordered table-striped table-hover">
                    <thead  className='text-center'>
                        <tr>
                            <th colSpan={6}>
                                <NavLink to={`/admin/book/add`} className="btn btn-success float-end">Add New Book</NavLink>
                            </th>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Author</th>
                            <th>Pages</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books && books.map((item,index) => {
                                const { _id, title, image, author, pages, price } = item
                                return (
                                    <tr className='text-center' key={index}>
                                        <td> {title} </td>
                                        <td>
                                            <img src={image.url ? image.url : '#'} alt="no image" className="img-fluid" width={100} />
                                        </td>
                                        <td> {author} </td>
                                        <td> {pages} </td>
                                        <td> &#8377; {price} </td>
                                        <td>
                                            <NavLink to={`/admin/book/details/${_id}`} className="btn btn-link">Details</NavLink>
                                            <NavLink to={`/admin/book/edit/${_id}`} className="btn btn-link">Edit</NavLink>
                                            <button onClick={() =>deleteHandler(_id)} className="btn btn-link">Delete</button>
                                        </td>
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

export default Books
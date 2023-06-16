import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../../../GlobalContext'

function AddBook() {
    const context = useContext(GlobalContext)
    const [token] = context.auth.token

    const navigate = useNavigate()

    const [book,setBook] = useState({
        title: '',
        desc: '',
        price: 0,
        author: '',
        category: '',
        pages: 0,
        rentCost: 0,
        numberOfCopy: 1,
        isbn: ''
    })
    const readValue = async (e) => {
            const { name, value } = e.target
            setBook({...book, [name]: value })
    }

    const [category,setCategory] = useState([])

    const getCategory = useCallback(() => {
            const readCategory = async () => {
                const res= await axios.get(`/api/category/all`, {
                    headers: {
                        Authorization: token
                    }
                })
                setCategory(res.data.categories)
            }
            readCategory()
    },[])

    useEffect(() => {
        getCategory()
    }, [])

    const subtmitHandler = async (e) => {
        e.preventDefault()
        try {
            // console.log('new book =', book)
            await axios.post(`/api/book/create`, book, {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                toast.success(res.data.msg)
                navigate(`/admin/books/list`)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.msg)
        }
    }


  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">Add new book</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={subtmitHandler}>
                            <div className="form-group mt-2">
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" value={book.title} onChange={readValue} id="title"  className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="desc">Description</label>
                                <textarea name="desc" id="desc" value={book.desc} onChange={readValue} cols="30" rows="5" className="form-control" required></textarea>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="price">Price</label>
                                <input type="number" name="price" id="price" value={book.price} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="author">Author</label>
                                <input type="text" name="author" id="author" value={book.author} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="category">Category</label>
                                <select name="category" id="category" className="form-select" value={book.category} onChange={readValue} >
                                     <option value="null">Choose Category</option>
                                     {
                                        category && category.map((item,index) => {
                                            return (
                                                <optgroup key={index}>
                                                        <option value={item.title}> {item.title} </option>
                                                </optgroup>
                                            )
                                        })
                                     }
                                </select>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="pages">Pages</label>
                                <input type="number" name="pages" id="pages" value={book.pages} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="rentCost">Rent Cost</label>
                                <input type="number" name="rentCost" id="rentCost" value={book.rentCost} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="numberOfCopy">Number of Copy</label>
                                <input type="number" name="numberOfCopy" id="numberOfCopy" value={book.numberOfCopy} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="isbn">ISBN Number</label>
                                <input type="text" name="isbn" id="isbn" value={book.isbn} onChange={readValue} className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Create" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddBook
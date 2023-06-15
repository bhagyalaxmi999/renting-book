import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { GlobalContext } from '../../../GlobalContext'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'


function Category() {
  const context = useContext(GlobalContext)
    const [token] = context.auth.token

    const [categories,setCategories] = useState([])

    const readCategories = async () => {
        const res = await axios.get(`/api/category/all`, {
            headers: {
                Authorization: token
            }
        })
        setCategories(res.data.categories)
    }

    useEffect(() => {
        readCategories()
    }, [])


    // delete handler
    const deleteHandler = async (id) => {
      if(window.confirm(`Do you want to delete category?`)) {
          await axios.delete(`/api/category/delete/${id}`, {
            headers: {
              Authorization: token
            }
          }).then(res => {
            toast.success(res.data.msg)
            window.location.reload()
          }).catch(err => toast.error(err.response.data.msg))
      }
    }



  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                <h5 className="display-5 text-success">Category List</h5>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <table className="table table-bordered table-striped table-hovered text-center">
                    <thead>
                      <tr>
                        <th colSpan={4}>
                          <NavLink to={`/admin/category/add`} className="btn btn-success float-end">Add new</NavLink>
                        </th>
                      </tr>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>IsActive</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            categories && categories.map((item,index) => {
                              return (
                                <tr className="text-center">
                                  <td> { item.title } </td>
                                  <td> { item.desc } </td>
                                  <td> { item.isActive ? "Active": "In Active"} </td>
                                  <td>
                                      <NavLink to={`/admin/category/edit/${item._id}`} className="btn btn-info btn-sm">
                                          <i className="bi bi-pencil"></i>
                                      </NavLink>
                                      <button onClick={() => deleteHandler(item._id)} className="btn btn-danger btn-sm float-end">
                                          <i className="bi bi-trash"></i>
                                      </button>
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

export default Category

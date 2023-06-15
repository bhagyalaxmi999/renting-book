import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div className='container-fluid bg-dark text-center '>
        <div className="row">
            <div className="col-md-12">
                <p className="text-light">
                    <strong>&copy;</strong>
                    <NavLink className="btn btn-link" >Bookrent.com</NavLink>-2023| &nbsp;
                    <strong>All Rights Reserved</strong>                   
                </p>
            </div>
        </div>
      
    </div>
  )
}

export default Footer

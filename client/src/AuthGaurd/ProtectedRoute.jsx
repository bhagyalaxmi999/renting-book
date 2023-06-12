import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'


function ProtectedRoute() {
    let loginStatus = new Boolean(localStorage.getItem("loginStatus")) || false
 
    return (
        <React.Fragment>
            {
                loginStatus ? <Outlet/> : <Navigate to ={ '/login'}/>
            }
        
        </React.Fragment>
  )
}

export default ProtectedRoute

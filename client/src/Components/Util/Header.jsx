import React from 'react'

function Header() {
  return (
    <header className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container justify-content-between">
            <div>
                <i className="bi bi-phone text-light"></i>
                <span className="text-light">&nbsp;</span>
                <strong className="text-warning">+91-9988665544</strong> &nbsp;
                <i className="bi bi-envelope text-light"></i>
                <span className="text-light">&nbsp;</span>
                <strong className="text-warning">support@bookrent.com</strong> &nbsp;
            </div>
            <div>
                <strong className="text-warning">Follow Us</strong> &nbsp;
                <i className="bi bi-facebook text-light"></i> &nbsp;
                <i className="bi bi-twitter text-light"></i> &nbsp;
                <i className="bi bi-instagram text-light"></i> &nbsp;
                <i className="bi bi-google text-light"></i>
            </div>
        </div>
    </header>
  )
}

export default Header
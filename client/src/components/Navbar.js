import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let history = useNavigate();
  let userName = localStorage.getItem('username')?localStorage.getItem('username'):'';
  let displayName = userName.charAt(0).toUpperCase() + userName.slice(1);
  
  const handleLogout = ()=>{    
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    history("/login");
  }
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/blog"?"active":""}`} aria-current="page" to="/blog">
                Blog
              </Link>
            </li>            
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/contact"?"active":""}`} aria-current="page" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>         
          { displayName ? <span className="user text-white mx-2"><i className="fa fa-user"></i> {displayName}</span> : ''}
          { localStorage.getItem('token')?<button className="btn btn-primary" onClick={handleLogout}>Logout</button>:<div className="d-flext">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

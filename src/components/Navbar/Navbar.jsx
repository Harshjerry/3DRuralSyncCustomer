import React from 'react';
import { Link, useNavigate } from "react-router-dom";// Import Link
import './Navbar.css';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/UserRedux';

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Reloads the page after logout
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/services" className="nav-item">Services</Link>
        <a href="#about" className="nav-item">About</a>
      </div>
      <div className="navbar-right">
        {currentUser && currentUser.data ? (
          <>
            <a className="nav-item" onClick={handleLogout}>Logout</a>
            <Link to="/profile" className="nav-item">Welcome, {currentUser.data.name}</Link>
          </>
        ) : (
          <>
            <Link to="/register3d" className="nav-item">Register</Link>
            <Link to="/login3d" className="nav-item">Login</Link>
          </>
        )}
        <Link to="/cart" className="nav-item">Cart</Link>
      </div>
    </div>
  );
};

export default Navbar;

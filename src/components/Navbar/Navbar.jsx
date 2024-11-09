import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useSelector } from 'react-redux'; // Import useSelector
import './Navbar.css';

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser); // Get the current user from Redux state

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-item">Home</Link>
        <Link to="/services" className="nav-item">Services</Link>
        <a href="#about" className="nav-item">About</a>
      </div>
      <div className="navbar-right">
        {currentUser && currentUser.data ? ( // Check if currentUser and its data exist
          <Link to="/profile" className="nav-item">Welcome, {currentUser.data.name}</Link> // Display welcome message if user exists
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

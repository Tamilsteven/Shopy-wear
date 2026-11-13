import React, { useState } from 'react';
import { ShoppingCartIcon, AccountCircleOutlinedIcon } from './icons';
import img4 from "../assets/Images/shopping-bags.png";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const CartItems = useSelector((state) => state.cart.CartItems || []);
  const cartCount = CartItems.reduce((acc, item) => acc + (item.cartQuantity || 1), 0);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "white" }}>
        <div className="container nav-container">
          <Link to="/" className='navbar-brand' onClick={closeNavbar}>
            <img src={img4} className='bag' alt='bag' />
            <span className="brand-text">Trenz-Clothing</span>
            <p className='slogan'>Men &amp; Women</p>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarSupportedContent"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-list">
              <li className="nav-item-single">
                <Link className="nav-link" aria-current="page" to="/" onClick={closeNavbar}>Home</Link>
              </li>
              <li className="nav-item-single">
                <Link className="nav-link" to="/Shopitem" onClick={closeNavbar}>Shop</Link>
              </li>
              <li className="nav-item-single">
                <Link className="nav-link" to="/contact" onClick={closeNavbar}>Contact</Link>
              </li>
              <li className="nav-item-single">
                <Link className="nav-link" to="/login" onClick={closeNavbar} title="Account">
                  <AccountCircleOutlinedIcon />
                </Link>
              </li>
              <li className="nav-item-single">
                <Link className="nav-link cart-link d-flex align-items-center" to="/Cart" onClick={closeNavbar}>
                  <ShoppingCartIcon />
                  <span className="cart-badge">{cartCount}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

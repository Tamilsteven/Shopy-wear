import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Login from './components/form/Login';
import Cart from './components/Cart';
import Notfound from './components/Notfound';
import Shopitem from './components/Product/Shopitem';
import Signup from './components/form/Signup';
import Checkout from './components/form/Checkout';
import { InstagramIcon, FacebookIcon, WhatsAppIcon, TwitterIcon } from './components/icons';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const App = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <header className={`headerMain ${scroll ? "sticky" : ""}`}>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/Shopitem' element={<Shopitem />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/*' element={<Notfound />} />
        </Routes>
      </main>
      <footer>
        <div className="foot">
          <div className='content'>
            <div>
              <h3>TAPO TREND</h3>
              <p>The best look anytime, anywhere.</p>
              <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <InstagramIcon sx={{ fontSize: "20px" }} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FacebookIcon sx={{ fontSize: "20px" }} />
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <WhatsAppIcon sx={{ fontSize: "20px" }} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
                  <TwitterIcon sx={{ fontSize: "20px" }} />
                </a>
              </div>
            </div>

            <ul>
              <h3>Men</h3>
              <li><Link to="/Shopitem">Men Jeans</Link></li>
              <li><Link to="/Shopitem">Men Shirt</Link></li>
              <li><Link to="/Shopitem">Men Shoes</Link></li>
              <li><Link to="/Shopitem">Men Jackets</Link></li>
            </ul>

            <ul>
              <h3>Women</h3>
              <li><Link to="/Shopitem">Women Jeans</Link></li>
              <li><Link to="/Shopitem">Women Shirt</Link></li>
              <li><Link to="/Shopitem">Heels And Flats</Link></li>
              <li><Link to="/Shopitem">Women Jackets</Link></li>
            </ul>

            <div className='subscribe'>
              <h3>Subscribe</h3>
              <input className='sub' type='email' id='email' placeholder='Your email address' />
              <button type='button' className='subs'>Subscribe</button>
            </div>
          </div>
          <span id='copy'>&copy; All Rights Reserved 2023-2024. Tapo Trend.</span>
        </div>
      </footer>
    </Router>
  );
};

export default App;

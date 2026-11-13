import React, { useState } from 'react';
import "../styles/home.css";
import img1 from "../assets/Images/pexels2.jpg";
import { LocalShippingIcon, DeliveryDiningIcon, VerifiedIcon } from './icons';
import data from '../data/latest';
import { Link } from 'react-router-dom';

const Home = () => {
  const [list] = useState(data);

  return (
    <>
      <section className='section hero-section'>
        <img src={img1} alt='Fashion collection' className='imgs' />
        <div className='shop'>
          <h1>Summer <br /> Collection!</h1>
          <p className='paras'>25% Off On All Products</p>
          <Link to="/Shopitem">
            <button type='button' className='btn btn-light hero-shop-btn'>SHOP IT NOW →</button>
          </Link>
        </div>
      </section>

      <section className='section1'>
        <h2>Why Shop With Us</h2>
        <div className="service">
          <div className="card">
            <div className="card-body">
              <span className="card-title"><DeliveryDiningIcon sx={{ fontSize: 60 }} /></span>
              <h4 className="card-subtitle">Fast Delivery</h4>
              <p className="card-text">Quick and reliable delivery straight to your doorstep within 2-4 business days.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <span className="card-title"><LocalShippingIcon sx={{ fontSize: 60 }} /></span>
              <h4 className="card-subtitle">Free Shipping</h4>
              <p className="card-text">Enjoy free delivery on all orders above Rs. 999 across the entire country.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <span className="card-title"><VerifiedIcon sx={{ fontSize: 60 }} /></span>
              <h4 className="card-subtitle">Best Quality</h4>
              <p className="card-text">100% authentic top brands with premium fabrics and unmatched durability.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='section2'>
        <div className="latest">
          <h3>Latest Sale</h3>
        </div>
        <div className="group">
          {list.map((item, index) => {
            return (
              <div className="gallery" key={item.id || index}>
                <div>
                  <img src={item.img} className='photos' alt={item.title} />
                  <div className="title">
                    <p className='price'>{item.para}</p>
                    <h5>{item.title}</h5>
                    <Link to="/Shopitem">
                      <button type='button' className='product-btn'>Shop Now</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className='section3'></section>
    </>
  );
};

export default Home;

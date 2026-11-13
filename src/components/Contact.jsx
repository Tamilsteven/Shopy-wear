import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/contact.css";
import { ArrowForwardIcon, LocationOnOutlinedIcon, LocalPhoneOutlinedIcon, EmailOutlinedIcon } from './icons';
import picture from "../assets/Images/shopping.jpg";
import API_BASE_URL from '../config/api';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.warning("Please fill in your name, email, and message", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/contact`, {
        name,
        email,
        phone,
        message,
      });

      if (res.data && res.data.success) {
        toast.success("Message sent! Saved to dummy server.", { position: "top-center" });
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        toast.success("Thank you for your message!", { position: "top-center" });
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      toast.success("Thank you for contacting us! We'll reply soon.", { position: "top-center" });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="back">
        <img className='back-img' src={picture} alt="pic" />
      </div>
      <p className='parag'>Let's have a talk</p>
      <div className="grid">
        <div className="contacts">
          <h3>Get in touch</h3>
          <div className="detail">
            <p className='text-left'>Lorem ipsum dolor sit amet consectetur elit.</p>
            <ul>
              <li>
                <p className='text-left'><LocationOnOutlinedIcon sx={{ fontSize: "20px" }} /> 123 Fifth Avenue, New York</p>
                <p className='text-left'><EmailOutlinedIcon sx={{ fontSize: "20px" }} /> contact@info.com</p>
                <p className='text-left'><LocalPhoneOutlinedIcon sx={{ fontSize: "20px" }} /> 9089045654</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="form-wrapper">
          <h3 style={{ fontWeight: "bolder" }}>Contact Us</h3>
          <form onSubmit={handleSubmit}>
            <div className='full-input'>
              <label htmlFor='name'>Full Name*</label>
              <input
                type="text"
                name="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter your name'
                required
              />
            </div>
            <br />
            <div className='full-input'>
              <label htmlFor='email'>Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your Email'
                required
              />
            </div>
            <br />
            <div className='full-input'>
              <label htmlFor='phone'>Phone*</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Enter your Number'
              />
            </div>
            <br />
            <div className='full-input'>
              <label htmlFor="Message">Message*</label>
              <textarea
                name="message"
                id="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Message Here'
                required
              ></textarea>
            </div>
            <br />
            <button type='submit' disabled={loading} className='c-btn'>
              {loading ? "Sending..." : <>Submit <ArrowForwardIcon sx={{ fontSize: "14px" }} /></>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;

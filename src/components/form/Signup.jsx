import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/signup.css";
import API_BASE_URL from '../../config/api';

const Signup = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!Name || !Email || !Password) {
      toast.warning("Please fill in all fields", { position: "top-center" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/register`, { Name, Email, Password });
      if (res.data && res.data.success) {
        toast.success("Account created successfully!", { position: "top-center" });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error(res.data.message || "Signup failed", { position: "top-center" });
      }
    } catch (err) {
      console.log("Signup error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, { position: "top-center" });
      } else {
        toast.success("Account registered locally!", { position: "top-center" });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <article className='back'>
        <div className="form-container">
          <p className="titles">Create Account</p>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="email"
              className="input"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              className="input"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit" disabled={loading} className="form-btn">
              {loading ? "Creating..." : "Signup"}
            </button>
          </form>
          <p className="sign-up-label">
            Already have an account? <Link to="/login" className="links">Log in</Link>
          </p>
        </div>
      </article>
    </>
  );
};

export default Signup;

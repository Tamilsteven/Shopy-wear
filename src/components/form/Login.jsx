import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/login.css";
import API_BASE_URL from '../../config/api';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [loginstatus, setloginstatus] = useState('');
  const [loginholder, setloginholder] = useState('message');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!Email || !Password) {
      setloginstatus("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/login`, { Email, Password });
      if (res.data && res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login successful!", { position: "top-center" });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setloginstatus("Credentials don't exist");
      }
    } catch (err) {
      console.log("Login check:", err);
      // If server returned 401 or not found
      if (err.response && err.response.data && err.response.data.message) {
        setloginstatus(err.response.data.message);
      } else {
        // Fallback for offline demo
        localStorage.setItem("user", JSON.stringify({ Email, Name: Email.split('@')[0] }));
        toast.info("Logged in as guest demo", { position: "top-center" });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginstatus !== "") {
      setloginholder('show-message');
      const timer = setTimeout(() => {
        setloginholder('message');
        setloginstatus("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginstatus]);

  return (
    <>
      <ToastContainer />
      <article className='back'>
        <div className="form-container">
          <p className="titles">Welcome back</p>
          {loginstatus && <span className={loginholder}>{loginstatus}</span>}
          <form className="form" onSubmit={handleLogin}>
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
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <p className="sign-up-label">
            Don't have an account? <Link to="/signup" className="links">Register</Link>
          </p>
        </div>
      </article>
    </>
  );
};

export default Login;

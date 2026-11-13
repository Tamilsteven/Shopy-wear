import React from 'react';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <div style={{ textAlign: "center", padding: "6rem 1rem", minHeight: "50vh" }}>
      <h2 style={{ fontSize: "3.5rem", fontWeight: "bold" }}>404</h2>
      <p style={{ fontSize: "1.2rem", color: "#666", marginBottom: "1.5rem" }}>Page Not Found</p>
      <Link to="/" className="btn btn-dark" style={{ width: "auto", padding: "0.5rem 1.5rem" }}>
        Back to Home
      </Link>
    </div>
  );
};

export default Notfound;

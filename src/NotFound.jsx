import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      background: "linear-gradient(135deg, #000000, #434343)",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "8vw",
          margin: "0",
          fontWeight: "bold",
          lineHeight: "1",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "4vw",
          margin: "10px 0",
          fontWeight: "500",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          maxWidth: "600px",
          fontSize: "1.2rem",
          marginBottom: "20px",
        }}
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/dashboard"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#000000ff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "600",
          transition: "0.3s ease",
        }}
      >
        Go Back Dashboard
      </Link>
    </div>
  );
};

export default NotFound;

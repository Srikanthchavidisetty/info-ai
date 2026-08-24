import React, { useState } from "react";
import "./Auth.css";

function Login({ onLogin, onSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("infoAIUser")
    );

    if (!savedUser) {
      setError("No account found. Please sign up first.");
      return;
    }

    if (
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem("infoAILoggedIn", "true");
      onLogin(savedUser);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <span>i</span>
        </div>

        <h1>INFO-AI</h1>

        <p className="auth-subtitle">
          Login to your College AI Assistant
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?
          <button onClick={onSignup}>
            Sign Up
          </button>
        </p>

      </div>

    </div>
  );
}

export default Login;
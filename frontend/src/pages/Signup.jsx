import React, { useState } from "react";
import "./Auth.css";

function Signup({ onSignup, onLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUser = localStorage.getItem("infoAIUser");

    if (existingUser) {
      setError(
        "An account already exists. Please login."
      );
      return;
    }

    const user = {
      name,
      email,
      password
    };

    localStorage.setItem(
      "infoAIUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "infoAILoggedIn",
      "true"
    );

    onSignup(user);
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          <span>i</span>
        </div>

        <h1>INFO-AI</h1>

        <p className="auth-subtitle">
          Create your College AI account
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?

          <button onClick={onLogin}>
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Signup;
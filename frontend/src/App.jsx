import React, { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const [page, setPage] = useState(() => {

    const loggedIn =
      localStorage.getItem("infoAILoggedIn");

    return loggedIn === "true"
      ? "home"
      : "login";
  });

  const handleLogin = (user) => {
    localStorage.setItem(
      "infoAILoggedIn",
      "true"
    );

    localStorage.setItem(
      "infoAIUser",
      JSON.stringify(user)
    );

    setPage("home");
  };

  const handleSignup = (user) => {
    localStorage.setItem(
      "infoAILoggedIn",
      "true"
    );

    localStorage.setItem(
      "infoAIUser",
      JSON.stringify(user)
    );

    setPage("home");
  };

  const handleLogout = () => {

    localStorage.removeItem(
      "infoAILoggedIn"
    );

    setPage("login");
  };


  if (page === "login") {

    return (
      <Login
        onLogin={handleLogin}
        onSignup={() => setPage("signup")}
      />
    );

  }


  if (page === "signup") {

    return (
      <Signup
        onSignup={handleSignup}
        onLogin={() => setPage("login")}
      />
    );

  }


  return (
    <Home
      onLogout={handleLogout}
    />
  );
}

export default App;
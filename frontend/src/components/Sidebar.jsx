import React from "react";
import "./Sidebar.css";

function Sidebar({ onNewChat, onLogout }) {

  return (
    <aside className="sidebar">

      {/* LOGO */}

      <div className="sidebar-header">

        <h2>

          <span className="sidebar-info-logo">
            i
          </span>

          INFO-AI

        </h2>

      </div>


      {/* NEW CHAT */}

      <button
        className="new-chat-button"
        onClick={onNewChat}
      >
        + New Chat
      </button>


      {/* HISTORY */}

      <div className="chat-history">

        <p className="history-title">
          Today
        </p>

        <button className="history-item">
          Java Questions
        </button>

        <button className="history-item">
          Machine Learning
        </button>

        <button className="history-item">
          Python Basics
        </button>

      </div>


      {/* BOTTOM */}

      <div className="sidebar-bottom">

        <button className="sidebar-option">
          ⚙ Settings
        </button>

        <button className="sidebar-option">
          👤 Account
        </button>

        <button
          className="sidebar-option"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
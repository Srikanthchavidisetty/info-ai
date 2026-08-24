import React from "react";
import "./Sidebar.css";

function Sidebar({ onNewChat, onLogout }) {
  return (
    <aside className="sidebar">

      {/* =========================
          LOGO
      ========================= */}

      <div className="sidebar-header">
        <h2>
          <span className="sidebar-info-logo">i</span>
          <span className="sidebar-title">INFO-AI</span>
        </h2>
      </div>


      {/* =========================
          NEW CHAT
      ========================= */}

      <button
        className="new-chat-button"
        onClick={onNewChat}
      >
        <span className="new-chat-icon">＋</span>
        <span className="new-chat-text">New Chat</span>
      </button>


      {/* =========================
          CHAT HISTORY
      ========================= */}

      <div className="chat-history">

        <p className="history-title">
          Today
        </p>

        <button className="history-item">
          <span>💬</span>
          <span>Java Questions</span>
        </button>

        <button className="history-item">
          <span>💬</span>
          <span>Machine Learning</span>
        </button>

        <button className="history-item">
          <span>💬</span>
          <span>Python Basics</span>
        </button>

      </div>


      {/* =========================
          BOTTOM OPTIONS
      ========================= */}

      <div className="sidebar-bottom">

        <button className="sidebar-option">
          <span>⚙️</span>
          <span className="sidebar-option-text">
            Settings
          </span>
        </button>

        <button className="sidebar-option">
          <span>👤</span>
          <span className="sidebar-option-text">
            Account
          </span>
        </button>

        <button
          className="sidebar-option logout-button"
          onClick={onLogout}
        >
          <span>↪</span>
          <span className="sidebar-option-text">
            Logout
          </span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
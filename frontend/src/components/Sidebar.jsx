import React from "react";
import "./Sidebar.css";

function Sidebar({ onNewChat, onLogout, chatHistory = [], onSelectChat }) {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-header">
        <h2>
          <span className="sidebar-info-logo">i</span>
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

      {/* RECENT CHATS */}
      <div className="chat-history">

        <p className="history-title">
          Recent Chats
        </p>

        {chatHistory.length === 0 ? (
          <p className="no-chats">
            No recent chats
          </p>
        ) : (
          chatHistory.map((chat, index) => (
            <button
              key={index}
              className="history-item"
              onClick={() => onSelectChat(chat)}
              title={chat.question}
            >
              <span className="chat-icon">💬</span>

              <span className="chat-title">
                {chat.question}
              </span>
            </button>
          ))
        )}

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
          ↪ Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
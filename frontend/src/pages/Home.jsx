import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import "./Home.css";

function Home({ onLogout }) {

  // ==============================
  // RECENT CHAT HISTORY
  // ==============================

  const [chatHistory, setChatHistory] = useState([]);

  // ==============================
  // NEW CHAT
  // ==============================

  const handleNewChat = () => {
    // Tell ChatBox to start a new chat
    window.dispatchEvent(
      new Event("new-chat")
    );
  };

  // ==============================
  // ADD CHAT TO HISTORY
  // ==============================

  const handleChatSaved = (chat) => {

    if (!chat || !chat.question) {
      return;
    }

    setChatHistory((previous) => {

      // Remove duplicate question
      const filtered = previous.filter(
        (item) =>
          item.question !== chat.question
      );

      // Put newest chat at top
      return [
        chat,
        ...filtered,
      ];
    });
  };

  // ==============================
  // SELECT OLD CHAT
  // ==============================

  const handleSelectChat = (chat) => {

    window.dispatchEvent(
      new CustomEvent("select-chat", {
        detail: chat,
      })
    );
  };

  return (
    <div className="home">

      {/* ==============================
          SIDEBAR
      ============================== */}

      <Sidebar
        onNewChat={handleNewChat}
        onLogout={onLogout}
        chatHistory={chatHistory}
        onSelectChat={handleSelectChat}
      />


      {/* ==============================
          MAIN CONTENT
      ============================== */}

      <main className="main-content">

        {/* HEADER */}

        <header className="top-header">

          

        </header>


        {/* ==============================
            WELCOME
        ============================== */}

        <section className="welcome-section">

          <h2>
            How can I help you today?
          </h2>

          <p>
            Ask questions, upload files, or upload images.
          </p>

        </section>


        {/* ==============================
            CHAT BOX
        ============================== */}

        <ChatBox
          onChatSaved={handleChatSaved}
        />

      </main>

    </div>
  );
}

export default Home;
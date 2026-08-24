import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

import "./Home.css";

function Home({ onLogout }) {

  const [chatKey, setChatKey] = useState(0);

  const handleNewChat = () => {

    setChatKey(
      (previousKey) => previousKey + 1
    );

  };

  return (
    <div className="app-layout">

      <Sidebar
        onNewChat={handleNewChat}
        onLogout={onLogout}
      />

      <main className="main-content">

       


        <div className="welcome">

          <h2>
            How can I help you today?
          </h2>

          <p>
            Ask questions, upload files, or upload images.
          </p>

        </div>


        <ChatBox key={chatKey} />

      </main>

    </div>
  );
}

export default Home;
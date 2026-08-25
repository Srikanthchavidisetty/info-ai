import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import FileUpload from "./FileUpload";
import "./ChatBox.css";

function ChatBox({ onChatSaved }) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // ==============================
  // NEW CHAT
  // ==============================

  useEffect(() => {

    const handleNewChat = () => {
      setQuestion("");
      setAnswer("");
      setSelectedFile(null);
    };

    window.addEventListener(
      "new-chat",
      handleNewChat
    );

    return () => {
      window.removeEventListener(
        "new-chat",
        handleNewChat
      );
    };

  }, []);


  // ==============================
  // SELECT OLD CHAT
  // ==============================

  useEffect(() => {

    const handleSelectChat = (event) => {

      const chat = event.detail;

      if (!chat) {
        return;
      }

      setQuestion(chat.question || "");
      setAnswer(chat.answer || "");
      setSelectedFile(null);

    };

    window.addEventListener(
      "select-chat",
      handleSelectChat
    );

    return () => {
      window.removeEventListener(
        "select-chat",
        handleSelectChat
      );
    };

  }, []);


  // ==============================
  // FILE SELECT
  // ==============================

  const handleFileSelect = (file) => {

    console.log(
      "Selected file:",
      file
    );

    setSelectedFile(file);
  };


  // ==============================
  // REMOVE FILE
  // ==============================

  const removeFile = () => {
    setSelectedFile(null);
  };


  // ==============================
  // SEND QUESTION
  // ==============================

  const sendQuestion = async () => {

    if (
      !question.trim() &&
      !selectedFile
    ) {
      return;
    }

    setLoading(true);
    setAnswer("");

    try {

      let response;


      // =====================================
      // FILE / IMAGE REQUEST
      // =====================================

      if (selectedFile) {

        const formData = new FormData();

        formData.append(
          "question",
          question
        );

        formData.append(
          "file",
          selectedFile
        );

        console.log(
          "Sending file:",
          selectedFile.name
        );

        console.log(
          "Sending question:",
          question
        );


        response = await fetch(
          "https://info-ai-br52.onrender.com/api/chat/file",
          {
            method: "POST",
            body: formData,
          }
        );

      }


      // =====================================
      // NORMAL TEXT REQUEST
      // =====================================

      else {

        response = await fetch(
          "https://info-ai-br52.onrender.com/api/chat/",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              question: question,
            }),
          }
        );

      }


      console.log(
        "Response status:",
        response.status
      );


      // =====================================
      // READ RESPONSE
      // =====================================

      const responseText =
        await response.text();


      console.log(
        "Response from backend:",
        responseText
      );


      if (!response.ok) {

        throw new Error(
          `Backend error ${response.status}: ${responseText}`
        );

      }


      const data =
        JSON.parse(responseText);


      // =====================================
      // SHOW ANSWER
      // =====================================

      setAnswer(
        data.answer
      );


      // =====================================
      // SAVE TO RECENT CHATS
      // =====================================

      if (onChatSaved) {

        onChatSaved({
          question: question,
          answer: data.answer,
        });

      }


      // =====================================
      // CLEAR FILE
      // =====================================

      if (selectedFile) {
        setSelectedFile(null);
      }

    }


    // =====================================
    // ERROR
    // =====================================

    catch (error) {

      console.error(
        "FULL ERROR:",
        error
      );

      setAnswer(
        `Error: ${error.message}`
      );

    }


    // =====================================
    // FINISH
    // =====================================

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="chat-container">


      {/* ==============================
          INPUT
      ============================== */}

      <div className="input-area">

        <FileUpload
          onFileSelect={
            handleFileSelect
          }
        />


        <input
          type="text"

          value={question}

          onChange={(event) =>
            setQuestion(
              event.target.value
            )
          }

          onKeyDown={(event) => {

            if (
              event.key === "Enter" &&
              !event.shiftKey
            ) {

              event.preventDefault();

              sendQuestion();

            }

          }}

          placeholder="Ask anything..."
        />


        <button
          className="send-button"

          onClick={
            sendQuestion
          }

          disabled={loading}
        >

          {loading
            ? "Thinking..."
            : "Send"}

        </button>

      </div>


      {/* ==============================
          SELECTED FILE
      ============================== */}

      {selectedFile && (

        <div className="selected-file">

          <span className="file-icon">

            {selectedFile.type.startsWith(
              "image/"
            )
              ? "🖼️"
              : "📄"}

          </span>


          <span className="file-name">

            {selectedFile.name}

          </span>


          <button
            className="remove-file"

            onClick={
              removeFile
            }
          >
            ×
          </button>

        </div>

      )}


      {/* ==============================
          LOADING
      ============================== */}

      {loading && (

        <div className="loading">

          🤔 AI is thinking...

        </div>

      )}


      {/* ==============================
          ANSWER
      ============================== */}

      {answer && !loading && (

        <div className="answer-box">

          <h2>
            AI Answer
          </h2>


          <div className="answer-content">

            <ReactMarkdown>
              {answer}
            </ReactMarkdown>

          </div>

        </div>

      )}

    </div>

  );

}

export default ChatBox;
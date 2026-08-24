import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import FileUpload from "./FileUpload";
import "./ChatBox.css";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    console.log("Selected file:", file);
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const sendQuestion = async () => {
    if (!question.trim() && !selectedFile) {
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

        formData.append("question", question);
        formData.append("file", selectedFile);

        console.log("Sending file:", selectedFile.name);
        console.log("Sending question:", question);

        response = await fetch(
          "http://127.0.0.1:8000/api/chat/file",
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
          "http://127.0.0.1:8000/api/chat/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question: question,
            }),
          }
        );
      }

      console.log("Response status:", response.status);

      // Get response as text first
      const responseText = await response.text();

      console.log("Response from backend:", responseText);

      if (!response.ok) {
        throw new Error(
          `Backend error ${response.status}: ${responseText}`
        );
      }

      const data = JSON.parse(responseText);

      setAnswer(data.answer);

      // Clear selected file after successful upload
      if (selectedFile) {
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("FULL ERROR:", error);

      setAnswer(
        `Error: ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">

      {/* INPUT */}

      <div className="input-area">

        <FileUpload
          onFileSelect={handleFileSelect}
        />

        <input
          type="text"
          value={question}
          onChange={(event) =>
            setQuestion(event.target.value)
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
          onClick={sendQuestion}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>

      </div>


      {/* SELECTED FILE */}

      {selectedFile && (
        <div className="selected-file">

          <span className="file-icon">
            {selectedFile.type.startsWith("image/")
              ? "🖼️"
              : "📄"}
          </span>

          <span className="file-name">
            {selectedFile.name}
          </span>

          <button
            className="remove-file"
            onClick={removeFile}
          >
            ×
          </button>

        </div>
      )}


      {/* LOADING */}

      {loading && (
        <div className="loading">
        🤔 AI is thinking...
        </div>
      )}


      {/* ANSWER */}

      {answer && !loading && (
        <div className="answer-box">

          <h2>AI Answer</h2>

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
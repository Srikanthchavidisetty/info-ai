import React, { useRef } from "react";

function FileUpload({ onFileSelect }) {

  const fileInputRef = useRef(null);


  const handleFileChange = (event) => {

    const file = event.target.files[0];

    if (file) {
      onFileSelect(file);
    }
  };


  return (
    <>
      <input
        ref={fileInputRef}

        type="file"

        onChange={handleFileChange}

        accept="
          .pdf,
          .txt,
          .csv,
          .jpg,
          .jpeg,
          .png,
          .webp,
          .gif
        "

        style={{
          display: "none"
        }}
      />

      <button
        type="button"

        className="upload-button"

        onClick={() =>
          fileInputRef.current.click()
        }
      >

        📎

      </button>
    </>
  );
}

export default FileUpload;
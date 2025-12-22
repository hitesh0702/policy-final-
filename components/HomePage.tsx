
import { useAuth } from "../lib/useAuth";

import React, { useState } from "react";

export const FileUpload = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) setFileName(file.name);
      }}
      style={{
        display: "block",
        padding: "18px",
        borderRadius: 14,
        border: dragging ? "2px solid #000" : "1px dashed #ccc",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        cursor: "pointer",
        textAlign: "center",
        fontSize: 14,
      }}
    >
      <input
        type="file"
        hidden
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
          }
        }}
      />
      {fileName ? (
        <strong>{fileName}</strong>
      ) : (
        <>
          <strong>Drop privacy policy here</strong>
          <div style={{ opacity: 0.6, marginTop: 6 }}>
            or click to choose file
          </div>
        </>
      )}
    </label>
  );
};

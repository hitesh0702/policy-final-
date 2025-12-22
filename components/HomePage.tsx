
import { useAuth } from "../lib/useAuth";

import React, { useState } from "react";

/* ---------- Reusable Tab Button ---------- */
const Tab = ({ active, label, onClick }: any) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 18px",
      borderRadius: 999,
      border: "none",
      background: active ? "#000" : "transparent",
      color: active ? "#fff" : "#000",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}
  >
    {label}
  </button>
);

/* ---------- File Upload ---------- */
const FileUpload = () => {
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
        padding: 22,
        borderRadius: 16,
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

/* ---------- Main Page ---------- */
const HomePage: React.FC = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");
  const [text, setText] = useState("");

  return (
    <>
      {/* Background */}
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, #f5f5f7 0%, #eaeaec 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Glass Card */}
        <div
          style={{
            width: 440,
            padding: 34,
            borderRadius: 26,
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(28px)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.12)",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 6 }}>
            Privacy <span style={{ opacity: 0.4 }}>decoded</span>
          </h2>
          <p style={{ opacity: 0.7, marginBottom: 26 }}>
            Understand complex privacy policies in seconds.
          </p>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: 6,
              background: "#eee",
              borderRadius: 999,
              marginBottom: 22,
              justifyContent: "center",
            }}
          >
            <Tab
              label="Link"
              active={mode === "link"}
              onClick={() => setMode("link")}
            />
            <Tab
              label="File"
              active={mode === "file"}
              onClick={() => setMode("file")}
            />
            <Tab
              label="Text"
              active={mode === "text"}
              onClick={() => setMode("text")}
            />
          </div>

          {/* Inputs */}
          {mode === "link" && (
            <input
              placeholder="https://example.com/privacy"
              style={{
                width: "100%",
                padding: 14,
                borderRadius: 12,
                border: "1px solid #ccc",
                fontSize: 14,
                marginBottom: 20,
              }}
            />
          )}

          {mode === "file" && (
            <div style={{ marginBottom: 20 }}>
              <FileUpload />
            </div>
          )}

          {mode === "text" && (
            <textarea
              placeholder="Paste privacy policy text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: "100%",
                height: 140,
                padding: 14,
                borderRadius: 14,
                border: "1px solid #ccc",
                fontSize: 14,
                resize: "none",
                marginBottom: 20,
              }}
            />
          )}

          {/* CTA */}
          <button
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 999,
              border: "none",
              background: "#000",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Start Audit
          </button>

          <div style={{ marginTop: 14, fontSize: 12, opacity: 0.6 }}>
            Free plan · Limited scans
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Upgrade to Pro
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: 18,
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          opacity: 0.5,
        }}
      >
        © 2025 PolicyPulse · Privacy · Terms · Contact
      </footer>
    </>
  );
};

export default HomePage;

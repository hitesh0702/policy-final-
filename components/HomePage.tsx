
import { useAuth } from "../lib/useAuth";

import React, { useState } from "react";

const tabBtn = (active: boolean): React.CSSProperties => ({
  padding: "10px 18px",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  background: active ? "#000" : "transparent",
  color: active ? "#fff" : "#555",
});

const HomePage: React.FC = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
  style={{
    height: "100vh",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, #f5f5f7 0%, #e9e9ec 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
      {/* CARD */}
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: 40,
          borderRadius: 28,
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 26, marginBottom: 6 }}>
          Privacy <span style={{ opacity: 0.4 }}>decoded</span>
        </h1>

        <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 26 }}>
          Understand complex privacy policies in seconds.
        </p>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginBottom: 22,
            background: "#ededf0",
            padding: 6,
            borderRadius: 999,
          }}
        >
          <button style={tabBtn(mode === "link")} onClick={() => setMode("link")}>
            Link
          </button>
          <button style={tabBtn(mode === "file")} onClick={() => setMode("file")}>
            File
          </button>
          <button style={tabBtn(mode === "text")} onClick={() => setMode("text")}>
            Text
          </button>
        </div>

        {/* CONTENT */}
        {mode === "link" && (
          <input
            placeholder="https://example.com/privacy"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: "1px solid #ddd",
              fontSize: 14,
              marginBottom: 20,
            }}
          />
        )}

        {mode === "text" && (
          <textarea
            placeholder="Paste privacy policy text here…"
            rows={6}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 12,
              border: "1px solid #ddd",
              fontSize: 14,
              resize: "vertical",
              marginBottom: 20,
            }}
          />
        )}

        {mode === "file" && (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
            }}
            style={{
              border: `2px dashed ${dragOver ? "#000" : "#ccc"}`,
              borderRadius: 16,
              padding: 30,
              fontSize: 14,
              marginBottom: 20,
              background: dragOver ? "#f1f1f3" : "transparent",
            }}
          >
            <strong>Drag & drop</strong> your privacy policy file  
            <br />
            <span style={{ opacity: 0.6 }}>
              or click to upload (PDF / DOC / TXT)
            </span>

            <input
              type="file"
              style={{ display: "none" }}
            />
          </div>
        )}

        {/* ACTION */}
        <button
          style={{
            width: "100%",
            padding: "15px 0",
            borderRadius: 999,
            background: "#000",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          Start Audit
        </button>

        {/* PLAN */}
        <div style={{ marginTop: 18, fontSize: 12, opacity: 0.6 }}>
          Free plan · Limited scans
          <br />
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            Upgrade to Pro
          </span>
        </div>
      </div>

      {/* FOOTER */}
    <footer
  style={{
    position: "absolute",
    bottom: 20,
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    opacity: 0.5,
  }}
>
  © 2025 PolicyPulse · Privacy · Terms · Contact
</footer>
    </div>
  );
};

export default HomePage;


import { useAuth } from "../lib/useAuth";

import React, { useState } from "react";

const glass: React.CSSProperties = {
  background: "rgba(255,255,255,0.78)",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  borderRadius: 28,
  boxShadow: "0 40px 100px rgba(0,0,0,0.15)",
};

const HomePage: React.FC = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #ffffff 0%, #f1f1f4 60%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "100px 16px 40px",
      }}
    >
      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 28,
          ...glass,
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 6 }}>
          Privacy <span style={{ opacity: 0.4 }}>decoded</span>
        </h1>

        <p style={{ opacity: 0.6, fontSize: 14, marginBottom: 24 }}>
          Understand complex privacy policies in seconds.
        </p>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            background: "rgba(0,0,0,0.06)",
            borderRadius: 999,
            padding: 4,
            marginBottom: 18,
          }}
        >
          {["link", "file", "text"].map((t) => (
            <button
              key={t}
              onClick={() => setMode(t as any)}
              style={{
                flex: 1,
                padding: "10px 0",
                borderRadius: 999,
                border: "none",
                background: mode === t ? "#000" : "transparent",
                color: mode === t ? "#fff" : "#555",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* INPUT AREA */}
        {mode === "link" && (
          <input
            placeholder="https://example.com/privacy"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 14,
              border: "1px solid #ddd",
              marginBottom: 18,
              fontSize: 14,
            }}
          />
        )}

        {mode === "file" && (
          <div
            style={{
              border: "1.5px dashed #ccc",
              borderRadius: 16,
              padding: 24,
              textAlign: "center",
              fontSize: 13,
              marginBottom: 18,
              color: "#666",
            }}
          >
            Drag & drop privacy policy PDF  
            <br />
            <span style={{ opacity: 0.6 }}>or tap to upload</span>
            <input type="file" style={{ display: "none" }} />
          </div>
        )}

        {mode === "text" && (
          <textarea
            placeholder="Paste privacy policy text here…"
            style={{
              width: "100%",
              minHeight: 120,
              padding: 14,
              borderRadius: 14,
              border: "1px solid #ddd",
              marginBottom: 18,
              fontSize: 14,
              resize: "none",
            }}
          />
        )}

        {/* BUTTON */}
        <button
          style={{
            width: "100%",
            padding: "16px 0",
            borderRadius: 999,
            background: "#000",
            color: "#fff",
            border: "none",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Start Audit
        </button>

        {/* FOOTNOTE */}
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            fontSize: 12,
            opacity: 0.6,
          }}
        >
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
          marginTop: 40,
          fontSize: 12,
          opacity: 0.5,
          textAlign: "center",
        }}
      >
        © 2025 PolicyPulse · Privacy · Terms · Contact
      </footer>
    </div>
  );
};

export default HomePage;

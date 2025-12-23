import React, { useState, useRef } from "react";

const HomePage = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <div
        style={{
          background: "white",
          borderRadius: 32,
          padding: "32px 24px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Privacy <span style={{ color: "#888", fontWeight: 400 }}>decoded</span>
        </h1>

        <p style={{ color: "#555", marginBottom: 24 }}>
          Understand complex privacy policies in seconds.
        </p>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            background: "#f2f2f7",
            borderRadius: 14,
            padding: 4,
            marginBottom: 20,
          }}
        >
          {["link", "file", "text"].map((t) => (
            <button
              key={t}
              onClick={() => setMode(t as any)}
              style={{
                flex: 1,
                borderRadius: 10,
                border: "none",
                height: 38,
                background: mode === t ? "white" : "transparent",
                boxShadow:
                  mode === t ? "0 2px 8px rgba(0,0,0,0.12)" : "none",
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Inputs */}
        {mode === "link" && (
          <input
            placeholder="https://example.com/privacy"
            style={{
              width: "100%",
              height: 52,
              borderRadius: 14,
              border: "1px solid #ddd",
              padding: "0 16px",
              marginBottom: 20,
            }}
          />
        )}

        {mode === "file" && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={(e) =>
                setFileName(e.target.files?.[0]?.name || null)
              }
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: "2px dashed #ccc",
                borderRadius: 14,
                padding: 32,
                textAlign: "center",
                marginBottom: 20,
                cursor: "pointer",
              }}
            >
              {fileName || "Click to upload PDF or TXT"}
            </div>
          </>
        )}

        {mode === "text" && (
          <textarea
            placeholder="Paste policy text…"
            style={{
              width: "100%",
              height: 140,
              borderRadius: 14,
              border: "1px solid #ddd",
              padding: 16,
              marginBottom: 20,
              resize: "none",
            }}
          />
        )}

        <button
          style={{
            width: "100%",
            height: 56,
            borderRadius: 16,
            background: "black",
            color: "white",
            border: "none",
            fontSize: 17,
            cursor: "pointer",
          }}
        >
          Start Audit
        </button>
      </div>
    </div>
  );
};

export default HomePage;

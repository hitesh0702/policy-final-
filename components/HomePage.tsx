import React, { useState, useRef } from "react";

const HomePage = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileSelect = (f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      alert("Max file size is 10MB");
      return;
    }
    setFile(f);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #ffffff 0%, #f4f4f9 100%)",
        fontFamily: "-apple-system, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          borderRadius: 28,
          padding: 28,
          boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <h1
          style={{
            fontSize: 30,
            fontWeight: 800,
            marginBottom: 8,
            letterSpacing: -1,
          }}
        >
          Privacy{" "}
          <span style={{ color: "#86868b", fontWeight: 400 }}>
            decoded
          </span>
        </h1>

        <p style={{ color: "#424245", marginBottom: 24 }}>
          Understand complex privacy policies in seconds.
        </p>

        {/* MODE TABS */}
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
                height: 38,
                borderRadius: 10,
                border: "none",
                background: mode === t ? "white" : "transparent",
                fontWeight: 600,
                fontSize: 14,
                boxShadow:
                  mode === t
                    ? "0 2px 8px rgba(0,0,0,0.12)"
                    : "none",
                cursor: "pointer",
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* INPUT AREA */}
        <div style={{ minHeight: 140 }}>
          {mode === "link" && (
            <input
              placeholder="https://example.com/privacy"
              style={{
                width: "100%",
                height: 54,
                padding: "0 16px",
                borderRadius: 14,
                border: "1px solid #d2d2d7",
                fontSize: 16,
              }}
            />
          )}

          {mode === "text" && (
            <textarea
              placeholder="Paste policy text…"
              style={{
                width: "100%",
                height: 140,
                padding: 16,
                borderRadius: 14,
                border: "1px solid #d2d2d7",
                resize: "none",
                fontSize: 16,
              }}
            />
          )}

          {mode === "file" && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                style={{ display: "none" }}
                onChange={(e) =>
                  e.target.files &&
                  handleFileSelect(e.target.files[0])
                }
              />

              <div
                onClick={openFilePicker}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  e.dataTransfer.files &&
                    handleFileSelect(e.dataTransfer.files[0]);
                }}
                style={{
                  border: "2px dashed #d2d2d7",
                  borderRadius: 14,
                  padding: 32,
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#fafafa",
                }}
              >
                {file ? (
                  <>
                    <strong>{file.name}</strong>
                    <div style={{ fontSize: 12, color: "#86868b" }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </>
                ) : (
                  <>
                    Drag & drop PDF
                    <br />
                    <span style={{ color: "#86868b" }}>
                      or tap to upload
                    </span>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <button
          disabled={mode === "file" && !file}
          style={{
            width: "100%",
            height: 56,
            borderRadius: 16,
            background:
              mode === "file" && !file ? "#999" : "#000",
            color: "white",
            border: "none",
            fontSize: 17,
            fontWeight: 600,
            marginTop: 24,
            cursor:
              mode === "file" && !file
                ? "not-allowed"
                : "pointer",
          }}
        >
          Start Audit
        </button>

        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            fontSize: 13,
            color: "#86868b",
          }}
        >
          Free plan · Limited scans<br />
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            Upgrade to Pro
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

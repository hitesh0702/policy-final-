import React, { useState, useRef } from "react";

const HomePage = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  return (
    <div style={{
      minHeight: "100svh",
      background: "radial-gradient(circle at top, #ffffff 0%, #f4f4f9 100%)",
      display: "flex",
      flexDirection: "column",
      fontFamily: '-apple-system, system-ui, sans-serif',
      color: "#1d1d1f"
    }}>
      
      {/* CLEAN HEADER - No more overlapping! */}
      <nav style={{
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          padding: "12px 20px",
          borderRadius: "999px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid rgba(0,0,0,0.05)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
        }}>
          <strong style={{ fontSize: "15px" }}>PolicyPulse</strong>
          <span style={{ fontSize: "14px", color: "#007AFF", fontWeight: 600, cursor: "pointer" }}>Sign In</span>
        </div>
      </nav>

      {/* MAIN CARD SECTION */}
      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "32px",
          padding: "32px 24px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
          border: "1px solid rgba(0,0,0,0.03)",
          boxSizing: "border-box"
        }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "8px", letterSpacing: "-1px" }}>
            Privacy <span style={{ color: "#86868b", fontWeight: 400 }}>decoded</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#424245", marginBottom: "32px" }}>
            Understand complex privacy policies in seconds.
          </p>

          {/* TABS */}
          <div style={{ display: "flex", background: "#f2f2f7", borderRadius: "14px", padding: "4px", marginBottom: "24px" }}>
            {["link", "file", "text"].map((t) => (
              <button
                key={t}
                onClick={() => setMode(t as any)}
                style={{
                  flex: 1,
                  height: "38px",
                  borderRadius: "10px",
                  border: "none",
                  background: mode === t ? "white" : "transparent",
                  color: mode === t ? "black" : "#86868b",
                  fontSize: "14px",
                  fontWeight: mode === t ? "600" : "500",
                  boxShadow: mode === t ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                  cursor: "pointer"
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* INPUTS */}
          <div style={{ minHeight: "140px" }}>
            {mode === "link" && (
              <input
                type="url"
                placeholder="Paste policy URL..."
                style={{
                  width: "100%",
                  height: "54px",
                  padding: "0 16px",
                  borderRadius: "14px",
                  border: "1px solid #d2d2d7",
                  fontSize: "16px",
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            )}

            {mode === "file" && (
              <div
                onClick={handleFileClick}
                style={{
                  border: "2px dashed #d2d2d7",
                  borderRadius: "14px",
                  padding: "40px 20px",
                  textAlign: "center",
                  background: "#fafafa",
                  cursor: "pointer"
                }}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".pdf,.txt" />
                <div style={{ fontSize: "15px", fontWeight: 600 }}>{fileName || "Tap to upload file"}</div>
                <div style={{ fontSize: "13px", color: "#86868b", marginTop: "4px" }}>PDF or Text (Max 10MB)</div>
              </div>
            )}

            {mode === "text" && (
              <textarea
                placeholder="Paste text here..."
                style={{
                  width: "100%",
                  height: "140px",
                  padding: "16px",
                  borderRadius: "14px",
                  border: "1px solid #d2d2d7",
                  fontSize: "16px",
                  resize: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit"
                }}
              />
            )}
          </div>

          <button style={{
            width: "100%",
            height: "56px",
            borderRadius: "16px",
            background: "black",
            color: "white",
            border: "none",
            fontSize: "17px",
            fontWeight: "600",
            marginTop: "24px",
            cursor: "pointer"
          }}>
            Start Audit
          </button>
        </div>
      </main>

      <footer style={{ padding: "20px", textAlign: "center", fontSize: "12px", color: "#86868b" }}>
        © 2025 PolicyPulse · Built for clarity
      </footer>
    </div>
  );
};

export default HomePage;

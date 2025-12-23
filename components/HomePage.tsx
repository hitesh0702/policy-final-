import React, { useState } from "react";

const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
  borderRadius: 28,
  // Reduced shadow for mobile so it doesn't look "dirty" on small screens
  boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
};

const HomePage = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");

  return (
    <div
      style={{
        // Changed to minHeight so it can grow if the keyboard pops up
        minHeight: "100svh", 
        background: "radial-gradient(circle at top, #ffffff 0%, #f2f2f6 65%)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          paddingTop: "calc(12px + env(safe-area-inset-top))",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(20px)",
            display: "flex",
            gap: 12,
            fontSize: 14,
            border: "1px solid rgba(0,0,0,0.05)"
          }}
        >
          <strong>PolicyPulse</strong>
          <span style={{ opacity: 0.5, cursor: "pointer" }}>Sign In</span>
        </div>
      </div>

      {/* CENTER CARD */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 16px", // Space for mobile edges
        }}
      >
        <div style={{ 
          width: "100%", 
          maxWidth: 400, 
          padding: "32px 24px", 
          boxSizing: "border-box",
          ...glass 
        }}>
          <h1 style={{ fontSize: 28, marginBottom: 8, letterSpacing: "-0.5px" }}>
            Privacy <span style={{ opacity: 0.3 }}>decoded</span>
          </h1>

          <p style={{ fontSize: 15, opacity: 0.6, marginBottom: 24, lineHeight: "1.4" }}>
            Understand complex privacy policies in seconds.
          </p>

          {/* TABS */}
          <div
            style={{
              display: "flex",
              background: "rgba(0,0,0,0.05)",
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
                  background: mode === t ? "#000" : "transparent",
                  color: mode === t ? "#fff" : "#666",
                  fontSize: 13,
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  cursor: "pointer"
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* INPUT AREA */}
          <div style={{ minHeight: 120 }}>
            {mode === "link" && (
              <input
                placeholder="https://example.com/privacy"
                style={{
                  width: "100%",
                  height: 48,
                  padding: "0 16px",
                  borderRadius: 12,
                  border: "1px solid #e1e1e1",
                  fontSize: 16, // Prevents iOS zoom on focus
                  boxSizing: "border-box"
                }}
              />
            )}

            {mode === "file" && (
              <div
                style={{
                  border: "2px dashed #e1e1e1",
                  borderRadius: 12,
                  padding: "24px 10px",
                  textAlign: "center",
                  fontSize: 14,
                  color: "#888",
                }}
              >
                Tap to upload PDF
              </div>
            )}

            {mode === "text" && (
              <textarea
                placeholder="Paste privacy policy text…"
                style={{
                  width: "100%",
                  height: 120,
                  padding: 16,
                  borderRadius: 12,
                  border: "1px solid #e1e1e1",
                  fontSize: 16,
                  resize: "none",
                  boxSizing: "border-box"
                }}
              />
            )}
          </div>

          <button
            style={{
              width: "100%",
              height: 52,
              borderRadius: 12,
              background: "#000",
              color: "#fff",
              border: "none",
              fontSize: 16,
              fontWeight: 600,
              marginTop: 16,
              cursor: "pointer"
            }}
          >
            Start Audit
          </button>

          <div
            style={{
              marginTop: 18,
              textAlign: "center",
              fontSize: 13,
              opacity: 0.5,
            }}
          >
            Free plan · Limited scans
            <br />
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              Upgrade to Pro
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          paddingBottom: "calc(15px + env(safe-area-inset-bottom))",
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          opacity: 0.4,
        }}
      >
        © 2025 PolicyPulse
      </div>
    </div>
  );
};

export default HomePage;


import { useAuth } from "../lib/useAuth";

import React, { useState } from "react";

const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
  borderRadius: 28,
  boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
};

const HomePage = () => {
  const [mode, setMode] = useState<"link" | "file" | "text">("link");

  return (
    <div
      style={{
        height: "100svh", // IMPORTANT (fixes iOS scroll)
        background:
          "radial-gradient(circle at top, #ffffff 0%, #f2f2f6 65%)",
        overflow: "hidden",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "fixed",
          top: "env(safe-area-inset-top)",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          paddingTop: 12,
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
          }}
        >
          <strong>PolicyPulse</strong>
          <span style={{ opacity: 0.5 }}>Sign In</span>
        </div>
      </div>

      {/* CENTER */}
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 380, padding: 24, ...glass }}>
          <h1 style={{ fontSize: 26, marginBottom: 6 }}>
            Privacy <span style={{ opacity: 0.4 }}>decoded</span>
          </h1>

          <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 20 }}>
            Understand complex privacy policies in seconds.
          </p>

          {/* TABS */}
          <div
            style={{
              display: "flex",
              background: "rgba(0,0,0,0.06)",
              borderRadius: 999,
              padding: 4,
              marginBottom: 16,
            }}
          >
            {["link", "file", "text"].map((t) => (
              <button
                key={t}
                onClick={() => setMode(t as any)}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 999,
                  border: "none",
                  background: mode === t ? "#000" : "transparent",
                  color: mode === t ? "#fff" : "#666",
                  fontSize: 13,
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* INPUT */}
          {mode === "link" && (
            <input
              placeholder="https://example.com/privacy"
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                borderRadius: 14,
                border: "1px solid #ddd",
                marginBottom: 16,
              }}
            />
          )}

          {mode === "file" && (
            <div
              style={{
                border: "1.5px dashed #ccc",
                borderRadius: 16,
                padding: 22,
                textAlign: "center",
                fontSize: 13,
                marginBottom: 16,
                color: "#666",
              }}
            >
              Drag & drop PDF
              <br />
              <span style={{ opacity: 0.6 }}>or tap to upload</span>
            </div>
          )}

          {mode === "text" && (
            <textarea
              placeholder="Paste privacy policy text…"
              style={{
                width: "100%",
                height: 100,
                padding: 14,
                borderRadius: 14,
                border: "1px solid #ddd",
                marginBottom: 16,
                resize: "none",
              }}
            />
          )}

          <button
            style={{
              width: "100%",
              height: 48,
              borderRadius: 999,
              background: "#000",
              color: "#fff",
              border: "none",
              fontSize: 15,
            }}
          >
            Start Audit
          </button>

          <div
            style={{
              marginTop: 14,
              textAlign: "center",
              fontSize: 12,
              opacity: 0.6,
            }}
          >
            Free plan · Limited scans
            <br />
            <span style={{ textDecoration: "underline" }}>
              Upgrade to Pro
            </span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          position: "fixed",
          bottom: "env(safe-area-inset-bottom)",
          width: "100%",
          textAlign: "center",
          fontSize: 11,
          opacity: 0.5,
          paddingBottom: 10,
        }}
      >
        © 2025 PolicyPulse · Privacy · Terms · Contact
      </div>
    </div>
  );
};

export default HomePage;

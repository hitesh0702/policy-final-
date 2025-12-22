import React from "react";
import { useAuth } from "../lib/useAuth";

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.75)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.4)",
  borderRadius: 20,
  padding: 30,
  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
};

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(180deg, #f5f5f7 0%, #eaeaec 100%)",
      }}
    >
      <div style={{ width: 420, ...glassCard }}>
        <h1 style={{ textAlign: "center" }}>Privacy decoded</h1>
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          Understand complex privacy policies in seconds.
        </p>

        <input
          placeholder="https://example.com/privacy"
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />

        <button
          style={{
            marginTop: 16,
            width: "100%",
            padding: 12,
            borderRadius: 999,
            background: "#000",
            color: "#fff",
            border: "none",
          }}
        >
          Start Audit
        </button>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13 }}>
          {user ? (
            <>
              Free plan · Limited scans
              <br />
              <button style={{ marginTop: 8 }}>Upgrade to Pro</button>
            </>
          ) : (
            "Sign in to save reports"
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

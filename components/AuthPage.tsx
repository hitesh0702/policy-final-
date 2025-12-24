import React, { useState } from "react";
import { supabase } from "../lib/supabase";

const AuthPage = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleEmailAuth = async () => {
    if (!email) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);
    if (!error) setSent(true);
  };

  const oauth = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "calc(100svh - 72px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          borderRadius: 28,
          padding: 32,
          boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
        }}
      >
        {/* Toggle */}
        <div
          style={{
            display: "flex",
            background: "#f2f2f7",
            borderRadius: 14,
            padding: 4,
            marginBottom: 24,
          }}
        >
          {["signin", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m as any);
                setSent(false);
              }}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 10,
                border: "none",
                background: mode === m ? "white" : "transparent",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {m === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>

        <p style={{ color: "#555", marginBottom: 24 }}>
          {mode === "signin"
            ? "Sign in to continue to PolicyPulse"
            : "Sign up to start decoding privacy policies"}
        </p>

        {/* Email */}
        {!sent ? (
          <>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                height: 52,
                borderRadius: 14,
                border: "1px solid #ddd",
                padding: "0 16px",
                fontSize: 16,
                marginBottom: 16,
              }}
            />

            <button
              onClick={handleEmailAuth}
              disabled={loading}
              style={{
                width: "100%",
                height: 54,
                borderRadius: 16,
                background: "black",
                color: "white",
                border: "none",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {loading ? "Sending…" : "Continue with Email"}
            </button>
          </>
        ) : (
          <div
            style={{
              padding: 16,
              background: "#f2f2f7",
              borderRadius: 12,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Check your email for the login link.
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            margin: "24px 0",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, height: 1, background: "#e5e5ea" }} />
          <span style={{ fontSize: 13, color: "#777" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "#e5e5ea" }} />
        </div>

        {/* OAuth */}
        <button
          onClick={() => oauth("google")}
          style={oauthBtn}
        >
          Continue with Google
        </button>

        <button
          onClick={() => oauth("github")}
          style={{ ...oauthBtn, marginTop: 12 }}
        >
          Continue with GitHub
        </button>
      </div>
    </div>
  );
};

const oauthBtn: React.CSSProperties = {
  width: "100%",
  height: 52,
  borderRadius: 14,
  background: "#f2f2f7",
  border: "none",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

export default AuthPage;
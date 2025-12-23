import React from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <header
      style={{
        height: 72,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(20px)",
          borderRadius: 999,
          padding: "12px 20px",
          display: "flex",
          gap: 16,
          alignItems: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <strong>PolicyPulse</strong>

        {user ? (
          <>
            <span style={{ fontSize: 13, color: "#555" }}>
              {user.email}
            </span>
            <button
              onClick={() => supabase.auth.signOut()}
              style={{
                border: "none",
                background: "transparent",
                color: "#007AFF",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              supabase.auth.signInWithOtp({
                email: prompt("Enter email")!,
              })
            }
            style={{
              border: "none",
              background: "transparent",
              color: "#007AFF",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

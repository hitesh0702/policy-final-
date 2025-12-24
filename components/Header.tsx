import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === "/auth";

  return (
    <header
      style={{
        height: 72,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: isAuthPage ? "none" : "auto",
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
          opacity: isAuthPage ? 0.6 : 1,
        }}
      >
        <strong
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          PolicyPulse
        </strong>

        {user ? (
          <>
            <span style={{ fontSize: 13, color: "#555" }}>
              {user.email}
            </span>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate("/");
              }}
              style={{
                border: "none",
                background: "transparent",
                color: "#007AFF",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          !isAuthPage && (
            <button
              onClick={() => navigate("/auth")}
              style={{
                border: "none",
                background: "transparent",
                color: "#007AFF",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Sign In
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
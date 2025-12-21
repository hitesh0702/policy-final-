import React from "react";
import { supabase } from "../lib/supabase";

const Header: React.FC = () => {
  const handleLogin = async () => {
    const email = window.prompt("Enter your email");
    if (!email) return;

    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert("Check your email for login link");
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "12px 20px",
          borderRadius: 999,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <strong>PolicyPulse</strong>

        <button
          onClick={handleLogin}
          style={{
            background: "black",
            color: "white",
            border: "none",
            padding: "6px 14px",
            borderRadius: 999,
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;

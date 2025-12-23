import React from "react";

const Header = () => {
  return (
    <header
      style={{
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong style={{ fontSize: 15 }}>PolicyPulse</strong>

        <button
          style={{
            border: "none",
            background: "transparent",
            color: "#007AFF",
            fontSize: 14,
            fontWeight: 600,
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

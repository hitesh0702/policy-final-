import React from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";

const glassStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.4)",
  borderRadius: 999,
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};

const Header = () => {
  const { user, loading } = useAuth();
  if (loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: 20,
        zIndex: 100,
        ...glassStyle,
      }}
    >
      <strong>PolicyPulse</strong>

      {user ? (
        <>
          <span style={{ fontSize: 13, opacity: 0.7 }}>{user.email}</span>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </>
      ) : (
        <button
          onClick={async () => {
            const email = prompt("Enter your email");
            if (!email) return;

            await supabase.auth.signInWithOtp({
              email,
              options: {
                emailRedirectTo: window.location.origin,
              },
            });

            alert("Check your email for login link");
          }}
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Header;

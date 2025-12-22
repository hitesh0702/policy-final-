import React from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";

const Header = () => {
  const { user } = useAuth();

  const handleSignIn = async () => {
    const email = prompt("Enter your email");
    if (!email) return;

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin, // 🔥 CRITICAL FIX
      },
    });

    alert("Check your email for the login link");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div
      style={{
        padding: 12,
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong>PolicyPulse</strong>

      {user ? (
        <div>
          <span style={{ marginRight: 10 }}>{user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default Header;

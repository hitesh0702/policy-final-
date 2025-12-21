import React from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "12px 24px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#fff",
        zIndex: 100,
      }}
    >
      <strong>PolicyPulse</strong>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: 12 }}>{user.email}</span>
            <button onClick={() => supabase.auth.signOut()}>
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
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

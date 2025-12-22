import React from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <div
      style={{
        padding: 12,
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <strong>PolicyPulse</strong>

      {user ? (
        <div>
          <span style={{ marginRight: 10 }}>{user.email}</span>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
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
  );
};

export default Header;

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <header style={{ padding: 16 }}>
      <strong>PolicyPulse</strong>

      {user ? (
        <button
          onClick={() => supabase.auth.signOut()}
          style={{ marginLeft: 16 }}
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() =>
            supabase.auth.signInWithOtp({
              email: prompt("Enter email")!,
            })
          }
          style={{ marginLeft: 16 }}
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default Header;

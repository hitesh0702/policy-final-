import React from "react";
import { useAuth } from "../lib/useAuth";

const AccountPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>You must be logged in.</p>;
  }

  return (
    <div>
      <h2>Account</h2>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
};

export default AccountPage;

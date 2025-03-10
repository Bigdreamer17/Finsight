"use client";

import { signOut } from "next-auth/react";

const DashboardPage = () => {
  const handleSignOut = () => {
    signOut({ redirectTo: "/" });
  };

  return (
    <div>
      <h1>DashboardPage</h1>

      <button className="cursor-pointer" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default DashboardPage;

import React from "react";

import { useSession, signOut } from "next-auth/react";

import Link from "next/link";

function Header() {
  const { status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="w-full relative text-white bg-blue-500 p-5 shadow-md z-50">
      <div className="max-w-7xl w-full flex justify-between items-center mx-auto">
        <Link href="/">
          <h2 className="text-2xl font-bold">To-Do List</h2>
        </Link>
        {status === "authenticated" ? (
          <button className="header-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <div className="space-x-2.5">
            <Link href="/sign-up">
              <button className="header-btn">Sign Up</button>
            </Link>
            <Link href="/sign-in">
              <button className="header-btn">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;

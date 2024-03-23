"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex justify-center items-center w-full h-8 bg-yellow-300 rounded-md hover:bg-yellow-200"
    >
      Sign Out
    </button>
  );
}

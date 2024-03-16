"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [title, setTitle] = useState("STATE TEAM CHAMPIONSHIP LADDER");

  useEffect(() => {
    if (pathname == "/login") {
      setTitle("LOGIN");
    } else if (pathname == "/admin") {
      setTitle("ADMIN CONTROLS");
    }
  }, [pathname]);

  return (
    <div className="flex bg-gradient-to-r from-yellow-200 to-yellow-500 h-24 w-full justify-between items-center px-4">
      <div>Logo</div>
      <div className="text-2xl font-bold">{title}</div>
      <div>Search Bar</div>
    </div>
  );
}

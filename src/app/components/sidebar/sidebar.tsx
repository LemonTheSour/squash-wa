"use client";

import NavigationButton from "./navigation-button";
import { usePathname } from "next/navigation";

const links = [
  { path: "/admin", title: "Dashboard" },
  { path: "/admin/players", title: "Players" },
  { path: "/admin/leagues", title: "Leagues" },
  { path: "/admin/tournaments", title: "Tournaments" },
  { path: "/admin/settings", title: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex bg-gold h-full w-2/12 absolute">
      <ul className="pl-14 pt-10 w-full">
        {links.map((link, index) => {
          const isActive = pathname === link.path;
          return (
            <NavigationButton
              key={index}
              href={link.path}
              title={link.title}
              isActive={isActive}
            />
          );
        })}
      </ul>
    </div>
  );
}

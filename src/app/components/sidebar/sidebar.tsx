"use client";

import NavigationButton from "./navigation-button";
import { usePathname } from "next/navigation";
import Divider from "./divider";

const playerLinks = [
  { path: "/admin/players", title: "Players" },
  { path: "/admin/leagues", title: "Leagues" },
  { path: "/admin/tournaments", title: "Tournamnents" },
];

const adminLinks = [
  { path: "/admin", title: "Dashboard" },
  { path: "/admin/settings", title: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="bg-gold h-full w-2/12 absolute">
      <Divider title="Admin Controls" />
      <ul className="pl-14 pt-4 w-full">
        {adminLinks.map((link, index) => {
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
      <Divider title="Player Information" />
      <ul className="pl-14 pt-4 w-full">
        {playerLinks.map((link, index) => {
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

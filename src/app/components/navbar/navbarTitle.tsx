"use client";
import { usePathname } from "next/navigation";

export default function NavBarTitle() {
  const pathname = usePathname();
  return (
    <div>
      <div>
        {pathname == "/" ? (
          <div className="text-2xl text-white font-bold">
            STATE TEAM CHAMPIONSHIP LADDER
          </div>
        ) : null}
      </div>
      <div>
        {pathname == "/admin" ? (
          <div className="text-2xl text-white font-bold">ADMIN CONTROLS</div>
        ) : null}
      </div>
      <div>
        {pathname == "/admin/players" ? (
          <div className="text-2xl text-white font-bold">ADMIN PLAYERS</div>
        ) : null}
      </div>
      <div>
        {pathname == "/admin/leagues" ? (
          <div className="text-2xl text-white font-bold">ADMIN LEAGUES</div>
        ) : null}
      </div>
      <div>
        {pathname == "/admin/tournaments" ? (
          <div className="text-2xl text-white font-bold">ADMIN TOURNAMENTS</div>
        ) : null}
      </div>
      <div>
        {pathname == "/admin/settings" ? (
          <div className="text-2xl text-white font-bold">ADMIN SETTINGS</div>
        ) : null}
      </div>
      <div>
        {pathname == "/signin" ? (
          <div className="text-2xl text-white font-bold">SIGN IN</div>
        ) : null}
      </div>
    </div>
  );
}

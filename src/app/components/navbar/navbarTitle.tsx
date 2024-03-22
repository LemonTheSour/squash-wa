"use client";
import { usePathname } from "next/navigation";

export default function NavBarTitle() {
  const pathname = usePathname();
  return (
    <div>
      <div>
        {pathname == "/" ? (
          <div className="text-2xl font-bold">
            STATE TEAM CHAMPIONSHIP LADDER
          </div>
        ) : null}
      </div>
      <div>
        {pathname == "/admin" ? (
          <div className="text-2xl font-bold">ADMIN CONTROLS</div>
        ) : null}
      </div>
      <div>
        {pathname == "/signin" ? (
          <div className="text-2xl font-bold">SIGN IN</div>
        ) : null}
      </div>
    </div>
  );
}

import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SignOutButton from "./signOutButton";

import NavBarTitle from "./navbarTitle";
export default async function NavBar() {
  const session = await getServerSession(options);

  return (
    <div className="flex bg-gradient-to-r from-yellow-200 to-yellow-500 h-24 w-full justify-between items-center px-4">
      <div>Logo</div>
      <NavBarTitle />
      <div className="w-1/12">{session ? <SignOutButton /> : null}</div>
    </div>
  );
}

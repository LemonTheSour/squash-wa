import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SignOutButton from "./signOutButton";
import HomeButton from "./homebutton";
import NavBarTitle from "./navbarTitle";
import AdminHomeButton from "./adminHomeButton";
export default async function NavBar() {
  const session = await getServerSession(options);

  return (
    <div className="flex bg-black h-24 w-full justify-between items-center px-4">
      <HomeButton />
      <NavBarTitle />
      <div className="flex">
        <div className="w-36 px-2">{session ? <AdminHomeButton /> : null}</div>
        <div className="w-36 px-2">{session ? <SignOutButton /> : null}</div>
      </div>
    </div>
  );
}

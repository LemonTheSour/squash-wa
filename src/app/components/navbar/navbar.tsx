import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import SignOutButton from "./signOutButton";
import HomeButton from "./homebutton";
import NavBarTitle from "./navbarTitle";
export default async function NavBar() {
  const session = await getServerSession(options);

  return (
    <div className="flex bg-black h-24 w-full justify-between items-center px-4">
      <HomeButton />
      <NavBarTitle />
      <div className="w-1/12">{session ? <SignOutButton /> : null}</div>
    </div>
  );
}

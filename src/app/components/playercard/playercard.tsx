import { getServerSession } from "next-auth";
import EditOverlay from "./editoverlay";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface PlayerCardProps {
  position: string;
  name: string;
  rating: string;
}

const style1 =
  "flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl bg-gold hover:bg-bright-gold";
const style2 =
  "flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade";
const handleClick = () => {};
export default async function PlayerCard({
  position,
  name,
  rating,
}: PlayerCardProps) {
  const session = await getServerSession(options);
  return (
    <div>
      <div className={Number(position) < 4 ? style1 : style2}>
        <div className="flex">
          <div className="pr-2">{position} .</div>
          <div>{name}</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="pr-2">{rating}</div>
          {session && <EditOverlay />}
        </div>
      </div>
    </div>
  );
}

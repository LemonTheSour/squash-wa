import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

interface PlayerCardProps {
  position: string;
  firstName: string;
  lastName: string;
  gender: string;
  rating: string;
  squashId: string;
  region: string;
}

const style1 =
  "flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl bg-gold hover:bg-bright-gold";
const style2 =
  "flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade";

export default async function PlayerCard({
  position,
  firstName,
  lastName,
  gender,
  rating,
  squashId,
  region,
}: PlayerCardProps) {
  const session = await getServerSession(options);
  return (
    <div>
      <div className={Number(position) < 4 ? style1 : style2}>
        <div className="flex">
          <div className="pr-2">{position}</div>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="pr-2">{rating}</div>
        </div>
      </div>
    </div>
  );
}

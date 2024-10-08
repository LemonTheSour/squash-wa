interface PlayerCardProps {
  position: number;
  firstName: string;
  lastName: string;
  gender: string;
  rating: number;
  squashId: string;
  region: string;
}

const style1 =
  "flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl bg-gold";
const style2 =
  "flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl";

export default async function PlayerCard({
  position,
  firstName,
  lastName,
  gender,
  rating,
  squashId,
  region,
}: PlayerCardProps) {
  return (
    <div>
      <div className={position < 4 ? style1 : style2}>
        <div className="flex">
          <div className="pr-2">{position}.</div>
          <div>
            {firstName} {lastName}
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="pr-2">{rating}</div>
        </div>
      </div>
    </div>
  );
}

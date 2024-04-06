import EditOverlay from "../playercard/editButton";

interface PlayerCardProps {
  position: string;
  firstName: string;
  lastName: string;
  gender: string;
  rating: string;
  squashId: string;
  region: string;
}

export default function AdminPlayerCard({
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
      <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade">
        <div className="flex">
          <div className="pr-2">{position}</div>
          <div>{firstName}</div>
          <div>{lastName}</div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="pr-2">{rating}</div>
          <EditOverlay />
        </div>
      </div>
    </div>
  );
}

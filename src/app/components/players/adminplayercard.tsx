import EditOverlay from "../playercard/editOverlay";
import { PlayerData } from "@/app/types/database";

interface PlayerCardProps {
  data: PlayerData;
  position: number;
}

export default function AdminPlayerCard({ data, position }: PlayerCardProps) {
  return (
    <div>
      <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade">
        <div className="flex">
          <div className="pr-2">{position} . </div>
          <div>
            {data.firstName} {data.lastName}
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="pr-2">{data.rating}</div>
          <EditOverlay />
        </div>
      </div>
    </div>
  );
}

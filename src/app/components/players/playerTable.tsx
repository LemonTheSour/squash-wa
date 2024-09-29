import { PlayerData } from "@/app/types/database";
import PlayerTableRow from "./playerTableRow";

interface playerTableProps {
  PlayerData: PlayerData[];
}

export default function PlayerTable({ PlayerData }: playerTableProps) {
  return (
    <table className="table-auto w-full text-left mt-8">
      <thead className=" border-b-2 border-grey">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Id</th>
          <th>Rating</th>
          <th>Region</th>
        </tr>
      </thead>
      <tbody>
        {PlayerData.map((player) => {
          return <PlayerTableRow key={player.squashId} playerData={player} />;
        })}
      </tbody>
    </table>
  );
}

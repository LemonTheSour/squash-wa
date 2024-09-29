import { PlayerData } from "@/app/types/database";

interface playerTableProps {
  PlayerData: PlayerData[];
  onClick: () => void;
}

export default function PlayerTable({ PlayerData, onClick }: playerTableProps) {
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
          return (
            <tr key={player.squashId} className="border-b-2 border-grey">
              <td>{player.firstName}</td>
              <td>{player.lastName}</td>
              <td>{player.squashId}</td>
              <td>{player.rating}</td>
              <td>{player.region}</td>
              <td onClick={onClick}>Edit</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

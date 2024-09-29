import { PlayerData, TournamentData } from "@/app/types/database";
import TournamentTableRow from "./tournamentTableRow";

interface tournamentTableProps {
  tournamentData: TournamentData[];
  playerData: PlayerData[];
}

export default function TournamentTable({
  tournamentData,
  playerData,
}: tournamentTableProps) {
  return (
    <table className="table-auto w-full text-left mt-8">
      <thead className=" border-b-2 border-grey">
        <tr>
          <th>Tournament Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {tournamentData.map((tournament) => {
          return (
            <TournamentTableRow
              key={tournament.tournamentName}
              tournamentData={tournament}
              playerData={playerData}
            />
          );
        })}
      </tbody>
    </table>
  );
}

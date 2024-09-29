import { LeagueData, PlayerData } from "@/app/types/database";
import LeagueTableRow from "./leagueTableRow";

interface leagueTableProps {
  LeagueData: LeagueData[];
  PlayerData: PlayerData[];
}

export default function LeagueTable({
  LeagueData,
  PlayerData,
}: leagueTableProps) {
  return (
    <table className="table-auto w-full text-left mt-8">
      <thead className=" border-b-2 border-grey">
        <tr>
          <th>League Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {LeagueData.map((league) => {
          return (
            <LeagueTableRow
              key={league.name}
              leagueData={league}
              playerData={PlayerData}
            />
          );
        })}
      </tbody>
    </table>
  );
}

import TournamentTable from "@/app/components/tournaments/tournaments";
import { getPlayers, getTournaments } from "@/app/hooks/getData";

const AllPlayers = await getPlayers();
const TournamentData = await getTournaments();
export default function Tournaments() {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <TournamentTable
        TournamentData={TournamentData}
        PlayerData={AllPlayers}
      />
    </div>
  );
}

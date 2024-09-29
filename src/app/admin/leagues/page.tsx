import LeagueTable from "@/app/components/leagues/leagues";
import { getLeagues, getPlayers } from "@/app/hooks/getData";

const AllPlayers = await getPlayers();
const LeagueData = await getLeagues();
export default function Leagues() {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <LeagueTable LeagueData={LeagueData} PlayerData={AllPlayers} />
    </div>
  );
}

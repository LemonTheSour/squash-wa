import Tournaments from "../components/tournaments/tournaments";
import Leagues from "../components/leagues/leagues";
import Players from "../components/players/players";
import getPlayers from "../hooks/getPlayers";
import getLeagues from "../hooks/getLeagues";
import getTournaments from "../hooks/getTournaments";

const AllPlayers = await getPlayers();
const LeagueData = await getLeagues();
const TournamentData = await getTournaments();

export default function Admin() {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <Tournaments TournamentData={TournamentData} PlayerData={AllPlayers} />
      <Leagues LeagueData={LeagueData} PlayerData={AllPlayers} />
      <Players PlayerData={AllPlayers} />
    </div>
  );
}

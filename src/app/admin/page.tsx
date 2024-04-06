import Tournaments from "../components/tournaments";
import TournamentData from "../data/tournaments.json";
import Leagues from "../components/leagues/leagues";
import LeagueData from "../data/leagues.json";
import Players from "../components/players/players";
import PlayerData from "../data/players.json";
import getPlayers from "../hooks/getPlayers";

const AllPlayers = await getPlayers();

export default function Admin() {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <Tournaments data={TournamentData} />
      <Leagues LeagueData={LeagueData} PlayerData={AllPlayers} />
      <Players data={PlayerData} />
    </div>
  );
}

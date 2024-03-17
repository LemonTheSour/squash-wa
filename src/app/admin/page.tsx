import Tournaments from "../components/tournaments";
import TournamentData from "../data/tournaments.json";
import Leagues from "../components/leagues";
import LeagueData from "../data/leagues.json";

export default function Admin() {
  return (
    <div className="flex justify-center">
      <Tournaments data={TournamentData} />
      <Leagues data={LeagueData} />
    </div>
  );
}

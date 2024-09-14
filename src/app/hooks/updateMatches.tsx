import { collection, doc, getDoc } from "firebase/firestore";
import {
  LeagueData,
  MatchData,
  PlayerData,
  TournamentData,
} from "../types/database";
import { collectLeagueMatches, collectTournamentMatches } from "./updateRating";
import { db } from "../../../firebase/clientApp";

export async function updateLeagueMatches22(
  leagueData: LeagueData,
  playerData: PlayerData[]
) {
  const leagues = collectLeagueMatches(leagueData);
  console.log(leagues);
  leagues.map(async (league) => {
    console.log(league);
    const matchRef = collection(db, "matches");
    const history = await getDoc(doc(matchRef, league.playerId));
    if (history) {
      const match = history.data() as MatchData;
      console.log(match);
      match.matches.map((match) => {
        if (match.event == league.matches.event) {
          match = league.matches;
        }
      });
    }
  });
  return 0;
}

export function updateTournamentMatches(
  tournamentData: TournamentData,
  playerData: PlayerData[]
) {
  const tournaments = collectTournamentMatches(tournamentData);
  tournaments.map((tournament) => {
    const playerRef = collection(db, "players", tournament.playerId);
  });
  return 0;
}

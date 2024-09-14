import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { PlayerData, TournamentData } from "../types/database";
import { LeagueMatches } from "../types/rating";
import { db } from "../../../firebase/clientApp";
import { History } from "../types/database";

export function separateGenders(playerData: PlayerData[], gender: String) {
  let MaleData: PlayerData[] = [];
  let FemaleData: PlayerData[] = [];

  {
    playerData.map((player) => {
      if (player.gender === "Male") {
        MaleData.push(player);
      } else {
        FemaleData.push(player);
      }
    });
  }

  if (gender === "Male") {
    return MaleData;
  }
  return FemaleData;
}

export function collectLeaguePlayers(leagueMatches: LeagueMatches[]) {
  // Collect all players in the league
  const leaguePlayers: string[] = [];
  leagueMatches.forEach((match) => {
    if (leaguePlayers.indexOf(match.player1) === -1) {
      leaguePlayers.push(match.player1);
    }
    if (leaguePlayers.indexOf(match.player2) === -1) {
      leaguePlayers.push(match.player2);
    }
  });

  return leaguePlayers;
}

export function collectTournamentPlayers(tournamentMatch: TournamentData) {
  const tournamentPlayers: string[] = [
    tournamentMatch.menPlateWinner,
    tournamentMatch.menRunnerUp,
    tournamentMatch.menSemiFinalist1,
    tournamentMatch.menSemiFinalist2,
    tournamentMatch.menQuarterFinalist1,
    tournamentMatch.menQuarterFinalist2,
    tournamentMatch.menQuarterFinalist3,
    tournamentMatch.menQuarterFinalist4,
    tournamentMatch.menPlateWinner,
    tournamentMatch.womenPlateWinner,
    tournamentMatch.womenRunnerUp,
    tournamentMatch.womenSemiFinalist1,
    tournamentMatch.womenSemiFinalist2,
    tournamentMatch.womenQuarterFinalist1,
    tournamentMatch.womenQuarterFinalist2,
    tournamentMatch.womenQuarterFinalist3,
    tournamentMatch.womenQuarterFinalist4,
    tournamentMatch.womenPlateWinner,
  ];
  tournamentPlayers.forEach((score, index) => {
    if (!score) {
      tournamentPlayers.splice(index, 1);
    }
  });
  return tournamentPlayers;
}

// Update individual players' rating
export async function updatePlayersRating(leaguePlayers: string[]) {
  leaguePlayers.forEach(async (player) => {
    const querySnapshot = await getDocs(
      collection(db, `matches/${player}/matchHistory`)
    );
    let rating = 0;
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        rating += Number(doc.data().points);
      }
    });
    await updateDoc(doc(db, "players", player), {
      rating: rating,
    });
  });

  console.log("League Player Ratings Updated!");
}

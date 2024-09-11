import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { PlayerData } from "../types/database";
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

// Update individual players' rating
export async function updateLeaguePlayersRating(leaguePlayers: string[]) {
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

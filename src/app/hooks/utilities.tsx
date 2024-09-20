import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  LeagueData,
  LeagueMatch,
  PlayerData,
  TournamentData,
} from "../types/database";
import { LeagueMatches } from "../types/rating";
import { db } from "../../../firebase/clientApp";

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
    tournamentMatch.menWinner,
    tournamentMatch.menRunnerUp,
    tournamentMatch.menSemiFinalist1,
    tournamentMatch.menSemiFinalist2,
    tournamentMatch.menQuarterFinalist1,
    tournamentMatch.menQuarterFinalist2,
    tournamentMatch.menQuarterFinalist3,
    tournamentMatch.menQuarterFinalist4,
    tournamentMatch.womenPlateWinner,
    tournamentMatch.womenWinner,
    tournamentMatch.womenRunnerUp,
    tournamentMatch.womenSemiFinalist1,
    tournamentMatch.womenSemiFinalist2,
    tournamentMatch.womenQuarterFinalist1,
    tournamentMatch.womenQuarterFinalist2,
    tournamentMatch.womenQuarterFinalist3,
    tournamentMatch.womenQuarterFinalist4,
  ];
  const cleanedTournamentPlayers = tournamentPlayers.filter((player) => {
    return player !== undefined;
  });

  return cleanedTournamentPlayers;
}

// Update individual players' rating
export async function updatePlayersRating(players: string[]) {
  players.forEach(async (player) => {
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

  console.log("Player Ratings Updated!");
}

// Remove changes from database
export async function removeLeaguePlayers(leagueData: LeagueData) {
  const docRef = doc(db, "leagues", leagueData.name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const matches = docSnap.data().matches;
    matches.forEach((match: LeagueMatch, index: number) => {
      if (
        match.player1 != leagueData.matches[index].player1 ||
        match.player1 != leagueData.matches[index].player2
      ) {
        deleteDoc(
          doc(db, "matches", match.player1, "matchHistory", match.matchId)
        );
      }
      if (
        match.player2 != leagueData.matches[index].player1 ||
        match.player2 != leagueData.matches[index].player2
      ) {
        deleteDoc(
          doc(db, "matches", match.player2, "matchHistory", match.matchId)
        );
      }
    });
  }
}

// Remove players tournament match history, provided they are no longer in that
// tournament
export async function removeTournamentPlayers(tournamentData: TournamentData) {
  const docRef = doc(db, "tournaments", tournamentData.matchId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const oldTournamentData = docSnap.data();
    // @ts-ignore
    const oldTournamentPlayers = collectTournamentPlayers(oldTournamentData);
    oldTournamentPlayers.forEach((player) => {
      try {
        deleteDoc(
          doc(db, "matches", player, "matchHistory", tournamentData.matchId)
        );
      } catch {
        // Shouldn't really hit this ever, but just in case.
      }
    });
  }
}

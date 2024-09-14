import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  History,
  LeagueData,
  MatchData,
  PlayerData,
  TournamentData,
} from "../types/database";
import {
  calculateRating,
  collectLeagueMatches,
  collectTournamentMatches,
  updateMatches,
} from "./updateRating";
import { db } from "../../../firebase/clientApp";
import { getMatches } from "./getData";
import {
  collectLeaguePlayers,
  collectTournamentPlayers,
  updatePlayersRating,
} from "./utilities";

export async function addPlayer({ ...PlayerData }: PlayerData) {
  try {
    await setDoc(doc(db, "players", PlayerData.squashId), {
      ...PlayerData,
    });
    addMatch(PlayerData);
    console.log("PlayerData successfully created");
    return true;
  } catch {
    console.log("Error Adding PlayerData");
    return false;
  }
}

export async function addLeague({ ...LeagueData }: LeagueData) {
  // Add the league to the database
  try {
    await setDoc(doc(db, "leagues", LeagueData.name), {
      ...LeagueData,
    });
    // Update the players match history
    const histories = collectLeagueMatches(LeagueData);
    await updateMatches(histories);

    // Collect all players in the league
    const leaguePlayers = collectLeaguePlayers(LeagueData.matches);

    // Update the players rating
    updatePlayersRating(leaguePlayers);

    console.log("League Successfully Created");
    return true;
  } catch {
    console.log("Error Adding League");
    return false;
  }
}

export async function addTournament({ ...TournamentData }: TournamentData) {
  // setValue of form input
  try {
    await setDoc(doc(db, "tournaments", TournamentData.tournamentName), {
      ...TournamentData,
    });
    console.log("Tournament Successfully Created");

    // Collect tournament data
    const histories = collectTournamentMatches(TournamentData);
    console.log("Histories successfully collected");

    // Update players match histories
    await updateMatches(histories);
    console.log("Matches Successfully Updated");

    // Collect all players in the tournament
    const tournamentPlayers = collectTournamentPlayers(TournamentData);

    // Update the players rating
    updatePlayersRating(tournamentPlayers);
    console.log("Rating successfully updated");

    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}

async function addMatch(PlayerData: PlayerData) {
  try {
    await setDoc(doc(db, "matches", PlayerData.squashId), {});
    console.log("Match Successfully Created");
    return true;
  } catch {
    console.log("Error adding Match");
    return false;
  }
}

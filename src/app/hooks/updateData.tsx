import { db } from "../../../firebase/clientApp";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TournamentData, LeagueData, PlayerData } from "../types/database";
import {
  alterMatches,
  collectLeagueMatches,
  collectTournamentMatches,
  updateMatches,
} from "./updateRating";
import {
  collectLeaguePlayers,
  collectTournamentPlayers,
  removeLeaguePlayers,
  removeTournamentPlayers,
  updatePlayersRating,
} from "./utilities";

export async function UpdateTournaments({ ...TournamentData }: TournamentData) {
  await removeTournamentPlayers(TournamentData);

  try {
    await updateDoc(doc(db, "tournaments", TournamentData.tournamentName), {
      ...TournamentData,
    });

    // Collect tournament data
    const histories = collectTournamentMatches(TournamentData);
    console.log("Histories successfully collected");

    // Update players match histories
    await updateMatches(histories);
    console.log("Matches Successfully Updated");

    // Collect all players in the tournament
    const tournamentPlayers = collectTournamentPlayers(TournamentData);

    // Update the players rating
    await updatePlayersRating(tournamentPlayers);
    console.log("Rating successfully updated");

    console.log("Tournament Succesfully Updated");
    return true;
  } catch {
    console.log("Error Creating Tournament");
    return false;
  }
}

export async function updateLeague({ ...LeagueData }: LeagueData) {
  await removeLeaguePlayers(LeagueData);

  // Add the league to the database
  try {
    await updateDoc(doc(db, "leagues", LeagueData.name), {
      ...LeagueData,
    });

    // Update the players match history
    const histories = collectLeagueMatches(LeagueData);
    await alterMatches(histories);

    // Collect all players in the league
    const leaguePlayers = collectLeaguePlayers(LeagueData.matches);

    // Update the players rating
    await updatePlayersRating(leaguePlayers);

    console.log("League Successfully Updated");
    return true;
  } catch {
    console.log("Error Updating League");
    return false;
  }
}

export async function updatePlayer({ ...PlayerData }: PlayerData) {
  try {
    await updateDoc(doc(db, "players", PlayerData.squashId), {
      ...PlayerData,
    });
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}

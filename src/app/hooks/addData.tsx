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
import { collectLeaguePlayers, updateLeaguePlayersRating } from "./utilities";

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
    updateLeaguePlayersRating(leaguePlayers);

    console.log("League Successfully Created");
    return true;
  } catch {
    console.log("Error Adding League");
    return false;
  }
}

export async function addTournament({ ...TournamentData }: TournamentData) {
  if (
    TournamentData.menPlateWinner == undefined ||
    TournamentData.womenPlateWinner == undefined
  ) {
    TournamentData.menPlateWinner = "Male Plate Winner";
    TournamentData.womenPlateWinner = "Women Plate Winner";
  }

  if (TournamentData.menQuarterFinalist1 == undefined) {
    TournamentData.menQuarterFinalist1 = "Male Quarter Finalist";
    TournamentData.menQuarterFinalist2 = "Male Quarter Finalist";
    TournamentData.menQuarterFinalist3 = "Male Quarter Finalist";
    TournamentData.menQuarterFinalist4 = "Male Quarter Finalist";
    TournamentData.womenQuarterFinalist1 = "Female Quarter Finalist";
    TournamentData.womenQuarterFinalist2 = "Female Quarter Finalist";
    TournamentData.womenQuarterFinalist3 = "Female Quarter Finalist";
    TournamentData.womenQuarterFinalist4 = "Female Quarter Finalist";
  }

  try {
    await setDoc(doc(db, "tournaments", TournamentData.tournamentName), {
      ...TournamentData,
    });
    console.log("Document written with ID: ");
    const histories = collectTournamentMatches(TournamentData);
    updateMatches(histories);
    const matches = await getMatches();
    calculateRating(matches);
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

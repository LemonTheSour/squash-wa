import { doc, setDoc } from "firebase/firestore";
import { LeagueData, PlayerData, TournamentData } from "../types/database";
import {
  calculateRating,
  collectLeagueMatches,
  collectTournamentMatches,
  updateMatches,
} from "./updateRating";
import { db } from "../../../firebase/clientApp";
import getMatches from "./getMatches";

export async function addPlayer({ ...PlayerData }: PlayerData) {
  try {
    await setDoc(doc(db, "players", PlayerData.squashId), {
      ...PlayerData,
    });
    addMatch(PlayerData);
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}

export async function addLeague({ ...LeagueData }: LeagueData) {
  try {
    await setDoc(doc(db, "leagues", LeagueData.name), {
      ...LeagueData,
    });
    console.log("Document written with ID: ");
    const histories = collectLeagueMatches(LeagueData);
    updateMatches(histories);
    const matches = await getMatches();
    calculateRating(matches);
    return true;
  } catch {
    console.log("Error Adding Document ");
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
    await setDoc(doc(db, "matches", PlayerData.squashId), {
      playerId: PlayerData.squashId,
      matches: [],
    });
    console.log("Match Successfully Created");
    return true;
  } catch {
    console.log("Error adding Match");
    return false;
  }
}

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
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
import getMatches from "./getMatches";

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
    const leagueMatches = LeagueData.matches;
    const leaguePlayers: string[] = [];
    leagueMatches.forEach((match) => {
      if (leaguePlayers.indexOf(match.player1) === -1) {
        leaguePlayers.push(match.player1);
      }
      if (leaguePlayers.indexOf(match.player2) === -1) {
        leaguePlayers.push(match.player2);
      }
    });

    // Update the players rating
    const querySnapshot = await getDocs(
      collection(db, "matches/1337/matchHistory")
    );

    const playerMatches: History[] = [];

    // Fetch players match history
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        playerMatches.push({
          points: doc.data().points,
          event: doc.data().event,
          placement: doc.data().placement,
        });
      }
    });

    // Calculate rating of one player
    let rating = 0;
    playerMatches.forEach((match) => {
      rating += match.points;
    });

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

import { db } from "../../../firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { TournamentData, LeagueData, PlayerData } from "../types/database";
import {
  alterMatches,
  collectLeagueMatches,
  updateMatches,
} from "./updateRating";
import { collectLeaguePlayers, updatePlayersRating } from "./utilities";

export async function UpdateTournaments({ ...TournamentData }: TournamentData) {
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
    await updateDoc(doc(db, "tournaments", TournamentData.tournamentName), {
      ...TournamentData,
    });

    console.log("Tournament Succesfully Created");
    return true;
  } catch {
    console.log("Error Creating Tournament");
    return false;
  }
}

export async function updateLeague({ ...LeagueData }: LeagueData) {
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

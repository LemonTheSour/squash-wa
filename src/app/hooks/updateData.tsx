import { db } from "../../../firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { TournamentData, LeagueData, PlayerData } from "../types/database";

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
  try {
    await updateDoc(doc(db, "leagues", LeagueData.name), {
      ...LeagueData,
    });
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
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

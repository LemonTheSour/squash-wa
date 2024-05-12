import { doc, setDoc } from "firebase/firestore";
import { LeagueData, PlayerData, TournamentData } from "../types/database";
import { db } from "../../../firebase/clientApp";

export async function addPlayer({
  firstName,
  lastName,
  gender,
  region,
  rating,
  squashId,
}: PlayerData) {
  try {
    await setDoc(doc(db, "players", squashId), {
      squashId: squashId,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      region: region,
      rating: rating,
    });
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}

export async function addLeague({
  name,
  date,
  division,
  position,
  player1,
  player2,
  games1,
  games2,
}: LeagueData) {
  try {
    await setDoc(doc(db, "leagues", name), {
      name: name,
      date: date,
      division: division,
      position: position,
      player1: player1,
      player2: player2,
      player1Games: games1,
      player2Games: games2,
    });
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}

export async function addTournament({
  tournamentName,
  date,
  gender,
  menSize,
  womenSize,
  menLevel,
  womenLevel,
  menWinner,
  menRunnerUp,
  menSemiFinalist1,
  menSemiFinalist2,
  menQuarterFinalist1,
  menQuarterFinalist2,
  menQuarterFinalist3,
  menQuarterFinalist4,
  menPlateWinner,
  womenWinner,
  womenRunnerUp,
  womenSemiFinalist1,
  womenSemiFinalist2,
  womenQuarterFinalist1,
  womenQuarterFinalist2,
  womenQuarterFinalist3,
  womenQuarterFinalist4,
  womenPlateWinner,
}: TournamentData) {
  if (menPlateWinner == undefined || womenPlateWinner == undefined) {
    menPlateWinner = "Male Plate Winner";
    womenPlateWinner = "Women Plate Winner";
  }

  if (menQuarterFinalist1 == undefined) {
    menQuarterFinalist1 = "Male Quarter Finalist";
    menQuarterFinalist2 = "Male Quarter Finalist";
    menQuarterFinalist3 = "Male Quarter Finalist";
    menQuarterFinalist4 = "Male Quarter Finalist";
    womenQuarterFinalist1 = "Female Quarter Finalist";
    womenQuarterFinalist2 = "Female Quarter Finalist";
    womenQuarterFinalist3 = "Female Quarter Finalist";
    womenQuarterFinalist4 = "Female Quarter Finalist";
  }

  try {
    await setDoc(doc(db, "tournaments", tournamentName), {
      tournamentName: tournamentName,
      date: date,
      gender: gender,
      menSize: menSize,
      womenSize: womenSize,
      menLevel: menLevel,
      womenLevel: womenLevel,
      menWinner: menWinner,
      menRunnerUp: menRunnerUp,
      menSemiFinalist1: menSemiFinalist1,
      menSemiFinalist2: menSemiFinalist2,
      menQuarterFinalist1: menQuarterFinalist1,
      menQuarterFinalist2: menQuarterFinalist2,
      menQuarterFinalist3: menQuarterFinalist3,
      menQuarterFinalist4: menQuarterFinalist4,
      menPlateWinner: menPlateWinner,
      womenWinner: womenWinner,
      womenRunnerUp: womenRunnerUp,
      womenSemiFinalist1: womenSemiFinalist1,
      womenSemiFinalist2: womenSemiFinalist2,
      womenQuarterFinalist1: womenQuarterFinalist1,
      womenQuarterFinalist2: womenQuarterFinalist2,
      womenQuarterFinalist3: womenQuarterFinalist3,
      womenQuarterFinalist4: womenQuarterFinalist4,
      womenPlateWinner: womenPlateWinner,
    });
    console.log("Document written with ID: ");
    return true;
  } catch {
    console.log("Error Adding Document ");
    return false;
  }
}

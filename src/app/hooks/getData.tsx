import {
  collection,
  query,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import {
  MatchData,
  PlayerData,
  LeagueData,
  TournamentData,
} from "../types/database";

export async function getPlayersByGender(gender: string) {
  const playerData: PlayerData[] = [];
  const q = query(collection(db, "players"), where("gender", "==", gender));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    playerData.push({
      squashId: doc.data().squashId,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      region: doc.data().region,
      gender: doc.data().gender,
      rating: doc.data().rating,
    });
  });

  playerData.sort((a, b) => Number(b.rating) - Number(a.rating));
  return playerData;
}

export async function getPlayers() {
  const playerData: PlayerData[] = [];
  const q = query(collection(db, "players"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    playerData.push({
      squashId: doc.data().squashId,
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      region: doc.data().region,
      gender: doc.data().gender,
      rating: doc.data().rating,
    });
  });
  playerData.sort((a, b) => b.rating - a.rating);
  return playerData;
}

export async function getPlayerIds() {
  const ids: string[] = [];
  const q = query(collection(db, "players"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ids.push(doc.data().squashId);
  });
  return ids;
}

export async function getLeagues() {
  const leagueData: LeagueData[] = [];
  const q = query(collection(db, "leagues"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    leagueData.push({
      name: doc.data().name,
      date: doc.data().date.toDate(),
      matches: doc.data().matches,
    });
  });
  return leagueData;
}

export async function getMatches() {
  const matchData: MatchData[] = [];
  const q = query(collection(db, "matches"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    matchData.push({
      playerId: doc.data().playerId,
      matches: doc.data().matches,
    });
  });
  return matchData;
}

export async function getTournaments() {
  const tournamentData: TournamentData[] = [];
  const q = query(collection(db, "tournaments"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tournamentData.push({
      tournamentName: doc.data().tournamentName,
      matchId: doc.data().matchId,
      date: doc.data().date,
      gender: doc.data().gender,
      menSize: doc.data().menSize,
      womenSize: doc.data().womenSize,
      menLevel: doc.data().menLevel,
      womenLevel: doc.data().womenLevel,
      menWinner: doc.data().menWinner,
      menRunnerUp: doc.data().menRunnerUp,
      menSemiFinalist1: doc.data().menSemiFinalist1,
      menSemiFinalist2: doc.data().menSemiFinalist2,
      menQuarterFinalist1: doc.data().menQuarterFinalist1,
      menQuarterFinalist2: doc.data().menQuarterFinalist2,
      menQuarterFinalist3: doc.data().menQuarterFinalist3,
      menQuarterFinalist4: doc.data().menQuarterFinalist4,
      menPlateWinner: doc.data().menPlateWinner,
      womenWinner: doc.data().womenWinner,
      womenRunnerUp: doc.data().womenRunnerUp,
      womenSemiFinalist1: doc.data().womenSemiFinalist1,
      womenSemiFinalist2: doc.data().womenSemiFinalist2,
      womenQuarterFinalist1: doc.data().womenQuarterFinalist1,
      womenQuarterFinalist2: doc.data().womenQuarterFinalist2,
      womenQuarterFinalist3: doc.data().womenQuarterFinalist3,
      womenQuarterFinalist4: doc.data().womenQuarterFinalist4,
      womenPlateWinner: doc.data().womenPlateWinner,
    });
  });
  return tournamentData;
}

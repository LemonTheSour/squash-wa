import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { TournamentData } from "../types/database";

export default async function getTournaments() {
  const tournamentData: TournamentData[] = [];
  const q = query(collection(db, "tournaments"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tournamentData.push({
      tournamentName: doc.data().tournamentName,
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

import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

type leagueData = {
  name: string;
  date: string;
  division: string;
  position: string;
  player1: string;
  player2: string;
  games1: string;
  games2: string;
};

export default async function getLeagues() {
  const leagueData: leagueData[] = [];
  const q = query(collection(db, "leagues"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    leagueData.push({
      name: doc.data().name,
      date: doc.data().date,
      division: doc.data().division,
      position: doc.data().position,
      player1: doc.data().player1,
      player2: doc.data().player2,
      games1: doc.data().games1,
      games2: doc.data().games2,
    });
  });
  return leagueData;
}

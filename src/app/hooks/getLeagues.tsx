import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

type leagueData = {
  name: string;
  date: string;
  matches: {
    division: string;
    position: string;
    player1: string;
    player2: string;
    games1: string;
    games2: string;
  }[];
};

export default async function getLeagues() {
  const leagueData: leagueData[] = [];
  const q = query(collection(db, "leagues"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    leagueData.push({
      name: doc.data().name,
      date: doc.data().date,
      matches: doc.data().matches,
    });
  });
  return leagueData;
}

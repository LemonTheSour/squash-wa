import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";
import { MatchData } from "../types/database";

export default async function getPlayers() {
  const matchData: MatchData[] = [];
  const q = query(collection(db, "matches"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    matchData.push({
      playerId: doc.data().playerId,
      match: doc.data().match,
    });
  });

  return matchData;
}

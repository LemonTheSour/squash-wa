import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

type playerData = {
  squashId: string;
  firstName: string;
  lastName: string;
  gender: string;
  region: string;
  rating: string;
};

export default async function getPlayerData(gender: string) {
  const playerData: playerData[] = [];
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
  return playerData;
}

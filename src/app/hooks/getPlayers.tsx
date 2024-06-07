import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

type playerData = {
  squashId: string;
  firstName: string;
  lastName: string;
  gender: string;
  region: string;
  rating: number;
};

export default async function getPlayers() {
  const playerData: playerData[] = [];
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

export async function getPlayers2() {
  const playerRef = collection(db, "players");
  const playerSnapshot = onSnapshot(playerRef, (snapshot) => {
    const playerData = snapshot.docs.map((doc) => {
      return { ...doc.data() };
    });
    return playerData;
  });
  return playerSnapshot;
}

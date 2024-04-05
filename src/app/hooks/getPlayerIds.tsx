import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

export default async function getPlayerIds() {
  const ids: string[] = [];
  const q = query(collection(db, "players"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    ids.push(doc.data().squashId);
  });
  return ids;
}

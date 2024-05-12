import { doc, setDoc } from "firebase/firestore";
import { PlayerData } from "../types/database";
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

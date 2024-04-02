import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/clientApp";

type maleData = {
  firstName: string;
  lastName: string;
  gender: string;
  region: string;
  rating: string;
};

export default async function getMaleData() {
  const maleData: maleData[] = [];
  const q = query(collection(db, "players"), where("gender", "==", "Male"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());

    maleData.push({
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      region: doc.data().region,
      gender: doc.data().gender,
      rating: doc.data().rating,
    });
  });
  return maleData;
}

"use client";

import TournamentCard from "./tournamentcard";
import AddButton from "../addbutton";
import Modal from "../modal";
import { useEffect, useState } from "react";
import TournamentForm from "./tournamentform";
import { PlayerData, TournamentData } from "@/app/types/database";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import { separateGenders } from "@/app/hooks/utilities";

interface TournamentProps {
  TournamentData: TournamentData[];
  PlayerData: PlayerData[];
}

export default function Tournaments({
  TournamentData,
  PlayerData,
}: TournamentProps) {
  const [openModal, setOpenModal] = useState(false);

  const [PlayerData2, setPlayerData2] = useState<PlayerData[]>(PlayerData);
  const MaleData = separateGenders(PlayerData2, "Male");
  const FemaleData = separateGenders(PlayerData2, "Female");
  const [TournamentData2, setTournamentData2] =
    useState<TournamentData[]>(TournamentData);

  useEffect(() => {
    const dataRef = collection(db, "players");
    console.log(dataRef);
    const unsub = onSnapshot(dataRef, (snapshot) => {
      const newData: PlayerData[] = [];
      snapshot.docs.map((doc) => newData.push(doc.data() as PlayerData));
      newData.sort((a, b) => b.rating - a.rating);
      setPlayerData2(newData);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const dataRef = collection(db, "tournaments");
    console.log(dataRef);
    const unsub = onSnapshot(dataRef, (snapshot) => {
      const newData: TournamentData[] = [];
      snapshot.docs.map((doc) => newData.push(doc.data() as TournamentData));
      setTournamentData2(newData);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col w-1/3 mx-2">
      <div className="flex justify-between items-center mt-2 px-2 ">
        <div className="text-3xl text-center">Tournaments</div>
        <div className="w-1/4">
          <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
        </div>
      </div>

      <div className=" mt-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {TournamentData2.map((tournament, index) => (
          <div key={index}>
            <TournamentCard
              data={tournament}
              maleData={MaleData}
              femaleData={FemaleData}
            />
          </div>
        ))}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <TournamentForm maleData={MaleData} femaleData={FemaleData} />
      </Modal>
    </div>
  );
}

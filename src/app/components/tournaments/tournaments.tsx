"use client";

import AddButton from "../addbutton";
import Modal from "../modal";
import { useEffect, useState } from "react";
import TournamentForm from "./tournamentform";
import { PlayerData, TournamentData } from "@/app/types/database";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import { separateGenders } from "@/app/hooks/utilities";
import TournamentTable from "./tournamentTable";

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
    const unsub = onSnapshot(dataRef, (snapshot) => {
      const newData: TournamentData[] = [];
      snapshot.docs.map((doc) => newData.push(doc.data() as TournamentData));
      setTournamentData2(newData);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col w-1/2 mx-2">
      <div className="text-3xl text-center">Tournaments</div>

      <div className="w-1/6">
        <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
      </div>

      <TournamentTable
        tournamentData={TournamentData2}
        playerData={PlayerData2}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <TournamentForm
          maleData={MaleData}
          femaleData={FemaleData}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

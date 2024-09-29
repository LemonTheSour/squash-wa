"use client";

import AddButton from "../addbutton";
import { useEffect, useState } from "react";
import Modal from "../modal";
import LeagueForm from "./leagueform";
import { PlayerData, LeagueData } from "@/app/types/database";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";
import LeagueTable from "./leagueTable";

interface LeagueProps {
  LeagueData: LeagueData[];
  PlayerData: PlayerData[];
}

export default function Tournaments({ LeagueData, PlayerData }: LeagueProps) {
  const [openModal, setOpenModal] = useState(false);
  const [PlayerData2, setPlayerData2] = useState<PlayerData[]>(PlayerData);
  const [LeagueData2, setLeagueData2] = useState<LeagueData[]>(LeagueData);
  // PLAYER DATA 2 AND LEAGUE DATA 2 NEED TO BE REWORKED, THE FUNCTIONS WORK GREAT
  // THE VARIABLE NAMES ARE LACKLUSTRE AND POTENTIALLY WORTHLESS

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
    const dataRef = collection(db, "leagues");
    const unsub = onSnapshot(dataRef, (snapshot) => {
      const newData: LeagueData[] = [];
      snapshot.docs.map((doc) => newData.push(doc.data() as LeagueData));
      setLeagueData2(newData);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col w-1/2 mx-2">
      <div className="text-3xl text-center">Leagues</div>

      <div className="w-1/6">
        <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
      </div>

      <LeagueTable LeagueData={LeagueData2} PlayerData={PlayerData2} />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <LeagueForm
          PlayerData={PlayerData2}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

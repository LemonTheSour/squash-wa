"use client";

import LeagueCard from "./leaguecard";
import AddButton from "../addbutton";
import { useEffect, useState } from "react";
import Modal from "../modal";
import LeagueForm from "./leagueform";
import { PlayerData, LeagueData } from "@/app/types/database";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/clientApp";

interface LeagueProps {
  LeagueData: LeagueData[];
  PlayerData: PlayerData[];
}

export default function Tournaments({ LeagueData, PlayerData }: LeagueProps) {
  const [openModal, setOpenModal] = useState(false);
  const [PlayerData2, setPlayerData2] = useState<PlayerData[]>(PlayerData);
  const [LeagueData2, setLeagueData2] = useState<LeagueData[]>(LeagueData);

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
    const dataRef = collection(db, "leagues");
    console.log(dataRef);
    const unsub = onSnapshot(dataRef, (snapshot) => {
      const newData: LeagueData[] = [];
      snapshot.docs.map((doc) => newData.push(doc.data() as LeagueData));
      setLeagueData2(newData);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col w-1/3 mx-2 mt-8">
      <div className="flex justify-between items-center mt-2 px-2">
        <div className="text-3xl text-center">Leagues</div>
        <div className="w-1/4">
          <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
        </div>
      </div>

      <div className="mt-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {LeagueData2.map((league, index) => (
          <div key={index}>
            <LeagueCard DefaultValues={league} PlayerData={PlayerData2} />
          </div>
        ))}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <LeagueForm PlayerData={PlayerData2} />
      </Modal>
    </div>
  );
}

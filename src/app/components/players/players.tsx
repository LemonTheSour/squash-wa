"use client";

import AddButton from "../addbutton";
import Modal from "../modal";
import AddPlayerForm from "./addplayerform";
import { PlayerData } from "@/app/types/database";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase/clientApp";
import { collection, onSnapshot } from "firebase/firestore";
import PlayerTable from "./playerTable";

interface PlayerProps {
  PlayerData: PlayerData[];
}

export default function Players({ PlayerData }: PlayerProps) {
  const [openModal, setOpenModal] = useState(false);
  const [PlayerData2, setPlayerData2] = useState<PlayerData[]>(PlayerData);
  //  YOU MUST USE PLAYERDATA2 TO LIVE UPDATE THE DATA, COME BACK TO THIS
  //  AND MAKE IT NOT AWFUL DOWN THE LINE
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

  return (
    <div className="flex flex-col w-1/2 mx-2">
      <div className="text-3xl text-center">Players</div>
      <div className="w-1/6">
        <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
      </div>

      <PlayerTable PlayerData={PlayerData2} />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddPlayerForm
          PlayerData={PlayerData2}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

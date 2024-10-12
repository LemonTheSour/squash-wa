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
  const [playerDataUpdate, setPlayerDataUpdate] =
    useState<PlayerData[]>(PlayerData);

  useEffect(() => {
    const dataRef = collection(db, "players");
    const unsub = onSnapshot(dataRef, (snapshot) => {
      const newData: PlayerData[] = [];
      snapshot.docs.map((doc) => newData.push(doc.data() as PlayerData));
      newData.sort((a, b) => b.rating - a.rating);
      setPlayerDataUpdate(newData);
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col w-1/2 mx-2">
      <div className="text-3xl text-center">Players</div>
      <div className="w-1/6">
        <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
      </div>

      <PlayerTable PlayerData={playerDataUpdate} />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddPlayerForm
          PlayerData={playerDataUpdate}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

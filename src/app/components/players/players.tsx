"use client";

import AddButton from "../addbutton";
import AdminPlayerCard from "./adminplayercard";
import Modal from "../modal";
import AddPlayerForm from "./addplayerform";
import { PlayerData } from "@/app/types/database";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase/clientApp";
import { collection, onSnapshot } from "firebase/firestore";
import PlayerTable from "./playerTable";
import EditPlayerForm from "./editplayerform";

interface PlayerProps {
  PlayerData: PlayerData[];
}

export default function Players({ PlayerData }: PlayerProps) {
  const [openModal, setOpenModal] = useState(false);
  const [PlayerData2, setPlayerData2] = useState<PlayerData[]>(PlayerData);

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

      {/** 
      <div className="mt-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {PlayerData2.map((player, index) => (
          <div key={index}>
            <AdminPlayerCard data={player} />
          </div>
        ))}
      </div>
      */}

      <PlayerTable
        PlayerData={PlayerData}
        onClick={() => setOpenModal(!openModal)}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddPlayerForm
          PlayerData={PlayerData2}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

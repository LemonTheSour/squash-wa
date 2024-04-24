"use client";
import { useState } from "react";
import AddButton from "../addbutton";
import AdminPlayerCard from "./adminplayercard";
import Modal from "../modal";
import AddPlayerForm from "./addplayerform";
import { PlayerData } from "@/app/types/database";

interface PlayerProps {
  data: PlayerData[];
}

export default function Players({ data }: PlayerProps) {
  const [openModal, setOpenModal] = useState(false);
  data.sort((a, b) => Number(b.rating) - Number(a.rating));
  return (
    <div className="flex flex-col w-1/3 mt-8 mx-2">
      <div className="flex justify-between items-center mt-2 px-2">
        <div className="text-3xl text-center">Players</div>
        <div className="w-1/4">
          <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
        </div>
      </div>

      <div className="mt-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {data.map((player, index) => (
          <div key={index}>
            <AdminPlayerCard data={player} position={index + 1} />
          </div>
        ))}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddPlayerForm />
      </Modal>
    </div>
  );
}

"use client";
import { useState } from "react";
import AddButton from "../addbutton";
import AdminPlayerCard from "./adminplayercard";
import Modal from "../modal";
import AddPlayerForm from "./addplayerform";

interface PlayerData {
  position: string;
  firstName: string;
  lastName: string;
  gender: string;
  rating: string;
  squashId: string;
  region: string;
}

interface PlayerProps {
  data: PlayerData[];
}

export default function Players({ data }: PlayerProps) {
  const [openModal, setOpenModal] = useState(false);

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
            <AdminPlayerCard {...player} />
          </div>
        ))}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddPlayerForm />
      </Modal>
    </div>
  );
}

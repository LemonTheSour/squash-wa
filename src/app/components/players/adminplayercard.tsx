"use client";
import Modal from "../modal";
import { PlayerData } from "@/app/types/database";
import EditPlayerForm from "./editplayerform";
import { useState } from "react";

interface PlayerCardProps {
  data: PlayerData;
  position: number;
}

export default function AdminPlayerCard({ data, position }: PlayerCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div
        className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade"
        onClick={() => setOpenModal(!openModal)}
      >
        <div className="flex">
          {data.firstName} {data.lastName}
        </div>
        <div className="pr-2">{data.rating}</div>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditPlayerForm data={data} />
      </Modal>
    </div>
  );
}

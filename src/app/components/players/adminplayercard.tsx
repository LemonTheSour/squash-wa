"use client";
import Modal from "../modal";
import { PlayerData } from "@/app/types/database";
import EditPlayerForm from "./editplayerform";
import { useState } from "react";
import EditButton from "../editButton";

interface PlayerCardProps {
  data: PlayerData;
  position: number;
}

export default function AdminPlayerCard({ data, position }: PlayerCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade">
        <div className="flex">
          <div className="pr-2">{position} . </div>
          <div>
            {data.firstName} {data.lastName}
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="pr-2">{data.rating}</div>
          <EditButton onClick={() => setOpenModal(!openModal)} />
        </div>

        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <EditPlayerForm data={data} />
        </Modal>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import EditButton from "../editButton";
import Modal from "../modal";
import EditLeagueForm from "./editLeagueForm";
import { PlayerData, LeagueData } from "@/app/types/database";

interface Props {
  DefaultValues: LeagueData;
  PlayerData: PlayerData[];
}

export default function LeagueCard({ PlayerData, DefaultValues }: Props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div
        className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade"
        onClick={() => setOpenModal(!openModal)}
      >
        <div>{DefaultValues.name}</div>
        <div className="">{DefaultValues.date}</div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditLeagueForm DefaultValues={DefaultValues} PlayerData={PlayerData} />
      </Modal>
    </div>
  );
}

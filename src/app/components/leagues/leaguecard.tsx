"use client";

import { useState } from "react";
import EditButton from "../editButton";
import Modal from "../modal";
import EditLeagueForm from "./editLeagueForm";

export interface LeagueData {
  name: string;
  date: string;
  division: string;
  position: string;
  player1: string;
  player2: string;
  games1: string;
  games2: string;
}

export default function LeagueCard(LeagueData: LeagueData) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade">
        <div className="pr-8">{LeagueData.date}</div>
        <div>{LeagueData.name}</div>
        <EditButton onClick={() => setOpenModal(!openModal)} />
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        Test
      </Modal>
    </div>
  );
}

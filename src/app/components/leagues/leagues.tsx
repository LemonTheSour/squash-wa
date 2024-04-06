"use client";

import { LeagueData } from "./leaguecard";
import LeagueCard from "./leaguecard";
import AddButton from "../addbutton";
import { useState } from "react";
import Modal from "../modal";
import LeagueForm from "./leagueform";

interface PlayerData {
  squashId: string;
  firstName: string;
  lastName: string;
  gender: string;
  region: string;
  rating: string;
}

interface LeagueProps {
  LeagueData: LeagueData[];
  PlayerData: PlayerData[];
}

export default function Tournaments({ LeagueData, PlayerData }: LeagueProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col w-1/3 mx-2 mt-8">
      <div className="flex justify-between items-center mt-2 px-2">
        <div className="text-3xl text-center">Leagues</div>
        <div className="w-1/4">
          <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
        </div>
      </div>

      <div className="mt-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {LeagueData.map((league, index) => (
          <div key={index}>
            <LeagueCard {...league} />
          </div>
        ))}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <LeagueForm PlayerData={PlayerData} />
      </Modal>
    </div>
  );
}

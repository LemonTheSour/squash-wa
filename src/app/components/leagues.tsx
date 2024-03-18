"use client";

import { LeagueData } from "./leaguecard";
import LeagueCard from "./leaguecard";
import AddButton from "./addbutton";
import { useState } from "react";
import Modal from "./modal";

interface LeagueProps {
  data: LeagueData[];
}

export default function Tournaments({ data }: LeagueProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col w-1/3 mx-2">
      <div className="flex justify-between items-center mt-2 px-2">
        <div className="text-3xl text-center">Leagues</div>
        <div className="w-1/4">
          <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
        </div>
      </div>

      <div className="m-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {data.map((league) => (
          <div key={league.id}>
            <LeagueCard name={league.name} date={league.date} />
          </div>
        ))}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        Test
      </Modal>
    </div>
  );
}

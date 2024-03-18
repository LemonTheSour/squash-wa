"use client";

import { TournamentData } from "./tournamentcard";
import TournamentCard from "./tournamentcard";
import AddButton from "./addbutton";
import Modal from "./modal";
import { useState, createContext, useContext } from "react";

interface TournamentProps {
  data: TournamentData[];
}

export default function Tournaments({ data }: TournamentProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col w-1/3 mx-2">
      <div className="flex justify-between items-center mt-2 px-2 ">
        <div className="text-3xl text-center">Tournaments</div>
        <div className="w-1/4">
          <AddButton title="Add" onClick={() => setOpenModal(!openModal)} />
        </div>
      </div>

      <div className=" mt-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {data.map((tournament) => (
          <div key={tournament.id}>
            <TournamentCard name={tournament.name} date={tournament.date} />
          </div>
        ))}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        Test
      </Modal>
    </div>
  );
}

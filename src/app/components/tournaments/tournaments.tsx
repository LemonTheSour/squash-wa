"use client";

import TournamentCard from "./tournamentcard";
import AddButton from "../addbutton";
import Modal from "../modal";
import { useState } from "react";
import TournamentForm from "./tournamentform";
import { TournamentData } from "@/app/types/database";

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
        {data.map((tournament, index) => (
          <div key={index}>
            <TournamentCard data={tournament} />
          </div>
        ))}
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <TournamentForm />
      </Modal>
    </div>
  );
}

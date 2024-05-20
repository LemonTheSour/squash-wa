"use client";

import LeagueCard from "./leaguecard";
import AddButton from "../addbutton";
import { useMemo, useState } from "react";
import Modal from "../modal";
import LeagueForm from "./leagueform";
import { PlayerData, LeagueData } from "@/app/types/database";
import { FormProvider, useForm } from "react-hook-form";

interface LeagueProps {
  LeagueData: LeagueData[];
  PlayerData: PlayerData[];
}

export default function Tournaments({ LeagueData, PlayerData }: LeagueProps) {
  const [openModal, setOpenModal] = useState(false);
  const methods = useForm<LeagueData>();
  console.log(LeagueData);
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
            <LeagueCard DefaultValues={league} PlayerData={PlayerData} />
          </div>
        ))}
      </div>
      <FormProvider {...methods}>
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <LeagueForm PlayerData={PlayerData} />
        </Modal>
      </FormProvider>
    </div>
  );
}

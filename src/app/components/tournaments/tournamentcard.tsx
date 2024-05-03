import Modal from "../modal";
import EditButton from "../editButton";
import EditTournamentForm from "./edittournamentform";
import { TournamentData } from "@/app/types/database";
import { useState } from "react";

interface TournamentCardProps {
  data: TournamentData;
}

export default function TournamentCard({ data }: TournamentCardProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl">
      <div className="flex">
        <div className="pr-8">{data.date}</div>
        <div>{data.tournamentName}</div>
      </div>
      <EditButton onClick={() => setOpenModal(!openModal)} />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditTournamentForm data={data} />
      </Modal>
    </div>
  );
}

import Modal from "../modal";
import EditTournamentForm from "./edittournamentform";
import { PlayerData, TournamentData } from "@/app/types/database";
import { useState } from "react";

interface TournamentCardProps {
  data: TournamentData;
  maleData: PlayerData[];
  femaleData: PlayerData[];
}

export default function TournamentCard({
  data,
  maleData,
  femaleData,
}: TournamentCardProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div
        className="flex justify-between grid-cols-5 my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade"
        onClick={() => setOpenModal(!openModal)}
      >
        <div className="">{data.tournamentName}</div>
        <div className="">{data.date}</div>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditTournamentForm
          data={data}
          maleData={maleData}
          femaleData={femaleData}
        />
      </Modal>
    </div>
  );
}

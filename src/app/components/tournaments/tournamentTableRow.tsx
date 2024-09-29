import { PlayerData, TournamentData } from "@/app/types/database";
import { useState } from "react";
import Modal from "../modal";
import EditTournamentForm from "./edittournamentform";
import { separateGenders } from "@/app/hooks/utilities";

interface PlayerTableRowProps {
  tournamentData: TournamentData;
  playerData: PlayerData[];
}

export default function PlayerTableRow({
  tournamentData,
  playerData,
}: PlayerTableRowProps) {
  const [openModal, setOpenModal] = useState(false);
  const maleData = separateGenders(playerData, "Male");
  const femaleData = separateGenders(playerData, "Female");
  return (
    <tr key={tournamentData.tournamentName} className="border-b-2 border-grey">
      <td>{tournamentData.tournamentName}</td>
      <td>{tournamentData.date}</td>
      <td onClick={() => setOpenModal(!openModal)}>
        <button>Edit</button>
      </td>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditTournamentForm
          data={tournamentData}
          maleData={maleData}
          femaleData={femaleData}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </tr>
  );
}

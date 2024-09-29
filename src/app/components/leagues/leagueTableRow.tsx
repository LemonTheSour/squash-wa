import { LeagueData, PlayerData } from "@/app/types/database";
import { useState } from "react";
import Modal from "../modal";
import EditLeagueForm from "./editLeagueForm";

interface PlayerTableRowProps {
  leagueData: LeagueData;
  playerData: PlayerData[];
}

export default function PlayerTableRow({
  leagueData,
  playerData,
}: PlayerTableRowProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <tr key={leagueData.name} className="border-b-2 border-grey">
      <td>{leagueData.name}</td>
      <td>{leagueData.date}</td>
      <td onClick={() => setOpenModal(!openModal)}>
        <button>Edit</button>
      </td>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditLeagueForm
          DefaultValues={leagueData}
          PlayerData={playerData}
          onClose={() => setOpenModal(false)}
        />
      </Modal>
    </tr>
  );
}

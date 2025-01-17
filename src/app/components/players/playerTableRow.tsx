import { PlayerData } from "@/app/types/database";
import { useState } from "react";
import Modal from "../modal";
import EditPlayerForm from "./editplayerform";

interface PlayerTableRowProps {
  playerData: PlayerData;
}

export default function PlayerTableRow({ playerData }: PlayerTableRowProps) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <tr key={playerData.squashId} className="border-b-2 border-grey">
      <td>{playerData.firstName}</td>
      <td>{playerData.lastName}</td>
      <td>{playerData.squashId}</td>
      <td>{playerData.rating}</td>
      <td>{playerData.region}</td>
      <td>{playerData.gender}</td>
      <td
        onClick={() => setOpenModal(!openModal)}
        className="hover:bg-slate-200"
      >
        <button>Edit</button>
      </td>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <EditPlayerForm data={playerData} />
      </Modal>
    </tr>
  );
}

"use client";

import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import AddPlayerForm from "./editplayer";
import Modal from "../modal";

export default function EditOverlay() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setOpenModal(!openModal);
        }}
        className="flex justify-center items-center"
      >
        <AiFillEdit size={20} />
      </button>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <AddPlayerForm />
      </Modal>
    </div>
  );
}

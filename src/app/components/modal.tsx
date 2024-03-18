import { AiFillCloseSquare } from "react-icons/ai";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    isOpen && (
      <div className="flex justify-center items-center w-screen h-screen fixed inset-0 z-30 bg-slate-400/25">
        <div className="flex flex-col justify-center items-center bg-white rounded-lg w-1/2 h-1/2 relative">
          <div className="flex justify-end items-center p-2 h-8 w-full bg-yellow-400 absolute top-0 right-0 rounded-t-lg ">
            <button onClick={onClose}>
              <AiFillCloseSquare size={32} />
            </button>
          </div>
          <div className="flew-grow">{children}</div>
        </div>
      </div>
    )
  );
}

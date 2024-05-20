import { AiFillCloseSquare } from "react-icons/ai";
import { IconContext } from "react-icons";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  return (
    isOpen && (
      <div className="flex justify-center items-center w-screen h-screen fixed inset-0 z-30 bg-slate-400/25">
        <div className="items-center pt-10 bg-white rounded-lg w-1/2 relative">
          <div className="flex justify-end items-center p-2 h-8 w-full bg-yellow-400 absolute top-0 right-0 rounded-t-lg">
            <button onClick={onClose}>
              <IconContext.Provider value={{ className: "closeIcon" }}>
                <AiFillCloseSquare size={32} />
              </IconContext.Provider>
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    )
  );
}

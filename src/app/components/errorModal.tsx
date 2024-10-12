interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function ErrorModal({ children, isOpen, onClose }: ModalProps) {
  return (
    isOpen && (
      <div className="flex justify-center items-center w-screen h-screen fixed inset-0 z-30 bg-slate-400/25">
        <div className="flex flex-col justify-center items-center pt-10 bg-white rounded-lg w-1/4 relative">
          <div className="p-2 h-8 w-full bg-red-400 absolute top-0 right-0 rounded-t-lg"></div>
          <div className="flex justify-center items-center w-full">
            {children}
          </div>
          <button
            onClick={onClose}
            className="border-1 border-black hover:bg-slate-200 rounded-lg px-4 m-2"
          >
            Ok
          </button>
        </div>
      </div>
    )
  );
}

import { IoIosAdd } from "react-icons/io";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

export default function AddButton({ title, onClick }: ButtonProps) {
  return (
    <button
      className="flex justify-center items-center w-full bg-yellow-300 rounded-md hover:bg-yellow-200 "
      onClick={onClick}
    >
      <div className="text-xl">{title}</div>
      <IoIosAdd size={32} />
    </button>
  );
}

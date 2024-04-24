import { AiFillEdit } from "react-icons/ai";

interface ButtonProps {
  onClick: () => void;
}

export default function EditButton({ onClick }: ButtonProps) {
  return (
    <button className="" onClick={onClick}>
      <AiFillEdit size={20} />
    </button>
  );
}

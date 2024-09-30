interface DividerProps {
  title: string;
}

export default function Divider({ title }: DividerProps) {
  return (
    <div className="flex flex-col pt-8 items-center text-2xl">
      <div>{title}</div>
      <hr className="w-5/6 border-black" />
    </div>
  );
}

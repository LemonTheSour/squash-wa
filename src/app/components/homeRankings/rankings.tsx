import HomePlayerCard from "./homePlayerCard";
import { PlayerData } from "@/app/types/database";

interface RankingProps {
  title: string;
  data: PlayerData[];
}

export default function Rankings({ title, data }: RankingProps) {
  return (
    <div className="flex flex-col w-1/4">
      <div className="text-center text-3xl">{title}</div>
      <div className="mx-12 my-2 p-4 border-2 border-grey-200 rounded-xl">
        {data.map((player, index) => (
          <div key={player.squashId}>
            <HomePlayerCard position={index + 1} {...player} />
          </div>
        ))}
      </div>
    </div>
  );
}

import PlayerCard from "./playercard";

interface PlayerData {
  id: string;
  name: string;
  rating: string;
}

interface RankingProps {
  title: string;
  data: PlayerData[];
}

export default function Rankings({ title, data }: RankingProps) {
  return (
    <div className="flex flex-col w-1/4">
      <div className="text-center text-3xl">{title}</div>
      <div className="mx-12 my-2 p-4 border-2 border-grey-200 rounded-xl">
        {data.map((player) => (
          <div key={player.id}>
            <PlayerCard
              name={player.name}
              rating={player.rating}
              position={player.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

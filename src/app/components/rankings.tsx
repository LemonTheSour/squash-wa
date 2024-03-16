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
    <div>
      <div>{title}</div>
      {data.map((player) => (
        <div key={player.id}>
          <div>{player.name}</div>
          <div>{player.rating}</div>
        </div>
      ))}
      <div>Rankings</div>
    </div>
  );
}

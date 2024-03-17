export interface LeagueData {
  id: string;
  name: string;
  date: string;
  division: number;
  position: number;
  player1: string;
  player2: string;
  games: number;
}

interface LeagueCardProps {
  name: string;
  date: String;
}

export default function LeagueCard({ name, date }: LeagueCardProps) {
  return (
    <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl">
      <div className="flex">
        <div className="pr-8">{date}</div>
        <div>{name}</div>
      </div>
      <div>Edit/Delete</div>
    </div>
  );
}

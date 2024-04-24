export interface TournamentData {
  id: string;
  name: string;
  date: string;
  gender: string;
  level: string;
  size: number;
  playersMen: string[];
  playersWomen: string[];
}

interface TournamentCardProps {
  name: string;
  date: string;
}

export default function TournamentCard({ name, date }: TournamentCardProps) {
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

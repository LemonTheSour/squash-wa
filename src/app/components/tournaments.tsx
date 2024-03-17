import { TournamentData } from "./tournamentcard";
import TournamentCard from "./tournamentcard";

interface TournamentProps {
  data: TournamentData[];
}
export default function Tournaments({ data }: TournamentProps) {
  return (
    <div className="flex flex-col justify-center items-center w-1/3 mx-2">
      <div>Tournaments</div>
      <div className="m-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {data.map((tournament) => (
          <div key={tournament.id}>
            <TournamentCard name={tournament.name} date={tournament.date} />
          </div>
        ))}
      </div>
    </div>
  );
}

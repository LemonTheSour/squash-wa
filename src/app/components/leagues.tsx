import { LeagueData } from "./leaguecard";
import LeagueCard from "./leaguecard";

interface LeagueProps {
  data: LeagueData[];
}
export default function Tournaments({ data }: LeagueProps) {
  return (
    <div className="flex flex-col justify-center items-center w-1/3 mx-2">
      <div>Leagues</div>
      <div className="m-2 p-4 border-2 border-grey-200 rounded-xl w-full">
        {data.map((league) => (
          <div key={league.id}>
            <LeagueCard name={league.name} date={league.date} />
          </div>
        ))}
      </div>
    </div>
  );
}

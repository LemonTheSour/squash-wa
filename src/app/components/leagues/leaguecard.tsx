export interface LeagueData {
  name: string;
  date: string;
  division: string;
  position: string;
  player1: string;
  player2: string;
  games1: string;
  games2: string;
}

export default function LeagueCard(LeagueData: LeagueData) {
  return (
    <div className="flex justify-between my-2 p-2 border-2 border-grey-200 rounded-xl hover:bg-shade">
      <div className="pr-8">{LeagueData.date}</div>
      <div>{LeagueData.name}</div>
      <div>Edit/Delete</div>
    </div>
  );
}

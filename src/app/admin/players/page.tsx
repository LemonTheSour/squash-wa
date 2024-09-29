import PlayersTable from "@/app/components/players/players";
import { getPlayers } from "@/app/hooks/getData";

const AllPlayers = await getPlayers();
export default function Players() {
  return (
    <div className="flex flex-col justify-center items-center pt-20">
      <PlayersTable PlayerData={AllPlayers} />
    </div>
  );
}

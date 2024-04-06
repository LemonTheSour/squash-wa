import Rankings from "./components/homeRankings/rankings";
import getPlayerData from "./hooks/getPlayerData";

const MaleData = await getPlayerData("Male");
const FemaleData = await getPlayerData("Female");

MaleData.sort((a, b) => Number(b.rating) - Number(a.rating));
FemaleData.sort((a, b) => Number(b.rating) - Number(a.rating));

export default function Home() {
  return (
    <main className="flex justify-center pt-10">
      <Rankings title="Men" data={MaleData} />
      <Rankings title="Women" data={FemaleData} />
    </main>
  );
}

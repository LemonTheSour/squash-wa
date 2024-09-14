import Rankings from "./components/homeRankings/rankings";
import { getPlayersByGender } from "./hooks/getData";

const MaleData = await getPlayersByGender("Male");
const FemaleData = await getPlayersByGender("Female");

export default function Home() {
  return (
    <main className="flex justify-center pt-10">
      <Rankings title="Men" data={MaleData} />
      <Rankings title="Women" data={FemaleData} />
    </main>
  );
}

import Rankings from "./components/rankings";
import MensData from "./data/men.json";
import WomensData from "./data/women.json";
import getMaleData from "./hooks/getMaleData";

const MaleData = getMaleData();

export default function Home() {
  return (
    <main className="flex justify-center pt-10">
      <Rankings title="Men" data={MensData} />
      <Rankings title="Women" data={WomensData} />
    </main>
  );
}

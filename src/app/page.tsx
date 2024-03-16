import Rankings from "./components/rankings";
import MensData from "./data/men.json";

export default function Home() {
  return (
    <main className="flex justify-center pt-10">
      <Rankings title="Men" data={MensData} />
    </main>
  );
}

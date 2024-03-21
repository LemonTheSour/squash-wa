import { SessionProvider } from "next-auth/react";
import Rankings from "./components/rankings";
import MensData from "./data/men.json";
import WomensData from "./data/women.json";

export default function Home() {
  return (
    <main className="flex justify-center pt-10">
      <Rankings title="Men" data={MensData} />
      <Rankings title="Women" data={WomensData} />
    </main>
  );
}

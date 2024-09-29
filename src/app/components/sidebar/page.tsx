import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="flex bg-gold h-full w-1/6 absolute">
      <ul className="pl-6 pt-10">
        <li>
          <Link href="/admin/players">Players</Link>
        </li>
        <li>
          <Link href="/admin/leagues">Leagues</Link>
        </li>
        <li>
          <Link href="/admin/tournaments">Tournaments</Link>
        </li>
        <li>
          <Link href="/admin/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

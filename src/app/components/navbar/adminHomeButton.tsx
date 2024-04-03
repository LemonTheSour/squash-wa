import Link from "next/link";

export default function AdminHomeButton() {
  return (
    <Link href="/admin">
      <div className="flex justify-center items-center w-full h-8 bg-yellow-300 rounded-md hover:bg-yellow-200">
        Admin
      </div>
    </Link>
  );
}

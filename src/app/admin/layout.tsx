import Link from "next/link";
import Sidebar from "../components/sidebar/page";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}

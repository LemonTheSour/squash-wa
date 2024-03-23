"use client";
import { useRouter } from "next/navigation";

export default function HomeButton() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="text-3xl font-bold"
      >
        SQUASH WA
      </button>
    </div>
  );
}

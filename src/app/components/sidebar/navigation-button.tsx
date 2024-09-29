import Link from "next/link";

interface NavigationButtonProps {
  href: string;
  title: string;
  isActive: boolean;
}

export default function NavigationButton({
  href,
  title,
  isActive,
}: NavigationButtonProps) {
  return (
    <Link href={href}>
      <li
        className={
          isActive
            ? "text-2xl pl-2 text-white rounded-l-xl bg-black"
            : "text-2xl pl-2 hover:text-white"
        }
      >
        {title}
      </li>
    </Link>
  );
}

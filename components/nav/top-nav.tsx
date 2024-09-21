import Link from "next/link";
import Image from "next/image";

import { ModeToggle } from "@/components/nav/mode-toggle";

export default function TopNav() {
  return (
    <nav className="flex justify-between items-center p-1 shadow">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
      </Link>
      <ModeToggle />
    </nav>
  );
}
import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen overflow-y-auto">
      <Link href="/resume/create">
        <Button>Start createing ai powered resume</Button>
      </Link>
    </div>
  );
}

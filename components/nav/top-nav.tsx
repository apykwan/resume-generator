'use client';

import Link from "next/link";
import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

import { ModeToggle } from "@/components/nav/mode-toggle";
import { useUser } from '@clerk/nextjs';

export default function TopNav() {
  const { isSignedIn, user } = useUser()

  return (
    <nav className="flex justify-between items-center p-1 shadow">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
      </Link>

      <Toaster />

      <div className="flex justify-end items-center gap-2">
        {isSignedIn && (
          <Link href="/dashboard">
            {user?.fullName}'s Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </nav>
  );
}
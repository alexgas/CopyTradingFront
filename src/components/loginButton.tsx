"use client";

import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex flex-col gap-2 items-center">
        Signed in as {session.user?.email} <br />
        <Button
          className="bg-white text-black md:bg-black md:text-white text-lg"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 items-center">
      <Button
        className="bg-white text-black md:bg-black md:text-white text-lg"
        onClick={() => signIn()}
      >
        <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
        Login
      </Button>
      <span className="md:text-black">With Google</span>
    </div>
  );
}

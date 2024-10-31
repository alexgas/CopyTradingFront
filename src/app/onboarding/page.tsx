"use client";

import { useUserContext } from "@/app/hooks/useUser";
import ModalNickname from "@/components/modals/modalNickname";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home({ params }: { params: { userNick: string } }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setActualUser, actualUser } = useUserContext();
  console.log("render onboarding page");
  
  if(session){
    console.log("session", session)
    if(session.user.nickName)
      redirect("/edit/" + session.user.nickName);
  }

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center content-center">
        {"Loading onboarding"}
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex justify-center content-center">
        {"Error loading profile"}
      </div>
    );
  }

  return (
    <div className="max-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full h-full overflow-auto flex gap-8 row-start-2 justify-between">
      <ModalNickname />
      </main>
    
    </div>
  );
}

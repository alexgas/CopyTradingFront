"use client";

import ModalApiToken from "@/components/modals/modalApiToken";
import ModalNickname from "@/components/modals/modalNickname";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home({ params }: { params: { userNick: string } }) {
  const { data: session, status } = useSession();
  console.log("render onboarding page");

  if (session) {
    console.log("session", session);
    if (session.user.nickName && session.user.apiExchangeToken)
      redirect("/edit/" + session.user.nickName);
  }

  return (
    <div className="max-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full h-full overflow-auto flex gap-8 row-start-2 justify-between">
        <ModalNickname />
        <ModalApiToken />
      </main>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ModalNickname() {
  const { data: session, update } = useSession();
  const [nick, setNick] = useState<string | null>("");

  async function handleEditSession() {
    // TODO make a patch request to the endpint to update the user in database

    // update the session
    const updateSession = await update({ nickName: nick });
  }
  return (
    <Dialog open={(session && !session.user.nickName) ?? false}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Claim your unique page</DialogTitle>
          <DialogDescription>
            {`Your unique page will be cryptofolio.me/@${nick}`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <span>@</span>
          <div className="grid flex-1 gap-2">
            <input
              defaultValue="alex"
              onChange={(e) => setNick(e.target.value)}
            />
          </div>
          <Button
            onClick={() => handleEditSession()}
            type="submit"
            size="sm"
            className="px-3 bg-white text-black md:bg-black md:text-white text-lg"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

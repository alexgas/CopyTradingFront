"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useUserContext } from "@/app/hooks/useUser";
import { useState } from "react";

export default function ModalNickname() {
  const { data: session } = useSession();
  const { loggedUser } = useUserContext();
  const [nick, setNick] = useState<string | null>("");

  return (
    <Dialog open={(loggedUser && !loggedUser.nickName) ?? false}>
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

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

export default function ModalApiToken() {
  const { data: session, update } = useSession();
  const [apiExchangeToken, setApiExchangeToken] = useState<string | null>("");

  async function handleEditSession() {
    // TODO make a patch request to the endpint to update the user in database
    // update the session
    await update({ apiExchangeToken: apiExchangeToken });
  }
  return (
    <Dialog open={!!((session && session.user.nickName) && !session.user.apiExchangeToken)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Link to your favorite exchange</DialogTitle>
          <DialogDescription>Connect with Bit2Me</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="flex gap-2">
            <input
              placeholder="FpCD1srjBT0flxgf..."
              onChange={(e) => setApiExchangeToken(e.target.value)}
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
        <span>
          Enter your API KEY.
          <ul>
            <li>1. Login in your Bit2Me account.</li>
            <li>2. Create an ONLY READ API KEY. </li>
            <li>3. Copy and paste here.</li>
            <li><br/>
              ⚠️ Never share an API key, if you suspect that an API key was
              compromised revoke it immediately.
            </li>
          </ul>
        </span>
      </DialogContent>
    </Dialog>
  );
}

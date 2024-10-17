"use client";

import { MyBarChart } from "@/components/MyBarChart";
import { MyPieChart } from "@/components/MyPieChart";
import { MyRadarChart } from "@/components/MyRadarChart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  Share1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useUserContext } from "../hooks/useUser";
import { useEffect, useState } from "react";

export default function Home({ params }: { params: { userNick: string } }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setActualUser, actualUser } = useUserContext();
  const [profileEditable, setProfileEditable] = useState<boolean>(false);

  // Initialize user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/v1/user/${params.userNick}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user Info");
        }
        const data = await response.json();
        setActualUser(data.data);
      } catch (error) {
        // Faking user
        setActualUser({
          id: "123456",
          nickName: "User",
          email: "nXKwv@example.com",
          timestampable: {
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        //setError("" + error);
        console.error(error);
        //TODO VER porque actualUser no se actualiza
        console.log("actualUser", actualUser);
        console.log("session", session);
      } finally {
        setLoading(false);
     
        if(session && actualUser) {
          setProfileEditable(actualUser?.email === session?.user?.email);
        }
      }
    };

    if (!actualUser && params.userNick) {
      fetchUserInfo();
    }
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex justify-center content-center">
        {"cargando"}
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
        <div className="flex flex-col gap-6 items-center">
          <Avatar className="w-44 h-44">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={params.userNick}
            />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold">{params.userNick}</h1>
          <Button variant="default">
            <Share1Icon className="mr-2 h-4 w-4" />
            Share this profile
          </Button>
          <Button variant="outline">
            <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
            <Link href="/explore"> Explore</Link>
          </Button>
        </div>
        <div className="w-full flex flex-col gap-6 items-center">
          <h2 className="text-3xl">My basic statistics</h2>
          <MyBarChart />
          <MyPieChart />
          <MyRadarChart />
          {profileEditable && (
            <Button variant="default">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add charts
            </Button>
          )}
        </div>
      </main>
      {status != "authenticated" && (
        <footer className="w-full row-start-3 flex gap-6 flex-wrap items-center justify-start">
          <Button variant="default">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create your portfolio
          </Button>
          <Button variant="secondary">Login</Button>
        </footer>
      )}
    </div>
  );
}

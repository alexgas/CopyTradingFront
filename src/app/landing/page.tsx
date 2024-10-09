import React from "react";
import Link from "next/link";

import { MyBarChart } from "@/components/MyBarChart";
import { MyRadarChart } from "@/components/MyRadarChart";
import { MyPieChart } from "@/components/MyPieChart";
import { GearIcon, Share2Icon, ShuffleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import LoginButton from "@/components/loginButton";

const RadarFakeData = [
  {
    subject: "Purchase",
    A: 100,
    fullMark: 100,
  },
  {
    subject: "Sell",
    A: 70,
    fullMark: 100,
  },
  {
    subject: "Swap",
    A: 33,
    fullMark: 100,
  },
];

const landing = () => {
  return (
    <main className="w-full h-screen flex flex-col gap-0 md:gap-8 md:flex-row md:justify-between columns-2 overflow-hidden text-white bg-gradient-to-b from-gradient-start  via-gradient-middle to-gradient-end">
      <div className="flex flex-col w-full items-center gap-8 p-8 md:p-16 ">
        <h1 className="text-4xl md:text-6xl font-bold">CryptoFolio.me</h1>
        <h2 className="text-2xl md:text-4xl text-center">
          A door to trusted data 🚪🔒📊
        </h2>
        <div className="grid-cols-6 mt-6 w-full hidden md:grid">
          <ul className="text-2xl withespace-pre-wrap font-bold flex flex-col gap-6 col-span-4 ml-8">
            <li className="flex items-center">
              <ShuffleIcon className="mr-2 h-10 w-10 bg-white rounded-full text-black p-1 ml-2" />
              Connect your exchange.
            </li>
            <li className="flex items-center">
              <GearIcon className="mr-2 h-10 w-10 bg-white rounded-full text-black p-1 ml-2" />
              Set up your portfolio.
            </li>
            <li className="flex items-center">
              <Share2Icon className="mr-2 h-10 w-10 bg-white rounded-full text-black p-1 ml-2" />
              Share what you want.
            </li>
          </ul>
        </div>
        <div className="hidden md:grid grid-cols-7 gap-12">
          <div className="bg-white rounded-2xl pt-2 col-span-3 ">
            <MyPieChart />
          </div>
          <div className="bg-white rounded-2xl pt-2 col-span-3 col-end-8">
            <MyRadarChart data={RadarFakeData} />
          </div>
          <div className="bg-white rounded-2xl col-span-7">
            <MyBarChart />
          </div>
        </div>
        <div className="grid grid-cols-7 md:hidden">
          <div className="bg-white rounded-2xl col-span-7">
            <Image
              src={`/chart.jpg`}
              priority
              alt={"alt"}
              width="300"
              height="200"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-10 p-8 justify-center md:bg-white md:text-black">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-justify md:text-center">
            Get your unique link and show everyone your crypto portfolio
          </h2>
          <h3 className="text-xl md:text-2xl md:font-bold text-left md:text-center">
            create your personalized page to{" "}
            <span className="underline">share what you really want</span>
          </h3>
        </div>
        <LoginButton />
        <span className="text-center">
          By login, you agree to our
          <Link href="/terms"> Terms of Service and Privacy Policy.</Link>
        </span>
      </div>
    </main>
  );
};

export default landing;

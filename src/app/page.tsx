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

export default function Home() {
  return (
    <div className="max-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full h-full overflow-auto flex gap-8 row-start-2 justify-between">
        <div className="flex flex-col gap-6 items-center">
          <Avatar className="w-44 h-44">
            <AvatarImage src="https://github.com/shadcn.png" alt="@alexg" />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-bold">/alex</h1>
          <Button variant="default">
            <Share1Icon className="mr-2 h-4 w-4" />
            Share this profile
          </Button>
          <Button variant="outline">
            <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
            Explore
          </Button>
        </div>
        <div className="w-full flex flex-col gap-6 items-center">
          <h2 className="text-3xl">My basic statistics</h2>
          <MyBarChart />
          <MyPieChart />
          <MyRadarChart />
        </div>
      </main>
      <footer className="w-full row-start-3 flex gap-6 flex-wrap items-center justify-start">
        <Button variant="default">
          <PlusIcon className="mr-2 h-4 w-4" />
          Create your portfolio
        </Button>
        <Button variant="secondary">Login</Button>
      </footer>
    </div>
  );
}

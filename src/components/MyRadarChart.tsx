"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function MyRadarChart({ data, hasRadiusAxis, hasGrid }: {data?: any, hasRadiusAxis?: boolean, hasGrid?: boolean}) {

  if(!data)
    data = [
    {
      subject: "Bitcoin",
      A: 100,
      fullMark: 100,
    },
    {
      subject: "Solana",
      A: 90,
      fullMark: 100,
    },
    {
      subject: "Ethereum",
      A: 33,
      fullMark: 100,
    },
    {
      subject: "Polkadot",
      A: 84,
      fullMark: 100,
    },
    {
      subject: "Bit2Me",
      A: 87,
      fullMark: 100,
    },
  ];

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        {hasGrid ?? <PolarGrid />}
        <PolarAngleAxis dataKey="subject" />
        {hasRadiusAxis ?? <PolarRadiusAxis angle={60} />}
        <Radar
          name="Values"
          dataKey="A"
          stroke="hsl(var(--chart-3))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.5}
        />
      </RadarChart>
    </ChartContainer>
  );
}

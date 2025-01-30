"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Post } from "@prisma/client";

const chartData = [
  { day: "01-01", percentage: 50 },
  { day: "01-02", percentage: 45 },
  { day: "01-03", percentage: 38 },
  { day: "01-04", percentage: 17 },
  { day: "01-05", percentage: 26 },
  { day: "01-06", percentage: 52 },
  { day: "01-07", percentage: 55 },
  { day: "01-08", percentage: 72 },
  { day: "01-09", percentage: 82 },
  { day: "01-10", percentage: 72 },
  { day: "01-11", percentage: 66 },
  { day: "01-12", percentage: 88 },
  { day: "01-13", percentage: 81 },
  { day: "01-14", percentage: 89 },
  { day: "01-15", percentage: 84 },
  { day: "01-16", percentage: 90 },
  { day: "01-17", percentage: 85 },
  { day: "01-18", percentage: 83 },
];

const chartConfig = {
  percentage: {
    label: "percentage",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ProbabilityChart({
  post,
}: {
  post: Post;
}) {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>开始和截止时间</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 1,
              right: 1,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={1}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="percentage"
              type="natural"
              fill="var(--color-percentage)"
              fillOpacity={0.4}
              stroke="var(--color-percentage)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}

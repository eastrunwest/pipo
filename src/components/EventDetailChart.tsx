// EventDetailChart.tsx
"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
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
import { Post, Agree, Disagree } from "@prisma/client";
import AgreeDisagreeBar from "./AgreeDisagreeBar";
import ProbabilityChart from "./ProbabilityChart";

const chartConfig = {
  agree: {
    label: "赞同",
  },
  disagree: {
    label: "反对",
  },
} satisfies ChartConfig;

export function EventDetailChart({
  post,
  myAgree,
  myDisagree,
}: {
  post: Post;
  myAgree: Agree | null;
  myDisagree: Disagree | null;
}) {
  const chartData = [{ agree: post.agreeCount, disagree: post.disagreeCount }];
  const totalVoters = post.agreeCount + post.disagreeCount;

  return (
    <Card className="flex flex-col bg-transparent rounded-xl overflow-hidden shadow-lg">
      <CardHeader className="text-center p-4">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          {post.title}
        </CardTitle>
        <CardDescription className="mt-1 text-lg font-medium bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          {post.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-1 flex flex-col items-center">
        <ChartContainer
          config={chartConfig}
          className="w-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={130}
          >
            <defs>
              <linearGradient id="gradientDisagree" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00f" />
                <stop offset="100%" stopColor="#0ff" />
              </linearGradient>
              <linearGradient id="gradientAgree" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f00" />
                <stop offset="100%" stopColor="#ff0" />
              </linearGradient>
              <linearGradient id="gradientText" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8e2de2" />
                <stop offset="100%" stopColor="#4a00e0" />
              </linearGradient>
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          fill="url(#gradientText)"
                          className="text-2xl font-bold"
                        >
                          {totalVoters.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          fill="url(#gradientText)"
                          className="text-sm"
                        >
                          投票人数
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="agree"
              fill="url(#gradientAgree)"
              stackId="a"
              cornerRadius={10}
              className="stroke-transparent"
            />
            <RadialBar
              dataKey="disagree"
              fill="url(#gradientDisagree)"
              stackId="a"
              cornerRadius={10}
              className="stroke-transparent"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="w-full flex flex-col gap-1">
          <AgreeDisagreeBar post={post} myAgree={myAgree} myDisagree={myDisagree} />
          <ProbabilityChart post={post} />
        </div>
      </CardContent>
    </Card>
  );
}

export default EventDetailChart;

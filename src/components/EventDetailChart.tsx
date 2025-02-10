"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Post, Agree, Disagree } from "@prisma/client"
import AgreeDisagreeBar from "./AgreeDisagreeBar"
import ProbabilityChart from "./ProbabilityChart"

const chartConfig = {
  agree: {
    label: "赞同",
    color: "red",
  },
  disagree: {
    label: "反对",
    color: "blue",
  },
} satisfies ChartConfig

export function EventDetailChart({
  post,
  myAgree,
  myDisagree,
}: {
  post: Post;
  myAgree: Agree | null;
  myDisagree: Disagree | null;
}) {
  const chartData = [{agree: post.agreeCount, disagree: post.disagreeCount }];
  const totalVoters = post.agreeCount + post.disagreeCount;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px] mb-0"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
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
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVoters.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          投票人数
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="disagree"
              fill="var(--color-disagree)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="agree"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-agree)"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
        <AgreeDisagreeBar post={post} myAgree={myAgree} myDisagree={myDisagree}/> 
        <ProbabilityChart post={post}/>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pt-2">
        <div className="leading-none text-muted-foreground">
          真相只有一个，在你我的选择中
        </div>
      </CardFooter>
    </Card>
  )
}

export default EventDetailChart;

"use client";

import { useEffect, useState } from "react";
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
import { getAgreeDisagreeData } from "@/actions";

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
  const [chartData, setChartData] = useState<{ day: string; percentage: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      console.log('Post data:', post);
      const startDate = new Date(post.createdAt);
      const endDate = new Date();
      const data = await getAgreeDisagreeData(post.id, startDate, endDate);
      console.log('Chart data:', data); 
      setChartData(data.length > 0 ? data : [{ day: endDate.toISOString().slice(0, 10), percentage: 50.0 }]); // 初始化为 50.0%
    }

    fetchData();
  }, [post]);

  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
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
              tickFormatter={(value) => value.slice(5)}
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
    </Card>
  );
}

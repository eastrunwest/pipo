import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Post } from "@prisma/client";
import { getAgreeDisagreeData } from "@/actions";

export default function ProbabilityChart({
  post,
}: {
  post: Post;
}) {
  const [chartData, setChartData] = useState<{ day: string; percentage: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const startDate = new Date(post.createdAt);
      const endDate = new Date();
      const data = await getAgreeDisagreeData(post.id, startDate, endDate);
      setChartData(data.length > 0 ? data : [
        { day: startDate.toISOString().slice(0, 10), percentage: 50.0 },
        { day: endDate.toISOString().slice(0, 10), percentage: 50.0 }
      ]);
    }

    fetchData();
  }, [post]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 0,
            bottom: 20,
            left: 25,
          }}
        >
          <CartesianGrid 
            horizontal={true}
            vertical={false}
            strokeDasharray="3 3"
            stroke="#E5E7EB"
          />
          <XAxis 
            dataKey="day"
            tickFormatter={formatDate}
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            dy={10}
            fontSize={12}
            minTickGap={30}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
            dx={-10}
            fontSize={10}
            width={30}
          />
          <Area
            type="monotone"
            dataKey="percentage"
            stroke="#3B82F6"
            fill="#93C5FD"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
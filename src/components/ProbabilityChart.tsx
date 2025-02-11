import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
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
      setChartData(data.length > 0 ? data : [{ day: endDate.toISOString().slice(0, 10), percentage: 50.0 }]);
    }

    fetchData();
  }, [post]);

  return (
    <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 2,
                bottom: 20,
                left: 2,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day"
                tickFormatter={(value) => value.slice(5)}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
  );
}
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { BarChartProps } from "./types"

const chartConfig = {
  active: {
    label: "Active Users",
    color: "var(--color-chart-1)",
  },
  new: {
    label: "New Users",
    color: "var(--color-chart-2)",
  },
}

export function UserActivityBarChart({ data }: BarChartProps) {
  // Calculate dynamic width based on data length
  const barWidth = 50 // Width for each bar in pixels
  const chartWidth = Math.max(600, data.length * barWidth + 100) // +100 for padding

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Daily active and new users</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <div style={{ width: `${chartWidth}px` }}>
            <ChartContainer className="h-[350px]" config={chartConfig}>
              <BarChart
                width={chartWidth}
                height={350}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={30}
                // Add these props to prevent background hover effects
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                <XAxis 
                  dataKey="day" 
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip 
                  cursor={{ fill: 'transparent' }} // Removes the highlighted background
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius)',
                  }}
                />
                <Bar
                  dataKey="active"
                  fill="var(--color-chart-1)"
                  name="Active Users"
                  radius={[4, 4, 0, 0]}
                  // Custom hover effects
onMouseEnter={(e) => {
  if (e?.currentTarget instanceof SVGElement) {
    e.currentTarget.style.opacity = '0.8';
  }
}}
onMouseLeave={(e) => {
  if (e?.currentTarget instanceof SVGElement) {
    e.currentTarget.style.opacity = '1';
  }
}}

                />
                <Bar
                  dataKey="new"
                  fill="var(--color-chart-2)"
                  name="New Users"
                  radius={[4, 4, 0, 0]}
                  // Custom hover effects
onMouseEnter={(e) => {
  if (e?.currentTarget instanceof SVGElement) {
    e.currentTarget.style.opacity = '0.8';
  }
}}
onMouseLeave={(e) => {
  if (e?.currentTarget instanceof SVGElement) {
    e.currentTarget.style.opacity = '1';
  }
}}

                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
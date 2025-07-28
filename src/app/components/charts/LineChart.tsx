/* eslint-disable @typescript-eslint/no-explicit-any */
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { LineChartProps } from "./types"
import { useState } from "react"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--color-chart-1)",
  },
  target: {
    label: "Target",
    color: "var(--color-chart-2)",
  },
}

// Custom Dot function (without hooks)
const CustomDot = ({
  cx,
  cy,
  index,
  activeIndex,
  color,
  dataKey,
  setHoveredIndex,
}: any) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill={index === activeIndex ? "#fff" : color}
      stroke={color}
      strokeWidth={2}
      style={{ opacity: index === activeIndex ? 0.7 : 1, cursor: "pointer" }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    />
  )
}

export function RevenueLineChart({ data }: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const pointWidth = 80
  const chartWidth = Math.max(800, data.length * pointWidth)

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue vs target</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <div style={{ width: `${chartWidth}px` }}>
            <ChartContainer className="h-[350px]" config={chartConfig}>
              <LineChart
                width={chartWidth}
                height={350}
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip
                  cursor={{ stroke: "transparent" }}
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    borderColor: "var(--color-border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  name="Revenue"
                  dot={(props) => {
                    const { key, ...rest } = props
                    return (
                      <CustomDot
                        key={key}
                        {...rest}
                        activeIndex={hoveredIndex}
                        color="var(--color-chart-1)"
                        setHoveredIndex={setHoveredIndex}
                      />
                    )
                  }}

                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                  dot={(props) => (
                    <CustomDot
                      {...props}
                      activeIndex={hoveredIndex}
                      color="var(--color-chart-2)"
                      setHoveredIndex={setHoveredIndex}
                    />
                  )}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

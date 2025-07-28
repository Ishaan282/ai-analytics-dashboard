"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
Bar,
BarChart,
Line,
LineChart,
Pie,
PieChart,
Cell,
XAxis,
YAxis,
CartesianGrid,
ResponsiveContainer,
Legend,
} from "recharts"

const chartConfig = {
revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
},
target: {
    label: "Target",
    color: "hsl(var(--chart-2))",
},
active: {
    label: "Active Users",
    color: "hsl(var(--chart-1))",
},
new: {
    label: "New Users",
    color: "hsl(var(--chart-2))",
},
}

interface LineChartProps {
data: Array<{
    month: string
    revenue: number
    target: number
}>
}

export function RevenueLineChart({ data }: LineChartProps) {
return (
    <Card className="col-span-4">
    <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>Monthly revenue vs target</CardDescription>
    </CardHeader>
    <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
<Line type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} name="Revenue" />
<Line type="monotone" dataKey="target" stroke="var(--color-chart-2)" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
        </ResponsiveContainer>
        </ChartContainer>
    </CardContent>
    </Card>
)
}

interface PieChartProps {
data: Array<{
    source: string
    value: number
    fill: string
}>
}

// ...existing code...
export function TrafficPieChart({ data }: PieChartProps) {
    // Define an array of color variables for the slices
    const pieColors = [
        "var(--color-chart-1)",
        "var(--color-chart-2)",
        "var(--color-chart-3)",
        "var(--color-chart-4)",
        "var(--color-chart-5)",
    ];

    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Conversion by source</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={pieColors[index % pieColors.length]}
                                    />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
// ...existing code...

interface BarChartProps {
data: Array<{
    day: string
    active: number
    new: number
}>
}

export function UserActivityBarChart({ data }: BarChartProps) {
return (
    <Card>
    <CardHeader>
        <CardTitle>User Activity</CardTitle>
        <CardDescription>Daily active and new users</CardDescription>
    </CardHeader>
    <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="active" fill="var(--color-chart-1)" name="Active Users" />
<Bar dataKey="new" fill="var(--color-chart-2)" name="New Users" />
            </BarChart>
        </ResponsiveContainer>
        </ChartContainer>
    </CardContent>
    </Card>
)
}

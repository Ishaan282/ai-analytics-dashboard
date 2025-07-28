    // src/app/components/charts/PieChart.tsx
    "use client"

    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
    import { ChartContainer } from "@/components/ui/chart"
    import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip } from "recharts"
    import { PieChartProps } from "./types"

    export function TrafficPieChart({ data }: PieChartProps) {
    const pieColors = [
        "var(--color-chart-1)",
        "var(--color-chart-2)",
        "var(--color-chart-3)",
        "var(--color-chart-4)",
        "var(--color-chart-5)",
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
        const { source, value } = payload[0].payload;
        return (
            <div className="bg-card text-card-foreground p-3 shadow-lg rounded-md border border-border">
            <p className="font-medium">{source}</p>
            <p className="text-sm">{value}% of total conversions</p>
            </div>
        );
        }
        return null;
    };

    return (
        <Card className="col-span-3">
        <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Conversion by source</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
            <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={pieColors[index % pieColors.length]}
                    />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            </div>
            
            <div className="mt-4 w-full max-h-[80px] overflow-y-auto">
            <div className="flex flex-wrap justify-center gap-2">
                {data.map((entry, index) => (
                <div key={index} className="flex items-center gap-1 px-2 py-1">
                    <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: pieColors[index % pieColors.length] }}
                    />
                    <span className="text-xs whitespace-nowrap">
                    {entry.source} ({entry.value}%)
                    </span>
                </div>
                ))}
            </div>
            </div>
        </CardContent>
        </Card>
    );
    }
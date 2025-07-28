"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target,
  Clock,
  Activity
} from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: "revenue" | "users" | "conversions" | "growth" | "session" | "bounce"
}

const iconMap = {
  revenue: DollarSign,
  users: Users,
  conversions: Target,
  growth: TrendingUp,
  session: Clock,
  bounce: Activity,
}

export function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  const Icon = iconMap[icon]
  const TrendIcon = trend === "up" ? ArrowUpIcon : ArrowDownIcon
  const trendColor = trend === "up" ? "text-green-500" : "text-red-500"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <TrendIcon className={`h-3 w-3 ${trendColor} mr-1`} />
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

interface MetricCardsProps {
  metrics: Array<{
    title: string
    value: string
    change: string
    trend: "up" | "down"
    icon: "revenue" | "users" | "conversions" | "growth" | "session" | "bounce"
  }>
}

export function MetricCards({ metrics }: MetricCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
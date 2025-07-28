"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

// Import components
import { MetricCards } from "./components/Card"
import { RevenueLineChart, TrafficPieChart, UserActivityBarChart } from "./components/Chart"
import { TransactionTable } from "./components/Table"
import { DashboardFilters, QuickFilters } from "./components/Filters"
import { DashboardSkeleton } from "./components/Skeleton"

//data import
import { metricsData } from "@/data/metrics"
import { revenueData } from "@/data/revenue"
import { userActivityData } from "@/data/activity"
import { conversionData } from "@/data/conversions"
import { tableData } from "@/data/transactions"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleDateRangeChange = (range: string) => {
    console.log("Date range changed:", range)
    // Implement date range filtering logic
  }

  const handleStatusFilter = (status: string) => {
    console.log("Status filter changed:", status)
    // Implement status filtering logic
  }

  const handleExport = () => {
    console.log("Exporting data...")
    // Implement export functionality
  }

  const handleQuickFilterChange = (filter: string) => {
    setActiveFilter(filter)
    console.log("Quick filter changed:", filter)
    // Implement quick filter logic
  }

  if (isLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Filters */}
        <DashboardFilters
          onDateRangeChange={handleDateRangeChange}
          onStatusFilter={handleStatusFilter}
          onExport={handleExport}
        />

        {/* Quick Filters */}
        <QuickFilters activeFilter={activeFilter} onFilterChange={handleQuickFilterChange} />

        {/* Metric Cards */}
        <MetricCards metrics={metricsData} />

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RevenueLineChart data={revenueData} />
          <TrafficPieChart data={conversionData} />
        </div>

        {/* Bar Chart */}
        <UserActivityBarChart data={userActivityData} />

        {/* Data Table */}
        <TransactionTable data={tableData} />
      </div>
    </div>
  )
}

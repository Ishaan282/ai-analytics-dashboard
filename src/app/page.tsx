// src/app/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

// Import components
import { MetricCards } from "./components/Card"
// import { RevenueLineChart, TrafficPieChart, UserActivityBarChart } from "./components/Chart"
import { TrafficPieChart } from "@/app/components/charts/PieChart"
import { RevenueLineChart } from "@/app/components/charts/LineChart"
import { UserActivityBarChart } from "@/app/components/charts/BarChart"
import { TransactionTable } from "./components/Table"
import { DashboardFilters } from "./components/Filters"
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
    const [dateRange, setDateRange] = useState("7d")
    const [statusFilter, setStatusFilter] = useState("all")
    const [filteredTableData, setFilteredTableData] = useState(tableData)
    const [filteredMetrics, setFilteredMetrics] = useState(metricsData)
    const [filteredRevenue, setFilteredRevenue] = useState(revenueData)
    const [filteredActivity, setFilteredActivity] = useState(userActivityData)
    const [filteredConversion, setFilteredConversion] = useState(conversionData)

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
        setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    // Filter data based on date range and status
    useEffect(() => {
        filterData(dateRange, statusFilter, activeFilter)
    }, [dateRange, statusFilter, activeFilter])

    const handleDateRangeChange = (range: string) => {
        setDateRange(range)
    }

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status)
    }

    const handleExport = () => {
        console.log("Exporting data...")
        // Implement export functionality
    }

    const handleQuickFilterChange = (filter: string) => {
        setActiveFilter(filter)
    }

    const filterData = (dateRange: string, status: string, quickFilter: string) => {
        // First filter by date range (quick filter takes precedence)
        let dateFilteredData = [...tableData]
        let dateFilteredMetrics = [...metricsData]
        let dateFilteredRevenue = [...revenueData]
        let dateFilteredActivity = [...userActivityData]
        let dateFilteredConversion = [...conversionData]

        // Apply quick filter first
        if (quickFilter !== "all") {
        const now = new Date()
        dateFilteredData = dateFilteredData.filter(item => {
            const itemDate = new Date(item.date)
            switch (quickFilter) {
            case "today":
                return itemDate.toDateString() === now.toDateString()
            case "week":
                const startOfWeek = new Date(now)
                startOfWeek.setDate(now.getDate() - now.getDay())
                return itemDate >= startOfWeek
            case "month":
                return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()
            case "quarter":
                const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3
                return itemDate.getMonth() >= quarterStartMonth && 
                    itemDate.getMonth() < quarterStartMonth + 3 && 
                    itemDate.getFullYear() === now.getFullYear()
            default:
                return true
            }
        })
        } else {
        // Apply date range filter if no quick filter
        const now = new Date()
        const daysAgo = new Date(now)
        
        switch (dateRange) {
            case "1d":
            daysAgo.setDate(now.getDate() - 1)
            break
            case "7d":
            daysAgo.setDate(now.getDate() - 7)
            break
            case "30d":
            daysAgo.setDate(now.getDate() - 30)
            break
            case "90d":
            daysAgo.setDate(now.getDate() - 90)
            break
            case "1y":
            daysAgo.setFullYear(now.getFullYear() - 1)
            break
        }

        dateFilteredData = dateFilteredData.filter(item => new Date(item.date) >= daysAgo)
        }

        // Then filter by status if not "all"
        if (status !== "all") {
        dateFilteredData = dateFilteredData.filter(item => item.status === status)
        }

        // Update filtered data state
        setFilteredTableData(dateFilteredData)
        
        // For demo purposes, we'll just slice the other data sets
        // In a real app, you would implement proper filtering for each data type
        setFilteredMetrics(metricsData.slice(0, dateFilteredData.length % metricsData.length || undefined))
        setFilteredRevenue(revenueData.slice(0, dateFilteredData.length % revenueData.length || undefined))
        setFilteredActivity(userActivityData.slice(0, dateFilteredData.length % userActivityData.length || undefined))
        setFilteredConversion(conversionData.slice(0, dateFilteredData.length % conversionData.length || undefined))
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
            {/* <QuickFilters activeFilter={activeFilter} onFilterChange={handleQuickFilterChange} /> */}

            {/* Metric Cards */}
            <MetricCards metrics={filteredMetrics} />

            <div className="flex flex-wrap gap-4">
            <div className="w-full md:w-1/2 lg:flex-[4]">
                <RevenueLineChart data={filteredRevenue} />
            </div>
            <div className="w-full md:w-1/2 lg:flex-[3]">
                <TrafficPieChart data={filteredConversion} />
            </div>
            <div className="w-full lg:flex-[4]">
                <UserActivityBarChart data={filteredActivity} />
            </div>
            <div className="w-full">
                <TransactionTable data={filteredTableData} />
            </div>
            </div>
        </div>
        </div>
    )
}
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter, Download } from "lucide-react"
import { useState } from "react"

interface FiltersProps {
onDateRangeChange?: (range: string) => void
onStatusFilter?: (status: string) => void
onExport?: () => void
}

export function DashboardFilters({ onDateRangeChange, onStatusFilter, onExport }: FiltersProps) {
const [dateRange, setDateRange] = useState("7d")
const [statusFilter, setStatusFilter] = useState("all")

const handleDateRangeChange = (value: string) => {
    setDateRange(value)
    onDateRangeChange?.(value)
}

const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    onStatusFilter?.(value)
}

return (
    <Card className="mb-6">
    <CardHeader>
        <CardTitle className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        Filters & Actions
        </CardTitle>
    </CardHeader>
    <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1d">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
            </Select>
        </div>

        <div className="ml-auto">
            <Button variant="outline" onClick={onExport} className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Data
            </Button>
        </div>
        </div>
    </CardContent>
    </Card>
)
}

interface QuickFiltersProps {
activeFilter: string
onFilterChange: (filter: string) => void
}

export function QuickFilters({ activeFilter, onFilterChange }: QuickFiltersProps) {
const filters = [
    { id: "all", label: "All Time" },
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "quarter", label: "This Quarter" },
]

return (
    <div className="flex flex-wrap gap-2 mb-4">
    {filters.map((filter) => (
        <Button
        key={filter.id}
        variant={activeFilter === filter.id ? "default" : "outline"}
        size="sm"
        onClick={() => onFilterChange(filter.id)}
        >
        {filter.label}
        </Button>
    ))}
    </div>
)
}

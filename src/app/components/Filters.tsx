/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { Calendar, Filter, Download } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import {
  tableData,
  metricsData,
  revenueData,
  userActivityData,
  conversionData,
} from "@/data"

interface FiltersProps {
  onDateRangeChange?: (range: string) => void
  onStatusFilter?: (status: string) => void
  onExport?: () => void
}

export function DashboardFilters({
  onDateRangeChange,
  onStatusFilter,
  onExport,
}: FiltersProps) {
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

  const handleExport = async () => {
    const zip = new JSZip()
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")

    const datasets = [
      { data: tableData, name: `transactions-${timestamp}.csv` },
      { data: metricsData, name: `metrics-${timestamp}.csv` },
      { data: revenueData, name: `revenue-${timestamp}.csv` },
      { data: userActivityData, name: `user-activity-${timestamp}.csv` },
      { data: conversionData, name: `conversions-${timestamp}.csv` },
    ]

    for (const { data, name } of datasets) {
      const csv = generateCSV(data)
      if (csv) {
        zip.file(name, csv)
      }
    }

    const blob = await zip.generateAsync({ type: "blob" })
    saveAs(blob, `dashboard-export-${timestamp}.zip`)
    onExport?.()
  }

  const generateCSV = (data: any[]): string | null => {
    if (!data || data.length === 0) return null

    const headers = Object.keys(data[0]).join(",")
    const rows = data
      .map((obj) =>
        Object.values(obj)
          .map((value) =>
            typeof value === "string" && value.includes(",")
              ? `"${value}"`
              : value
          )
          .join(",")
      )
      .join("\n")

    return `${headers}\n${rows}`
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
          {/* Date Range Filter */}
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

          {/* Status Filter */}
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

          {/* Export Button */}
          <div className="ml-auto">
            <Button
              variant="outline"
              onClick={handleExport}
              className="flex items-center gap-2 bg-transparent"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

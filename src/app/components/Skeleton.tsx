"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function MetricCardSkeleton() {
return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4" />
    </CardHeader>
    <CardContent>
        <Skeleton className="h-8 w-[120px] mb-2" />
        <Skeleton className="h-3 w-[140px]" />
    </CardContent>
    </Card>
)
}

export function MetricCardsSkeleton() {
return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
        <MetricCardSkeleton key={i} />
    ))}
    </div>
)
}

export function ChartSkeleton({ className }: { className?: string }) {
return (
    <Card className={className}>
    <CardHeader>
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
    </CardHeader>
    <CardContent>
        <Skeleton className="h-[350px] w-full" />
    </CardContent>
    </Card>
)
}

export function TableSkeleton() {
return (
    <Card>
    <CardHeader>
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
    </CardHeader>
    <CardContent>
        <div className="space-y-3">
        {/* Table header skeleton */}
        <div className="flex space-x-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[100px]" />
        </div>
        {/* Table rows skeleton */}
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[60px]" />
            <Skeleton className="h-4 w-[100px]" />
            </div>
        ))}
        </div>
    </CardContent>
    </Card>
)
}

export function DashboardSkeleton() {
return (
    <div className="min-h-screen bg-background">
    {/* Header Skeleton */}
    <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
        <Skeleton className="h-8 w-[200px]" />
        <div className="ml-auto">
            <Skeleton className="h-9 w-9" />
        </div>
        </div>
    </div>

    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* Metric Cards Skeleton */}
        <MetricCardsSkeleton />

        {/* Charts Section Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ChartSkeleton className="col-span-4" />
        <ChartSkeleton className="col-span-3" />
        </div>

        {/* Bar Chart Skeleton */}
        <ChartSkeleton />

        {/* Table Skeleton */}
        <TableSkeleton />
    </div>
    </div>
)
}

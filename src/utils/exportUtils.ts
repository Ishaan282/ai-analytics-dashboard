/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/exportUtils.ts
export function exportToCSV(data: any[], fileName: string) {
// Convert data to CSV string
const headers = Object.keys(data[0]).join(',');
const rows = data.map(obj => 
    Object.values(obj)
    .map(value => 
        typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value
    )
    .join(',')
).join('\n');

    const csvContent = `${headers}\n${rows}`;

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportDashboardData(
    tableData: any[],
    metricsData: any[],
    revenueData: any[],
    userActivityData: any[],
    conversionData: any[]
) {
// Create timestamp for filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // Export each dataset separately
    exportToCSV(tableData, `transactions-${timestamp}`);
    exportToCSV(metricsData, `metrics-${timestamp}`);
    exportToCSV(revenueData, `revenue-${timestamp}`);
    exportToCSV(userActivityData, `user-activity-${timestamp}`);
    exportToCSV(conversionData, `conversions-${timestamp}`);
}
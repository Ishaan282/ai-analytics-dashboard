"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Transaction {
id: string
customer: string
email: string
amount: string
status: "Completed" | "Pending" | "Failed"
date: string
}

interface TransactionTableProps {
data: Transaction[]
}

export function TransactionTable({ data }: TransactionTableProps) {
const getStatusVariant = (status: Transaction["status"]) => {
    switch (status) {
    case "Completed":
        return "default"
    case "Pending":
        return "secondary"
    case "Failed":
        return "destructive"
    default:
        return "default"
    }
}

return (
    <Card>
    <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest customer transactions and their status</CardDescription>
    </CardHeader>
    <CardContent>
        <div className="overflow-x-auto">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {data.map((transaction) => (
                <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.customer}</TableCell>
                <TableCell>{transaction.email}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>
                    <Badge variant={getStatusVariant(transaction.status)}>{transaction.status}</Badge>
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
    </CardContent>
    </Card>
)
}

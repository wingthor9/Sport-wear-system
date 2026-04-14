"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, Trash2 } from "lucide-react"
import { Import } from "@/modules/import/import.type"

type Props = {
    imports: Import[]
    isLoading: boolean
    onEdit: (i: Import) => void
    onDelete: (id: string) => void
    onView: (i: Import) => void

}

export function ImportTable({ imports, isLoading, onView, onDelete }: Props) {

    if (isLoading) return <Card className="p-6 text-center">Loading...</Card>

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Purchase</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Employee</TableHead>
                        <TableHead />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {imports.map((i: Import) => (
                        <TableRow key={i.import_id}>
                            <TableCell>{i.import_id}</TableCell>
                            <TableCell>{i.purchase?.purchase_id}</TableCell>
                            <TableCell>
                                {new Date(i.import_date).toLocaleDateString("en-GB")}
                            </TableCell>
                            <TableCell>{i.employee?.employee_name}</TableCell>

                            <TableCell className="flex gap-2 justify-end">
                                <Button size="icon" onClick={() => onView(i)}>
                                    <Eye className="w-4 h-4" />
                                </Button>

                                <Button
                                    size="icon"
                                    onClick={() => onDelete(i.import_id)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}
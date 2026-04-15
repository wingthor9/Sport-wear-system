import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Order, OrderStatus } from "@/modules/order/order.types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"

type Props = {
    orders: Order[]
    isLoading: boolean
    onView: (order: Order) => void
    onDelete: (id: string) => void
    onUpdateStatus: (id: string, status: OrderStatus) => void
}

// const getStatusBadge = (status: string) => {
//     switch (status) {
//         case "WAITING_PAYMENT":
//             return <Badge className="bg-yellow-100 text-yellow-700">Waiting</Badge>
//         case "PAID":
//             return <Badge className="bg-blue-100 text-blue-700">Paid</Badge>
//         case "SHIPPED":
//             return <Badge className="bg-purple-100 text-purple-700">Shipped</Badge>
//         case "COMPLETED":
//             return <Badge className="bg-green-100 text-green-700">Completed</Badge>
//         case "CANCELLED":
//             return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>
//         default:
//             return <Badge>{status}</Badge>
//     }
// }
const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
        case "PENDING":
            return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
        case "WAITING_PAYMENT":
            return <Badge className="bg-yellow-100 text-yellow-700">Waiting</Badge>
        case "PAID":
            return <Badge className="bg-blue-100 text-blue-700">Paid</Badge>
        case "SHIPPED":
            return <Badge className="bg-purple-100 text-purple-700">Shipped</Badge>
        case "COMPLETED":
            return <Badge className="bg-green-100 text-green-700">Completed</Badge>
        case "CANCELLED":
            return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>
        default:
            // return <Badge>{status}</Badge>
            return null
    }
}

export function OrderTable({ orders, isLoading, onView, onDelete, onUpdateStatus }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead />
                </TableRow>
            </TableHeader>

            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={6}>Loading...</TableCell>
                    </TableRow>
                ) : orders.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6}>No data</TableCell>
                    </TableRow>
                ) : (
                    orders.map((o) => (
                        <TableRow key={o.order_id}>
                            <TableCell>{o.order_id}</TableCell>

                            <TableCell>
                                {o.customer?.customer_name}
                            </TableCell>

                            <TableCell>
                                {new Date(o.order_date).toLocaleDateString()}
                            </TableCell>

                            <TableCell>
                                ${o.total_amount?.toLocaleString()}
                            </TableCell>

                            {/* <TableCell>
                                {getStatusBadge(o.status)}
                            </TableCell> */}
                            {/* 
                            <TableCell className="flex gap-2">
                                <Button size="sm" variant="ghost" onClick={() => onView(o)}>
                                    <Eye className="w-4 h-4" />
                                </Button>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => onDelete(o.order_id)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </TableCell> */}
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="sm" variant="ghost">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent>

                                        {/* 👁 VIEW */}
                                        <DropdownMenuItem
                                            onClick={() => onView(o)}
                                        >
                                            View
                                        </DropdownMenuItem>

                                        {/* 🔄 UPDATE STATUS */}
                                        {getStatusBadge(o.status) && (
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    const next = getStatusBadge(o.status)!
                                                    if (!confirm(`Change status to ${next}?`)) return
                                                    onUpdateStatus(o.order_id, next)
                                                }}
                                            >
                                                Update → {getStatusBadge(o.status)}
                                            </DropdownMenuItem>
                                        )}

                                        {/* 🗑 DELETE */}
                                        <DropdownMenuItem
                                            onClick={() => {
                                                if (!confirm("Delete order?")) return
                                                onDelete(o.order_id)
                                            }}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </DropdownMenuItem>

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
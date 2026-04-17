import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Order, OrderStatus } from "@/modules/order/order.types"
import { Eye, Trash2 } from "lucide-react"
import { formatDate } from "@/utils/FormatDate"
import { formatCurrency } from "@/utils/FormatCurrency"

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
                    <TableHead>NO:</TableHead>
                    <TableHead>Order code</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
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
                    orders.map((o,index) => (
                        <TableRow key={o.order_id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{o.order_code}</TableCell>
                            <TableCell>
                                {o.customer?.customer_name}
                            </TableCell>
                            <TableCell>
                                {formatDate(o.order_date)}
                            </TableCell>
                            <TableCell>
                                {formatCurrency(o.total_amount)}
                            </TableCell>
                            <TableCell>
                                {getStatusBadge(o.status)}
                            </TableCell>
                            
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
                            </TableCell>
                            
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}
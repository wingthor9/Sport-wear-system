"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Order } from "@/modules/order/order.types"
import { Badge } from "../ui/badge"

type Status = | "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    delivery?: Order
    onUpdateStatus: (status: Status) => void
}

export const getStatusBadge = (status: Status) => {
    switch (status) {
        case "PENDING":
            return <Badge className="bg-yellow-500 text-white">Pending</Badge>
        case "PROCESSING":
            return <Badge className="bg-blue-500 text-white">Processing</Badge>
        case "SHIPPED":
            return <Badge className="bg-purple-500 text-white">Shipped</Badge>
        case "DELIVERED":
            return <Badge className="bg-green-500 text-white">Delivered</Badge>
        case "CANCELLED":
            return <Badge className="bg-red-500 text-white">Cancelled</Badge>
    }
}

export function DeliveryUpdateDialog({ open, onOpenChange, delivery, onUpdateStatus, }: Props) {
    if (!delivery) return null
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Delivery</DialogTitle>
                </DialogHeader>

                {/* 👇 แสดงสถานะปัจจุบัน */}
                <div className="mb-3">
                    Current Status: {getStatusBadge(delivery.status as Status)}
                </div>

                <div className="w-full">
                    <Select
                        defaultValue={delivery.status}
                        onValueChange={(value: Status) => onUpdateStatus(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="PROCESSING">Processing</SelectItem>
                            <SelectItem value="SHIPPED">Shipped</SelectItem>
                            <SelectItem value="DELIVERED">Delivered</SelectItem>
                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </DialogContent>
        </Dialog>
    )
}
"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Card } from "@/components/ui/card"

interface Props {
    open: boolean
    orders: any[]
    onClose: () => void
}

export default function CustomerOrdersDialog({
    open,
    orders,
    onClose
}: Props) {

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">

                <DialogHeader>
                    <DialogTitle>Customer Orders</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    {orders.map((order: any) => (
                        <Card key={order.id} className="p-4">

                            <p>Order ID: {order.id}</p>
                            <p>Total: ${order.total}</p>
                            <p>Date: {order.date}</p>

                        </Card>
                    ))}

                </div>

            </DialogContent>
        </Dialog>
    )
}

import { deliveryController } from "@/modules/delivery/delivery.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return deliveryController.getDelivery(id)
}

// export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
//     const { id } = await params
//     return deliveryController.deleteDelivery(id)
// }
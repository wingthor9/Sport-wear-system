
import { deliveryController } from "@/modules/delivery/delivery.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return deliveryController.getDeliveries(req)
}

export async function POST(req: NextRequest) {
    return deliveryController.createDelivery(req)
}
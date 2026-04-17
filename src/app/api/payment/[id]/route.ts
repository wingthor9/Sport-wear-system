import { paymentController } from "@/modules/payment/payment.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return paymentController.getPayment(id)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return paymentController.deletePayment(id)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return paymentController.verifyPayment(req, id)
}
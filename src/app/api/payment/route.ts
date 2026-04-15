import { paymentController } from "@/modules/payment/payment.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return paymentController.getPayments(req)
}

export async function POST(req: NextRequest) {
    return paymentController.createPayment(req)
}
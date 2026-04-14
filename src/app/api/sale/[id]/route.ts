import { saleController } from "@/modules/sale/sale.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return saleController.getSale(id)
}

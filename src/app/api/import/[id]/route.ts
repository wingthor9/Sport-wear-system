
import { importController } from "@/modules/import/import.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return importController.getImport(id)

}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return importController.deleteImport(id)

}

export async function POST(req: NextRequest) {
    return importController.createImport(req)

}
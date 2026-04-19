import { locationController } from "@/modules/location/location.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return locationController.getDistrict(id)
}

export async function POST(req: NextRequest) {
    return locationController.createDistrict(req)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return locationController.updateDistrict(req, id)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return locationController.deleteDistrict(id)
}
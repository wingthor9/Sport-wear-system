
import { locationController } from "@/modules/location/location.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return locationController.getProvinces(req)
}

export async function POST(req: NextRequest) {
    return locationController.createProvince(req)
}

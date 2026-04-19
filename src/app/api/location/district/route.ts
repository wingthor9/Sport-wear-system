
import { locationController } from "@/modules/location/location.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return locationController.getDistricts(req)
}

export async function POST(req: NextRequest) {
    return locationController.createDistrict(req)
}

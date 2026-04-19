
import { locationController } from "@/modules/location/location.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    return locationController.getBranches(req)
}

export async function POST(req: NextRequest) {
    return locationController.createBranch(req)
}

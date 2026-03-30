import { authController } from "@/modules/auth/auth.controller";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return authController.me(req)
}
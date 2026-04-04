import { customerController } from "@/modules/customer/customer.controller";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
  return customerController.updateCustomerStatus(req, id)
}
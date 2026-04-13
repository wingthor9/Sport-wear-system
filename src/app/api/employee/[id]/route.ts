import { employeeController } from "@/modules/employee/employee.controller"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return employeeController.getEmployee(id)

}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return employeeController.updateEmployee(req, id)

}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
  return employeeController.updateEmployeeStatus(req, id)
}

// export async function PUT(req: NextRequest, { params }: { params: Promise<Promise<{ id: string }>> }) {
//     const { id } = await await params
//     return employeeController.deleteEmployee(id)

// }
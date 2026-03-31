
import { Customer } from "../customer/customer.type"
import { Employee } from "../employee/employee.type"
import { Product } from "../product/product.types"

export type SaleDetail = {
    sale_detail_id: string
    quantity: number
    price: number

    sale_id: string
    product_id: string

    product?: Product

    createdAt: string
    updatedAt: string
}

export type Sale = {
    sale_id: string
    sale_date: string
    total_amount?: number

    employee_id: string
    customer_id?: string

    employee?: Employee
    customer?: Customer

    sale_details?: SaleDetail[]

    createdAt: string
    updatedAt: string
}

export type CreateSaleDetailInput = {
    product_id: string
    quantity: number
    price: number
}

export type CreateSaleInput = {
    employee_id: string
    customer_id?: string
    sale_details: CreateSaleDetailInput[]
}
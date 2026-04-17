
import { Employee } from "../employee/employee.type"
import { Product } from "../product/product.types"
import { PurchaseOrder } from "../purchase/purchase.type"

export type ImportDetail = {
    import_detail_id: string
    quantity: number
    cost_price: number
    import_id: string
    product_id: string
    product?: Product
    createdAt?: string
    updatedAt?: string
}

export type Import = {
    import_id: string
    import_code?: string
    import_date: Date
    purchase_id: string
    employee_id?: string
    purchase?: PurchaseOrder
    employee?: Employee
    import_details?: ImportDetail[]
    createdAt?: string
    updatedAt?: string
}

export type CreateImportDetailInput = {
    product_id: string
    product_code?: string
    quantity: number
    cost_price: number
}

export type CreateImportInput = {
    purchase_id: string
    import_code?: string
    employee_id?: string
    import_date?: Date
    import_details: CreateImportDetailInput[]
}
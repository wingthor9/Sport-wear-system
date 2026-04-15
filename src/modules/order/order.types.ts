
import { Customer } from "../customer/customer.type"
import { Product } from "../product/product.types"



export type OrderStatus =
  | "PENDING"
  | "WAITING_PAYMENT"
  | "PAID"
  | "SHIPPED"
  | "COMPLETED"
  | "CANCELLED"

export type OrderDetail = {
  order_detail_id: string
  quantity: number
  price: number

  order_id: string
  product_id: string

  product?: Product

  createdAt: string
  updatedAt: string
}

export type Order = {
  order_id: string
  order_date: string
  status: OrderStatus
  total_amount?: number

  customer_id: string
  customer?: Customer

  order_details?: OrderDetail[]

  createdAt: string
  updatedAt: string
}

export type CreateOrderDetailInput = {
  product_id: string
  quantity: number
  price: number
}

export type CreateOrderInput = {
  customer_id: string
  order_details: CreateOrderDetailInput[]
}

export type UpdateOrderStatusInput = {
  status: OrderStatus
}

import { PaymentMethod } from "@prisma/client"
import { Customer } from "../customer/customer.type"
import { Product } from "../product/product.types"
import { Payment } from "../payment/payment.type"
import { Delivery } from "../delivery/delivery.type"



export enum OrderStatus {
  WAITING_PAYMENT = "WAITING_PAYMENT",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}
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
  order_code: string
  status: OrderStatus
  total_amount: number
  customer_id: string
  customer?: Customer
  order_details?: OrderDetail[]
  payment: Payment
  delivery: Delivery
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

export type OrderInput = {
  customer_id: string
  order_date: string
  order_code: string
  status: OrderStatus

  order_details: {
    product_id: string
    quantity: number
    price: number
  }[]

  payment: {
    method: PaymentMethod
    amount: number
    file?: File
  }

  address: {
    province_id: string
    district_id: string
    branch_id: string
  }
}
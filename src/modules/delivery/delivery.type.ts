import {  DeliveryStatus } from "@prisma/client"

export type UpdateDeliveryInput = {
  status?: DeliveryStatus
  tracking_number?: string
}

export type CreateDeliveryInput = {
  order_id: string
  address_id: string
}

export type Delivery = {
  delivery_id: string
  order_id: string
  address_id: string
  status: DeliveryStatus
  tracking_number?: string
  provider: string
  createdAt: string
  updatedAt: string
}


export type DeliveryWithAddress = Delivery & {
  province: string
  district: string
  branch: string
}
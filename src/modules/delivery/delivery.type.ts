
import { Branch, District, Province } from "../location/location.type"
import { DeliveryStatus } from "@prisma/client"



export type Delivery = {
  delivery_id: string
  order_id: string
  address_id: string
  address: Address
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

export type AddressBranch = {
  address_id: string
  province_id: string
  district_id: string
  branch_id: string
}

export type Address = {
  province: Province
  district: District
  branch: Branch
}



export type UpdateDeliveryInput = {
    status?: DeliveryStatus
    tracking_number?: string
}

export type CreateDeliveryInput = {
    order_id: string
    address_id: string
}
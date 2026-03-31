

// Customer 

export type Customer = {
    customer_id: string
    customer_name: string
    email: string
    phone: string
    gender?: string
    address?: string
    role: "CUSTOMER"
    isActive: boolean
    point: number
    lastLogin?: string

    createdAt: string
    updatedAt: string
}

export type CreateCustomerInput = {
    customer_name: string
    email: string
    phone: string
    password: string
    gender?: string
    address?: string
}

export type UpdateCustomerInput = {
    customer_name?: string
    email?: string
    phone?: string
    gender?: string
    address?: string
    isActive?: boolean
}
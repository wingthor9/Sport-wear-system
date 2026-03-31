export type Role = "ADMIN" | "STAFF"

export type Employee = {
    employee_id: string
    employee_name: string
    email: string
    phone: string
    gender?: string
    address?: string
    position?: string
    role: Role

    isActive: boolean
    lastLogin?: string

    failedLoginAttempts: number
    lockUntil?: string

    createdAt: string
    updatedAt: string
}

export type CreateEmployeeInput = {
    employee_name: string
    email: string
    phone: string
    password: string
    gender?: string
    address?: string
    position?: string
    role?: Role
}

export type UpdateEmployeeInput = {
    employee_name?: string
    email?: string
    phone?: string
    gender?: string
    address?: string
    position?: string
    role?: Role
    isActive?: boolean
}
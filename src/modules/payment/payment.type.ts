// modules/payment/payment.types.ts

export type PaymentStatus =
    | "PENDING"
    | "VERIFIED"
    | "REJECTED"

export type Payment = {
    payment_id: string
    payment_date: string
    amount: number
    method?: string
    status: PaymentStatus
    slip_url?: string
    public_id?: string
    verified_by?: string
    verified_at?: string
    order_id: string
}

export type CreatePaymentInput = {
    order_id: string
    amount: number
    method?: string
    slip_url?: string
    public_id?: string
    file?: File
}

export type VerifyPaymentInput = {
    status: "VERIFIED" | "REJECTED"
}
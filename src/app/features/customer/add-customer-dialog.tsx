"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import CustomerForm from "./customer-form"
import { useCreateCustomer } from "@/app/features/hooks"

interface Props {
    open: boolean
    onClose: () => void
}

export default function AddCustomerDialog({ open, onClose }: Props) {

    const createCustomer = useCreateCustomer()

    const handleSubmit = (data: any) => {
        createCustomer.mutate(data, {
            onSuccess: () => onClose()
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Add Customer</DialogTitle>
                </DialogHeader>

                <CustomerForm
                    onSubmit={handleSubmit}
                    loading={createCustomer.isPending}
                />

            </DialogContent>
        </Dialog>
    )
}
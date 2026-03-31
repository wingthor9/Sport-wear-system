"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import CustomerForm from "./customer-form"
import { useUpdateCustomer } from "@/app/features/hooks"
import { Customer } from "../types"

interface Props {
    customer: Customer | null
    onClose: () => void
}

export default function EditCustomerDialog({
    customer,
    onClose,
}: Props) {

    const updateCustomer = useUpdateCustomer()

    const handleSubmit = (data: any) => {

        if (!customer) return

        updateCustomer.mutate({
            id: customer.id,
            data
        }, {
            onSuccess: onClose
        })

    }

    return (
        <Dialog open={!!customer} onOpenChange={onClose}>
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Edit Customer</DialogTitle>
                </DialogHeader>

                <CustomerForm
                    defaultValues={customer}
                    onSubmit={handleSubmit}
                    loading={updateCustomer.isPending}
                />

            </DialogContent>
        </Dialog>
    )
}
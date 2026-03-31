"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { useDeleteCustomer } from "@/app/features/hooks"

interface Props {
    id: string | null
    onClose: () => void
}

export default function DeleteCustomerDialog({
    id,
    onClose,
}: Props) {

    const deleteCustomer = useDeleteCustomer()

    const handleDelete = () => {

        if (!id) return

        deleteCustomer.mutate(id, {
            onSuccess: onClose
        })

    }

    return (
        <Dialog open={!!id} onOpenChange={onClose}>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Delete Customer</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this customer?
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-4">

                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                </div>

            </DialogContent>

        </Dialog>
    )
}
"use client"

import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { UseMutationResult } from "@tanstack/react-query"
import { Customer } from "@/modules/customer/customer.type"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { CustomerRegisterInput, CustomerUpdateInput } from "@/modules/auth/auth.type"
import { CustomerFormValues, customerRegisterSchema } from '@/schemas/schema';


/* ----------------------------- Props ----------------------------- */

type CustomerFormDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    customer?: Customer
    create: UseMutationResult<Customer, Error, CustomerRegisterInput>
    update: UseMutationResult<Customer, Error, { id: string; data: CustomerUpdateInput }>
}

/* ----------------------------- Component ----------------------------- */

export function CustomerFormDialog({ open, onOpenChange, customer, create, update }: CustomerFormDialogProps) {

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<CustomerFormValues>({
        resolver: zodResolver(customerRegisterSchema),
        defaultValues: {
            customer_name: "",
            phone: "",
            address: "",
            email: "",
            gender: "",
            isActive: true
        }
    })

    console.log("customer  :",customer)

    /* ----------------------------- Reset ----------------------------- */

    useEffect(() => {
        if (!open) return
        if (customer) {
            reset({
                customer_name: customer?.customer_name,
                phone: customer?.phone,
                address: customer?.address,
                email: customer?.email,
                gender: customer?.gender,
                isActive: customer?.isActive === "ACTIVE",
            })
        }
    }, [open, customer, reset])


    /* ----------------------------- Submit ----------------------------- */

    const onSubmit = async (values: CustomerFormValues) => {
        try {
            if (customer) {
                // ✅ map ไป update type
                const updatePayload: CustomerUpdateInput = {
                    ...values
                }
                console.log("updatePayload  :",updatePayload)

                await update.mutateAsync({
                    id: customer.customer_id,
                    data: updatePayload
                })

                toast.success("Customer updated status")

            } else {
                // ❗ ต้องมี password (fix ตรงนี้)
                const payload: CustomerRegisterInput = {
                    ...values, 
                }
                console.log("payload  :",payload)

                await create.mutateAsync(payload)
                toast.success("Customer created")
            }

            onOpenChange(false)
            reset()

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
    }

    /* ----------------------------- UI ----------------------------- */

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {customer ? "Edit Customer" : "Add Customer"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input
                            {...register("customer_name")}
                            placeholder="Customer name..." />
                        <div className="h-6 text-red-500">{errors.customer_name?.message}</div>
                    </div>
                    <div>
                        <Input
                            type="number"
                            {...register("phone")}
                            placeholder="Phone number..."
                        />
                        <div className="h-6 text-red-500">{errors.phone?.message}</div>
                    </div>

                    <div>
                        <Input
                            {...register("email")}
                            placeholder="Email..."
                        />
                        <div className="h-6 text-red-500">{errors.email?.message}</div>
                    </div>
                    <div>
                        <Input
                            {...register("address")}
                            placeholder="Address..."
                        />
                        <div className="h-6 text-red-500">{errors.address?.message}</div>
                    </div>
                    <div>
                        <Input
                            {...register("gender")}
                            placeholder="Gender..."
                        />
                        <div className="h-6 text-red-500">{errors.gender?.message}</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Status</Label>
                        <Controller
                            control={control}
                            name="isActive"
                            render={({ field }) => (
                                <div className="flex items-center gap-3">
                                    <Switch
                                        checked={field.value ?? false}
                                        onCheckedChange={(value) => field.onChange(value)}
                                    />

                                    <span className="text-sm">
                                        {field.value ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            )}
                        />
                    </div>

                    <div className="h-6 text-red-500">
                        {errors.isActive?.message}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={create.isPending || update.isPending}
                    >
                        {customer ? "Update Customer" : "Create Customer"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
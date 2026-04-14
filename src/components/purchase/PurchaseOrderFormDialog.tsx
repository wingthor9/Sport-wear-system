"use client"

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useForm, useFieldArray } from "react-hook-form"
import { CreatePurchaseOrderInput, PurchaseOrder, UpdatePurchaseOrderInput } from "@/modules/purchase/purchase.type"
import { Supplier } from "@/modules/supplier/supplier.type"
import { Product } from "@/modules/product/product.types"
import { UseMutationResult } from "@tanstack/react-query"
import { PurchaseFormValues, purchaseSchema } from "@/schemas/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/app/features/hooks"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    purchaseOrder?: PurchaseOrder
    create: UseMutationResult<PurchaseOrder, Error, CreatePurchaseOrderInput>
    update: UseMutationResult<PurchaseOrder, Error, { id: string; data: UpdatePurchaseOrderInput }>
    suppliers: Supplier[]
    products: Product[]
}

// type FormValues = {
//     supplier_id: string
//     purchase_details: {
//         product_id: string
//         quantity: number
//         price: number
//     }[]
// }

export function PurchaseOrderFormDialog({ open, onOpenChange, purchaseOrder, create, update, suppliers, products }: Props) {
    const { user, isLoading } = useAuth()
    const { register, control, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<PurchaseFormValues>({
        resolver: zodResolver(purchaseSchema),
        defaultValues: {
            supplier_id: "",
            employee_id: "",
            purchase_date: new Date(),
            purchase_details: []
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "purchase_details"
    })
    /* ---------------- RESET ---------------- */
    useEffect(() => {
        if (!open) return
        if (purchaseOrder) {
            reset({
                supplier_id: purchaseOrder.supplier_id,
                employee_id: user.employee_id,
                purchase_details:
                    purchaseOrder.purchase_details?.map(d => ({
                        product_id: d.product_id,
                        quantity: d.quantity,
                        price: d.price
                    })) || []
            })
        }
    }, [open, purchaseOrder, reset])

    /* ---------------- ADD ITEM ---------------- */
    const addItem = () => {
        append({
            product_id: "",
            quantity: 1,
            price: 0
        })
    }

    /* ---------------- SUBMIT ---------------- */
    const onSubmit = async (data: PurchaseFormValues) => {
        try {
            if (!data.supplier_id || data.purchase_details.length === 0) {
                toast.error("Missing data")
                return
            }

            const payload = {
                supplier_id: data.supplier_id,
                employee_id: user.employee_id,
                purchase_date: new Date(),
                purchase_details: data.purchase_details
            }

            if (purchaseOrder) {
                await update.mutateAsync({
                    id: purchaseOrder.purchase_id,
                    data: payload
                })
                toast.success("Updated successfully")
            } else {
                await create.mutateAsync(payload)
                toast.success("Created successfully")
            }

            onOpenChange(false)
            reset()

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
    }

    // console.log("user : ",user )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>
                        {purchaseOrder ? "Edit Purchase Order" : "Create Purchase Order"}
                    </DialogTitle>
                </DialogHeader>

                {/* SUPPLIER */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <select {...register("supplier_id")}>
                            <option value="">Select category</option>
                            {suppliers.map((c) => (
                                <option key={c.supplier_id} value={c.supplier_id}>
                                    {c.supplier_name}
                                </option>
                            ))}
                        </select>
                        <div className="h-6 text-red-500">{errors.supplier_id?.message}</div>
                    </div>

                    {/* ITEMS */}
                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">

                                {/* PRODUCT */}
                                <div>
                                    <select
                                        {...register(`purchase_details.${index}.product_id` as const)}
                                        className="border p-2"
                                    >
                                        <option value="">Select product</option>
                                        {products.map(p => (
                                            <option key={p.product_id} value={p.product_id}>
                                                {p.product_name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="h-6 text-red-500">{errors.purchase_details?.[index]?.product_id?.message}</div>
                                </div>

                                {/* QTY */}
                                <div>
                                    <Input
                                        type="number"
                                        {...register(`purchase_details.${index}.quantity` as const, {
                                            valueAsNumber: true
                                        })}
                                        placeholder="Qty"
                                    />
                                    <div className="h-6 text-red-500">{errors.purchase_details?.[index]?.quantity?.message}</div>
                                </div>

                                {/* PRICE */}
                                <div>
                                    <Input
                                        type="number"
                                        {...register(`purchase_details.${index}.price` as const, {
                                            valueAsNumber: true
                                        })}
                                        placeholder="Price"
                                    />
                                    <div className="h-6 text-red-500">{errors.purchase_details?.[index]?.price?.message}</div>

                                </div>

                                <Button
                                    type="button"
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button type="button" onClick={addItem}>
                        + Add Item
                    </Button>

                    {/* SUBMIT */}
                    <Button
                        className="w-full"
                        type="submit"
                        disabled={create.isPending || update.isPending}
                    >
                        {purchaseOrder ? "Update" : "Create"}
                    </Button>
                </form>

            </DialogContent>
        </Dialog>
    )
}
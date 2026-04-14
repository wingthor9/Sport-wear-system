// "use client"

// import { useEffect } from "react"
// import { useForm, useFieldArray } from "react-hook-form"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { toast } from "sonner"
// import { useAuth } from "@/app/features/hooks"
// import { UseMutationResult } from "@tanstack/react-query"
// import { CreateImportInput, Import } from "@/modules/import/import.type"
// import { PurchaseOrder } from "@/modules/purchase/purchase.type"

// type Props = {
//     open: boolean,
//     onOpenChange: (open: boolean) => void,
//     create: UseMutationResult<Import, Error, CreateImportInput>,
//     purchases: PurchaseOrder[]
// }

// export function ImportFormDialog({ open, onOpenChange, create, purchases}: Props) {
//     const { user } = useAuth()
//     const { register, control, handleSubmit, setValue, watch, reset } = useForm({
//         defaultValues: {
//             purchase_id: "",
//             import_details: []
//         }
//     })

//     const { fields, replace } = useFieldArray({
//         control,
//         name: "import_details"
//     })

//     const purchase_id = watch("purchase_id")

//     /* ================= LOAD PURCHASE ================= */
//     useEffect(() => {
//         const purchase = purchases.find((p) => p.purchase_id === purchase_id)

//         if (!purchase) return

//         const mapped = purchase.purchase_details?.map((d) => ({
//             product_id: d.product_id,
//             product_name: d.product?.product_name,
//             ordered: d.quantity,
//             received: d.received_qty,
//             remaining: d.quantity - d.received_qty,
//             quantity: 0,
//             cost_price: d.price
//         }))

//         replace(mapped)
//     }, [purchase_id])

//     /* ================= VALIDATION ================= */
//     // const validate = (data: Import) => {
//     //     for (const item of data.import_details || []) {
//     //         if (item.quantity > mapped.remaining  ) {
//     //             toast.error(
//     //                 `${item.product_name} exceeds remaining (${item.remaining})`
//     //             )
//     //             return false
//     //         }
//     //     }
//     //     return true
//     // }

//     /* ================= SUBMIT ================= */
//     const onSubmit = async (data: Import) => {

//         console.log("IMPORT DATA:", data)

//         if (!validate(data)) return

//         try {
//             await create.mutateAsync({
//                 ...data,
//                 employee_id: user.employee_id
//             })

//             toast.success("Import success")
//             reset()
//             onOpenChange(false)

//         } catch (error) {
//             console.error(error)
//             toast.error("Something went wrong")
//         }
//     }

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="max-w-3xl">
//                 <DialogHeader>
//                     <DialogTitle>Create Import</DialogTitle>
//                 </DialogHeader>

//                 {/* PURCHASE SELECT */}
//                 <select
//                     className="border p-2 w-full"
//                     onChange={(e) =>
//                         setValue("purchase_id", e.target.value)
//                     }
//                 >
//                     <option value="">Select Purchase</option>
//                     {purchases.map((p) => (
//                         <option key={p.purchase_id} value={p.purchase_id}>
//                             {p.purchase_id}
//                         </option>
//                     ))}
//                 </select>

//                 {/* ITEMS TABLE */}
//                 <div className="space-y-3 mt-4">

//                     {fields.map((f: any, i: number) => (
//                         <div
//                             key={f.id}
//                             className="grid grid-cols-6 gap-2 items-center border p-2 rounded"
//                         >

//                             {/* PRODUCT */}
//                             <div className="text-sm font-medium">
//                                 {f.product_name}
//                             </div>

//                             {/* ORDERED */}
//                             <div className="text-xs text-gray-500">
//                                 Ordered: {f.ordered}
//                             </div>

//                             {/* RECEIVED */}
//                             <div className="text-xs text-blue-500">
//                                 Received: {f.received}
//                             </div>

//                             {/* REMAINING */}
//                             <div className="text-xs text-red-500">
//                                 Remaining: {f.remaining}
//                             </div>

//                             {/* INPUT QTY */}
//                             <Input
//                                 type="number"
//                                 placeholder="Import qty"
//                                 {...register(`import_details.${i}.quantity`, {
//                                     valueAsNumber: true,
//                                     min: 0,
//                                     max: f.remaining
//                                 })}
//                             />

//                             {/* COST */}
//                             <Input
//                                 type="number"
//                                 placeholder="Cost"
//                                 {...register(`import_details.${i}.cost_price`, {
//                                     valueAsNumber: true
//                                 })}
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 {/* SUBMIT */}
//                 <Button
//                     className="w-full mt-4"
//                     onClick={handleSubmit(onSubmit)}
//                 >
//                     Create Import
//                 </Button>

//             </DialogContent>
//         </Dialog>
//     )
// }

"use client"

import { useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useAuth } from "@/app/features/hooks"
import { toast } from "sonner"
import { PurchaseOrder } from "@/modules/purchase/purchase.type"
import { UseMutationResult } from "@tanstack/react-query"
import { CreateImportInput, Import } from "@/modules/import/import.type"
import { ImportFormValue } from "@/schemas/schema"


type Props = {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    create: UseMutationResult<Import, Error, CreateImportInput>,
    purchases: PurchaseOrder[]
}

export function ImportFormDialog({  open,  onOpenChange,  create,  purchases}: Props) {
    const { user } = useAuth()
    const { register, control, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            purchase_id: "",
            import_details: []
        }
    })

    const { fields, replace } = useFieldArray({
        control,
        name: "import_details"
    })
    const purchaseId = watch("purchase_id")

    /* 🔥 load purchase detail */
    useEffect(() => {
        const purchase = purchases.find((p) => p.purchase_id === purchaseId)

        if (!purchase) return

        const items = purchase.purchase_details?.map((d) => ({
            product_id: d.product_id,
            quantity: 0,
            cost_price: d.price
        }))

        replace(items)
    }, [purchaseId])

    /* submit */
    const onSubmit = async (data: ImportFormValue) => {
        try {
            await create.mutateAsync({
                ...data,
                employee_id: user.employee_id
            })

            toast.success("Import created")
            onOpenChange(false)
            reset()

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Import</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* SELECT PURCHASE */}
                    <Select
                        onValueChange={(v) =>
                            setValue("purchase_id", v, { shouldValidate: true })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select purchase" />
                        </SelectTrigger>
                        <SelectContent>
                            {purchases.map((p) => (
                                <SelectItem key={p.purchase_id} value={p.purchase_id}>
                                    {p.purchase_id}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* ITEMS */}
                    <div className="space-y-2">
                        {fields.map((f, i) => (
                            <div key={f.product_id} className="flex gap-2">

                                <Input
                                    value={f.product_id}
                                    disabled
                                />

                                <Input
                                    type="number"
                                    placeholder="Qty"
                                    {...register(`import_details.${i}.quantity`, {
                                        valueAsNumber: true
                                    })}
                                />

                                <Input
                                    type="number"
                                    placeholder="Cost"
                                    {...register(`import_details.${i}.cost_price`, {
                                        valueAsNumber: true
                                    })}
                                />
                            </div>
                        ))}
                    </div>

                    <Button type="submit" className="w-full">
                        Create Import
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}
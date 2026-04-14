"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Import } from "@/modules/import/import.type"

type Props = {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    data: Import
}

export function ImportDetail({ open, onOpenChange, data }: Props) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Import Detail</DialogTitle>
                </DialogHeader>

                <div>
                    {data?.import_details?.map((d) => (
                        <div key={d.import_detail_id}>
                            {d.product?.product_name} - {d.quantity}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
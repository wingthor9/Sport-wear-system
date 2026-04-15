import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Payment } from "@/modules/payment/payment.type"

type Props = {
    open: boolean
    onOpenChange: (v: boolean) => void
    payment?: Payment
    onConfirm: (status: "VERIFIED" | "REJECTED") => void
}

export function PaymentVerifyDialog({ open, onOpenChange, payment, onConfirm}: Props) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Verify Payment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        Order: {payment?.order_id}
                    </div>
                    <div>
                        Amount: {payment?.amount}
                    </div>
                    {payment?.slip_url && (
                        <Image
                            src={payment.slip_url}
                            className="w-full rounded"
                            width={200}
                            height={200}
                            alt="slip"
                        />
                    )}
                    <div className="flex gap-2">
                        <Button
                            className="w-full"
                            onClick={() => onConfirm("VERIFIED")}
                        >
                            Approve
                        </Button>

                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => onConfirm("REJECTED")}
                        >
                            Reject
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
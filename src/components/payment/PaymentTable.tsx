import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Payment } from "@/modules/payment/payment.type"

type Props = {
    payments: Payment[]
    isLoading: boolean
    onVerify: (p: Payment) => void
}

export function PaymentTable({ payments, isLoading, onVerify }: Props) {

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Slip</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {payments.length ? (
                        payments.map((p) => (
                            <TableRow key={p.payment_id}>
                                <TableCell>{p.order_id}</TableCell>
                                <TableCell>{p.amount}</TableCell>
                                <TableCell>{p.status}</TableCell>

                                <TableCell>
                                    {p.slip_url && (
                                        <Image
                                            src={p.slip_url}
                                            className="w-12 h-12 object-cover rounded"
                                            width={48}
                                            height={48}
                                            alt="Slip"
                                        />
                                    )}
                                </TableCell>

                                <TableCell className="text-right">
                                    {p.status === "PENDING" && (
                                        <Button size="sm" onClick={() => onVerify(p)}>
                                            Verify
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                No data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
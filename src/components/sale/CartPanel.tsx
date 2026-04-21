// components/CartPanel.tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"
import { formatCurrency } from "@/utils/FormatCurrency"
import CartItem from "./CartItem"

type Props = {
    cart: {
        product_id: string
        name: string
        price: number
        quantity: number
        image?: string
    }[]
    update: (product_id: string, quantity: number) => void
    remove: (product_id: string) => void
    total: number
    checkout: () => void
}

export default function CartPanel({ cart, update, remove, total, checkout }: Props) {
    return (
        <div className="flex flex-col bg-white">

            {/* HEADER */}
            <div className="px-4 py-3 border-b">
                <h2 className="font-semibold text-gray-900">
                    Cart ({cart.length})
                </h2>
            </div>

            {/* LIST */}
            <ScrollArea className="flex-1 px-3 py-2 space-y-2">
                {cart.map((i) => (
                    <div
                        key={i.product_id}
                        className="rounded-xl border p-2 hover:bg-gray-50 transition"
                    >
                        <CartItem
                            item={i}
                            onUpdate={update}
                            onRemove={remove}
                        />
                    </div>
                ))}
            </ScrollArea>

            {/* FOOTER */}
            <div className="p-4 border-t bg-gray-50 space-y-3">

                {/* TOTAL */}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total</span>
                    <span className="text-xl font-semibold text-gray-900">
                        {formatCurrency(total)}
                    </span>
                </div>

                {/* BUTTON */}
                <Button
                    className="w-full h-11 text-base font-medium shadow-sm"
                    onClick={checkout}
                >
                    <CreditCard className="mr-2 w-4 h-4" />
                    Checkout
                </Button>

            </div>

        </div>
    )
}

import { Button } from "@/components/ui/button"
import CartItem from "./CartItem"
import { CartItem } from "./type"

type Props = {
    cart: CartItem
    update: (product_id: string, delta: number) => void
    remove: (product_id: string) => void
    subtotal: number
    tax: number
    total: number
    onCheckout: () => void
}

export default function CartPanel({ cart, update, remove, subtotal, tax, total, onCheckout}: Props) {
    console.log("cart : ",cart)
    return (
        <div className="flex flex-col flex-1">

            {/* LIST */}
            <div className="flex-1 overflow-auto p-2 space-y-2">
                {cart.map((i) => (
                    <CartItem key={i.product_id} item={i} onUpdate={update} onRemove={remove} />
                ))}
            </div>

            {/* SUMMARY */}
            <div className="p-4 border-t bg-gray-50 space-y-2 text-sm">

                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal}</span>
                </div>

                <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>{tax}</span>
                </div>

                <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{total}</span>
                </div>

                <Button
                    className="w-full mt-2"
                    onClick={onCheckout}
                    disabled={!cart.length}
                >
                    Checkout
                </Button>
            </div>
        </div>
    )
}
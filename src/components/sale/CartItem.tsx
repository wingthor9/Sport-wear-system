// components/CartItem.tsx
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { formatCurrency } from "@/utils/FormatCurrency"
 type CartItem = {
    product_id: string
    name: string
    price: number
    quantity: number
    image?: string
}

type Props = {
    item: CartItem
    onUpdate: (product_id: string, quantity: number) => void
    onRemove: (product_id: string) => void
}

export default function CartItem({ item, onUpdate, onRemove }: Props) {
    return (
        <div className="border-2 border-red-500 flex justify-between items-center border-b py-2">

            <div className="flex gap-2 items-center">
                <Image src={item.image || ""} alt="" width={40} height={40} className="rounded" />
                <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{formatCurrency(item.price)}</p>
                </div>
            </div>

            <div className="flex items-center gap-1">
                <Button size="icon" onClick={() => onUpdate(item.product_id, -1)}>
                    <Minus />
                </Button>
                <span>{item.quantity}</span>
                <Button size="icon" onClick={() => onUpdate(item.product_id, 1)}>
                    <Plus />
                </Button>
                <Button size="icon" onClick={() => onRemove(item.product_id)}>
                    <Trash2 />
                </Button>
            </div>

        </div>
    )
}
// components/ProductGrid.tsx
import { Product } from "@/modules/product/product.types"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { formatCurrency } from "@/utils/FormatCurrency"

type Props = {
    products: Product[]
    onAdd: (product: Product) => void
}

export default function ProductGrid({ products, onAdd }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((p: Product) => (
                <Card
                    key={p.product_id}
                    className="p-2 cursor-pointer hover:shadow-md"
                    onClick={() => onAdd(p)}
                >
                    <Image
                        src={p.images?.[0]?.image_url || ""}
                        alt={p.product_name}
                        width={200}
                        height={200}
                        className="h-24 w-full object-cover rounded-md"
                    />

                    <p className="text-sm truncate mt-2">{p.product_name}</p>
                    <p className="text-blue-500">{formatCurrency(p.sale_price)}</p>
                </Card>
            ))}
        </div>
    )
}
// // components/ProductGrid.tsx
// import { Product } from "@/modules/product/product.types"
// import { Card } from "@/components/ui/card"
// import Image from "next/image"
// import { formatCurrency } from "@/utils/FormatCurrency"

// type Props = {
//     products: Product[]
//     onAdd: (product: Product) => void
// }

// export default function ProductGrid({ products, onAdd }: Props) {
//     return (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
//             {products.map((p: Product) => (
//                 <Card
//                     key={p.product_id}
//                     className="p-2 cursor-pointer hover:shadow-md"
//                     onClick={() => onAdd(p)}
//                 >
//                     <Image
//                         src={p.images?.[0]?.image_url || ""}
//                         alt={p.product_name}
//                         width={200}
//                         height={200}
//                         className="h-24 w-full object-cover rounded-md"
//                     />

//                     <p className="text-sm truncate mt-2">{p.product_name}</p>
//                     <p className="text-blue-500">{formatCurrency(p.sale_price)}</p>
//                 </Card>
//             ))}
//         </div>
//     )
// }

import { Product } from "@/modules/product/product.types"
import Image from "next/image"
import { formatCurrency } from "@/utils/FormatCurrency"
import { CartItem } from "./type"

type Props = {
    products: Product[]
    onAdd: (product: CartItem) => void
}

export default function ProductGrid({ products, onAdd }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">

            {products.map((p) => (
                <div
                    key={p.product_id}
                    onClick={() => onAdd(p)}
                    className="
            bg-white border rounded-xl p-2 cursor-pointer
            hover:shadow-md active:scale-95 transition
          "
                >
                    {/* IMAGE */}
                    <div className="w-full h-24 bg-gray-100 rounded-md overflow-hidden">
                        {p.images?.[0]?.image_url ? (
                            <Image
                                src={p.images[0].image_url}
                                alt={p.product_name}
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* INFO */}
                    <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium truncate">
                            {p.product_name}
                        </p>

                        <p className="text-blue-500 font-semibold text-sm">
                            {formatCurrency(p.sale_price)}
                        </p>
                    </div>
                </div>
            ))}

            {/* EMPTY STATE */}
            {!products.length && (
                <div className="col-span-full text-center text-gray-400 py-10">
                    No products found
                </div>
            )}

        </div>
    )
}
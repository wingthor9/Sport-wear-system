import { Order } from "@/modules/order/order.types"

type Props = {
    order?: Order
}

export function OrderDetail({ order }: Props) {
    if (!order) return <div>No data</div>

    return (
        <div className="space-y-4">

            <div>
                <p><b>Order code:</b> {order.order_code}</p>
                <p><b>Status:</b> {order.status}</p>
                <p><b>Date:</b> {new Date(order.order_date).toLocaleString()}</p>
            </div>

            <div>
                <p className="font-semibold mb-2">Items</p>

                {order.order_details?.map((item) => (
                    <div
                        key={item.order_detail_id}
                        className="flex justify-between border p-2 rounded"
                    >
                        <span>{item.product?.product_name}</span>
                        <span>{item.quantity} x {item.price}</span>
                    </div>
                ))}
            </div>

            <div className="text-right font-bold">
                Total: ${order.total_amount}
            </div>

        </div>
    )
}
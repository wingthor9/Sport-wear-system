import { prisma } from "@/lib/prisma"
import { BadRequestError, NotFoundError } from "@/utils/response"
import { CreateDeliveryInput, UpdateDeliveryInput } from "./delivery.type"
import { DeliveryStatus, PaymentStatus, Prisma } from "@prisma/client"

export const deliveryService = {

    async getDeliveries(options?: Prisma.DeliveryFindManyArgs) {
        const customers = await prisma.delivery.findMany({
            ...options,
            include: {
                order: true,
                address: true
            }
        })
        return customers
    },

    async getDelivery(id: string) {
        return prisma.delivery.findUnique({
            where: { delivery_id: id },
            include: {
                order: true,
                address: true
            }
        })
    },

    async createDelivery(data: CreateDeliveryInput) {
        return prisma.$transaction(async (tx) => {
            const order = await tx.order.findUnique({
                where: { order_id: data.order_id },
                include: { payment: true }
            })

            if (!order) throw new NotFoundError("Order not found")
            if (order.payment?.status !== PaymentStatus.VERIFIED) {
                throw new BadRequestError("Payment required before delivery")
            }

            return tx.delivery.create({
                data: {
                    order_id: data.order_id,
                    address_id: data.address_id,
                    status: DeliveryStatus.PENDING,
                    provider: "Anousith Express"
                }
            })
        })
    },

    async updateDelivery(id: string, data: UpdateDeliveryInput) {
        const delivery = await prisma.delivery.findUnique({
            where: { delivery_id: id }
        })
        if (!delivery) {
            throw new NotFoundError("Delivery not found")
        }
        // 🔥 validate flow (optional but recommended)
        if (data.status === DeliveryStatus.SHIPPED && !data.tracking_number && !delivery.tracking_number) {
            throw new BadRequestError("Tracking number required before shipping")
        }

        return prisma.delivery.update({
            where: { delivery_id: id },
            data: {
                ...data
            }
        })
    }
}
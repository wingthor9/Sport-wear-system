import { prisma } from "@/lib/prisma"
import { BadRequestError, NotFoundError } from "@/utils/response"
import { CreateDeliveryInput, UpdateDeliveryInput } from "./delivery.type"
import { DeliveryStatus, PaymentStatus, Prisma } from "@prisma/client"
import { generateTrackingCode } from "@/utils/generateCode"

export const deliveryService = {

    async getDeliveries(options?: Prisma.DeliveryFindManyArgs) {
        return prisma.delivery.findMany({
            ...options,
            include: {
                order: true,
                address: {
                    include: {
                        province: true,
                        district: true,
                        branch: true
                    }
                }
            }
        })
    },

    async getDelivery(id: string) {
        return prisma.delivery.findUnique({
            where: { delivery_id: id },
            include: {
                order: true,
                address: {
                    include: {
                        province: true,
                        district: true,
                        branch: true
                    }
                }
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

            const tracking = generateTrackingCode()

            return tx.delivery.create({
                data: {
                    order_id: data.order_id,
                    address_id: data.address_id,
                    tracking_number: tracking,
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

        if (!delivery) throw new NotFoundError("Delivery not found")

        if (
            data.status === DeliveryStatus.SHIPPED &&
            !data.tracking_number &&
            !delivery.tracking_number
        ) {
            throw new BadRequestError("Tracking number required before shipping")
        }

        return prisma.delivery.update({
            where: { delivery_id: id },
            data
        })
    }
}
import { NextRequest } from "next/server"
import { deliveryService } from "./delivery.service"
import { BadRequestError, errorResponse, ForbiddenError, NotFoundError, successResponse, UnauthorizedError } from "@/utils/response"
import { getPaginationMeta, getPaginationParams } from "@/utils/pagination"
import { getSearchParam } from "@/utils/search"
import { getSortingParams } from "@/utils/sorting"
import { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export const deliveryController = {

    async getDeliveries(req: NextRequest) {
        try {
            const { page, limit, skip } = getPaginationParams(req)
            const search = getSearchParam(req)
            const orderBy = getSortingParams(req)
            const where: Prisma.DeliveryWhereInput = search
                ? {
                    delivery_id: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
                : {}
            const [deliveries, total] = await Promise.all([
                deliveryService.getDeliveries({
                    where,
                    skip,
                    take: limit,
                    orderBy
                }),
                prisma.delivery.count({ where })
            ])
            const meta = getPaginationMeta(total, page, limit)
            return successResponse({ data: deliveries, meta }, "Get deliveries successfully", 200)
        } catch (error) {
            console.log(error)
            if (error instanceof BadRequestError || error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof UnauthorizedError) {
                return errorResponse(error.message, error.statusCode);
            }
            return errorResponse("Internal Server Error", 500)
        }
    },
    async getDelivery(id: string) {
        try {
            const data = await deliveryService.getDelivery(id)
            return successResponse(data, "Delivery fetched successfully", 200)
        } catch (error) {
            console.log(error)
            if (error instanceof BadRequestError || error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof UnauthorizedError) {
                return errorResponse(error.message, error.statusCode);
            }
            return errorResponse("Internal Server Error", 500)
        }
    },

    async createDelivery(req: NextRequest) {
        try {
            const body = await req.json()
            const data = await deliveryService.createDelivery(body)
            return successResponse(data, "Delivery created", 201)
        } catch (error) {
            console.log(error)
            if (error instanceof BadRequestError || error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof UnauthorizedError) {
                return errorResponse(error.message, error.statusCode);
            }
            return errorResponse("Internal Server Error", 500)
        }
    },


    async updateDelivery(req: NextRequest, id: string) {
        try {
            const body = await req.json()
            const data = await deliveryService.updateDelivery(id, body)
            return successResponse(data, "Delivery updated successfully", 200)
        } catch (error) {
            console.log(error)
            if (error instanceof BadRequestError || error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof UnauthorizedError) {
                return errorResponse(error.message, error.statusCode);
            }
            return errorResponse("Internal Server Error", 500)
        }
    }
}
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authApi, categoryApi, customerApi, employeeApi, orderApi, productApi, purchaseApi, refundApi, saleApi, supplierApi } from "./api"
import { LoginInput, RegisterInput } from "./types"
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { CreateCustomerInput, UpdateCustomerInput } from "@/modules/customer/customer.type"
import { CreateEmployeeInput, UpdateEmployeeInput } from "@/modules/employee/employee.type"
import { Category, UpdateCategoryInput } from "@/modules/category/category.type"
import { CreateSupplierInput, UpdateSupplierInput } from "@/modules/supplier/supplier.type"
import { CreatePurchaseOrderInput, UpdatePurchaseOrderInput } from "@/modules/purchase/purchase.type"
import { CreateOrderInput, UpdateOrderStatusInput } from "@/modules/order/order.types"
import { CreateSaleInput } from "@/modules/sale/sale.type"
import { CreateRefundInput } from "@/modules/refund/refund.type"
import { VerifyOTPInput } from "@/modules/auth/auth.type"


export type UseGetParams = {
    page?: number
    limit?: number
    search?: string
    orderBy?: string
    order?: "asc" | "desc"
}

// export const useAuth = () => {
//     const router = useRouter()
//     const [loading, setLoading] = useState(false)

//     const login = async (data: LoginInput) => {
//         try {
//             setLoading(true)
//             await authApi.login(data)
//             router.push("/admin/dashboard")
//         } catch (error) {
//             console.log(error)
//             // 🔥 show error ให้ user
//             alert(error instanceof Error ? error.message : "Login failed")

//         } finally {
//             setLoading(false)
//         }
//     }

//     const register = async (data: RegisterInput) => {
//         try {
//             setLoading(true)
//             await authApi.register(data)
//             router.push("/auth/login")
//         } finally {
//             setLoading(false)
//         }
//     }

//     const logout = async () => {
//         await authApi.logout()
//         router.push("/auth/login")
//     }

//     const refresh = async () => {
//         await authApi.refresh()
//     }

//     return { login, register, logout, loading, refresh }
// }

export const useAuth = () => {
    const { data, isLoading } = useAdminMe()

    return {
        user: data?.data ?? null,
        isLoading,
        isAuthenticated: !!data?.data,
    }
}

export const useAdminMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: authApi.adminMe,
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })
}

export const useAdminLogin = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: authApi.adminLogin,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["me"] })
        },
    })
}

export const useAdminForgotPassword = () => {
    return useMutation({
        mutationFn: (email: string) => authApi.adminForgotPassword(email),
    })
}

export const useAdminVerifyOtp = () => {
    return useMutation({
        mutationFn: authApi.adminVerifyOtp,
    })
}

export const useAdminResetPassword = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: authApi.adminResetPassword,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["me"] })
        }
    })
}

export const useAdminRegister = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: authApi.adminRegister,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["me"] })
        },
    })
}

export const useAdminLogout = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: authApi.adminLogout,
        onSuccess: () => {
            qc.removeQueries({ queryKey: ["me"] })
            window.location.href = "/login"

        },
    })
}

export const useAdminRefresh = () => {
    return useMutation({
        mutationFn: authApi.adminRefresh,
    })
}


// -------------------------------------------------------- Product start -----------------------------------------------------------------------


export const useGetProducts = (params?: UseGetParams) => {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () => productApi.getAll(params),
        placeholderData: keepPreviousData,
    })
}

export const useGetProduct = (id: string) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productApi.getOne(id),
    })
}

export const useCreateProduct = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: productApi.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] })
        },
    })
}

export const useUpdateProduct = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: FormData }) => productApi.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] })
        },
    })
}

export const useDeleteProduct = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: productApi.delete,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["products"] })
        },
    })
}

// -------------------------------------------------------- Product end -----------------------------------------------------------------------




// -------------------------------------------------------- Category start -----------------------------------------------------------------------

export const useGetCategories = () => {
    return useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: categoryApi.getAll,
    })
}

export const useGetCategory = (id: string) => {
    return useQuery<Category>({
        queryKey: ["category", id],
        queryFn: () => categoryApi.getOne(id),
    })
}

export const useCreateCategory = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: categoryApi.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["categories"] })
        },
    })
}

export const useUpdateCategory = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data, }: { id: string, data: UpdateCategoryInput }) => categoryApi.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["categories"] })
        },
    })
}

export const useDeleteCategory = () => {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: string) => categoryApi.delete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["categories"] })
        },
    })
}


// -------------------------------------------------------- Category end -----------------------------------------------------------------------



// -------------------------------------------------------- Customer start -----------------------------------------------------------------------


export const useGetCustomers = (params?: UseGetParams) => {
    return useQuery({
        queryKey: ["customers", params],
        queryFn: () => customerApi.getAll(params),
        placeholderData: keepPreviousData,
    })
}

export const useGetCustomer = (id: string) => {
    return useQuery({
        queryKey: ["customer", id],
        queryFn: () => customerApi.getOne(id),
    })
}

export const useCreateCustomer = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateCustomerInput) =>
            customerApi.create(data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["customers"] })
        },
    })
}

export const useUpdateCustomer = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateCustomerInput }) =>
            customerApi.update(id, data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["customers"] })
        },
    })
}

export const useDeleteCustomer = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => customerApi.delete(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["customers"] })
        },
    })
}


// -------------------------------------------------------- Customer end -----------------------------------------------------------------------




// -------------------------------------------------------- Customer start -----------------------------------------------------------------------


export const useGetEmployees = () => {
    return useQuery({
        queryKey: ["employees"],
        queryFn: employeeApi.getAll,
    })
}

export const useCreateEmployee = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateEmployeeInput) =>
            employeeApi.create(data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["employees"] })
        },
    })
}

export const useUpdateEmployee = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: ({ id, data, }: { id: string, data: UpdateEmployeeInput }) => employeeApi.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["employees"] })
        },
    })
}

export const useDeleteEmployee = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => employeeApi.delete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["employees"] })
        },
    })
}


// -------------------------------------------------------- Customer end -----------------------------------------------------------------------


// -------------------------------------------------------- Supplier start -----------------------------------------------------------------------


export const useGetSuppliers = () => {
    return useQuery({
        queryKey: ["suppliers"],
        queryFn: supplierApi.getAll
    })
}

export const useCreateSupplier = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateSupplierInput) =>
            supplierApi.create(data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["suppliers"] })
        }
    })
}

export const useUpdateSupplier = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data
        }: {
            id: string
            data: UpdateSupplierInput
        }) => supplierApi.update(id, data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["suppliers"] })
        }
    })
}

export const useDeleteSupplier = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => supplierApi.delete(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["suppliers"] })
        }
    })
}


// -------------------------------------------------------- Supplier end -----------------------------------------------------------------------


// --------------------------------------------------------  Purchase start -----------------------------------------------------------------------


export const useGetPurchaseOrders = () => {
    return useQuery({
        queryKey: ["purchase-orders"],
        queryFn: purchaseApi.getAll
    })
}

export const useGetPurchaseOrder = (id: string) => {
    return useQuery({
        queryKey: ["purchase-order", id],
        queryFn: () => purchaseApi.getById(id),
        enabled: !!id
    })
}

export const useCreatePurchaseOrder = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: CreatePurchaseOrderInput) =>
            purchaseApi.create(data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["purchase-orders"] })
        }
    })
}

export const useUpdatePurchaseOrder = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data
        }: {
            id: string
            data: UpdatePurchaseOrderInput
        }) => purchaseApi.update(id, data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["purchase-orders"] })
        }
    })
}

export const useDeletePurchaseOrder = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => purchaseApi.delete(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["purchase-orders"] })
        }
    })
}



// --------------------------------------------------------  Purchase end -----------------------------------------------------------------------


// --------------------------------------------------------  Order start -----------------------------------------------------------------------

export const useGetOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: orderApi.getAll
    })
}

export const useGetOrder = (id: string) => {
    return useQuery({
        queryKey: ["order", id],
        queryFn: () => orderApi.getById(id),
        enabled: !!id
    })
}

export const useCreateOrder = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateOrderInput) =>
            orderApi.create(data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["orders"] })
        }
    })
}

export const useUpdateOrderStatus = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            data
        }: {
            id: string
            data: UpdateOrderStatusInput
        }) => orderApi.updateStatus(id, data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["orders"] })
        }
    })
}

export const useDeleteOrder = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => orderApi.delete(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["orders"] })
        }
    })
}



// --------------------------------------------------------  Order end---------------------------------------------------------------------



// --------------------------------------------------------  sale or POS start -----------------------------------------------------------------------


export const useGetSales = () => {
    return useQuery({
        queryKey: ["sales"],
        queryFn: saleApi.getAll
    })
}

export const useGetSale = (id: string) => {
    return useQuery({
        queryKey: ["sale", id],
        queryFn: () => saleApi.getById(id),
        enabled: !!id
    })
}

export const useCreateSale = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateSaleInput) =>
            saleApi.create(data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["sales"] })
            qc.invalidateQueries({ queryKey: ["products"] })
        }
    })
}

// export const useDeleteSale = () => {
//     const qc = useQueryClient()

//     return useMutation({
//         mutationFn: (id: string) => saleApi.delete(id),

//         onSuccess: () => {
//             qc.invalidateQueries({ queryKey: ["sales"] })
//         }
//     })
// }



// --------------------------------------------------------  sale or POS end -----------------------------------------------------------------------



// --------------------------------------------------------  Refund start -----------------------------------------------------------------------


export const useGetRefunds = () => {
    return useQuery({
        queryKey: ["refunds"],
        queryFn: refundApi.getAll
    })
}

export const useGetRefund = (id: string) => {
    return useQuery({
        queryKey: ["refund", id],
        queryFn: () => refundApi.getById(id),
        enabled: !!id
    })
}

export const useCreateRefund = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateRefundInput) =>
            refundApi.create(data),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["refunds"] })
            qc.invalidateQueries({ queryKey: ["sales"] })
            qc.invalidateQueries({ queryKey: ["products"] })
        }
    })
}

export const useDeleteRefund = () => {
    const qc = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => refundApi.delete(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["refunds"] })
        }
    })
}



// --------------------------------------------------------  Refund end -----------------------------------------------------------------------



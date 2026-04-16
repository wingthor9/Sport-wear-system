// auth
import { CreateCustomerInput, UpdateCustomerInput, Customer } from "@/modules/customer/customer.type"
import { LoginInput, RegisterInput } from "./types"
import axiosInstance from "@/lib/axiosInstance"
import { CreateEmployeeInput, Employee, UpdateEmployeeInput } from "@/modules/employee/employee.type"
import { Product } from "@/modules/product/product.types"
import { Category, CreateCategoryInput, UpdateCategoryInput } from "@/modules/category/category.type"
import { CreateSupplierInput, Supplier, UpdateSupplierInput } from "@/modules/supplier/supplier.type"
import { CreatePurchaseOrderInput, PurchaseOrder, UpdatePurchaseOrderInput } from "@/modules/purchase/purchase.type"
import { CreateOrderInput, Order, UpdateOrderStatusInput } from "@/modules/order/order.types"
import { CreateSaleInput, Sale } from "@/modules/sale/sale.type"
import { CreateRefundInput, Refund } from "@/modules/refund/refund.type"
import { ForgotPasswordInput, ResetPasswordInput, VerifyOTPInput } from "@/modules/auth/auth.type"
import { isAxiosError } from "axios"
import { CreateImportInput, Import } from "@/modules/import/import.type"
import { CreatePaymentInput, Payment, VerifyPaymentInput } from "@/modules/payment/payment.type"


export type GetParams = {
  page?: number
  limit?: number
  search?: string
  orderBy?: string
  order?: "asc" | "desc"
}

// --------------------------------------------------------Admin Auth start -----------------------------------------------------------------------

export const adminAuthApi = {
  adminLogin: async (data: LoginInput) => {
    // console.log("login data : ",data)
    const res = await axiosInstance.post("auth/admin/login", data)
    return res.data
  },

  adminForgotPassword: async (data: ForgotPasswordInput) => {
    const res = await axiosInstance.post("/auth/admin/forgot-password", data)
    return res.data
  },

  adminResetPassword: async (data: ResetPasswordInput) => {
    const res = await axiosInstance.post("/auth/admin/reset-password", data)
    return res.data
  },

  adminVerifyOtp: async (data: VerifyOTPInput) => {
    const res = await axiosInstance.post("/auth/admin/verify-otp", data)
    return res.data
  },

  adminResendOtp: async (data: ForgotPasswordInput) => {
    const res = await axiosInstance.post("/auth/admin/resend-otp", data)
    return res.data
  },

  adminRegister: async (data: RegisterInput) => {
    const res = await axiosInstance.post("/auth/admin/register", data)
    return res.data
  },

  adminLogout: async () => {
    await axiosInstance.post("/auth/admin/logout")
  },

  adminRefresh: async () => {
    const res = await axiosInstance.post("/auth/refresh")
    return res.data
  },


  adminMe: async () => {
    try {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          return null
        }
      }
      throw err
    }
  }



}

// -------------------------------------------------------- Admin Auth end -----------------------------------------------------------------------



// -------------------------------------------------------- Customer Auth start -----------------------------------------------------------------------


export const customerAuthApi = {
  customerLogin: async (data: LoginInput) => {
    const res = await axiosInstance.post("/auth/customer/login", data)
    return res.data
  },
  customerRegister: async (data: RegisterInput) => {
    const res = await axiosInstance.post("/auth/customer/register", data)
    return res.data
  },
  customerLogout: async () => {
    await axiosInstance.post("/auth/customer/logout")
  },
  customerRefresh: async () => {
    const res = await axiosInstance.post("/auth/refresh")
    return res.data
  },
  customerMe: async () => {
    try {
      const res = await axiosInstance.get("/auth/me")
      return res.data
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          return null
        }
      }
      throw err
    }
  },

  customerForgotPassword: async (data: ForgotPasswordInput) => {
    const res = await axiosInstance.post("/auth/customer/forgot-password", data)
    return res.data
  },

  customerVerifyOtp: async (data: VerifyOTPInput) => {
    const res = await axiosInstance.post("/auth/customer/verify-otp", data)
    return res.data
  },

  customerResendOtp: async (data: ForgotPasswordInput) => {
    const res = await axiosInstance.post("/auth/customer/resend-otp", data)
    return res.data
  },

  customerResetPassword: async (data: ResetPasswordInput) => {
    const res = await axiosInstance.post("/auth/customer/reset-password", data)
    return res.data
  },

}



// -------------------------------------------------------- Customer Auth end -----------------------------------------------------------------------






// -------------------------------------------------------- Product start -----------------------------------------------------------------------
export const productApi = {

  getAll: async (params?: GetParams): Promise<{
    data: Product[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/product", {
      params
    })
    return res.data.data
  },

  getOne: async (id: string): Promise<Product> => {
    const res = await axiosInstance.get(`/product/${id}`)
    return res.data.data.data
  },

  create: async (data: FormData): Promise<Product> => {
    const res = await axiosInstance.post("/product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data.data.data
  },

  update: async (id: string, data: FormData): Promise<Product> => {
    const res = await axiosInstance.put(`/product/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/product/${id}`)
  },
}

// -------------------------------------------------------- Product end -----------------------------------------------------------------------



// -------------------------------------------------------- Category start -----------------------------------------------------------------------

export const categoryApi = {
  //   getAll: async (): Promise<Category[]> => {
  //     const res = await axiosInstance.get("/category")
  //     return res.data.data.data
  //   },

  getAll: async (params?: GetParams): Promise<{
    data: Category[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/category", {
      params
    })
    return res.data.data
  },

  getOne: async (id: string): Promise<Category> => {
    const res = await axiosInstance.get(`/category/${id}`)
    return res.data.data.data
  },

  create: async (data: CreateCategoryInput): Promise<Category> => {
    const res = await axiosInstance.post("/category", data)
    return res.data.data.data
  },

  update: async (id: string, data: UpdateCategoryInput): Promise<Category> => {
    const res = await axiosInstance.put(`/category/${id}`, data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/category/${id}`)
  },
}

// -------------------------------------------------------- Category end -----------------------------------------------------------------------


// -------------------------------------------------------- Customer start -----------------------------------------------------------------------


export const customerApi = {
  getAll: async (params?: GetParams): Promise<{
    data: Customer[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/customer", {
      params
    })

    return res.data.data
  },

  getOne: async (id: string): Promise<Customer> => {
    const res = await axiosInstance.get(`/customer/${id}`)
    return res.data.data.data
  },

  create: async (data: CreateCustomerInput): Promise<Customer> => {
    const res = await axiosInstance.post("/customer", data)
    return res.data.data.data
  },

  update: async (id: string, data: UpdateCustomerInput): Promise<Customer> => {
    const res = await axiosInstance.put(`/customer/${id}`, data)
    return res.data.data.data
  },

  // delete: async (id: string): Promise<void> => {
  //   await axiosInstance.delete(`/customers/${id}`)
  // },

  updateStatus: async (id: string) => {
    const res = await axiosInstance.patch(`/customer/${id}`)
    return res.data.data
  }
}



// -------------------------------------------------------- Customer end -----------------------------------------------------------------------


// -------------------------------------------------------- Employee start -----------------------------------------------------------------------


export const adminApi = {

  getAll: async (): Promise<Employee[]> => {
    const res = await axiosInstance.get("/employee")
    return res.data.data.data
  },

  getById: async (id: string): Promise<Employee> => {
    const res = await axiosInstance.get(`/employee/${id}`)
    return res.data.data.data
  },

  create: async (data: CreateEmployeeInput): Promise<Employee> => {
    const res = await axiosInstance.post("/employee", data)
    return res.data.data.data
  },

  update: async (
    id: string,
    data: UpdateEmployeeInput
  ): Promise<Employee> => {
    const res = await axiosInstance.put(`/employee/${id}`, data)
    return res.data.data.data
  },

  // delete: async (id: string): Promise<void> => {
  //   await axiosInstance.delete(`/employees/${id}`)
  // },
  updateStatus: async (id: string) => {
    const res = await axiosInstance.patch(`/employee/${id}`)
    return res.data.data
  }
}

// -------------------------------------------------------- Employee end -----------------------------------------------------------------------



// -------------------------------------------------------- Supplier start -----------------------------------------------------------------------


export const supplierApi = {

  // getAll: async (): Promise<Supplier[]> => {
  //   const res = await axiosInstance.get("/suppliers")
  //   return res.data.data.data
  // },

  getAll: async (params?: GetParams): Promise<{
    data: Supplier[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/supplier", {
      params
    })
    return res.data.data
  },

  getById: async (id: string): Promise<Supplier> => {
    const res = await axiosInstance.get(`/supplier/${id}`)
    return res.data.data.data
  },

  create: async (data: CreateSupplierInput): Promise<Supplier> => {
    const res = await axiosInstance.post("/supplier", data)
    return res.data.data.data
  },

  update: async (
    id: string,
    data: UpdateSupplierInput
  ): Promise<Supplier> => {
    const res = await axiosInstance.put(`/supplier/${id}`, data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/supplier/${id}`)
  }
}



// -------------------------------------------------------- Supplier end -----------------------------------------------------------------------


// --------------------------------------------------------  Purchase start -----------------------------------------------------------------------


export const purchaseApi = {

  // getAlls: async (): Promise<PurchaseOrder[]> => {
  //   const res = await axiosInstance.get("/purchase-orders")
  //   return res.data.data.data
  // },

  getAll: async (params?: GetParams): Promise<{
    data: PurchaseOrder[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/purchase", {
      params
    })
    return res.data.data
  },

  getById: async (id: string): Promise<PurchaseOrder> => {
    const res = await axiosInstance.get(`/purchase/${id}`)
    return res.data.data.data
  },

  create: async (data: CreatePurchaseOrderInput): Promise<PurchaseOrder> => {
    const res = await axiosInstance.post("/purchase", data)
    return res.data.data.data
  },

  update: async (
    id: string,
    data: UpdatePurchaseOrderInput
  ): Promise<PurchaseOrder> => {
    const res = await axiosInstance.put(`/purchase/${id}`, data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/purchase/${id}`)
  }
}



// --------------------------------------------------------  Purchase end -----------------------------------------------------------------------


// --------------------------------------------------------  Order start -----------------------------------------------------------------------

export const orderApi = {

  // getAll: async (): Promise<Order[]> => {
  //   const res = await axiosInstance.get("/order")
  //   return res.data.data
  // },

  getAll: async (params?: GetParams): Promise<{
    data: Order[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/order", {
      params
    })

    return res.data.data
  },

  getById: async (id: string): Promise<Order> => {
    const res = await axiosInstance.get(`/order/${id}`)
    return res.data.data
  },

  create: async (data: CreateOrderInput): Promise<Order> => {
    const res = await axiosInstance.post("/order", data)
    return res.data.data
  },

  updateStatus: async (
    id: string,
    data: UpdateOrderStatusInput
  ): Promise<Order> => {
    const res = await axiosInstance.put(`/order/${id}`, data)
    return res.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/order/${id}`)
  }
}


// --------------------------------------------------------  Order end -----------------------------------------------------------------------



// --------------------------------------------------------  sale or POS start -----------------------------------------------------------------------

export const saleApi = {

  // getAll: async (): Promise<Sale[]> => {
  //   const res = await axiosInstance.get("/sale")
  //   return res.data.data
  // },
  getAll: async (params?: GetParams): Promise<{
    data: Sale[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/sale", {
      params
    })

    return res.data.data
  },

  getById: async (id: string): Promise<Sale> => {
    const res = await axiosInstance.get(`/sale/${id}`)
    return res.data.data
  },

  create: async (data: CreateSaleInput): Promise<Sale> => {
    const res = await axiosInstance.post("/sale", data)
    return res.data.data
  },

  // delete: async (id: string): Promise<void> => {
  //   await axiosInstance.delete(`/sales/${id}`)
  // }
}



// --------------------------------------------------------  sale or POS end -----------------------------------------------------------------------



// --------------------------------------------------------  Refund start -----------------------------------------------------------------------


export const refundApi = {

  // getAll: async (): Promise<Refund[]> => {
  //   const res = await axiosInstance.get("/refund")
  //   return res.data.data
  // },
  getAll: async (params?: GetParams): Promise<{
    data: Refund[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/refund", {
      params
    })

    return res.data.data
  },


  getById: async (id: string): Promise<Refund> => {
    const res = await axiosInstance.get(`/refund/${id}`)
    return res.data.data
  },

  create: async (data: CreateRefundInput): Promise<Refund> => {
    const res = await axiosInstance.post("/refund", data)
    return res.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/refund/${id}`)
  }
}



// --------------------------------------------------------  Refund end -----------------------------------------------------------------------



// --------------------------------------------------------  Import start -----------------------------------------------------------------------


export const importApi = {

  // getAll: async (): Promise<Import[]> => {
  //   const res = await axiosInstance.get("/import")
  //   return res.data.data
  // },

  getAll: async (params?: GetParams): Promise<{
    data: Import[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/import", {
      params
    })

    return res.data.data
  },

  getById: async (id: string): Promise<Import> => {
    const res = await axiosInstance.get(`/import/${id}`)
    return res.data.data
  },

  create: async (data: CreateImportInput): Promise<Import> => {
    const res = await axiosInstance.post("/import", data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/import/${id}`)
  }
}



// --------------------------------------------------------  Import end -----------------------------------------------------------------------



// --------------------------------------------------------  Payment end -----------------------------------------------------------------------


export const paymentApi = {

  // getAll: async (): Promise<Export[]> => {
  //   const res = await axiosInstance.get("/export")
  //   return res.data.data
  // },

  getAll: async (params?: GetParams): Promise<{
    data: Payment[]
    meta: {
      total: number
      page: number
      limit: number
      totalPages: number
    }
  }> => {
    const res = await axiosInstance.get("/payment", {
      params
    })

    return res.data.data
  },

  getById: async (id: string): Promise<Payment> => {
    const res = await axiosInstance.get(`/payment/${id}`)
    return res.data.data
  },

  // create: async (data: CreatePaymentInput): Promise<Payment> => {
  //   const res = await axiosInstance.post("/payment", FormData)
  //   return res.data.data
  // },
  create: async (data: FormData): Promise<Payment> => {
    const res = await axiosInstance.post("/payment", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data.data.data
  },

  verifyPayment: async (id: string, data: VerifyPaymentInput): Promise<Payment> => {
    const res = await axiosInstance.patch(`/payment/${id}`, data)
    return res.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/payment/${id}`)
  }




}



// --------------------------------------------------------  Payment end -----------------------------------------------------------------------


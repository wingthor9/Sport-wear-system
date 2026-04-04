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

export type GetParams = {
  page?: number
  limit?: number
  search?: string
  orderBy?: string
  order?: "asc" | "desc"
}

// -------------------------------------------------------- Auth start -----------------------------------------------------------------------

export const authApi = {
  adminLogin: async (data: LoginInput) => {
    // console.log("login data : ",data)
    const res = await axiosInstance.post("auth/employee/login", data)
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
    } catch (err: any) {
      if (err.response?.status === 401) {
        return null
      }
      throw err
    }
  },
}

// -------------------------------------------------------- Auth end -----------------------------------------------------------------------



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
    const res = await axiosInstance.get("/products", {
      params
    })
    return res.data.data
  },

  getOne: async (id: string): Promise<Product> => {
    const res = await axiosInstance.get(`/products/${id}`)
    return res.data.data.data
  },

  create: async (data: FormData): Promise<Product> => {
    const res = await axiosInstance.post("/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data.data.data
  },

  update: async (id: string, data: FormData): Promise<Product> => {
    const res = await axiosInstance.put(`/products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/${id}`)
  },
}

// -------------------------------------------------------- Product end -----------------------------------------------------------------------



// -------------------------------------------------------- Category start -----------------------------------------------------------------------

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const res = await axiosInstance.get("/categories")
    return res.data.data.data
  },

  getOne: async (id: string): Promise<Category> => {
    const res = await axiosInstance.get(`/categories/${id}`)
    return res.data.data.data
  },

  create: async (data: CreateCategoryInput): Promise<Category> => {
    const res = await axiosInstance.post("/categories", data)
    return res.data.data.data
  },

  update: async (id: string, data: UpdateCategoryInput): Promise<Category> => {
    const res = await axiosInstance.put(`/categories/${id}`, data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`)
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
    const res = await axiosInstance.get("/customers", {
      params
    })

    return res.data.data
  },

  getOne: async (id: string): Promise<Customer> => {
    const res = await axiosInstance.get(`/customers/${id}`)
    return res.data.data.data
  },

  create: async (data: CreateCustomerInput): Promise<Customer> => {
    const res = await axiosInstance.post("/customers", data)
    return res.data.data.data
  },

  update: async (id: string, data: UpdateCustomerInput): Promise<Customer> => {
    const res = await axiosInstance.put(`/customers/${id}`, data)
    return res.data.data.data
  },

  // delete: async (id: string): Promise<void> => {
  //   await axiosInstance.delete(`/customers/${id}`)
  // },

updateStatus: async (id: string) => {
  const res = await axiosInstance.patch(`/customers/${id}`)
  return res.data.data
}
}



// -------------------------------------------------------- Customer end -----------------------------------------------------------------------


// -------------------------------------------------------- Employee start -----------------------------------------------------------------------


export const employeeApi = {

  getAll: async (): Promise<Employee[]> => {
    const res = await axiosInstance.get("/employees")
    return res.data.data.data
  },

  getById: async (id: string): Promise<Employee> => {
    const res = await axiosInstance.get(`/employees/${id}`)
    return res.data.data.data
  },

  create: async (data: CreateEmployeeInput): Promise<Employee> => {
    const res = await axiosInstance.post("/employees", data)
    return res.data.data.data
  },

  update: async (
    id: string,
    data: UpdateEmployeeInput
  ): Promise<Employee> => {
    const res = await axiosInstance.put(`/employees/${id}`, data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/employees/${id}`)
  },
}

// -------------------------------------------------------- Employee end -----------------------------------------------------------------------



// -------------------------------------------------------- Supplier start -----------------------------------------------------------------------


export const supplierApi = {

  getAll: async (): Promise<Supplier[]> => {
    const res = await axiosInstance.get("/suppliers")
    return res.data.data.data
  },

  getById: async (id: string): Promise<Supplier> => {
    const res = await axiosInstance.get(`/suppliers/${id}`)
    return res.data.data.data
  },

  create: async (data: CreateSupplierInput): Promise<Supplier> => {
    const res = await axiosInstance.post("/suppliers", data)
    return res.data.data.data
  },

  update: async (
    id: string,
    data: UpdateSupplierInput
  ): Promise<Supplier> => {
    const res = await axiosInstance.put(`/suppliers/${id}`, data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/suppliers/${id}`)
  }
}



// -------------------------------------------------------- Supplier end -----------------------------------------------------------------------


// --------------------------------------------------------  Purchase start -----------------------------------------------------------------------


export const purchaseApi = {

  getAll: async (): Promise<PurchaseOrder[]> => {
    const res = await axiosInstance.get("/purchase-orders")
    return res.data.data.data
  },

  getById: async (id: string): Promise<PurchaseOrder> => {
    const res = await axiosInstance.get(`/purchase-orders/${id}`)
    return res.data.data.data
  },

  create: async (data: CreatePurchaseOrderInput): Promise<PurchaseOrder> => {
    const res = await axiosInstance.post("/purchase-orders", data)
    return res.data.data.data
  },

  update: async (
    id: string,
    data: UpdatePurchaseOrderInput
  ): Promise<PurchaseOrder> => {
    const res = await axiosInstance.put(`/purchase-orders/${id}`, data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/purchase-orders/${id}`)
  }
}



// --------------------------------------------------------  Purchase end -----------------------------------------------------------------------


// --------------------------------------------------------  Order start -----------------------------------------------------------------------

export const orderApi = {

  getAll: async (): Promise<Order[]> => {
    const res = await axiosInstance.get("/orders")
    return res.data.data
  },

  getById: async (id: string): Promise<Order> => {
    const res = await axiosInstance.get(`/orders/${id}`)
    return res.data.data
  },

  create: async (data: CreateOrderInput): Promise<Order> => {
    const res = await axiosInstance.post("/orders", data)
    return res.data.data
  },

  updateStatus: async (
    id: string,
    data: UpdateOrderStatusInput
  ): Promise<Order> => {
    const res = await axiosInstance.put(`/orders/${id}`, data)
    return res.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/orders/${id}`)
  }
}


// --------------------------------------------------------  Order end -----------------------------------------------------------------------



// --------------------------------------------------------  sale or POS start -----------------------------------------------------------------------

export const saleApi = {

  getAll: async (): Promise<Sale[]> => {
    const res = await axiosInstance.get("/sales")
    return res.data.data
  },

  getById: async (id: string): Promise<Sale> => {
    const res = await axiosInstance.get(`/sales/${id}`)
    return res.data.data
  },

  create: async (data: CreateSaleInput): Promise<Sale> => {
    const res = await axiosInstance.post("/sales", data)
    return res.data.data
  },

  // delete: async (id: string): Promise<void> => {
  //   await axiosInstance.delete(`/sales/${id}`)
  // }
}



// --------------------------------------------------------  sale or POS end -----------------------------------------------------------------------



// --------------------------------------------------------  Refund start -----------------------------------------------------------------------


export const refundApi = {

  getAll: async (): Promise<Refund[]> => {
    const res = await axiosInstance.get("/refunds")
    return res.data.data
  },

  getById: async (id: string): Promise<Refund> => {
    const res = await axiosInstance.get(`/refunds/${id}`)
    return res.data.data
  },

  create: async (data: CreateRefundInput): Promise<Refund> => {
    const res = await axiosInstance.post("/refunds", data)
    return res.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/refunds/${id}`)
  }
}



// --------------------------------------------------------  Refund end -----------------------------------------------------------------------


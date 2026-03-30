// auth
import { Category, LoginInput, Product, RegisterInput } from "./types"
import axiosInstance from "@/lib/axiosInstance"

export const authApi = {
    login: async (data: LoginInput) => {
        // console.log("login data : ",data)
        const res = await axiosInstance.post("auth/employee/login", data)
        return res.data
    },

    register: async (data: RegisterInput) => {
        const res = await axiosInstance.post("/auth/register", data)
        return res.data
    },

    logout: async () => {
        await axiosInstance.post("/auth/logout")
    },

    refresh: async () => {
        const res = await axiosInstance.post("/auth/refresh")
        return res.data
    },

    me: async () => {
        const res = await axiosInstance.get("/auth/me")
        return res.data
    }
}


// Products
export const productApi = {
  getAll: () => axiosInstance.get("/products").then(res => res.data),

  getOne: (id: string) => axiosInstance.get(`/products/${id}`).then(res => res.data),

  create: (data: FormData) =>
    axiosInstance.post("/products", data).then(res => res.data),

  update: (id: string, data: Product) =>
    axiosInstance.put(`/products/${id}`, data).then(res => res.data),

  delete: (id: string) =>
    axiosInstance.delete(`/products/${id}`).then(res => res.data),
}


// Category 

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const res = await axiosInstance.get("/categories")
    return res.data.data.data
  },

  create: async (data: {
    category_name: string
    description?: string
  }): Promise<Category> => {
    const res = await axiosInstance.post("/categories", data)
    return res.data.data.data
  },

  update: async (
    id: string,
    data: { category_name: string; description?: string }
  ): Promise<Category> => {
    const res = await axiosInstance.put(`/categories/${id}`, data)
    return res.data.data.data
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`)
  },
}
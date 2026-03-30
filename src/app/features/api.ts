// auth
import { Category, LoginInput, Product, RegisterInput } from "./types"
import axiosInstance from "@/lib/axiosInstance"

// -------------------------------------------------------- Auth start -----------------------------------------------------------------------

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

// -------------------------------------------------------- Auth end -----------------------------------------------------------------------



// -------------------------------------------------------- Product start -----------------------------------------------------------------------
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const res = await axiosInstance.get("/products")
    return res.data.data.data
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

  update: async (id: string, data: Product): Promise<Product> => {
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

// -------------------------------------------------------- Category end -----------------------------------------------------------------------

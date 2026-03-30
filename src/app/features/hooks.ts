"use client"
import {  useState } from "react"
import { useRouter } from "next/navigation"
import { authApi, categoryApi, productApi } from "./api"
import { Category, LoginInput, Product, RegisterInput } from "./types"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useAuth = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const login = async (data: LoginInput) => {
        try {
            setLoading(true)
            await authApi.login(data)
            router.push("/admin/dashboard")
        } catch (error) {
            console.log(error)
            // 🔥 show error ให้ user
            alert(error instanceof Error ? error.message : "Login failed")

        } finally {
            setLoading(false)
        }
    }

    const register = async (data: RegisterInput) => {
        try {
            setLoading(true)
            await authApi.register(data)
            router.push("/auth/login")
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await authApi.logout()
        router.push("/auth/login")
    }

    const refresh = async () => {
        await authApi.refresh()
    }

    return { login, register, logout, loading, refresh }
}


// -------------------------------------------------------- Product start -----------------------------------------------------------------------

export const useGetProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: productApi.getAll,
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
        mutationFn: ({ id, data }: { id: string; data: Product }) => productApi.update(id, data),
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
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: { category_name: string; description?: string }
    }) => categoryApi.update(id, data),
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



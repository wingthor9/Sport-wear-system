// "use client"
// import { create } from "zustand"
// type User = {
//     id: string
//     email: string
//     role: "ADMIN" | "STAFF" | "CUSTOMER"
// }

// type AuthState = {
//     user: User | null
//     loading: boolean
//     setUser: (user: User | null) => void
//     setLoading: (loading: boolean) => void
// }

// export const useAuthStore = create<AuthState>((set) => ({
//     user: null,
//     loading: true,
//     setUser: (user) => set({ user }),
//     setLoading: (loading) => set({ loading })
// }))

"use client"
import { create } from "zustand"

type AuthState = {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
}))
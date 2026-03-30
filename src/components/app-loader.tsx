"use client"

import { useAuthStore } from "@/store/useAuthStore"


export function AppLoader({ children }: any) {
    const loading = useAuthStore((s) => s.loading)

    if (loading) {
        return <div className="p-10">Loading...</div>
    }

    return children
}
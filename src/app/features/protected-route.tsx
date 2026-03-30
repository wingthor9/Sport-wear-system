"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type Props = {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
    const { user, loading } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login")
        }
    }, [user, loading])

    if (loading) return <div>Loading...</div>
    if (!user) return null

    return <>{children}</>
}
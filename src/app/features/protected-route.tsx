"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "./hooks"

type Props = {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/auth/login")
        }
    }, [user, isLoading])

    if (isLoading) return <div>Loading...</div>
    if (!user) return null

    return <>{children}</>
}
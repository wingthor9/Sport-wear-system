"use client"

import { useAuthStore } from "@/store/useAuthStore"



type Props = {
    children: React.ReactNode
    allowedRoles: ("ADMIN" | "STAFF" | "CUSTOMER")[]
}

export function RoleGuard({ children, allowedRoles }: Props) {
    const user = useAuthStore((s) => s.user)
    const loading = useAuthStore((s) => s.loading)

    if (loading) return <div>Loading...</div>

    if (!user || !allowedRoles.includes(user.role)) {
        return null
    }

    return <>{children}</>
}
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/features/hooks"

type Props = {
  allow: ("ADMIN" | "STAFF" | "CUSTOMER")[]
  children: React.ReactNode
}

export default function RoleGuard({ allow, children }: Props) {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (!user || !allow.includes(user.role)) {
      router.replace("/")
    }
  }, [user, isLoading])

  if (isLoading) return null
  if (!user || !allow.includes(user.role)) return null

  return <>{children}</>
}
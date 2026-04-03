"use client"

import RoleGuard from "@/components/RoleGuard"

export default function DashboardPage() {
  return (
      <RoleGuard allow={["ADMIN"]}>
        <div >Admin dashboard</div>
      </RoleGuard>
  )
}




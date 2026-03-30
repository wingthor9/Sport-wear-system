"use client"
import { ProtectedRoute } from "@/app/features/protected-route";
import { RoleGuard } from "@/app/features/role-guard";


export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["ADMIN", "STAFF"]}>
        <div className="bg-red-600">Admin Dashboard</div>
      </RoleGuard>
    </ProtectedRoute>
  )
}
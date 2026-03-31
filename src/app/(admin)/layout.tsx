"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { isAdmin } from "@/utils/auth"
import { BarChart3, CreditCard, LayoutDashboard, Package, Settings, ShoppingBag, ShoppingCart, Store, UserCog, Users, } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    path: string
    icon: React.ComponentType<{ className?: string }>
}



const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Point of Sale", href: "/pos", icon: ShoppingCart },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Payment Verification", href: "/payments", icon: CreditCard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Employees", href: "/employees", icon: UserCog },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const { user, loading } = useAuthStore()
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === "/POS") {
            return pathname === "/" || pathname === "/POS"
        }
        return pathname === path
    }

    useEffect(() => {
        if (loading) return
        if (!user) {
            router.replace("/auth/login")
            return
        }
        if (!isAdmin(user.role)) {
            router.replace("/")
        }
    }, [user, loading, router])

    if (!user || !isAdmin(user.role)) return null

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="flex h-screen w-64 flex-col bg-gray-900 text-white">
                {/* Logo */}
                <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
                    <Store className="h-8 w-8 text-blue-500" />
                    <div>
                        <h1 className="font-bold text-lg">SportWear</h1>
                        <p className="text-xs text-gray-400">Retail System</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-gray-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center font-semibold">
                            A
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Admin User</p>
                            <p className="text-xs text-gray-400 truncate">admin@sportswear.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    )
}
"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { isAdmin } from "@/utils/auth"
import { BarChart3, ClipboardList, CreditCard, FileText, FolderTree, LayoutDashboard, Package, ShoppingBag, ShoppingCart, Truck, UserCog, Users,} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    path: string
    icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "POS", path: "/POS", icon: ShoppingCart },
    { name: "Orders", path: "/orders", icon: ShoppingBag },
    { name: "Payment Verification", path: "/payment-verification", icon: CreditCard },
    { name: "Products", path: "/products", icon: Package },
    { name: "Categories", path: "/categories", icon: FolderTree },
    { name: "Customers", path: "/customers", icon: Users },
    { name: "Employees", path: "/employees", icon: UserCog },
    { name: "Suppliers", path: "/suppliers", icon: Truck },
    { name: "Purchase Orders", path: "/purchase-orders", icon: ClipboardList },
    { name: "Imports", path: "/imports", icon: FileText },
    { name: "Reports", path: "/reports", icon: BarChart3 },
]

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
        if (!user ) {
            router.replace("/auth/login")
            return
        }
        if (!isAdmin(user.role)) {
            router.replace("/")
        }
    }, [user, loading, router])

    if (!user || !isAdmin(user.role)) return null

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">

                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
                    <h1 className="font-bold text-xl tracking-wide">
                        SPORTWEAR
                    </h1>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const active = isActive(item.path)

                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                                            active
                                                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                                                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                        )}
                                    >
                                        <Icon className="w-5 h-5 shrink-0" />
                                        <span className="text-sm font-medium">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* User */}
                <div className="p-4 border-t border-sidebar-border">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition">

                        <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
                            <span className="text-sm font-semibold">AD</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                Admin User
                            </p>
                            <p className="text-xs text-sidebar-foreground/60 truncate">
                                admin@sportwear.com
                            </p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-auto bg-background">
                {children}
            </main>
        </div>
    )
}
"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { getRedirectPath } from "@/utils/auth"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    const router = useRouter()
    const { user, loading } = useAuthStore()
    useEffect(() => {
        // if (loading && !user) return
        if(!user){
            
        }

        if (user) {
            router.replace(getRedirectPath(user.role))
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-4">
                <Button disabled size="sm">
                    <Spinner data-icon="inline-start" />
                    Loading...
                </Button>
            </div>
        )
    }
    if (user) return null
    return (
        <div className="flex min-h-screen">

            {/* Left */}
            <div className="hidden md:flex w-1/2 bg-black text-white items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Sportwear System</h1>
                    <p className="text-gray-400">
                        Manage your store like a pro
                    </p>
                </div>
            </div>

            {/* Right */}
            <div className="flex w-full md:w-1/2 items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

        </div>
    )
}
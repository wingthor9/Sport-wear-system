"use client"

import { loginSchema } from "../validation"
import { LoginInput } from "../types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authApi } from "../api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"

export function LoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const setUser = useAuthStore((s) => s.setUser)
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginInput) => {
        try {
            setLoading(true)
            const res = await authApi.login(data)
            // console.log(res)
            setUser(res?.user)
            if (res.user.role === "ADMIN" || res.user.role === "STAFF") {
                router.push("/dashboard")
            } else {
                router.push("/")
            }

        } catch (error) {
            console.log(error)
            alert(error instanceof Error ? error.message : "Login failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <input
                placeholder="Email"
                {...register("email")}
                className="w-full border p-2 rounded"
            />
            {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full border p-2 rounded"
            />
            {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-2 rounded"
            >
                {loading ? "Loading..." : "Login"}
            </button>

        </form>
    )
}
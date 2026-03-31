"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export interface Customer {
    id: string
    name: string
    email: string
    phone: string
    points: number
    status: "active" | "inactive"
    joinedAt: string
}

export interface CreateCustomerInput {
    name: string
    email: string
    phone: string
}

export interface UpdateCustomerInput {
    name?: string
    email?: string
    phone?: string
    isActive?: boolean
}


interface Props {
    defaultValues?: any
    loading?: boolean
    onSubmit: (data: any) => void
}

export default function CustomerForm({
    defaultValues,
    loading,
    onSubmit,
}: Props) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
    })

    useEffect(() => {
        if (defaultValues) {
            setForm(defaultValues)
        }
    }, [defaultValues])

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <Input
                name="name"
                placeholder="Customer name"
                value={form.name}
                onChange={handleChange}
            />

            <Input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <Input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
            />

            <Button disabled={loading} className="w-full">
                {loading ? "Saving..." : "Save"}
            </Button>

        </form>
    )
}
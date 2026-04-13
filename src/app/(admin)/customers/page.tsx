"use client"
import { useState } from "react"
import { useGetCustomers, useCreateCustomer, useUpdateCustomerStatus, useUpdateCustomer } from "@/app/features/hooks"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { CustomerRegisterInput } from "@/modules/auth/auth.type"
import { useDataTable } from "@/hooks/useDataTable"
import { Customer } from "@/modules/customer/customer.type"
import { CustomerTable } from "@/components/customer/CustomerTable"
import { AppPagination } from "@/components/AppPagination"
import { CustomerFormDialog } from "@/components/customer/CustomerFormDialog"
import { CustomerToolbar } from "@/components/customer/CustomerToolbar"
export default function CustomerPage() {
    const table = useDataTable()

    const { data, isLoading } = useGetCustomers(table.params);
    const createCustomer = useCreateCustomer()
    const updateCustomerStatus = useUpdateCustomerStatus()
    const updateCustomer = useUpdateCustomer()
    const [selectedCustomers, setSelectedCustomers] = useState<Customer | undefined>()
    const [openForm, setOpenForm] = useState(false)
    // const [search, setSearch] = useState("")
    // const [page, setPage] = useState(1)
    // const limit = 10
    // const createCustomer = useCreateCustomer()
    const updateStatus = useUpdateCustomerStatus()
    const customers = data?.data ?? []
    // const meta = data?.meta

    console.log("customer : ",customers)


    // const toggleSelect = (id: string) => {
    //     setSelectedCustomers(prev =>
    //         prev.includes(id)
    //             ? prev.filter(x => x !== id)
    //             : [...prev, id]
    //     )
    // }

    // const handleBulkDelete = () => {
    //     if (!confirm("Change status of customers?")) return
    //     selectedCustomers.forEach(id => {
    //         updateStatus.mutate(id)
    //     })
    //     setSelectedCustomers([])
    // }

    const handleEdit = (customer: Customer) => {
        setSelectedCustomers(customer)
        setOpenForm(true)
    }

    const handleChangeStatus = (id: string) => {
        if (!confirm("Change status of customer?")) return
        updateStatus.mutate(id)
    }

    const exportCSV = () => {
        if (!customers.length) return
        const rows = customers.map(c => ({
            Name: c.customer_name,
            Email: c.email,
            Phone: c.phone,
            Points: c.points?.map((p) => p.point_amount).reduce((a, b) => a + b, 0)
        }))
        const csv = [
            Object.keys(rows[0]).join(","),
            ...rows.map(r => Object.values(r).join(","))
        ].join("\n")
        const blob = new Blob([csv], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "customers.csv"
        a.click()
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            {/* <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">
                        Customer Management
                    </h1>
                    <p className="text-gray-500">
                        Manage customers and loyalty points
                    </p>
                </div>
                <Button onClick={() => setCreateOpen(true)}>
                    Add Customer
                </Button>
            </div>
            {/* Actions */}
            {/* <div className="flex items-center gap-3">
                <Input
                    placeholder="Search customer..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setPage(1)
                    }}
                    className="w-72"
                />
                <Button onClick={exportCSV}>
                    Export CSV
                </Button>
                <Button
                    variant="destructive"
                    disabled={!selectedCustomers.length}
                    onClick={handleBulkDelete}
                >
                    Change status Selected
                </Button>
            </div> */}

            <CustomerToolbar table={table} onAdd={() => setOpenForm(true)} />
            {/* Table */}
            <CustomerTable
                customers={customers}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleChangeStatus}
            />

            <AppPagination
                page={table.params.page}
                totalPages={data?.meta?.totalPages ?? 0}
                onPageChange={table.setPage}
            />

            <CustomerFormDialog
                open={openForm}
                onOpenChange={setOpenForm}
                create={createCustomer}
                update={updateCustomer}
                customer={selectedCustomers}
            />  
            {/* <Card className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="border-b">
                        <tr className="text-left">
                            <th className="p-3"></th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Points</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={7} className="p-6 text-center">
                                    Loading customers...
                                </td>
                            </tr>
                        )}
                        {!isLoading && customers.map(customer => (
                            <tr
                                key={customer.customer_id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomers.includes(customer.customer_id)}
                                        onChange={() => toggleSelect(customer.customer_id)}
                                    />
                                </td>
                                <td className="p-3 font-medium">
                                    {customer.customer_name}
                                </td>
                                <td className="p-3">
                                    {customer.email}
                                </td>
                                <td className="p-3">
                                    {customer.phone}
                                </td>
                                <td className="p-3">
                                    {customer.points?.map((p) => p.point_amount).reduce((a, b) => a + b, 0) || 0}
                                </td>
                                <td className="p-3">
                                    {customer.isActive
                                        ? <Badge>Active</Badge>
                                        : <Badge variant="secondary">Disabled</Badge>
                                    }
                                </td>
                                <td className="p-3 flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                    >
                                        View
                                    </Button>

                                    {/* <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => {

                                            // if (!confirm("Delete customer?")) return

                                            deleteCustomer.mutate(customer.customer_id, {
                                                onSuccess: () => toast.success("Customer status updated"),
                                            })

                                        }}
                                    >
                                        {customer.isActive ? "Disable" : "Enable"}
                                    </Button> */}
            {/* <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            updateStatus.mutate(customer.customer_id, {
                                                onSuccess: () => toast.success("Customer status updated"),
                                                onError: () => toast.error("Update failed")
                                            })

                                        }}
                                    >
                                        {customer.isActive ? "Disable" : "Enable"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card> */}
            {/* Pagination */}
            {/* <div className="flex items-center justify-between">
                <Button
                    disabled={meta?.page === 1}
                    onClick={() => setPage(p => p - 1)}
                >
                    Previous
                </Button>
                <span>
                    Page {meta?.page} of {meta?.totalPages}
                </span>
                <Button
                    disabled={meta?.page === meta?.totalPages}
                    onClick={() => setPage(p => p + 1)}
                >
                    Next
                </Button>
            </div> */}
            {/* Create Customer Modal */}
            {/* {createOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <Card className="p-6 w-[400px] space-y-4">
                        <h2 className="font-bold text-lg">
                            Create Customer
                        </h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                const form = e.target as HTMLFormElement
                                const formData = new FormData(form)
                                createCustomer.mutate({
                                    customer_name: formData.get("name"),
                                    email: formData.get("email"),
                                    password: formData.get("password"),
                                    phone: formData.get("phone")

                                } as CustomerRegisterInput, {

                                    onSuccess: () => {
                                        toast.success("Customer created")
                                        setCreateOpen(false)
                                    }

                                })

                            }}
                            className="space-y-3"
                        >
                            <Input name="name" placeholder="Customer name" />
                            <Input name="email" placeholder="Email" />
                            <Input name="phone" placeholder="Phone" />
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => setCreateOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button type="submit">
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )} */}
        </div>
    )
}

// "use client"
// import { useState } from "react";
// import { Search, Eye, Users, DollarSign, Award, UserCheck, UserX, TrendingUp } from "lucide-react";
// import { Toaster, toast } from "sonner";
// import { Customer, CustomerStatus } from "@/modules/customer/customer.type";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { CustomerDetailDialog } from "@/app/features/customer/CustomerDetailDialog";
// import { useCreateCustomer, useDeleteCustomer, useGetCustomers, useUpdateCustomer } from "@/app/features/hooks";

// const statusOptions: { value: CustomerStatus | "ALL"; label: string }[] = [
//     { value: "ALL", label: "All Customers" },
//     { value: "ACTIVE", label: "Active" },
//     { value: "INACTIVE", label: "Inactive" },
// ];
// type Customers = {
//     customer_id: string;
//     customer_name: string;
//     email: string;
//     phone: string;
//     isActive: boolean;
// };

// const getStatusBadge = (status: CustomerStatus) => {
//     return status === "ACTIVE" ? (<Badge className="bg-green-50 text-green-700 border-green-300">Active</Badge>
//     ) : (<Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
//         Inactive </Badge>
//     );
// };

// const customersMapper = (customers: Customers[]) => {
//     return customers.map((customer) => ({
//         id: customer.customer_id,
//         name: customer.customer_name,
//         email: customer.email,
//         phone: customer.phone,
//         status: customer.isActive ? "ACTIVE" : "INACTIVE",
//     }));
// };

// export default function CustomerManagementPage() {
//     // const { data } = useGetCustomers();
//     const updateCustomer = useUpdateCustomer();
//     // const customers: Customer[] = data?.data ?? [];
//     console.log("customer : ", data)
//     const [searchQuery, setSearchQuery] = useState("");
//     const [statusFilter, setStatusFilter] = useState<CustomerStatus | "ALL">("ALL");
//     const [detailDialogOpen, setDetailDialogOpen] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
//     const createCustomer = useCreateCustomer()
//     const deleteCustomer = useDeleteCustomer()
//     useGetCustomers({
//         page,
//         limit,
//         search,
//         sort,
//         order
//     })
//     const { data, isLoading } = useGetCustomers({ page, limit, search: searchQuery });
//     const [createDialogOpen, setCreateDialogOpen] = useState(false)
//     const [search, setSearch] = useState("")
//     const [page, setPage] = useState(1)
//     const limit = 10
//     const customers = data?.data ?? []
//     const meta = data?.meta
//     const [sort, setSort] = useState("createdAt")
//     const [order, setOrder] = useState("desc")

//     // Filter customers
//     const filteredCustomers = customersMapper.filter((customer) => {
//         if (searchQuery === "") {
//             return true;
//         }
//         if (statusFilter === "ALL") {
//             return (
//                 customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                 customer.phone.includes(searchQuery) ||
//                 customer.id.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//         }
//         return customer.status === statusFilter && ({
//             name: customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
//             email: customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
//             phone: customer.phone.includes(searchQuery),
//             id: customer.id.toLowerCase().includes(searchQuery.toLowerCase()),
//         }
//         )
//     })
//     //     const matchesSearch =
//     //         customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     //         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     //         customer.phone.includes(searchQuery) ||
//     //         customer.id.toLowerCase().includes(searchQuery.toLowerCase());


//     //     const matchesStatus = statusFilter === "ALL" || customer.isActive === statusFilter;
//     //     return matchesSearch && matchesStatus;
//     // });

//     // Calculate stats
//     const totalCustomers = customersMapper.length;

//     const activeCustomers = customersMapper.filter((c) => c.status === "ACTIVE").length;

//     const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

//     const totalLoyaltyPoints = customers.reduce(
//         (sum, c) => sum + c.loyaltyPoints,
//         0
//     );

//     // Handlers
//     const handleViewCustomer = (customer: Customer) => {
//         setSelectedCustomer(customer);
//         setDetailDialogOpen(true);
//     };

//     const handleToggleStatus = (customerId: string, newStatus: CustomerStatus) => {
//         updateCustomer.mutate({
//             id: customerId,
//             data: { status: newStatus }
//         });

//         if (selectedCustomer?.customer_id === customerId) {
//             setSelectedCustomer((prev) =>
//                 prev ? { ...prev, status: newStatus } : null
//             );
//         }
//         toast.success(
//             `Customer account ${newStatus === "ACTIVE" ? "enabled" : "disabled"} successfully`
//         );


//     };

//     const handleQuickToggle = (
//         e: React.MouseEvent,
//         customer: Customer
//     ) => {
//         e.stopPropagation();
//         const newStatus: CustomerStatus =
//             customer.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//         handleToggleStatus(customer.customer_id, newStatus);
//     };

//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//         });
//     };

//     return (<div className="p-8"> <Toaster position="top-right" />
//         {/* Header */}
//         <div className="mb-6 flex items-center justify-between">
//             <div>
//                 <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
//                 <p className="text-gray-600">
//                     Manage customer accounts, track loyalty points, and view purchase history
//                 </p>
//             </div>
//             <Button onClick={() => setCreateDialogOpen(true)}>
//                 Add Customer
//             </Button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//             <Card className="p-4">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-sm text-gray-600 mb-1">Total Customers</p>
//                         <p className="text-2xl font-bold">{totalCustomers}</p>
//                     </div>
//                     <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
//                         <Users className="h-6 w-6 text-blue-600" />
//                     </div>
//                 </div>
//             </Card>

//             <Card className="p-4">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-sm text-gray-600 mb-1">Active Customers</p>
//                         <p className="text-2xl font-bold">{activeCustomers}</p>
//                         <p className="text-xs text-gray-500 mt-1">
//                             {totalCustomers === 0
//                                 ? 0
//                                 : ((activeCustomers / totalCustomers) * 100).toFixed(1)}% of total
//                         </p>
//                     </div>
//                     <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
//                         <UserCheck className="h-6 w-6 text-green-600" />
//                     </div>
//                 </div>
//             </Card>

//             <Card className="p-4">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
//                         <p className="text-2xl font-bold">
//                             ${totalRevenue.toLocaleString()}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                             {totalCustomers === 0
//                                 ? 0
//                                 : `$${(totalRevenue / totalCustomers).toFixed(2)} per customer`}
//                         </p>
//                     </div>
//                     <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
//                         <DollarSign className="h-6 w-6 text-green-600" />
//                     </div>
//                 </div>
//             </Card>

//             <Card className="p-4">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <p className="text-sm text-gray-600 mb-1">Loyalty Points</p>
//                         <p className="text-2xl font-bold">
//                             {totalLoyaltyPoints.toLocaleString()}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                             {totalCustomers === 0
//                                 ? 0
//                                 : `${(totalLoyaltyPoints / totalCustomers).toFixed(0)} avg. per customer`}
//                         </p>
//                     </div>
//                     <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
//                         <Award className="h-6 w-6 text-purple-600" />
//                     </div>
//                 </div>
//             </Card>
//         </div>

//         {/* Search and Filter */}
//         <Card className="p-4 mb-6">
//             <div className="flex flex-col sm:flex-row gap-4">

//                 <div className="flex-1 relative">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <Input
//                         type="text"
//                         placeholder="Search by name, email, phone, or customer ID..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="pl-10"
//                     />
//                 </div>

//                 <Select
//                     value={statusFilter}
//                     onValueChange={(value) =>
//                         setStatusFilter(value as CustomerStatus | "ALL")
//                     }
//                 >
//                     <SelectTrigger className="w-full sm:w-[200px]">
//                         <SelectValue placeholder="Filter by status" />
//                     </SelectTrigger>

//                     <SelectContent>
//                         {statusOptions.map((option) => (
//                             <SelectItem key={option.value} value={option.value}>
//                                 {option.label}
//                             </SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>

//             </div>

//             <div className="flex gap-2 mt-4 flex-wrap border-2 border-red-500">
//                 {statusOptions.map((option) => (
//                     <Badge
//                         key={option.value}
//                         variant={statusFilter === option.value ? "default" : "outline"}
//                         className="cursor-pointer px-4 py-1.5"
//                         onClick={() =>
//                             setStatusFilter(option.value as CustomerStatus | "ALL")
//                         }
//                     >
//                         {option.label}
//                     </Badge>
//                 ))}
//             </div>
//         </Card>
//         <Input
//             placeholder="Search customer..."
//             value={search}
//             onChange={(e) => {
//                 setSearch(e.target.value)
//                 setPage(1)
//             }}
//             className="w-72"
//         />
//         {/* Customers Table */}
//         <Card>
//             <div className="rounded-lg border overflow-hidden">
//                 <Table>
//                     <TableHeader>
//                         <TableRow className="bg-gray-50">
//                             <TableHead className="font-semibold">Customer ID</TableHead>
//                             <TableHead className="font-semibold">Name</TableHead>
//                             <TableHead className="font-semibold">Email</TableHead>
//                             <TableHead className="font-semibold">Phone</TableHead>
//                             <TableHead className="font-semibold">Joined</TableHead>
//                             <TableHead className="font-semibold text-right">Orders</TableHead>
//                             <TableHead className="font-semibold text-right">Total Spent</TableHead>
//                             <TableHead className="font-semibold text-right">Points</TableHead>
//                             <TableHead className="font-semibold">Status</TableHead>
//                             <TableHead className="w-20 font-semibold"></TableHead>
//                         </TableRow>
//                     </TableHeader>

//                     <TableBody>

//                         {filteredCustomers.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={10} className="text-center py-8">
//                                     <div className="flex flex-col items-center justify-center text-gray-400">
//                                         <Users className="h-12 w-12 mb-2" />
//                                         <p className="text-sm">No customers found</p>
//                                     </div>
//                                 </TableCell>
//                             </TableRow>
//                         ) : (

//                             filteredCustomers.map((customer) => (

//                                 <TableRow
//                                     key={customer.customer_id}
//                                     className="hover:bg-gray-50 cursor-pointer"
//                                     onClick={() => handleViewCustomer(customer)}
//                                 >

//                                     <TableCell>
//                                         <p className="font-mono text-sm font-semibold">
//                                             {customer.customer_id}
//                                         </p>
//                                     </TableCell>

//                                     <TableCell>
//                                         <div>
//                                             <p className="font-medium">{customer.customer_name}</p>
//                                             <p className="text-xs text-gray-500">
//                                                 {customer.city}
//                                             </p>
//                                         </div>
//                                     </TableCell>

//                                     <TableCell className="text-sm">
//                                         {customer.email}
//                                     </TableCell>

//                                     <TableCell className="text-sm">
//                                         {customer.phone}
//                                     </TableCell>

//                                     <TableCell className="text-sm text-gray-600">
//                                         {formatDate(customer.joinDate)}
//                                     </TableCell>

//                                     <TableCell className="text-right">
//                                         <Badge variant="secondary">
//                                             {customer.totalOrders}
//                                         </Badge>
//                                     </TableCell>

//                                     <TableCell className="text-right font-semibold">
//                                         {/* ${customer.totalSpent.toLocaleString()} */}
//                                         $1200
//                                     </TableCell>

//                                     <TableCell className="text-right">
//                                         <div className="flex items-center justify-end gap-1">
//                                             <Award className="h-4 w-4 text-purple-600" />
//                                             <span className="font-semibold text-purple-700">
//                                                 {/* {customer.loyaltyPoints.toLocaleString()} */}
//                                                 100
//                                             </span>
//                                         </div>
//                                     </TableCell>

//                                     <TableCell>
//                                         {getStatusBadge(customer.status)}
//                                     </TableCell>

//                                     <TableCell>
//                                         <div className="flex gap-2">
//                                             {/* <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 onClick={(e) => {
//                                                     e.stopPropagation()

//                                                     if (!confirm("Delete this customer?")) return

//                                                     deleteCustomer.mutate(customer.customer_id, {
//                                                         onSuccess: () => toast.success("Customer deleted"),
//                                                         onError: () => toast.error("Delete failed")
//                                                     })
//                                                 }}
//                                             >
//                                                 🗑
//                                             </Button> */}
//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 onClick={() => handleViewCustomer(customer)}
//                                             >
//                                                 <Eye className="h-4 w-4" />
//                                             </Button>

//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 // onClick={(e) => handleQuickToggle(e, customer)}
//                                                 onClick={(e) => {
//                                                     e.stopPropagation()

//                                                     // if (!confirm("Delete this customer?")) return

//                                                     deleteCustomer.mutate(customer.customer_id, {
//                                                         onSuccess: () => toast.success("Customer Disabled"),
//                                                         onError: () => toast.error("Customer Disabled")
//                                                     })
//                                                 }}
//                                                 title={
//                                                     customer.status === "ACTIVE"
//                                                         ? "Disable account"
//                                                         : "Enable account"
//                                                 }
//                                             >
//                                                 {customer.status === "ACTIVE" ? (
//                                                     <UserX className="h-4 w-4 text-red-600" />
//                                                 ) : (
//                                                     <UserCheck className="h-4 w-4 text-green-600" />
//                                                 )}
//                                             </Button>

//                                         </div>
//                                     </TableCell>

//                                 </TableRow>

//                             ))

//                         )}

//                     </TableBody>

//                 </Table>
//             </div>

//             {filteredCustomers.length > 0 && (
//                 <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
//                     <p className="text-sm text-gray-600">
//                         Showing {filteredCustomers.length} of {customers.length} customers
//                     </p>

//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                         <TrendingUp className="h-4 w-4 text-green-600" />
//                         <span>
//                             {customers.length === 0
//                                 ? 0
//                                 : `$${(totalRevenue / customers.length).toFixed(2)} avg. lifetime value`}
//                         </span>
//                     </div>
//                 </div>
//             )}
//         </Card>
//         <div className="flex justify-between items-center mt-4">

//             <Button
//                 disabled={meta?.page === 1}
//                 onClick={() => setPage(p => p - 1)}
//             >
//                 Previous
//             </Button>

//             <span>
//                 Page {meta?.page} of {meta?.totalPages}
//             </span>

//             <Button
//                 disabled={meta?.page === meta?.totalPages}
//                 onClick={() => setPage(p => p + 1)}
//             >
//                 Next
//             </Button>

//         </div>

//         <CustomerDetailDialog
//             open={detailDialogOpen}
//             onOpenChange={setDetailDialogOpen}
//             customer={selectedCustomer}
//             onToggleStatus={handleToggleStatus}
//         />
//         {createDialogOpen && (
//             <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

//                 <Card className="p-6 w-[400px]">

//                     <h2 className="text-lg font-bold mb-4">
//                         Create Customer
//                     </h2>

//                     <form
//                         onSubmit={(e) => {
//                             e.preventDefault()

//                             const form = e.target as HTMLFormElement
//                             const formData = new FormData(form)

//                             createCustomer.mutate({
//                                 customer_name: formData.get("name"),
//                                 email: formData.get("email"),
//                                 phone: formData.get("phone"),
//                             } as any, {
//                                 onSuccess: () => {
//                                     toast.success("Customer created")
//                                     setCreateDialogOpen(false)
//                                 }
//                             })
//                         }}
//                         className="space-y-4"
//                     >

//                         <Input name="name" placeholder="Customer name" />
//                         <Input name="email" placeholder="Email" />
//                         <Input name="phone" placeholder="Phone" />

//                         <div className="flex justify-end gap-2">

//                             <Button
//                                 variant="outline"
//                                 type="button"
//                                 onClick={() => setCreateDialogOpen(false)}
//                             >
//                                 Cancel
//                             </Button>

//                             <Button type="submit">
//                                 Create
//                             </Button>

//                         </div>

//                     </form>

//                 </Card>

//             </div>
//         )}
//     </div>



//     );
// }




"use client"

import { useState } from "react"
import { useGetCustomers, useCreateCustomer, useUpdateCustomerStatus } from "@/app/features/hooks"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import { toast } from "sonner"

export default function CustomerPage() {

    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const limit = 10

    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
    const [createOpen, setCreateOpen] = useState(false)

    const { data, isLoading } = useGetCustomers({
        page,
        limit,
        search
    })

    const createCustomer = useCreateCustomer()
    const updateStatus = useUpdateCustomerStatus()

    const customers = data?.data ?? []
    const meta = data?.meta

    const toggleSelect = (id: string) => {
        setSelectedCustomers(prev =>
            prev.includes(id)
                ? prev.filter(x => x !== id)
                : [...prev, id]
        )
    }

    const handleBulkDelete = () => {

        if (!confirm("Change status of customers?")) return

        selectedCustomers.forEach(id => {
            updateStatus.mutate(id)
        })

        setSelectedCustomers([])
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

        <div className="p-6 space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">

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

            <div className="flex items-center gap-3">

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

            </div>

            {/* Table */}

            <Card className="overflow-x-auto">

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
                                    <Button
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

            </Card>

            {/* Pagination */}

            <div className="flex items-center justify-between">

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

            </div>

            {/* Create Customer Modal */}

            {createOpen && (

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
                                    phone: formData.get("phone")

                                } as any, {

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

            )}

        </div>
    )
}
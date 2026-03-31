// "use client";
// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
// import { Search, Users, Eye, Award } from "lucide-react";
// import { Customer } from "@/app/features/types";
// import { useGetCustomers } from "@/app/features/hooks";


// export default function CustomersPage() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
//     const [showDetailsDialog, setShowDetailsDialog] = useState(false);

//     const { data: res = [], isLoading } = useGetCustomers();
//     const customers = res.map((c: any) => ({
//         id: c.customer_id,
//         name: c.customer_name,
//         email: c.email,
//         phone: c.phone,
//         points: c.point ?? 0,
//         totalOrders: c.orders?.length ?? 0,
//         totalSpent: 0,
//         joinedAt: c.createdAt,
//         status: c.isActive ? "active" : "inactive",
//     }))
//     console.log("customer data ", customers)


//     const filteredCustomers = customers.filter(
//         (customer) =>
//             customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             customer.phone.includes(searchQuery)
//     );

//     const handleViewDetails = (customer: Customer) => {
//         setSelectedCustomer(customer);
//         setShowDetailsDialog(true);
//     };

//     const formatDate = (dateString: string) => {
//         return new Date(dateString).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//         });
//     };

//     const getStatusBadge = (status: Customer["status"]) => {
//         return status === "active" ? (
//             <Badge className="bg-success text-success-foreground">Active</Badge>
//         ) : (
//             <Badge variant="secondary">Inactive</Badge>
//         );
//     };

//     if (isLoading) {
//         return <div className="p-8">Loading customers...</div>;
//     }

//     return (
//         <div className="p-8">
//             <div className="mb-8">
//                 <div className="flex items-center gap-3 mb-2">
//                     <Users className="w-8 h-8 text-accent" />
//                     <h1>Customer Management</h1>
//                 </div>
//                 <p className="text-muted-foreground">
//                     View customer profiles, order history, and loyalty points
//                 </p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                 <Card className="p-6">
//                     <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm text-muted-foreground">Total Customers</span>
//                         <Users className="w-5 h-5 text-accent" />
//                     </div>
//                     <p className="text-2xl">{customers.length}</p>
//                 </Card>

//                 <Card className="p-6">
//                     <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm text-muted-foreground">Active</span>
//                         <div className="w-2 h-2 rounded-full bg-success" />
//                     </div>
//                     <p className="text-2xl">
//                         {customers.filter((c) => c.status === "active").length}
//                     </p>
//                 </Card>

//                 <Card className="p-6">
//                     <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm text-muted-foreground">Total Orders</span>
//                         <Badge variant="secondary">
//                             {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
//                         </Badge>
//                     </div>
//                     <p className="text-2xl">
//                         $
//                         {customers
//                             .reduce((sum, c) => sum + c.totalSpent, 0)
//                             .toLocaleString()}
//                     </p>
//                 </Card>

//                 <Card className="p-6">
//                     <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm text-muted-foreground">Total Points</span>
//                         <Award className="w-5 h-5 text-accent" />
//                     </div>
//                     <p className="text-2xl">
//                         {customers
//                             .reduce((sum, c) => sum + c.points, 0)
//                             .toLocaleString()}
//                     </p>
//                 </Card>
//             </div>

//             {/* Search */}
//             <Card className="p-6 mb-6">
//                 <div className="relative">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                     <Input
//                         placeholder="Search customers by name, email, or phone..."
//                         className="pl-10 bg-gray-100 border-gray-300"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                 </div>
//             </Card>

//             {/* Customers Table */}
//             <Card>
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead>
//                             <tr className="border-b border-border">
//                                 <th className="text-left p-4 text-sm text-muted-foreground">
//                                     Customer
//                                 </th>
//                                 <th className="text-left p-4 text-sm text-muted-foreground">
//                                     Contact
//                                 </th>
//                                 <th className="text-left p-4 text-sm text-muted-foreground">
//                                     Points
//                                 </th>
//                                 <th className="text-left p-4 text-sm text-muted-foreground">
//                                     Total Orders
//                                 </th>
//                                 <th className="text-left p-4 text-sm text-muted-foreground">
//                                     Total Spent
//                                 </th>
//                                 <th className="text-left p-4 text-sm text-muted-foreground">
//                                     Joined
//                                 </th>
//                                 <th className="text-left p-4 text-sm text-muted-foreground">
//                                     Status
//                                 </th>
//                                 <th className="text-left p-4 text-sm text-muted-foreground">
//                                     Actions
//                                 </th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {filteredCustomers.map((customer) => (
//                                 <tr
//                                     key={customer.id}
//                                     className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors"
//                                 >
//                                     <td className="p-4">
//                                         <div className="flex items-center gap-3">
//                                             <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
//                                                 <span className="text-sm font-medium text-accent">
//                                                     {customer.name
//                                                         .split(" ")
//                                                         .map((n) => n[0])
//                                                         .join("")}
//                                                 </span>
//                                             </div>
//                                             <span className="text-sm">{customer.name}</span>
//                                         </div>
//                                     </td>

//                                     <td className="p-4">
//                                         <div className="text-sm">
//                                             <p>{customer.email}</p>
//                                             <p className="text-muted-foreground">{customer.phone}</p>
//                                         </div>
//                                     </td>

//                                     <td className="p-4">
//                                         <div className="flex items-center gap-2">
//                                             <Award className="w-4 h-4 text-accent" />
//                                             <span className="text-sm">
//                                                 {customer.points.toLocaleString()}
//                                             </span>
//                                         </div>
//                                     </td>

//                                     <td className="p-4">
//                                         <Badge variant="secondary">{customer.totalOrders}</Badge>
//                                     </td>

//                                     <td className="p-4">
//                                         <span className="text-sm">
//                                             ${customer.totalSpent.toFixed(2)}
//                                         </span>
//                                     </td>

//                                     <td className="p-4">
//                                         <span className="text-sm text-muted-foreground">
//                                             {formatDate(customer.joinedAt)}
//                                         </span>
//                                     </td>
//                                     {/* <td className="p-4">{getStatusBadge(customer.status)}</td> */}
//                                     <td className="p-4">
//                                         {customer.status === "active" ? (
//                                             <Badge className="bg-success text-success-foreground">Active</Badge>
//                                         ) : (
//                                             <Badge variant="secondary">Inactive</Badge>
//                                         )}
//                                     </td>
//                                     <td className="p-4">
//                                         <Button
//                                             variant="outline"
//                                             size="sm"
//                                             onClick={() => handleViewDetails(customer)}
//                                         >
//                                             <Eye className="w-4 h-4 mr-2" />
//                                             View Details
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </Card>

//             {/* Customer Details Dialog */}
//             <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
//                 <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
//                     <DialogHeader>
//                         <DialogTitle>Customer Details</DialogTitle>
//                         <DialogDescription>
//                             View customer information and loyalty points
//                         </DialogDescription>
//                     </DialogHeader>

//                     {selectedCustomer && (
//                         <div className="mt-4 space-y-6">
//                             <div className="grid grid-cols-2 gap-4">
//                                 <Card className="p-4">
//                                     <p className="text-sm text-muted-foreground mb-1">Name</p>
//                                     <p>{selectedCustomer.name}</p>
//                                 </Card>

//                                 <Card className="p-4">
//                                     <p className="text-sm text-muted-foreground mb-1">Email</p>
//                                     <p>{selectedCustomer.email}</p>
//                                 </Card>

//                                 <Card className="p-4">
//                                     <p className="text-sm text-muted-foreground mb-1">Phone</p>
//                                     <p>{selectedCustomer.phone}</p>
//                                 </Card>

//                                 <Card className="p-4">
//                                     <p className="text-sm text-muted-foreground mb-1">Status</p>
//                                     {getStatusBadge(selectedCustomer.status)}
//                                 </Card>
//                             </div>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }



// "use client"

// import { useState, useMemo, useEffect } from "react"
// import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogDescription,
// } from "@/components/ui/dialog"

// import {
//     Search,
//     Users,
//     Eye,
//     Award,
//     Pencil,
//     Trash2,
//     Power
// } from "lucide-react"

// import { Customer } from "@/app/features/types"
// import {
//     useGetCustomers,
//     useDeleteCustomer,
//     useUpdateCustomer
// } from "@/app/features/hooks"



// export default function CustomersPage() {

//     const [searchQuery, setSearchQuery] = useState("")
//     const [debouncedSearch, setDebouncedSearch] = useState("")

//     const [selectedCustomer, setSelectedCustomer] =
//         useState<Customer | null>(null)

//     const [deleteCustomerId, setDeleteCustomerId] =
//         useState<string | null>(null)

//     const [page, setPage] = useState(1)

//     const pageSize = 8



//     const { data: res = [], isLoading } = useGetCustomers()

//     const deleteCustomer = useDeleteCustomer()
//     const updateCustomer = useUpdateCustomer()



//     /* ------------------ debounce search ------------------ */

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedSearch(searchQuery)
//         }, 400)

//         return () => clearTimeout(timer)
//     }, [searchQuery])



//     /* ------------------ transform data ------------------ */

//     const customers: Customer[] = useMemo(() => {

//         return res.map((c: any) => ({

//             id: c.customer_id,
//             name: c.customer_name,
//             email: c.email,
//             phone: c.phone,
//             points: c.point ?? 0,
//             totalOrders: c.orders?.length ?? 0,
//             totalSpent: 0,
//             joinedAt: c.createdAt,
//             status: c.isActive ? "active" : "inactive",

//         }))

//     }, [res])



//     /* ------------------ search filter ------------------ */

//     const filteredCustomers = useMemo(() => {

//         return customers.filter((customer) =>

//             customer.name.toLowerCase()
//                 .includes(debouncedSearch.toLowerCase())

//             ||

//             customer.email.toLowerCase()
//                 .includes(debouncedSearch.toLowerCase())

//             ||

//             customer.phone.toString()
//                 .includes(debouncedSearch)

//         )

//     }, [customers, debouncedSearch])



//     /* ------------------ pagination ------------------ */

//     const totalPages = Math.ceil(filteredCustomers.length / pageSize)

//     const paginatedCustomers = filteredCustomers.slice(
//         (page - 1) * pageSize,
//         page * pageSize
//     )



//     /* ------------------ handlers ------------------ */

//     const handleViewDetails = (customer: Customer) => {
//         setSelectedCustomer(customer)
//     }



//     const handleDeleteCustomer = () => {

//         if (!deleteCustomerId) return

//         deleteCustomer.mutate(deleteCustomerId, {
//             onSuccess: () => {
//                 setDeleteCustomerId(null)
//             }
//         })

//     }



//     const handleToggleStatus = (customer: Customer) => {

//         updateCustomer.mutate({

//             id: customer.id,
//             data: {
//                 isActive: customer.status !== "active"
//             }

//         })

//     }

//     const handleEditCustomer = (customer: Customer) => {

//         setSelectedCustomer(customer)
//     }



//     /* ------------------ helpers ------------------ */

//     const formatDate = (date: string) => {

//         return new Date(date).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric"
//         })

//     }



//     if (isLoading) {

//         return (
//             <div className="p-8">
//                 Loading customers...
//             </div>
//         )

//     }



//     return (

//         <div className="p-8">


//             {/* ------------------ header ------------------ */}

//             <div className="mb-8">

//                 <div className="flex items-center gap-3 mb-2">

//                     <Users className="w-8 h-8 text-accent" />

//                     <h1 className="text-2xl font-bold">
//                         Customer Management
//                     </h1>

//                 </div>

//                 <p className="text-muted-foreground">
//                     Manage customers and loyalty points
//                 </p>

//             </div>



//             {/* ------------------ stats ------------------ */}

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

//                 <Card className="p-6">

//                     <div className="flex justify-between mb-2">

//                         <span className="text-sm text-muted-foreground">
//                             Total Customers
//                         </span>

//                         <Users className="w-5 h-5 text-accent" />

//                     </div>

//                     <p className="text-2xl font-bold">
//                         {customers.length}
//                     </p>

//                 </Card>



//                 <Card className="p-6">

//                     <div className="flex justify-between mb-2">

//                         <span className="text-sm text-muted-foreground">
//                             Active
//                         </span>

//                     </div>

//                     <p className="text-2xl font-bold">

//                         {customers.filter(c => c.status === "active").length}

//                     </p>

//                 </Card>



//                 <Card className="p-6">

//                     <div className="flex justify-between mb-2">

//                         <span className="text-sm text-muted-foreground">
//                             Total Orders
//                         </span>

//                     </div>

//                     <p className="text-2xl font-bold">

//                         {customers.reduce(
//                             (sum, c) => sum + c.totalOrders, 0
//                         )}

//                     </p>

//                 </Card>



//                 <Card className="p-6">

//                     <div className="flex justify-between mb-2">

//                         <span className="text-sm text-muted-foreground">
//                             Total Points
//                         </span>

//                         <Award className="w-5 h-5 text-accent" />

//                     </div>

//                     <p className="text-2xl font-bold">

//                         {customers.reduce(
//                             (sum, c) => sum + c.points, 0
//                         )}

//                     </p>

//                 </Card>

//             </div>



//             {/* ------------------ search ------------------ */}

//             <Card className="p-6 mb-6">

//                 <div className="relative">

//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

//                     <Input
//                         placeholder="Search customers..."
//                         className="pl-10"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />

//                 </div>

//             </Card>



//             {/* ------------------ table ------------------ */}

//             <Card>

//                 <div className="overflow-x-auto">

//                     <table className="w-full">

//                         <thead>

//                             <tr className="border-b">

//                                 <th className="p-4 text-left">Customer</th>
//                                 <th className="p-4 text-left">Contact</th>
//                                 <th className="p-4 text-left">Points</th>
//                                 <th className="p-4 text-left">Orders</th>
//                                 <th className="p-4 text-left">Joined</th>
//                                 <th className="p-4 text-left">Status</th>
//                                 <th className="p-4 text-left">Actions</th>

//                             </tr>

//                         </thead>



//                         <tbody>

//                             {paginatedCustomers.map(customer => (

//                                 <tr
//                                     key={customer.id}
//                                     className="border-b hover:bg-gray-50"
//                                 >

//                                     <td className="p-4">

//                                         <div className="flex items-center gap-3">

//                                             <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">

//                                                 {customer.name
//                                                     .split(" ")
//                                                     .map(n => n[0])
//                                                     .join("")}

//                                             </div>

//                                             {customer.name}

//                                         </div>

//                                     </td>



//                                     <td className="p-4 text-sm">

//                                         <p>{customer.email}</p>
//                                         <p className="text-muted-foreground">
//                                             {customer.phone}
//                                         </p>

//                                     </td>



//                                     <td className="p-4">

//                                         <Badge variant="secondary">
//                                             {customer.points}
//                                         </Badge>

//                                     </td>



//                                     <td className="p-4">

//                                         <Badge variant="secondary">
//                                             {customer.totalOrders}
//                                         </Badge>

//                                     </td>



//                                     <td className="p-4 text-sm text-muted-foreground">

//                                         {formatDate(customer.joinedAt)}

//                                     </td>



//                                     <td className="p-4">

//                                         {customer.status === "active"
//                                             ? <Badge className="bg-green-500">Active</Badge>
//                                             : <Badge variant="secondary">Inactive</Badge>
//                                         }

//                                     </td>



//                                     <td className="p-4">

//                                         <div className="flex gap-2">

//                                             <Button
//                                                 size="icon"
//                                                 variant="outline"
//                                                 onClick={() => handleViewDetails(customer)}
//                                             >
//                                                 <Eye className="w-4 h-4" />
//                                             </Button>



//                                             <Button
//                                                 size="icon"
//                                                 variant="outline"
//                                                 onClick={() => handleEditCustomer(customer)}
//                                             >
//                                                 <Pencil className="w-4 h-4" />
//                                             </Button>



//                                             <Button
//                                                 size="icon"
//                                                 variant="secondary"
//                                                 onClick={() => handleToggleStatus(customer)}
//                                             >
//                                                 <Power className="w-4 h-4" />
//                                             </Button>



//                                             <Button
//                                                 size="icon"
//                                                 variant="destructive"
//                                                 onClick={() => setDeleteCustomerId(customer.id)}
//                                             >
//                                                 <Trash2 className="w-4 h-4" />
//                                             </Button>

//                                         </div>

//                                     </td>

//                                 </tr>

//                             ))}

//                         </tbody>

//                     </table>

//                 </div>

//             </Card>



//             {/* ------------------ pagination ------------------ */}

//             <div className="flex justify-end gap-2 mt-6">

//                 <Button
//                     variant="outline"
//                     disabled={page === 1}
//                     onClick={() => setPage(page - 1)}
//                 >
//                     Previous
//                 </Button>

//                 <Button
//                     variant="outline"
//                     disabled={page === totalPages}
//                     onClick={() => setPage(page + 1)}
//                 >
//                     Next
//                 </Button>

//             </div>



//             {/* ------------------ customer details ------------------ */}

//             <Dialog
//                 open={!!selectedCustomer}
//                 onOpenChange={() => setSelectedCustomer(null)}
//             >

//                 <DialogContent>

//                     <DialogHeader>

//                         <DialogTitle>Customer Details</DialogTitle>

//                         <DialogDescription>
//                             Customer profile
//                         </DialogDescription>

//                     </DialogHeader>



//                     {selectedCustomer && (

//                         <div className="space-y-3">

//                             <p>Name: {selectedCustomer.name}</p>
//                             <p>Email: {selectedCustomer.email}</p>
//                             <p>Phone: {selectedCustomer.phone}</p>

//                         </div>

//                     )}

//                 </DialogContent>

//             </Dialog>



//             {/* ------------------ delete modal ------------------ */}

//             <Dialog
//                 open={!!deleteCustomerId}
//                 onOpenChange={() => setDeleteCustomerId(null)}
//             >

//                 <DialogContent>

//                     <DialogHeader>

//                         <DialogTitle>Delete Customer</DialogTitle>

//                         <DialogDescription>
//                             Are you sure you want to delete this customer?
//                         </DialogDescription>

//                     </DialogHeader>



//                     <div className="flex justify-end gap-2">

//                         <Button
//                             variant="outline"
//                             onClick={() => setDeleteCustomerId(null)}
//                         >
//                             Cancel
//                         </Button>

//                         <Button
//                             variant="destructive"
//                             onClick={handleDeleteCustomer}
//                         >
//                             Delete
//                         </Button>

//                     </div>

//                 </DialogContent>

//             </Dialog>



//         </div>

//     )

// }












"use client"

import { useState } from "react";

import {
    Search,
    Eye,
    Users,
    DollarSign,
    Award,
    UserCheck,
    UserX,
    TrendingUp,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { Customer, CustomerStatus } from "@/modules/customer/customer.type";
import { Badge } from "@/components/ui/badge";
import { mockCustomers } from "@/app/demo-data/customers";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CustomerDetailDialog } from "@/app/features/customer/CustomerDetailDialog";

const statusOptions: { value: CustomerStatus | "ALL"; label: string }[] = [
    { value: "ALL", label: "All Customers" },
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
];

const getStatusBadge = (status: CustomerStatus) => {
    return status === "ACTIVE" ? (
        <Badge className="bg-green-50 text-green-700 border-green-300">Active</Badge>
    ) : (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
            Inactive
        </Badge>
    );
};

export default function CustomerManagementPage() {
    const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<CustomerStatus | "ALL">("ALL");
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Filter customers
    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery) ||
            customer.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL" || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Calculate stats
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter((c) => c.status === "ACTIVE").length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const totalLoyaltyPoints = customers.reduce(
        (sum, c) => sum + c.loyaltyPoints,
        0
    );

    // Handlers
    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setDetailDialogOpen(true);
    };

    const handleToggleStatus = (customerId: string, newStatus: CustomerStatus) => {
        setCustomers((prev) =>
            prev.map((customer) =>
                customer.id === customerId
                    ? { ...customer, status: newStatus }
                    : customer
            )
        );

        // Update selected customer if it's currently open
        if (selectedCustomer?.id === customerId) {
            setSelectedCustomer((prev) =>
                prev ? { ...prev, status: newStatus } : null
            );
        }

        toast.success(
            `Customer account ${newStatus === "ACTIVE" ? "enabled" : "disabled"} successfully`
        );
    };

    const handleQuickToggle = (
        e: React.MouseEvent,
        customer: Customer
    ) => {
        e.stopPropagation();
        const newStatus: CustomerStatus =
            customer.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        handleToggleStatus(customer.id, newStatus);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        // <Layout>
        <div className="p-8">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
                <p className="text-gray-600">
                    Manage customer accounts, track loyalty points, and view purchase history
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Customers</p>
                            <p className="text-2xl font-bold">{totalCustomers}</p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Active Customers</p>
                            <p className="text-2xl font-bold">{activeCustomers}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {((activeCustomers / totalCustomers) * 100).toFixed(1)}% of total
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <UserCheck className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                            <p className="text-2xl font-bold">
                                ${totalRevenue.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                ${(totalRevenue / totalCustomers).toFixed(2)} per customer
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Loyalty Points</p>
                            <p className="text-2xl font-bold">
                                {totalLoyaltyPoints.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {(totalLoyaltyPoints / totalCustomers).toFixed(0)} avg. per
                                customer
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Award className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card className="p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search by name, email, phone, or customer ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onValueChange={(value) =>
                            setStatusFilter(value as CustomerStatus | "ALL")
                        }
                    >
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Quick Status Filter Badges */}
                <div className="flex gap-2 mt-4 flex-wrap">
                    {statusOptions.map((option) => (
                        <Badge
                            key={option.value}
                            variant={statusFilter === option.value ? "default" : "outline"}
                            className="cursor-pointer px-4 py-1.5"
                            onClick={() =>
                                setStatusFilter(option.value as CustomerStatus | "ALL")
                            }
                        >
                            {option.label}
                        </Badge>
                    ))}
                </div>
            </Card>

            {/* Customers Table */}
            <Card>
                <div className="rounded-lg border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold">Customer ID</TableHead>
                                <TableHead className="font-semibold">Name</TableHead>
                                <TableHead className="font-semibold">Email</TableHead>
                                <TableHead className="font-semibold">Phone</TableHead>
                                <TableHead className="font-semibold">Joined</TableHead>
                                <TableHead className="font-semibold text-right">
                                    Orders
                                </TableHead>
                                <TableHead className="font-semibold text-right">
                                    Total Spent
                                </TableHead>
                                <TableHead className="font-semibold text-right">
                                    Points
                                </TableHead>
                                <TableHead className="font-semibold">Status</TableHead>
                                <TableHead className="w-20 font-semibold"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="text-center py-8">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Users className="h-12 w-12 mb-2" />
                                            <p className="text-sm">No customers found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <TableRow
                                        key={customer.id}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleViewCustomer(customer)}
                                    >
                                        <TableCell>
                                            <p className="font-mono text-sm font-semibold">
                                                {customer.id}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{customer.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {customer.city}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {customer.email}
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {customer.phone}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">
                                            {formatDate(customer.joinDate)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="secondary">
                                                {customer.totalOrders}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            ${customer.totalSpent.toLocaleString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Award className="h-4 w-4 text-purple-600" />
                                                <span className="font-semibold text-purple-700">
                                                    {customer.loyaltyPoints.toLocaleString()}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleViewCustomer(customer)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => handleQuickToggle(e, customer)}
                                                    title={
                                                        customer.status === "ACTIVE"
                                                            ? "Disable account"
                                                            : "Enable account"
                                                    }
                                                >
                                                    {customer.status === "ACTIVE" ? (
                                                        <UserX className="h-4 w-4 text-red-600" />
                                                    ) : (
                                                        <UserCheck className="h-4 w-4 text-green-600" />
                                                    )}
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {filteredCustomers.length > 0 && (
                    <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {filteredCustomers.length} of {customers.length} customers
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span>
                                ${(totalRevenue / customers.length).toFixed(2)} avg. lifetime
                                value
                            </span>
                        </div>
                    </div>
                )}
            </Card>

            {/* Customer Detail Dialog */}
            <CustomerDetailDialog
                open={detailDialogOpen}
                onOpenChange={setDetailDialogOpen}
                customer={selectedCustomer}
                onToggleStatus={handleToggleStatus}
            />
        </div>
        // </Layout>
    );
}

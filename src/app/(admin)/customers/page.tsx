// "use client"
// import { useState } from "react";
// import { Search, Eye, Users, DollarSign, Award, UserCheck, UserX, TrendingUp, } from "lucide-react";
// import { Toaster, toast } from "sonner";
// import { Customer, CustomerStatus } from "@/modules/customer/customer.type";
// import { Badge } from "@/components/ui/badge";
// import { mockCustomers } from "@/app/demo-data/customers";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { CustomerDetailDialog } from "@/app/features/customer/CustomerDetailDialog";

// const statusOptions: { value: CustomerStatus | "ALL"; label: string }[] = [
//     { value: "ALL", label: "All Customers" },
//     { value: "ACTIVE", label: "Active" },
//     { value: "INACTIVE", label: "Inactive" },
// ];

// const getStatusBadge = (status: CustomerStatus) => {
//     return status === "ACTIVE" ? (
//         <Badge className="bg-green-50 text-green-700 border-green-300">Active</Badge>
//     ) : (
//         <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
//             Inactive
//         </Badge>
//     );
// };

// export default function CustomerManagementPage() {
//     const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [statusFilter, setStatusFilter] = useState<CustomerStatus | "ALL">("ALL");
//     const [detailDialogOpen, setDetailDialogOpen] = useState(false);
//     const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

//     // Filter customers
//     const filteredCustomers = customers.filter((customer) => {
//         const matchesSearch =
//             customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             customer.phone.includes(searchQuery) ||
//             customer.id.toLowerCase().includes(searchQuery.toLowerCase());

//         const matchesStatus = statusFilter === "ALL" || customer.status === statusFilter;
//         return matchesSearch && matchesStatus;
//     });

//     // Calculate stats
//     const totalCustomers = customers.length;
//     const activeCustomers = customers.filter((c) => c.status === "ACTIVE").length;
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
//         setCustomers((prev) =>
//             prev.map((customer) =>
//                 customer.id === customerId
//                     ? { ...customer, status: newStatus }
//                     : customer
//             )
//         );

//         // Update selected customer if it's currently open
//         if (selectedCustomer?.id === customerId) {
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
//         handleToggleStatus(customer.id, newStatus);
//     };

//     const formatDate = (dateString: string) => {
//         const date = new Date(dateString);
//         return date.toLocaleString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//         });
//     };

//     return (
//         // <Layout>
//         <div className="p-8">
//             <Toaster position="top-right" />

//             {/* Header */}
//             <div className="mb-6">
//                 <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
//                 <p className="text-gray-600">
//                     Manage customer accounts, track loyalty points, and view purchase history
//                 </p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <Card className="p-4">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-600 mb-1">Total Customers</p>
//                             <p className="text-2xl font-bold">{totalCustomers}</p>
//                         </div>
//                         <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
//                             <Users className="h-6 w-6 text-blue-600" />
//                         </div>
//                     </div>
//                 </Card>
//                 <Card className="p-4">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-600 mb-1">Active Customers</p>
//                             <p className="text-2xl font-bold">{activeCustomers}</p>
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {((activeCustomers / totalCustomers) * 100).toFixed(1)}% of total
//                             </p>
//                         </div>
//                         <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
//                             <UserCheck className="h-6 w-6 text-green-600" />
//                         </div>
//                     </div>
//                 </Card>
//                 <Card className="p-4">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
//                             <p className="text-2xl font-bold">
//                                 ${totalRevenue.toLocaleString()}
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                                 ${(totalRevenue / totalCustomers).toFixed(2)} per customer
//                             </p>
//                         </div>
//                         <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
//                             <DollarSign className="h-6 w-6 text-green-600" />
//                         </div>
//                     </div>
//                 </Card>
//                 <Card className="p-4">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-600 mb-1">Loyalty Points</p>
//                             <p className="text-2xl font-bold">
//                                 {totalLoyaltyPoints.toLocaleString()}
//                             </p>
//                             <p className="text-xs text-gray-500 mt-1">
//                                 {(totalLoyaltyPoints / totalCustomers).toFixed(0)} avg. per
//                                 customer
//                             </p>
//                         </div>
//                         <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
//                             <Award className="h-6 w-6 text-purple-600" />
//                         </div>
//                     </div>
//                 </Card>
//             </div>

//             {/* Search and Filter */}
//             <Card className="p-4 mb-6">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                     <div className="flex-1 relative">
//                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                         <Input
//                             type="text"
//                             placeholder="Search by name, email, phone, or customer ID..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="pl-10"
//                         />
//                     </div>
//                     <Select
//                         value={statusFilter}
//                         onValueChange={(value) =>
//                             setStatusFilter(value as CustomerStatus | "ALL")
//                         }
//                     >
//                         <SelectTrigger className="w-full sm:w-[200px]">
//                             <SelectValue placeholder="Filter by status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {statusOptions.map((option) => (
//                                 <SelectItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 {/* Quick Status Filter Badges */}
//                 <div className="flex gap-2 mt-4 flex-wrap">
//                     {statusOptions.map((option) => (
//                         <Badge
//                             key={option.value}
//                             variant={statusFilter === option.value ? "default" : "outline"}
//                             className="cursor-pointer px-4 py-1.5"
//                             onClick={() =>
//                                 setStatusFilter(option.value as CustomerStatus | "ALL")
//                             }
//                         >
//                             {option.label}
//                         </Badge>
//                     ))}
//                 </div>
//             </Card>

//             {/* Customers Table */}
//             <Card>
//                 <div className="rounded-lg border overflow-hidden">
//                     <Table>
//                         <TableHeader>
//                             <TableRow className="bg-gray-50">
//                                 <TableHead className="font-semibold">Customer ID</TableHead>
//                                 <TableHead className="font-semibold">Name</TableHead>
//                                 <TableHead className="font-semibold">Email</TableHead>
//                                 <TableHead className="font-semibold">Phone</TableHead>
//                                 <TableHead className="font-semibold">Joined</TableHead>
//                                 <TableHead className="font-semibold text-right">
//                                     Orders
//                                 </TableHead>
//                                 <TableHead className="font-semibold text-right">
//                                     Total Spent
//                                 </TableHead>
//                                 <TableHead className="font-semibold text-right">
//                                     Points
//                                 </TableHead>
//                                 <TableHead className="font-semibold">Status</TableHead>
//                                 <TableHead className="w-20 font-semibold"></TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {filteredCustomers.length === 0 ? (
//                                 <TableRow>
//                                     <TableCell colSpan={10} className="text-center py-8">
//                                         <div className="flex flex-col items-center justify-center text-gray-400">
//                                             <Users className="h-12 w-12 mb-2" />
//                                             <p className="text-sm">No customers found</p>
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ) : (
//                                 filteredCustomers.map((customer) => (
//                                     <TableRow
//                                         key={customer.id}
//                                         className="hover:bg-gray-50 cursor-pointer"
//                                         onClick={() => handleViewCustomer(customer)}
//                                     >
//                                         <TableCell>
//                                             <p className="font-mono text-sm font-semibold">
//                                                 {customer.id}
//                                             </p>
//                                         </TableCell>
//                                         <TableCell>
//                                             <div>
//                                                 <p className="font-medium">{customer.name}</p>
//                                                 <p className="text-xs text-gray-500">
//                                                     {customer.city}
//                                                 </p>
//                                             </div>
//                                         </TableCell>
//                                         <TableCell className="text-sm">
//                                             {customer.email}
//                                         </TableCell>
//                                         <TableCell className="text-sm">
//                                             {customer.phone}
//                                         </TableCell>
//                                         <TableCell className="text-sm text-gray-600">
//                                             {formatDate(customer.joinDate)}
//                                         </TableCell>
//                                         <TableCell className="text-right">
//                                             <Badge variant="secondary">
//                                                 {customer.totalOrders}
//                                             </Badge>
//                                         </TableCell>
//                                         <TableCell className="text-right font-semibold">
//                                             ${customer.totalSpent.toLocaleString()}
//                                         </TableCell>
//                                         <TableCell className="text-right">
//                                             <div className="flex items-center justify-end gap-1">
//                                                 <Award className="h-4 w-4 text-purple-600" />
//                                                 <span className="font-semibold text-purple-700">
//                                                     {customer.loyaltyPoints.toLocaleString()}
//                                                 </span>
//                                             </div>
//                                         </TableCell>
//                                         <TableCell>{getStatusBadge(customer.status)}</TableCell>
//                                         <TableCell>
//                                             <div className="flex gap-2">
//                                                 <Button
//                                                     variant="ghost"
//                                                     size="sm"
//                                                     onClick={() => handleViewCustomer(customer)}
//                                                 >
//                                                     <Eye className="h-4 w-4" />
//                                                 </Button>
//                                                 <Button
//                                                     variant="ghost"
//                                                     size="sm"
//                                                     onClick={(e) => handleQuickToggle(e, customer)}
//                                                     title={
//                                                         customer.status === "ACTIVE"
//                                                             ? "Disable account"
//                                                             : "Enable account"
//                                                     }
//                                                 >
//                                                     {customer.status === "ACTIVE" ? (
//                                                         <UserX className="h-4 w-4 text-red-600" />
//                                                     ) : (
//                                                         <UserCheck className="h-4 w-4 text-green-600" />
//                                                     )}
//                                                 </Button>
//                                             </div>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             )}
//                         </TableBody>
//                     </Table>
//                 </div>

//                 {filteredCustomers.length > 0 && (
//                     <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
//                         <p className="text-sm text-gray-600">
//                             Showing {filteredCustomers.length} of {customers.length} customers
//                         </p>
//                         <div className="flex items-center gap-2 text-sm text-gray-600">
//                             <TrendingUp className="h-4 w-4 text-green-600" />
//                             <span>
//                                 ${(totalRevenue / customers.length).toFixed(2)} avg. lifetime
//                                 value
//                             </span>
//                         </div>
//                     </div>
//                 )}
//             </Card>

//             {/* Customer Detail Dialog */}
//             <CustomerDetailDialog
//                 open={detailDialogOpen}
//                 onOpenChange={setDetailDialogOpen}
//                 customer={selectedCustomer}
//                 onToggleStatus={handleToggleStatus}
//             />
//         </div>
//         // </Layout>
//     );
// }




"use client"
import { useState } from "react";
import { Search, Eye, Users, DollarSign, Award, UserCheck, UserX, TrendingUp } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Customer, CustomerStatus } from "@/modules/customer/customer.type";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CustomerDetailDialog } from "@/app/features/customer/CustomerDetailDialog";
import { useGetCustomers, useUpdateCustomer } from "@/app/features/hooks";

const statusOptions: { value: CustomerStatus | "ALL"; label: string }[] = [
    { value: "ALL", label: "All Customers" },
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
];

const getStatusBadge = (status: CustomerStatus) => {
    return status === "ACTIVE" ? (<Badge className="bg-green-50 text-green-700 border-green-300">Active</Badge>
    ) : (<Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
        Inactive </Badge>
    );
};

export default function CustomerManagementPage() {

    const { data } = useGetCustomers();
    const updateCustomer = useUpdateCustomer();

    const customers: Customer[] = data?.data ?? [];
    console.log("customer : ", customers)

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<CustomerStatus | "ALL">("ALL");
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Filter customers
    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery) ||
            customer.customer_id.toLowerCase().includes(searchQuery.toLowerCase());


        const matchesStatus = statusFilter === "ALL" || customer.isActive === statusFilter;
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
        updateCustomer.mutate({
            id: customerId,
            data: { status: newStatus }
        });

        if (selectedCustomer?.customer_id === customerId) {
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
        handleToggleStatus(customer.customer_id, newStatus);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (<div className="p-8"> <Toaster position="top-right" />
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
                            {totalCustomers === 0
                                ? 0
                                : ((activeCustomers / totalCustomers) * 100).toFixed(1)}% of total
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
                            {totalCustomers === 0
                                ? 0
                                : `$${(totalRevenue / totalCustomers).toFixed(2)} per customer`}
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
                            {totalCustomers === 0
                                ? 0
                                : `${(totalLoyaltyPoints / totalCustomers).toFixed(0)} avg. per customer`}
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
                            <TableHead className="font-semibold text-right">Orders</TableHead>
                            <TableHead className="font-semibold text-right">Total Spent</TableHead>
                            <TableHead className="font-semibold text-right">Points</TableHead>
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
                                    key={customer.customer_id}
                                    className="hover:bg-gray-50 cursor-pointer"
                                    onClick={() => handleViewCustomer(customer)}
                                >

                                    <TableCell>
                                        <p className="font-mono text-sm font-semibold">
                                            {customer.customer_id}
                                        </p>
                                    </TableCell>

                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{customer.customer_name}</p>
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
                                        {/* ${customer.totalSpent.toLocaleString()} */}
                                        $1200
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Award className="h-4 w-4 text-purple-600" />
                                            <span className="font-semibold text-purple-700">
                                                {/* {customer.loyaltyPoints.toLocaleString()} */}
                                                100
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        {getStatusBadge(customer.status)}
                                    </TableCell>

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
                            {customers.length === 0
                                ? 0
                                : `$${(totalRevenue / customers.length).toFixed(2)} avg. lifetime value`}
                        </span>
                    </div>
                </div>
            )}
        </Card>

        <CustomerDetailDialog
            open={detailDialogOpen}
            onOpenChange={setDetailDialogOpen}
            customer={selectedCustomer}
            onToggleStatus={handleToggleStatus}
        />
    </div>


    );
}

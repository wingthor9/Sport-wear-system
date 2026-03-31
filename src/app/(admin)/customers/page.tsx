"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Search, Users, Eye, Award } from "lucide-react";
import { Customer } from "@/app/features/types";
import { useGetCustomers } from "@/app/features/hooks";


export default function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [showDetailsDialog, setShowDetailsDialog] = useState(false);

    const { data: res = [], isLoading } = useGetCustomers();
    const customers = res.map((c: any) => ({
        id: c.customer_id,
        name: c.customer_name,
        email: c.email,
        phone: c.phone,
        points: c.point ?? 0,
        totalOrders: c.orders?.length ?? 0,
        totalSpent: 0,
        joinedAt: c.createdAt,
        status: c.isActive ? "active" : "inactive",
    }))
    console.log("customer data ", customers)

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery)
    );

    const handleViewDetails = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowDetailsDialog(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getStatusBadge = (status: Customer["status"]) => {
        return status === "active" ? (
            <Badge className="bg-success text-success-foreground">Active</Badge>
        ) : (
            <Badge variant="secondary">Inactive</Badge>
        );
    };

    if (isLoading) {
        return <div className="p-8">Loading customers...</div>;
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <Users className="w-8 h-8 text-accent" />
                    <h1>Customer Management</h1>
                </div>
                <p className="text-muted-foreground">
                    View customer profiles, order history, and loyalty points
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Customers</span>
                        <Users className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-2xl">{customers.length}</p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Active</span>
                        <div className="w-2 h-2 rounded-full bg-success" />
                    </div>
                    <p className="text-2xl">
                        {customers.filter((c) => c.status === "active").length}
                    </p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Orders</span>
                        <Badge variant="secondary">
                            {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
                        </Badge>
                    </div>
                    <p className="text-2xl">
                        $
                        {customers
                            .reduce((sum, c) => sum + c.totalSpent, 0)
                            .toLocaleString()}
                    </p>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Total Points</span>
                        <Award className="w-5 h-5 text-accent" />
                    </div>
                    <p className="text-2xl">
                        {customers
                            .reduce((sum, c) => sum + c.points, 0)
                            .toLocaleString()}
                    </p>
                </Card>
            </div>

            {/* Search */}
            <Card className="p-6 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search customers by name, email, or phone..."
                        className="pl-10 bg-gray-100 border-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </Card>

            {/* Customers Table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left p-4 text-sm text-muted-foreground">
                                    Customer
                                </th>
                                <th className="text-left p-4 text-sm text-muted-foreground">
                                    Contact
                                </th>
                                <th className="text-left p-4 text-sm text-muted-foreground">
                                    Points
                                </th>
                                <th className="text-left p-4 text-sm text-muted-foreground">
                                    Total Orders
                                </th>
                                <th className="text-left p-4 text-sm text-muted-foreground">
                                    Total Spent
                                </th>
                                <th className="text-left p-4 text-sm text-muted-foreground">
                                    Joined
                                </th>
                                <th className="text-left p-4 text-sm text-muted-foreground">
                                    Status
                                </th>
                                <th className="text-left p-4 text-sm text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                                <span className="text-sm font-medium text-accent">
                                                    {customer.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </span>
                                            </div>
                                            <span className="text-sm">{customer.name}</span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="text-sm">
                                            <p>{customer.email}</p>
                                            <p className="text-muted-foreground">{customer.phone}</p>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <Award className="w-4 h-4 text-accent" />
                                            <span className="text-sm">
                                                {customer.points.toLocaleString()}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <Badge variant="secondary">{customer.totalOrders}</Badge>
                                    </td>

                                    <td className="p-4">
                                        <span className="text-sm">
                                            ${customer.totalSpent.toFixed(2)}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        <span className="text-sm text-muted-foreground">
                                            {formatDate(customer.joinedAt)}
                                        </span>
                                    </td>
                                    {/* <td className="p-4">{getStatusBadge(customer.status)}</td> */}
                                    <td className="p-4">
                                        {customer.status === "active" ? (
                                            <Badge className="bg-success text-success-foreground">Active</Badge>
                                        ) : (
                                            <Badge variant="secondary">Inactive</Badge>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleViewDetails(customer)}
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Customer Details Dialog */}
            <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Customer Details</DialogTitle>
                        <DialogDescription>
                            View customer information and loyalty points
                        </DialogDescription>
                    </DialogHeader>

                    {selectedCustomer && (
                        <div className="mt-4 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Name</p>
                                    <p>{selectedCustomer.name}</p>
                                </Card>

                                <Card className="p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                                    <p>{selectedCustomer.email}</p>
                                </Card>

                                <Card className="p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                                    <p>{selectedCustomer.phone}</p>
                                </Card>

                                <Card className="p-4">
                                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                                    {getStatusBadge(selectedCustomer.status)}
                                </Card>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Customer, CustomerStatus } from "@/modules/customer/customer.type";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    DollarSign,
    ShoppingBag,
    Award,
    TrendingUp,
    TrendingDown,
    Package,
} from "lucide-react";

interface CustomerDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    customer: Customer | null;
    onToggleStatus?: (customerId: string, newStatus: CustomerStatus) => void;
}

const getStatusBadge = (status: CustomerStatus) => {
    return status === "ACTIVE" ? (
        <Badge className="bg-green-50 text-green-700 border-green-300">
            Active
        </Badge>
    ) : (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
            Inactive
        </Badge>
    );
};

export function CustomerDetailDialog({
    open,
    onOpenChange,
    customer,
    onToggleStatus,
}: CustomerDetailDialogProps) {
    if (!customer) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const averageOrderValue = customer.totalSpent / customer.totalOrders;

    const handleToggleStatus = () => {
        if (onToggleStatus) {
            const newStatus: CustomerStatus =
                customer.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
            onToggleStatus(customer.id, newStatus);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-2xl">{customer.name}</DialogTitle>
                            <DialogDescription className="text-base mt-1">
                                Customer ID: {customer.id}
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {getStatusBadge(customer.status)}
                            <Button
                                variant={customer.status === "ACTIVE" ? "outline" : "default"}
                                size="sm"
                                onClick={handleToggleStatus}
                            >
                                {customer.status === "ACTIVE" ? "Disable Account" : "Enable Account"}
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                                    <DollarSign className="h-4 w-4 text-green-600" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Total Spent</p>
                            <p className="text-xl font-bold">
                                ${customer.totalSpent.toLocaleString()}
                            </p>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <ShoppingBag className="h-4 w-4 text-blue-600" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Total Orders</p>
                            <p className="text-xl font-bold">{customer.totalOrders}</p>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Award className="h-4 w-4 text-purple-600" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Loyalty Points</p>
                            <p className="text-xl font-bold">
                                {customer.loyaltyPoints.toLocaleString()}
                            </p>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <TrendingUp className="h-4 w-4 text-orange-600" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Avg. Order</p>
                            <p className="text-xl font-bold">${averageOrderValue.toFixed(2)}</p>
                        </Card>
                    </div>

                    <Separator />

                    {/* Personal Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Personal Information
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-600">Email</p>
                                        <p className="text-sm font-medium">{customer.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-600">Phone</p>
                                        <p className="text-sm font-medium">{customer.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">Address</p>
                                    <p className="text-sm font-medium">{customer.address}</p>
                                    <p className="text-sm text-gray-600">
                                        {customer.city}, {customer.postalCode}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-600">Member Since</p>
                                        <p className="text-sm font-medium">
                                            {formatDate(customer.joinDate)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShoppingBag className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-xs text-gray-600">Last Order</p>
                                        <p className="text-sm font-medium">
                                            {formatDate(customer.lastOrderDate)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Order History */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Order History ({customer.orders.length})
                        </h3>
                        <div className="space-y-3">
                            {customer.orders.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">No orders yet</p>
                                </div>
                            ) : (
                                customer.orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-semibold font-mono text-sm">
                                                {order.orderNumber}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1">
                                                {formatDateTime(order.date)}
                                            </p>
                                        </div>
                                        <div className="text-center px-4">
                                            <Badge variant="secondary">{order.itemsCount} items</Badge>
                                        </div>
                                        <div className="text-center px-4">
                                            <Badge
                                                variant={
                                                    order.status === "COMPLETED"
                                                        ? "default"
                                                        : order.status === "SHIPPED"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                            >
                                                {order.status.replace("_", " ")}
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${order.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* Points History */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Points History
                        </h3>
                        <div className="space-y-2">
                            {customer.pointsHistory.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">No points transactions yet</p>
                                </div>
                            ) : (
                                customer.pointsHistory.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`h-10 w-10 rounded-full flex items-center justify-center ${transaction.type === "EARNED"
                                                        ? "bg-green-100"
                                                        : "bg-orange-100"
                                                    }`}
                                            >
                                                {transaction.type === "EARNED" ? (
                                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                                ) : (
                                                    <TrendingDown className="h-5 w-5 text-orange-600" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">
                                                    {transaction.description}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {formatDateTime(transaction.date)}
                                                    {transaction.orderId && (
                                                        <span className="ml-2 font-mono">
                                                            {transaction.orderId}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={`font-bold text-lg ${transaction.type === "EARNED"
                                                    ? "text-green-600"
                                                    : "text-orange-600"
                                                }`}
                                        >
                                            {transaction.points > 0 ? "+" : ""}
                                            {transaction.points}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

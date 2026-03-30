// Mock data for the entire system

export interface Category {
    id: string;
    name: string;
    description: string;
    productCount: number;
    createdAt: string;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    points: number;
    totalOrders: number;
    totalSpent: number;
    joinedAt: string;
    status: "active" | "inactive";
}

export interface Employee {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "STAFF";
    status: "active" | "inactive";
    hiredAt: string;
    phone: string;
}

export interface Supplier {
    id: string;
    name: string;
    contact: string;
    email: string;
    phone: string;
    address: string;
    productsSupplied: number;
    status: "active" | "inactive";
}

export interface PurchaseOrder {
    id: string;
    supplierId: string;
    supplierName: string;
    orderDate: string;
    expectedDate: string;
    status: "pending" | "received" | "cancelled";
    totalAmount: number;
    items: {
        productName: string;
        quantity: number;
        unitPrice: number;
    }[];
}

export interface Payment {
    id: string;
    orderId: string;
    customerName: string;
    amount: number;
    paymentMethod: "bank_transfer" | "cash" | "card";
    status: "pending" | "approved" | "rejected";
    slipImage?: string;
    submittedAt: string;
    notes?: string;
}

export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    orderDate: string;
    status: "pending" | "processing" | "completed" | "cancelled";
    total: number;
    paymentStatus: "paid" | "pending" | "failed";
    items: {
        productName: string;
        quantity: number;
        price: number;
    }[];
}

export interface StockImport {
    id: string;
    purchaseOrderId: string;
    importDate: string;
    receivedBy: string;
    status: "completed" | "partial";
    items: {
        productName: string;
        expectedQty: number;
        receivedQty: number;
    }[];
}

// Mock Categories
export const mockCategories: Category[] = [
    {
        id: "1",
        name: "Footwear",
        description: "Athletic and sports shoes",
        productCount: 24,
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        name: "Apparel",
        description: "Sports clothing and activewear",
        productCount: 156,
        createdAt: "2024-01-15",
    },
    {
        id: "3",
        name: "Accessories",
        description: "Sports accessories and equipment",
        productCount: 89,
        createdAt: "2024-01-16",
    },
    {
        id: "4",
        name: "Outerwear",
        description: "Jackets and outdoor sports clothing",
        productCount: 42,
        createdAt: "2024-01-20",
    },
    {
        id: "5",
        name: "Equipment",
        description: "Training and sports equipment",
        productCount: 67,
        createdAt: "2024-02-01",
    },
];

// Mock Customers
export const mockCustomers: Customer[] = [
    {
        id: "1",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 555-0101",
        points: 2450,
        totalOrders: 18,
        totalSpent: 3245.50,
        joinedAt: "2023-06-15",
        status: "active",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+1 555-0102",
        points: 1820,
        totalOrders: 12,
        totalSpent: 2156.75,
        joinedAt: "2023-08-22",
        status: "active",
    },
    {
        id: "3",
        name: "Mike Chen",
        email: "mchen@email.com",
        phone: "+1 555-0103",
        points: 3150,
        totalOrders: 25,
        totalSpent: 4890.25,
        joinedAt: "2023-04-10",
        status: "active",
    },
    {
        id: "4",
        name: "Emma Davis",
        email: "emma.davis@email.com",
        phone: "+1 555-0104",
        points: 890,
        totalOrders: 6,
        totalSpent: 1234.00,
        joinedAt: "2024-01-05",
        status: "active",
    },
    {
        id: "5",
        name: "Robert Brown",
        email: "rbrown@email.com",
        phone: "+1 555-0105",
        points: 450,
        totalOrders: 3,
        totalSpent: 567.80,
        joinedAt: "2024-02-18",
        status: "inactive",
    },
];

// Mock Employees
export const mockEmployees: Employee[] = [
    {
        id: "1",
        name: "Admin User",
        email: "admin@sportwear.com",
        role: "ADMIN",
        status: "active",
        hiredAt: "2023-01-01",
        phone: "+1 555-0001",
    },
    {
        id: "2",
        name: "Alice Manager",
        email: "alice@sportwear.com",
        role: "ADMIN",
        status: "active",
        hiredAt: "2023-02-15",
        phone: "+1 555-0002",
    },
    {
        id: "3",
        name: "Bob Staff",
        email: "bob@sportwear.com",
        role: "STAFF",
        status: "active",
        hiredAt: "2023-06-10",
        phone: "+1 555-0003",
    },
    {
        id: "4",
        name: "Carol Staff",
        email: "carol@sportwear.com",
        role: "STAFF",
        status: "active",
        hiredAt: "2023-09-20",
        phone: "+1 555-0004",
    },
    {
        id: "5",
        name: "David Staff",
        email: "david@sportwear.com",
        role: "STAFF",
        status: "inactive",
        hiredAt: "2023-11-01",
        phone: "+1 555-0005",
    },
];

// Mock Suppliers
export const mockSuppliers: Supplier[] = [
    {
        id: "1",
        name: "Nike Sports Wholesale",
        contact: "John Nike",
        email: "orders@nike-wholesale.com",
        phone: "+1 800-555-0001",
        address: "123 Sports Ave, Portland, OR 97201",
        productsSupplied: 145,
        status: "active",
    },
    {
        id: "2",
        name: "Adidas Distribution",
        contact: "Maria Adidas",
        email: "supply@adidas-dist.com",
        phone: "+1 800-555-0002",
        address: "456 Athletic Blvd, Boston, MA 02101",
        productsSupplied: 132,
        status: "active",
    },
    {
        id: "3",
        name: "Under Armour Supply Co",
        contact: "Tom Armour",
        email: "sales@ua-supply.com",
        phone: "+1 800-555-0003",
        address: "789 Fitness St, Baltimore, MD 21201",
        productsSupplied: 98,
        status: "active",
    },
    {
        id: "4",
        name: "Puma Wholesale",
        contact: "Lisa Puma",
        email: "info@puma-wholesale.com",
        phone: "+1 800-555-0004",
        address: "321 Runner Rd, Chicago, IL 60601",
        productsSupplied: 76,
        status: "inactive",
    },
];

// Mock Payments
export const mockPayments: Payment[] = [
    {
        id: "1",
        orderId: "ORD-2024-0156",
        customerName: "John Smith",
        amount: 245.98,
        paymentMethod: "bank_transfer",
        status: "pending",
        slipImage: "https://images.unsplash.com/photo-1554224311-beee4ead8f1f?w=400&h=600&fit=crop",
        submittedAt: "2024-03-24T10:30:00",
        notes: "Bank transfer from Chase Bank",
    },
    {
        id: "2",
        orderId: "ORD-2024-0157",
        customerName: "Sarah Johnson",
        amount: 189.50,
        paymentMethod: "bank_transfer",
        status: "pending",
        slipImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=600&fit=crop",
        submittedAt: "2024-03-24T11:15:00",
        notes: "Transfer from Bank of America",
    },
    {
        id: "3",
        orderId: "ORD-2024-0158",
        customerName: "Mike Chen",
        amount: 567.25,
        paymentMethod: "bank_transfer",
        status: "pending",
        slipImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=600&fit=crop",
        submittedAt: "2024-03-24T09:45:00",
    },
    {
        id: "4",
        orderId: "ORD-2024-0155",
        customerName: "Emma Davis",
        amount: 123.00,
        paymentMethod: "bank_transfer",
        status: "approved",
        slipImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=600&fit=crop",
        submittedAt: "2024-03-23T14:20:00",
    },
    {
        id: "5",
        orderId: "ORD-2024-0154",
        customerName: "Robert Brown",
        amount: 89.99,
        paymentMethod: "bank_transfer",
        status: "rejected",
        slipImage: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=600&fit=crop",
        submittedAt: "2024-03-23T10:00:00",
        notes: "Invalid transfer receipt",
    },
];

// Mock Orders
export const mockOrders: Order[] = [
    {
        id: "ORD-2024-0156",
        customerId: "1",
        customerName: "John Smith",
        orderDate: "2024-03-24T10:00:00",
        status: "pending",
        total: 245.98,
        paymentStatus: "pending",
        items: [
            { productName: "Pro Running Shoes", quantity: 1, price: 129.99 },
            { productName: "Performance T-Shirt", quantity: 2, price: 39.99 },
            { productName: "Sports Socks (3-Pack)", quantity: 3, price: 14.99 },
        ],
    },
    {
        id: "ORD-2024-0157",
        customerId: "2",
        customerName: "Sarah Johnson",
        orderDate: "2024-03-24T11:00:00",
        status: "processing",
        total: 189.50,
        paymentStatus: "pending",
        items: [
            { productName: "Yoga Mat", quantity: 2, price: 29.99 },
            { productName: "Training Shorts", quantity: 2, price: 49.99 },
            { productName: "Water Bottle", quantity: 2, price: 19.99 },
        ],
    },
    {
        id: "ORD-2024-0158",
        customerId: "3",
        customerName: "Mike Chen",
        orderDate: "2024-03-24T09:30:00",
        status: "pending",
        total: 567.25,
        paymentStatus: "pending",
        items: [
            { productName: "Basketball Shoes", quantity: 2, price: 149.99 },
            { productName: "Sport Jacket", quantity: 2, price: 89.99 },
            { productName: "Gym Bag", quantity: 2, price: 44.99 },
        ],
    },
    {
        id: "ORD-2024-0155",
        customerId: "4",
        customerName: "Emma Davis",
        orderDate: "2024-03-23T14:00:00",
        status: "completed",
        total: 123.00,
        paymentStatus: "paid",
        items: [
            { productName: "Compression Leggings", quantity: 1, price: 59.99 },
            { productName: "Performance T-Shirt", quantity: 1, price: 39.99 },
            { productName: "Sweatband Set", quantity: 2, price: 9.99 },
        ],
    },
];

// Mock Purchase Orders
export const mockPurchaseOrders: PurchaseOrder[] = [
    {
        id: "PO-2024-001",
        supplierId: "1",
        supplierName: "Nike Sports Wholesale",
        orderDate: "2024-03-20",
        expectedDate: "2024-03-27",
        status: "pending",
        totalAmount: 15450.00,
        items: [
            { productName: "Pro Running Shoes", quantity: 50, unitPrice: 65.00 },
            { productName: "Performance T-Shirt", quantity: 100, unitPrice: 18.00 },
            { productName: "Training Shorts", quantity: 80, unitPrice: 22.00 },
        ],
    },
    {
        id: "PO-2024-002",
        supplierId: "2",
        supplierName: "Adidas Distribution",
        orderDate: "2024-03-22",
        expectedDate: "2024-03-29",
        status: "pending",
        totalAmount: 8920.00,
        items: [
            { productName: "Basketball Shoes", quantity: 40, unitPrice: 75.00 },
            { productName: "Sport Jacket", quantity: 60, unitPrice: 45.00 },
        ],
    },
    {
        id: "PO-2024-003",
        supplierId: "1",
        supplierName: "Nike Sports Wholesale",
        orderDate: "2024-03-15",
        expectedDate: "2024-03-22",
        status: "received",
        totalAmount: 12340.00,
        items: [
            { productName: "Compression Leggings", quantity: 100, unitPrice: 28.00 },
            { productName: "Yoga Mat", quantity: 150, unitPrice: 12.00 },
            { productName: "Water Bottle", quantity: 200, unitPrice: 8.00 },
        ],
    },
];

// Mock Stock Imports
export const mockStockImports: StockImport[] = [
    {
        id: "IMP-2024-001",
        purchaseOrderId: "PO-2024-003",
        importDate: "2024-03-22",
        receivedBy: "Bob Staff",
        status: "completed",
        items: [
            { productName: "Compression Leggings", expectedQty: 100, receivedQty: 100 },
            { productName: "Yoga Mat", expectedQty: 150, receivedQty: 150 },
            { productName: "Water Bottle", expectedQty: 200, receivedQty: 200 },
        ],
    },
    {
        id: "IMP-2024-002",
        purchaseOrderId: "PO-2024-002",
        importDate: "2024-03-23",
        receivedBy: "Alice Manager",
        status: "partial",
        items: [
            { productName: "Basketball Shoes", expectedQty: 40, receivedQty: 35 },
            { productName: "Sport Jacket", expectedQty: 60, receivedQty: 60 },
        ],
    },
];

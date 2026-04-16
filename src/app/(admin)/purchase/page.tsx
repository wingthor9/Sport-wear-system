// "use client"

// import { useState } from "react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
// import { Plus, Search, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react"
// import { toast } from "sonner"
// import { format } from "date-fns"

// import {
//     useGetPurchaseOrders,
//     useCreatePurchaseOrder,
//     useUpdatePurchaseOrder,
//     useDeletePurchaseOrder
// } from "@/app/features/hooks"
// import { PurchaseOrder } from "@/modules/purchase/purchase.type"

// // import { PurchaseOrder } from "../types/purchase-order"
// // import { PurchaseOrderDetailDialog } from "../components/PurchaseOrderDetailDialog"
// // import { PurchaseOrderFormDialog } from "../components/PurchaseOrderFormDialog"
// // import { DeleteConfirmDialog } from "../components/DeleteConfirmDialog"

// export default function PurchaseOrderManagementPage() {

//     // ✅ API
//     const { data, isLoading } = useGetPurchaseOrders()
//     const createOrder = useCreatePurchaseOrder()
//     const updateOrder = useUpdatePurchaseOrder()
//     const deleteOrder = useDeletePurchaseOrder()

//     const purchaseOrders: PurchaseOrder[] = data?.data ?? []

//     // ✅ UI state
//     const [searchQuery, setSearchQuery] = useState("")
//     const [statusFilter, setStatusFilter] = useState("all")

//     const [detailOpen, setDetailOpen] = useState(false)
//     const [formOpen, setFormOpen] = useState(false)
//     const [deleteOpen, setDeleteOpen] = useState(false)

//     const [selectedOrder, setSelectedOrder] = useState<PurchaseOrder | null>(null)
//     const [editingOrder, setEditingOrder] = useState<PurchaseOrder | null>(null)
//     const [deletingOrder, setDeletingOrder] = useState<PurchaseOrder | null>(null)

//     // ✅ filter
//     const filteredOrders = purchaseOrders.filter((order) => {
//         const matchSearch =
//             order.purchaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             order.supplierName.toLowerCase().includes(searchQuery.toLowerCase())

//         const matchStatus =
//             statusFilter === "all" || order.status === statusFilter

//         return matchSearch && matchStatus
//     })

//     // ------------------ handlers ------------------

//     const handleCreate = () => {
//         setEditingOrder(null)
//         setFormOpen(true)
//     }

//     const handleEdit = (order: PurchaseOrder) => {
//         setEditingOrder(order)
//         setFormOpen(true)
//     }

//     const handleDeleteClick = (order: PurchaseOrder) => {
//         setDeletingOrder(order)
//         setDeleteOpen(true)
//     }

//     const handleDeleteConfirm = () => {
//         if (!deletingOrder) return

//         deleteOrder.mutate(deletingOrder.id, {
//             onSuccess: () => {
//                 toast.success("Deleted successfully")
//                 setDeleteOpen(false)
//             },
//             onError: () => {
//                 toast.error("Delete failed")
//             }
//         })
//     }

//     const handleSave = async (values: any) => {
//         try {
//             if (editingOrder) {
//                 await updateOrder.mutateAsync({
//                     id: editingOrder.id,
//                     data: values
//                 })
//                 toast.success("Updated successfully")
//             } else {
//                 await createOrder.mutateAsync(values)
//                 toast.success("Created successfully")
//             }
//             setFormOpen(false)
//         } catch (err) {
//             toast.error("Something went wrong")
//         }
//     }

//     // ------------------ UI ------------------

//     return (
//         <div className="p-6 space-y-4">

//             {/* 🔍 filter */}
//             <Card className="p-4 flex gap-3">
//                 <div className="relative flex-1">
//                     <Search className="absolute left-3 top-3 h-4 w-4" />
//                     <Input
//                         placeholder="Search..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="pl-10"
//                     />
//                 </div>

//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                     <SelectTrigger className="w-40">
//                         <SelectValue placeholder="Status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">All</SelectItem>
//                         <SelectItem value="pending">Pending</SelectItem>
//                         <SelectItem value="completed">Completed</SelectItem>
//                     </SelectContent>
//                 </Select>

//                 <Button onClick={handleCreate}>
//                     <Plus className="w-4 h-4 mr-1" />
//                     Add
//                 </Button>
//             </Card>

//             {/* 📋 table */}
//             <Card>
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>ID</TableHead>
//                             <TableHead>Supplier</TableHead>
//                             <TableHead>Date</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Total</TableHead>
//                             <TableHead />
//                         </TableRow>
//                     </TableHeader>

//                     <TableBody>
//                         {isLoading ? (
//                             <TableRow>
//                                 <TableCell colSpan={6}>Loading...</TableCell>
//                             </TableRow>
//                         ) : filteredOrders.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={6}>No data</TableCell>
//                             </TableRow>
//                         ) : (
//                             filteredOrders.map((order) => (
//                                 <TableRow key={order.id}>
//                                     <TableCell>{order.purchaseId}</TableCell>
//                                     <TableCell>{order.supplierName}</TableCell>
//                                     <TableCell>
//                                         {format(new Date(order.purchaseDate), "yyyy-MM-dd")}
//                                     </TableCell>
//                                     <TableCell>
//                                         <Badge>{order.status}</Badge>
//                                     </TableCell>
//                                     <TableCell>${order.totalAmount}</TableCell>

//                                     <TableCell>
//                                         <DropdownMenu>
//                                             <DropdownMenuTrigger asChild>
//                                                 <Button size="sm" variant="ghost">
//                                                     <MoreVertical className="w-4 h-4" />
//                                                 </Button>
//                                             </DropdownMenuTrigger>

//                                             <DropdownMenuContent>
//                                                 <DropdownMenuItem
//                                                     onClick={() => {
//                                                         setSelectedOrder(order)
//                                                         setDetailOpen(true)
//                                                     }}
//                                                 >
//                                                     <Eye className="w-4 h-4 mr-2" />
//                                                     View
//                                                 </DropdownMenuItem>

//                                                 <DropdownMenuItem onClick={() => handleEdit(order)}>
//                                                     <Pencil className="w-4 h-4 mr-2" />
//                                                     Edit
//                                                 </DropdownMenuItem>

//                                                 <DropdownMenuItem
//                                                     onClick={() => handleDeleteClick(order)}
//                                                     className="text-red-500"
//                                                 >
//                                                     <Trash2 className="w-4 h-4 mr-2" />
//                                                     Delete
//                                                 </DropdownMenuItem>
//                                             </DropdownMenuContent>
//                                         </DropdownMenu>
//                                     </TableCell>

//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </Card>

//             {/* dialogs */}
//             <PurchaseOrderFormDialog
//                 open={formOpen}
//                 onOpenChange={setFormOpen}
//                 onSave={handleSave}
//                 editingOrder={editingOrder}
//             />

//             <PurchaseOrderDetailDialog
//                 open={detailOpen}
//                 onOpenChange={setDetailOpen}
//                 purchaseOrder={selectedOrder}
//             />

//             <DeleteConfirmDialog
//                 open={deleteOpen}
//                 onOpenChange={setDeleteOpen}
//                 onConfirm={handleDeleteConfirm}
//                 title="Delete"
//                 description="Are you sure?"
//             />
//         </div>
//     )
// }



"use client"

import { useState } from "react"
import { toast } from "sonner"

import { useDataTable } from "@/hooks/useDataTable"
import {
    useGetPurchaseOrders,
    useCreatePurchaseOrder,
    useUpdatePurchaseOrder,
    useDeletePurchaseOrder,
    useGetProducts,
    useGetSuppliers,
    useGetCategories
} from "@/app/features/hooks"

import { AppPagination } from "@/components/AppPagination"
import { PurchaseOrder } from "@/modules/purchase/purchase.type"
import { PurchaseOrderFormDialog } from "@/components/purchase/PurchaseOrderFormDialog"
import { PurchaseOrderTable } from "@/components/purchase/PurchaseTable"
import { PurchaseOrderToolbar } from "@/components/purchase/PurchaseOrderToolbar"
import { PurchaseDetail } from "@/components/purchase/PurchaseDetail"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function PurchaseOrderPage() {
    const table = useDataTable()

    const { data, isLoading } = useGetPurchaseOrders(table.params)
    const createPurchase = useCreatePurchaseOrder()
    const updatePurchase = useUpdatePurchaseOrder()
    const deletePurchase = useDeletePurchaseOrder()

    const { data: products } = useGetProducts()
    const product = products?.data
    const { data: suppliers } = useGetSuppliers()
    const supplier = suppliers?.data
    const { data: categories } = useGetCategories()
    const category = categories?.data

    const [openForm, setOpenForm] = useState(false)
    const [selectedPurchase, setSelectedPurchase] = useState<PurchaseOrder | undefined>()
    const [openDetail, setOpenDetail] = useState(false)

    /* -------------------- handlers -------------------- */

    const handleEdit = (purchase: PurchaseOrder) => {
        setSelectedPurchase(purchase)
        setOpenForm(true)
    }

    const handleDelete = (id: string) => {
        if (!confirm("Delete purchase?")) return

        deletePurchase.mutate(id, {
            onSuccess: () => toast.success("Deleted successfully"),
            onError: () => toast.error("Delete failed")
        })
    }

    const handleView = (purchase: PurchaseOrder) => {
        setSelectedPurchase(purchase)
        setOpenDetail(true)
    }
    // const products?.data 
    // console.log("products",products?.data)

    /* -------------------- UI -------------------- */

    return (
        <div className="space-y-4">

            <PurchaseOrderToolbar
                table={table}
                onAdd={() => {
                    setSelectedPurchase(undefined)
                    setOpenForm(true)
                }}
            />

            <PurchaseOrderTable
                purchases={data?.data ?? []}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <AppPagination
                page={table.page}
                totalPages={data?.meta?.totalPages ?? 1}
                onPageChange={table.setPage}
            />

            <PurchaseOrderFormDialog
                open={openForm}
                onOpenChange={setOpenForm}
                purchaseOrder={selectedPurchase}
                create={createPurchase}
                update={updatePurchase}
                products={product ?? []}
                suppliers={supplier ?? []}
                categories={category ?? []}
            />
            <Dialog open={openDetail} onOpenChange={setOpenDetail}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Purchase Detail</DialogTitle>
                    </DialogHeader>
                    <PurchaseDetail purchase={selectedPurchase} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
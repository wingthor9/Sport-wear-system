"use client"
import { useCreateProduct, useDeleteProduct, useGetCategories, useGetProducts, useUpdateProduct } from "@/app/features/hooks"
import { AppPagination } from "@/components/AppPagination"
import { ProductToolbar } from "@/components/products/ProductToolbar"
import { ProductFormDialog } from "@/components/products/ProductFormDialog"
import { ProductTable } from "@/components/products/ProductTable"
import { useDataTable } from "@/hooks/useDataTable"
import { useState } from "react"
import { toast } from "sonner"
import { Product } from "@/modules/product/product.types"

export default function ProductsPage() {
    const table = useDataTable()

    const { data, isLoading } = useGetProducts(table.params)
    const { data: categories } = useGetCategories()

    const createProduct = useCreateProduct()
    const updateProduct = useUpdateProduct()
    const deleteProduct = useDeleteProduct()

    const [openForm, setOpenForm] = useState< boolean >(false)
    const [selectedProduct, setSelectedProduct] = useState< Product | undefined >()


    const handleEdit = (product: Product) => {
        setSelectedProduct(product)
        setOpenForm(true)
    }
    const handleDelete = (id: string) => {
        deleteProduct.mutate(id, {
            onSuccess: () => {
                toast.success("Product deleted")
            },
            onError: () => {
                toast.error("Delete failed")
            }
        })
    }

    return (
        <div className="space-y-4">

            <ProductToolbar
                table={table}
                onAdd={() => setOpenForm(true)}
            />

            <ProductTable
                products={data?.data ?? []}
                isLoading={isLoading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AppPagination
                page={table.page}
                totalPages={data?.meta.totalPages ?? 1}
                onPageChange={table.setPage}
            />

            <ProductFormDialog
                open={openForm}
                onOpenChange={setOpenForm}
                product={selectedProduct}
                create={createProduct}
                update={updateProduct}
                categories={categories ?? []}
            />

        </div>
    )
}
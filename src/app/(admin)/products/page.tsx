

"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useCreateProduct, useDeleteProduct, useGetCategories, useGetProducts, useUpdateProduct } from "@/app/features/hooks"
import Image from "next/image"
import ImageUpload from "@/components/ImageUpload"
import { Product } from "@/modules/product/product.types"
import { Category } from "@/modules/category/category.type"

export default function ProductsPage() {
    const { data = [] } = useGetProducts()
    const { data: categories = [], isLoading, error } = useGetCategories()
    const create = useCreateProduct()
    const update = useUpdateProduct()
    const del = useDeleteProduct()

    const [searchQuery, setSearchQuery] = useState("")
    const [showDialog, setShowDialog] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [imagePreview, setImagePreview] = useState<string[]>([])
    const [images, setImages] = useState<File[]>([])


    // 🔥 form state (ยังใช้แบบเดิมเพื่อไม่เปลี่ยน UI)
    const [formData, setFormData] = useState({
        product_name: "",
        price: "",
        stock_qty: "",
        category_id: "",
        description: "",
        image: [] as File[],
    })

    // ✅ fetch
    useEffect(() => {
        // React Query fetch อัตโนมัติอยู่แล้ว แต่กันพลาด
    }, [])
    console.log("product : ", data)

    // ✅ filter
    const filteredProducts = useMemo(() => {
        return data.filter((p: Product) =>
            p.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [data, searchQuery])

    // ✅ handlers
    const handleAdd = () => {
        setEditingProduct(null)
        setFormData({
            product_name: "",
            price: "",
            stock_qty: "",
            category_id: "",
            description: "",
            image: [] as File[],
        })
        setShowDialog(true)
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setFormData({
            product_name: product.product_name,
            price: String(product.price),
            stock_qty: String(product.stock_qty),
            category_id: product.category_id,
            description: product.description || "",
            image: [] as File[],
        })
        setImagePreview(product.images.map((img) => img.image_url))
        setShowDialog(true)
    }

    const handleDelete = async (id: string) => {
        try {
            await del.mutateAsync(id)
            toast.success("Product deleted")
        } catch {
            toast.error("Delete failed")
        }
    }

    const toFormData = () => {
        const fd = new FormData()

        fd.append("name", formData.product_name)
        fd.append("price", formData.price)
        fd.append("stock", formData.stock_qty)
        fd.append("categoryId", formData.category_id)

        if (formData.description) {
            fd.append("description", formData.description)
        }

        // formData.image.forEach((file) => {
        //     fd.append("images", file)
        // })
        images.forEach((file) => {
            fd.append("images", file)
        })

        return fd
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const fd = toFormData()   // ใช้ FormData

            if (editingProduct) {
                await update.mutateAsync({
                    id: editingProduct.product_id,
                    data: fd,
                })

                toast.success("Updated")
            } else {
                await create.mutateAsync(fd)
                toast.success("Created")
            }

            setShowDialog(false)

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className="p-8">
            {/* header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="mb-2">Products</h1>
                    <p className="text-muted-foreground">
                        Manage your product inventory
                    </p>
                </div>

                <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={handleAdd}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {/* search */}
            <Card className="p-6 mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-10 bg-gray-100 border-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </Card>

            {/* table */}
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <tbody>
                            {filteredProducts.map((product: Product) => (
                                <tr key={product.product_id}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            {/* <Image
                                                src={product.images?.[0]?.image_url || ""}
                                                alt={product.product_name}
                                                width={48}
                                                height={48}
                                                className="w-12 h-12 object-cover"
                                            /> */}

                                            {product.images?.[0]?.image_url ? (
                                                <Image
                                                    src={product.images[0].image_url}
                                                    alt={product.product_name}
                                                    width={48}
                                                    height={48}
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded">No Image</div>
                                            )}
                                            <p>{product.product_name}</p>
                                        </div>
                                    </td>

                                    <td className="p-4">${product.price}</td>

                                    <td className="p-4">
                                        <Badge>{product.stock_qty}</Badge>
                                    </td>

                                    <td className="p-4 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                                handleDelete(product.product_id)
                                            }
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProduct ? "Edit Product" : "Add Product"}
                        </DialogTitle>
                        <DialogDescription>
                            Manage product
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <Input
                            placeholder="Product Name"
                            value={formData.product_name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    product_name: e.target.value,
                                })
                            }
                        />

                        <Input
                            type="number"
                            placeholder="Price"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    price: e.target.value,
                                })
                            }
                        />

                        <Input
                            type="number"
                            placeholder="Stock"
                            value={formData.stock_qty}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    stock_qty: e.target.value,
                                })
                            }
                        />

                        <Select
                            value={formData.category_id}
                            onValueChange={(v) =>
                                setFormData({
                                    ...formData,
                                    category_id: v,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((c: Category) => (
                                    <SelectItem
                                        key={c.category_id}
                                        value={c.category_id}
                                    >
                                        {c.category_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* <div className="space-y-2">
                            <label className="text-sm">Product Image</label>
                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    const files = Array.from(e.target.files || [])

                                    setFormData({
                                        ...formData,
                                        image: files,
                                    })

                                    const previews = files.map((file) => URL.createObjectURL(file))
                                    setImagePreview(previews)
                                }}
                            />
                            <div className="flex gap-2 flex-wrap">
                                {imagePreview.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 object-cover rounded"
                                        alt="preview"
                                    />
                                ))}
                            </div>
                        </div> */}

                        <ImageUpload files={images} setFiles={setImages} max={5} />


                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                onClick={() => setShowDialog(false)}
                            >
                                Cancel
                            </Button>

                            <Button type="submit">
                                {editingProduct ? "Update" : "Create"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
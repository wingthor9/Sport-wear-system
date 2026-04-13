import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import Image from "next/image"

export function ProductDialog({
    open,
    onOpenChange,
    product,
    onSave
}: any) {

    const [previewImages, setPreviewImages] = useState<string[]>([])

    if (!open) return null

    const handleImageChange = (e: any) => {

        const files = Array.from(e.target.files)

        const previews = files.map((file: any) =>
            URL.createObjectURL(file)
        )

        setPreviewImages(previews)

    }

    const handleSubmit = (e: any) => {

        e.preventDefault()

        const form = e.target

        const data = {

            name: form.name.value,
            price: form.price.value,
            stock: form.stock.value,
            description: form.description.value,
            categoryId: form.categoryId.value,
            images: form.images.files

        }

        onSave(data)

        onOpenChange(false)

    }

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <Card className="p-6 w-[420px]">

                <h2 className="text-lg font-bold mb-4">

                    {product ? "Edit Product" : "Create Product"}

                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">

                    <Input
                        name="name"
                        placeholder="Product name"
                        defaultValue={product?.product_name}
                    />

                    <Input
                        name="price"
                        type="number"
                        placeholder="Price"
                        defaultValue={product?.price}
                    />

                    <Input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        defaultValue={product?.stock_qty}
                    />

                    <Input
                        name="categoryId"
                        placeholder="Category ID"
                        defaultValue={product?.category_id}
                    />

                    <Input
                        name="description"
                        placeholder="Description"
                        defaultValue={product?.description}
                    />

                    <Input
                        type="file"
                        name="images"
                        multiple
                        onChange={handleImageChange}
                    />

                    <div className="flex gap-2 flex-wrap">

                        {previewImages.map((img, i) => (

                            <Image
                                key={i}
                                src={img}
                                className="h-16 w-16 object-cover rounded border"
                                alt=""
                                width={96}
                                height={96}
                            />

                        ))}

                    </div>

                    <div className="flex justify-end gap-2 pt-3">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button type="submit">

                            Save

                        </Button>

                    </div>

                </form>

            </Card>

        </div>

    )

}
// "use client"

// import { useEffect, useState } from "react"
// import { Controller, useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import ImageUpload from "../ImageUpload"
// import { toast } from "sonner"
// import { Product } from "@/modules/product/product.types"
// import { Category } from "@/modules/category/category.type"
// import { UseMutationResult } from "@tanstack/react-query"
// import { Textarea } from "../ui/textarea"
// import { ProductFormValues, productSchema } from "@/schemas/schema"
// import { NumericFormat } from "react-number-format"


// /* ----------------------------- Props ----------------------------- */

// type ProductFormDialogProps = {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   product?: Product
//   create: UseMutationResult<Product, Error, FormData>
//   update: UseMutationResult<Product, Error, { id: string; data: FormData }>
//   categories: Category[]
// }

// /* ----------------------------- Component ----------------------------- */

// export function ProductFormDialog({ open, onOpenChange, product, create, update, categories }: ProductFormDialogProps) {
//   const [files, setFiles] = useState<File[]>([])
//   const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ProductFormValues>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       product_name: "",
//       purchase_price: 0,
//       sale_price: 0,
//       stock_qty: 0,
//       category_id: "",
//       description: ""
//     }
//   })

//   /* ----------------------------- Reset ----------------------------- */

//   useEffect(() => {
//     if (!open) return
//     if (product) {
//       // reset({
//       //   product_name: product.product_name,
//       //   purchase_price: String(product.purchase_price),
//       //   sale_price: String(product.sale_price),
//       //   stock_qty: String(product.stock_qty),
//       //   category_id: product.category_id,
//       //   description: product.description || ""
//       // })
//       reset({
//         product_name: product.product_name,
//         purchase_price: product.purchase_price,
//         sale_price: product.sale_price,
//         stock_qty: product.stock_qty,
//         category_id: product.category_id,
//         description: product.description || ""
//       })
//       // setFiles(product.images)
//     }
//   }, [open, product, reset])

//   /* ----------------------------- FormData ----------------------------- */

//   const toFormData = (values: ProductFormValues) => {
//     const fd = new FormData()
//     fd.append("product_name", values.product_name)
//     // fd.append("purchase_price", values.purchase_price)
//     // fd.append("sale_price", values.sale_price)
//     // fd.append("stock_qty", values.stock_qty)
//     fd.append("purchase_price", String(values.purchase_price));
//     fd.append("sale_price", String(values.sale_price));
//     fd.append("stock_qty", String(values.stock_qty));
//     fd.append("category_id", values.category_id)

//     if (values.description) {
//       fd.append("description", values.description)
//     }

//     files.forEach((file) => {
//       fd.append("images", file)
//     })

//     return fd
//   }

//   /* ----------------------------- Submit ----------------------------- */

//   const onSubmit = async (values: ProductFormValues) => {
//     try {
//       const fd = toFormData(values)
//       if (product) {
//         await update.mutateAsync({
//           id: product.product_id,
//           data: fd
//         })
//         toast.success("Product updated")
//       } else {
//         // console.log("create product : ",fd)
//         await create.mutateAsync(fd)
//         toast.success("Product created")
//       }
//       onOpenChange(false)
//       reset()
//       setFiles([])

//     } catch (error) {
//       console.error(error)
//       toast.error("Something went wrong")
//     }
//   }

//   /* ----------------------------- UI ----------------------------- */

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle>
//             {product ? "Edit Product" : "Add Product"}
//           </DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <Input {...register("product_name")} placeholder="Product name" />
//             <div className="h-6 text-red-500">{errors.product_name?.message}</div>
//           </div>
//           <div>
//             <select {...register("category_id")}>
//               <option value="">Select category</option>
//               {categories.map((c) => (
//                 <option key={c.category_id} value={c.category_id}>
//                   {c.category_name}
//                 </option>
//               ))}
//             </select>
//             <div className="h-6 text-red-500">{errors.category_id?.message}</div>
//           </div>

//           <div>
//             <Controller
//               name="purchase_price"
//               control={control}
//               render={({ field }) => (
//                 <NumericFormat
//                   value={field.value === 0 ? "" : field.value} // ✅ ตรงนี้สำคัญ
//                   customInput={Input}
//                   placeholder="Price"
//                   thousandSeparator=","
//                   allowNegative={false}
//                   decimalScale={0}
//                   onValueChange={(values) => {
//                     field.onChange(values.value === "" ? 0 : Number(values.value));
//                   }}
//                 />
//               )}
//             />
//             <div className="h-6 text-red-500">{errors.purchase_price?.message}</div>
//           </div>
//           <div>
//             {/* <Input
//               type="number"
//               {...register("sale_price")}
//               placeholder="Price"
//             /> */}
//             <Controller
//               name="sale_price"
//               control={control}
//               render={({ field }) => (
//                 <NumericFormat
//                   value={field.value || ""}
//                   customInput={Input}
//                   placeholder="Sale Price"
//                   thousandSeparator=","
//                   allowNegative={false}
//                   decimalScale={0}
//                   onValueChange={(values) => {
//                     field.onChange(values.value === "" ? 0 : Number(values.value));
//                   }}
//                 />
//               )}
//             />
//             <div className="h-6 text-red-500">{errors.sale_price?.message}</div>
//           </div>

//           <div>
//             <Input
//               type="number"
//               {...register("stock_qty", { valueAsNumber: true })}
//               placeholder="Stock"
//             />
//             <div className="h-6 text-red-500">{errors.stock_qty?.message}</div>
//           </div>

//           <Textarea
//             {...register("description")}
//             placeholder="Description"
//           />

//           <Button
//             type="submit"
//             className="w-full"
//             disabled={create.isPending || update.isPending}
//           >
//             {product ? "Update Product" : "Create Product"}
//           </Button>
//         </form>

//         <ImageUpload files={files} setFiles={setFiles} />
//       </DialogContent>
//     </Dialog>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import ImageUpload from "../ImageUpload"

import { Product } from "@/modules/product/product.types"
import { Category } from "@/modules/category/category.type"
import { UseMutationResult } from "@tanstack/react-query"
import { Textarea } from "../ui/textarea"
import { productSchema } from "@/schemas/schema"
import { NumericFormat } from "react-number-format"
import { z } from "zod"

/* ----------------------------- TYPE SAFE ----------------------------- */

type ProductFormValues = z.infer<typeof productSchema>

/* ----------------------------- Props ----------------------------- */

type ProductFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product
  create: UseMutationResult<Product, Error, FormData>
  update: UseMutationResult<Product, Error, { id: string; data: FormData }>
  categories: Category[]
}

/* ----------------------------- Component ----------------------------- */

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  create,
  update,
  categories
}: ProductFormDialogProps) {
  const [files, setFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product_name: "",
      purchase_price: 0,
      sale_price: 0,
      stock_qty: 0,
      category_id: "",
      description: ""
    }
  })

  /* ----------------------------- RESET ----------------------------- */

  useEffect(() => {
    if (!open) return

    if (product) {
      reset({
        product_name: product.product_name,
        purchase_price: product.purchase_price,
        sale_price: product.sale_price,
        stock_qty: product.stock_qty,
        category_id: product.category_id,
        description: product.description || ""
      })
    }
  }, [open, product, reset])

  /* ----------------------------- FORM DATA ----------------------------- */

  const toFormData = (values: ProductFormValues) => {
    const fd = new FormData()

    fd.append("product_name", values.product_name)
    fd.append("purchase_price", String(values.purchase_price))
    fd.append("sale_price", String(values.sale_price))
    fd.append("stock_qty", String(values.stock_qty))
    fd.append("category_id", values.category_id)

    if (values.description) {
      fd.append("description", values.description)
    }

    files.forEach((file) => {
      fd.append("images", file)
    })

    return fd
  }

  /* ----------------------------- SUBMIT ----------------------------- */

  // const onSubmit = async (values: ProductFormValues) => {
  //   try {
  //     const fd = toFormData(values)

  //     if (product) {
  //       await update.mutateAsync({
  //         id: product.product_id,
  //         data: fd
  //       })
  //       toast.success("Product updated")
  //     } else {
  //       await create.mutateAsync(fd)
  //       toast.success("Product created")
  //     }

  //     onOpenChange(false)
  //     reset()
  //     setFiles([])
  //   } catch (error) {
  //     console.error(error)
  //     toast.error("Something went wrong")
  //   }
  // }

  const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
    try {
      const fd = toFormData(values)

      if (product) {
        await update.mutateAsync({
          id: product.product_id,
          data: fd
        })
      } else {
        await create.mutateAsync(fd)
      }

      onOpenChange(false)
      reset()
      setFiles([])
    } catch (err) {
      console.error(err)
    }
  }

  /* ----------------------------- UI ----------------------------- */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* PRODUCT NAME */}
          <div>
            <Input {...register("product_name")} placeholder="Product name" />
            <div className="h-6 text-red-500">
              {errors.product_name?.message}
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <select {...register("category_id")}>
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_id}>
                  {c.category_name}
                </option>
              ))}
            </select>
            <div className="h-6 text-red-500">
              {errors.category_id?.message}
            </div>
          </div>

          {/* PURCHASE PRICE */}
          <div>
            <Controller
              name="purchase_price"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  value={field.value === 0 ? "" : field.value}
                  customInput={Input}
                  placeholder="Purchase Price"
                  thousandSeparator=","
                  allowNegative={false}
                  decimalScale={0}
                  onValueChange={(values) => {
                    field.onChange(
                      values.value === "" ? 0 : Number(values.value)
                    )
                  }}
                />
              )}
            />
            <div className="h-6 text-red-500">
              {errors.purchase_price?.message}
            </div>
          </div>

          {/* SALE PRICE */}
          <div>
            <Controller
              name="sale_price"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  value={field.value === 0 ? "" : field.value}
                  customInput={Input}
                  placeholder="Sale Price"
                  thousandSeparator=","
                  allowNegative={false}
                  decimalScale={0}
                  onValueChange={(values) => {
                    field.onChange(
                      values.value === "" ? 0 : Number(values.value)
                    )
                  }}
                />
              )}
            />
            <div className="h-6 text-red-500">
              {errors.sale_price?.message}
            </div>
          </div>

          {/* STOCK */}
          <div>
           <Controller
              name="stock_qty"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  value={field.value === 0 ? "" : field.value}
                  customInput={Input}
                  placeholder="Stock"
                  thousandSeparator=","
                  allowNegative={false}
                  decimalScale={0}
                  onValueChange={(values) => {
                    field.onChange(
                      values.value === "" ? 0 : Number(values.value)
                    )
                  }}
                />
              )}
            />
            <div className="h-6 text-red-500">
              {errors.stock_qty?.message}
            </div>
          </div>

          {/* DESCRIPTION */}
          <Textarea {...register("description")} placeholder="Description" />

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full"
            disabled={create.isPending || update.isPending}
          >
            {product ? "Update Product" : "Create Product"}
          </Button>
        </form>

        <ImageUpload files={files} setFiles={setFiles} />
      </DialogContent>
    </Dialog>
  )
}
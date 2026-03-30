import { z } from "zod"

// auth
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    customer_name: z.string().min(2)
})


// Product
export const productSchema = z.object({
  product_name: z.string().min(1),
  price: z.coerce.number().min(0),
  stock_qty: z.coerce.number().min(0),
  description: z.string().optional(),
  category_id: z.string().min(1),
  image: z.any().optional(), // file
})

export type ProductFormValues = z.infer<typeof productSchema>
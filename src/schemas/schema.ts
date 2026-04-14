import { z } from "zod"

/* ----------------------------- Start Product Schema ----------------------------- */
export const productSchema = z.object({
  product_name: z.string().min(1, "Product name is required"),
  price: z.string().min(1, "Stock quantity is required"),
  stock_qty: z.string().min(1, "Stock quantity is required"),
  category_id: z.string().min(1, "Category is required"),
  description: z.string().optional()
})
export type ProductFormValues = z.infer<typeof productSchema>
/* ----------------------------- Start Product Schema ----------------------------- */


// Category Schema
export const categorySchema = z.object({
  category_name: z.string().min(1, "Category name is required"),
  description: z.string().optional()
})
export type CategoryInput = z.infer<typeof categorySchema>
export const categoryUpdateSchema = categorySchema.partial()
export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>







// Customer Schema
export const customerAddSchema = z.object({
  customer_name: z.string().min(1, "Customer name is required"),
  phone: z.string().min(5, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email(),
  address: z.string().optional(),
  gender: z.string().optional(),
  isActive: z.boolean().optional()
})
export type CustomerAddFormValues = z.infer<typeof customerAddSchema>

export const customerEditSchema = z.object({
  customer_name: z.string().min(1).optional(),
  phone: z.string().min(5).optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  gender: z.string().optional(),
  isActive: z.boolean().optional(),
})
export type customerEditFormValues = z.infer<typeof customerEditSchema>



// Supplier Schema
export const supplierSchema = z.object({
  supplier_name: z.string().min(1),
  phone: z.string(),
  address: z.string().optional()
})
export type SupplierInput = z.infer<typeof supplierSchema>
export const supplierUpdateSchema = supplierSchema.partial()
export type SupplierUpdateInput = z.infer<typeof supplierUpdateSchema>



// Purchase Schema
export const purchaseDetailSchema = z.object({
  product_id: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0)
})
export const purchaseSchema = z.object({
  supplier_id: z.string(),
  employee_id: z.string(),
  purchase_date: z.date().optional(),
  purchase_details: z.array(purchaseDetailSchema)
})
export type PurchaseFormValues = z.infer<typeof purchaseSchema>




// Import Schema
export const importDetailSchema = z.object({
  product_id: z.number(),
  quantity: z.number(),
  cost_price: z.number()
})
export const importSchema = z.object({
  purchase_id: z.number(),
  employee_id: z.number(),
  import_date: z.date().optional(),
  purchase_details: z.array(importDetailSchema)
})
export type ImportFormValue = z.infer<typeof importSchema>




// Order Schema
export const orderItemSchema = z.object({
  product_id: z.number(),
  quantity: z.number().min(1),
  price: z.number()
})
export const orderSchema = z.object({
  customer_id: z.number(),
  status: z.string().optional(),
  items: z.array(orderItemSchema)
})
export type OrderInput = z.infer<typeof orderSchema>




// Sale Schema
export const saleItemSchema = z.object({
  product_id: z.number(),
  quantity: z.number().min(1),
  price: z.number()
})
export const saleSchema = z.object({
  employee_id: z.number(),
  customer_id: z.number().optional(),
  items: z.array(saleItemSchema)
})
export type SaleInput = z.infer<typeof saleSchema>


// auth customer login schema
export const customerLoginAuthSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string(),
  password: z.string(),
  point: z.number().optional()

})
export type CustomerLoginInput = z.infer<typeof customerLoginAuthSchema>

// auth customer register schema
export const customerCreateSchema = z.object({
  customer_name: z.string(),
  phone: z.string(),
  password: z.string(),
  email: z.string().email(),
  gender: z.string().optional(),
  address: z.string().optional(),
})
export type CustomerCreateFormValues = z.infer<typeof customerCreateSchema>

export const customerUpdateSchema = z.object({
  customer_name: z.string(),
  phone: z.string(),
  email: z.string(),
  gender: z.string().optional(),
  address: z.string().optional(),
})
export type CustomerUpdateFormValues = z.infer<typeof customerUpdateSchema>


// auth admin login schema
export const adminAuthSchema = z.object({
  username: z.string(), password: z.string()
})
export type AdminAuthInput = z.infer<typeof adminAuthSchema>
import { Product } from "../product/product.types"

export type Category = {
  category_id: string
  category_name: string
  description?: string
  createdAt?: string
  updatedAt?: string
  products?: Product[]
}

export type CreateCategoryInput = {
  category_name: string
  description?: string
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>
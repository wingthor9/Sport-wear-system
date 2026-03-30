// auth 
export type LoginInput = {
  email: string
  password: string
}

export type RegisterInput = {
  email: string
  password: string
  customer_name: string
}

export type CurrentUser = {
  id: string
  role: "ADMIN" | "STAFF" | "CUSTOMER"
}




// Products 
export type ProductImage = {
  image_id: string
  image_url: string
  public_id: string
}

export type Product = {
  product_id: string
  product_name: string
  price: number
  stock_qty: number
  description?: string
  category_id: string
  images: ProductImage[]
}

//  category 



export type Category = {
  category_id: string
  category_name: string
  description?: string
  createdAt: string
  updatedAt: string
  products?: Product[]
}
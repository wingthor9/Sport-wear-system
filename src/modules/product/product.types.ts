

export type CreateProductInput = {
  product_name: string;
  product_code?: string;
  sale_price: number;
  stock_qty: number;
  category_id: string;
  description?: string;
  files?: File[];
  folder?: string;
};

export type UpdateProductInput = Partial<CreateProductInput>;


export type ProductImageInput = {
  image_url: string;
  public_id: string;
};


export type ProductImage = {
  image_id: string
  image_url: string
  public_id: string
}

export type Product = {
  product_id: string
  product_code?: string
  product_name: string
  sale_price: string
  stock_qty: string
  description?: string
  category_id: string
  images: ProductImage[]
}
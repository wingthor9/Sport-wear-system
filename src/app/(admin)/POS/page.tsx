// "use client"
// import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, Barcode } from "lucide-react";
// import { toast } from "sonner";
// import { mockProducts, Product } from "@/app/demo-data/mockProducts";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { useState } from "react";

// interface CartItem extends Product {
//     quantity: number;
//     selectedSize?: string;
// }

// export default function POSPage() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [cart, setCart] = useState<CartItem[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState<string>("All");

//     const categories = ["All", ...Array.from(new Set(mockProducts.map((p) => p.category)))];

//     const filteredProducts = mockProducts.filter((product) => {
//         const matchesSearch =
//             product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             product.sku.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
//         return matchesSearch && matchesCategory;
//     });

//     const addToCart = (product: Product) => {
//         const existingItem = cart.find((item) => item.id === product.id);
//         if (existingItem) {
//             setCart(
//                 cart.map((item) =>
//                     item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//                 )
//             );
//             toast.success(`Quantity updated`, {
//                 description: `${product.name} - ${existingItem.quantity + 1} in cart`,
//             });
//         } else {
//             setCart([...cart, { ...product, quantity: 1, selectedSize: product.size?.[0] }]);
//             toast.success(`Added to cart`, {
//                 description: product.name,
//             });
//         }
//     };

//     const removeFromCart = (productId: string) => {
//         setCart(cart.filter((item) => item.id !== productId));
//     };

//     const updateQuantity = (productId: string, delta: number) => {
//         setCart(
//             cart
//                 .map((item) => {
//                     if (item.id === productId) {
//                         const newQuantity = item.quantity + delta;
//                         return { ...item, quantity: Math.max(0, newQuantity) };
//                     }
//                     return item;
//                 })
//                 .filter((item) => item.quantity > 0)
//         );
//     };

//     const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const tax = subtotal * 0.08; // 8% tax
//     const total = subtotal + tax;

//     const handleCheckout = () => {
//         if (cart.length === 0) {
//             toast.error("Cart is empty");
//             return;
//         }
//         toast.success("Payment processed successfully!", {
//             description: `Total: $${total.toFixed(2)}`,
//         });
//         setCart([]);
//     };

//     return (
//         <div className="h-full bg-gray-100 flex">
//             {/* Left Panel - Products */}
//             <div className="flex-1 flex flex-col">
//                 {/* Header */}
//                 <div className="bg-white border-b border-border p-6">
//                     <div className="flex items-center justify-between mb-4">
//                         <h1>Point of Sale</h1>
//                         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                             <kbd className="px-2 py-1 bg-gray-100 rounded border border-border">F2</kbd>
//                             <span>Quick Search</span>
//                         </div>
//                     </div>

//                     {/* Search Bar */}
//                     <div className="flex gap-3 mb-4">
//                         <div className="flex-1 relative">
//                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                             <Input
//                                 placeholder="Search products or scan barcode..."
//                                 className="pl-10 h-12 bg-gray-100 border-gray-300"
//                                 value={searchQuery}
//                                 onChange={(e) => setSearchQuery(e.target.value)}
//                             />
//                         </div>
//                         <Button variant="outline" size="lg" className="px-4">
//                             <Barcode className="w-5 h-5" />
//                         </Button>
//                     </div>

//                     {/* Category Filter */}
//                     <div className="flex gap-2 flex-wrap">
//                         {categories.map((category) => (
//                             <Button
//                                 key={category}
//                                 variant={selectedCategory === category ? "default" : "outline"}
//                                 size="sm"
//                                 onClick={() => setSelectedCategory(category)}
//                                 className={
//                                     selectedCategory === category
//                                         ? "bg-primary text-primary-foreground"
//                                         : ""
//                                 }
//                             >
//                                 {category}
//                             </Button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Product Grid */}
//                 <ScrollArea className="flex-1 p-6">
//                     {filteredProducts.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-full text-center py-12">
//                             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
//                                 <Search className="w-8 h-8 text-muted-foreground" />
//                             </div>
//                             <p className="text-muted-foreground">No products found</p>
//                             <p className="text-sm text-muted-foreground mt-1">
//                                 Try adjusting your search or filters
//                             </p>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                             {filteredProducts.map((product) => {
//                                 const inCart = cart.find((item) => item.id === product.id);
//                                 return (
//                                     <Card
//                                         key={product.id}
//                                         className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border-border ${inCart ? "ring-2 ring-accent" : ""
//                                             }`}
//                                         onClick={() => addToCart(product)}
//                                     >
//                                         <div className="aspect-square overflow-hidden bg-gray-100 relative">
//                                             <img
//                                                 src={product.image}
//                                                 alt={product.name}
//                                                 className="w-full h-full object-cover"
//                                             />
//                                             {inCart && (
//                                                 <div className="absolute top-2 right-2 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs">
//                                                     {inCart.quantity}
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <div className="p-4">
//                                             <div className="flex items-start justify-between mb-2">
//                                                 <h3 className="text-sm line-clamp-2 flex-1">{product.name}</h3>
//                                             </div>
//                                             <div className="flex items-center justify-between">
//                                                 <p className="text-lg text-primary">${product.price.toFixed(2)}</p>
//                                                 <Badge
//                                                     variant={product.stock > 50 ? "default" : "secondary"}
//                                                     className={
//                                                         product.stock > 50
//                                                             ? "bg-success text-success-foreground"
//                                                             : product.stock > 20
//                                                                 ? "bg-warning text-warning-foreground"
//                                                                 : "bg-destructive text-destructive-foreground"
//                                                     }
//                                                 >
//                                                     {product.stock} in stock
//                                                 </Badge>
//                                             </div>
//                                             <p className="text-xs text-muted-foreground mt-1">SKU: {product.sku}</p>
//                                         </div>
//                                     </Card>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </ScrollArea>
//             </div>

//             {/* Right Panel - Cart */}
//             <div className="w-96 bg-white border-l border-border flex flex-col">
//                 {/* Cart Header */}
//                 <div className="p-6 border-b border-border">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
//                             <ShoppingCart className="w-5 h-5 text-accent" />
//                         </div>
//                         <div className="flex-1">
//                             <h2 className="text-lg">Current Order</h2>
//                             <p className="text-sm text-muted-foreground">{cart.length} items</p>
//                         </div>
//                         {cart.length > 0 && (
//                             <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm">
//                                 {cart.length}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Cart Items */}
//                 <ScrollArea className="flex-1 p-6">
//                     {cart.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center h-full text-center py-12">
//                             <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
//                                 <ShoppingCart className="w-8 h-8 text-muted-foreground" />
//                             </div>
//                             <p className="text-muted-foreground">Cart is empty</p>
//                             <p className="text-sm text-muted-foreground mt-1">Add products to get started</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-4">
//                             {cart.map((item) => (
//                                 <div key={item.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
//                                     <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
//                                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <h4 className="text-sm line-clamp-1 mb-1">{item.name}</h4>
//                                         <p className="text-sm text-accent mb-2">${item.price.toFixed(2)}</p>

//                                         {/* Quantity Controls */}
//                                         <div className="flex items-center gap-2">
//                                             <Button
//                                                 size="sm"
//                                                 variant="outline"
//                                                 className="h-7 w-7 p-0"
//                                                 onClick={() => updateQuantity(item.id, -1)}
//                                             >
//                                                 <Minus className="w-3 h-3" />
//                                             </Button>
//                                             <span className="text-sm w-8 text-center">{item.quantity}</span>
//                                             <Button
//                                                 size="sm"
//                                                 variant="outline"
//                                                 className="h-7 w-7 p-0"
//                                                 onClick={() => updateQuantity(item.id, 1)}
//                                             >
//                                                 <Plus className="w-3 h-3" />
//                                             </Button>
//                                             <Button
//                                                 size="sm"
//                                                 variant="ghost"
//                                                 className="h-7 w-7 p-0 ml-auto text-destructive hover:text-destructive"
//                                                 onClick={() => removeFromCart(item.id)}
//                                             >
//                                                 <Trash2 className="w-4 h-4" />
//                                             </Button>
//                                         </div>
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </ScrollArea>

//                 {/* Cart Summary & Checkout */}
//                 <div className="p-6 border-t border-border space-y-4">
//                     <div className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                             <span className="text-muted-foreground">Subtotal</span>
//                             <span>${subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                             <span className="text-muted-foreground">Tax (8%)</span>
//                             <span>${tax.toFixed(2)}</span>
//                         </div>
//                         <Separator />
//                         <div className="flex justify-between">
//                             <span>Total</span>
//                             <span className="text-xl text-accent">${total.toFixed(2)}</span>
//                         </div>
//                     </div>

//                     <Button
//                         size="lg"
//                         className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
//                         onClick={handleCheckout}
//                         disabled={cart.length === 0}
//                     >
//                         <CreditCard className="w-5 h-5 mr-2" />
//                         Checkout
//                     </Button>

//                     <Button
//                         variant="outline"
//                         size="lg"
//                         className="w-full"
//                         onClick={() => setCart([])}
//                         disabled={cart.length === 0}
//                     >
//                         Clear Cart
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { Search, Trash2, Plus, Minus, CreditCard } from "lucide-react"

import { Product } from "@/modules/product/product.types"
import { useCreateSale, useGetProducts } from "@/app/features/hooks"

type CartItem = {
  product_id: string
  name: string
  price: number
  quantity: number
  image?: string
}

type HoldOrder = {
  id: string
  items: CartItem[]
}

export default function POSPage() {
  // const qc = useQueryClient()
  const { data : products, isLoading  } = useGetProducts()
  // const product = products?.data
  const createSale = useCreateSale()

  const [cart, setCart] = useState<CartItem[]>([])
  const [search, setSearch] = useState("")
  const [barcode, setBarcode] = useState("")
  const [holds, setHolds] = useState<HoldOrder[]>([])
  const [receiptOpen, setReceiptOpen] = useState(false)
  console.log("product: ", products)

  // ---------------- FILTER ----------------
  const filtered = product.filter((p: Product) =>
    p.product_name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku?.toLowerCase().includes(search.toLowerCase())
  )

  // ---------------- CART ----------------
  const addToCart = (p: any) => {
    setCart(prev => {
      const exist = prev.find(i => i.product_id === p.product_id)

      if (exist) {
        return prev.map(i =>
          i.product_id === p.product_id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }

      return [
        ...prev,
        {
          product_id: p.product_id,
          name: p.product_name,
          price: p.price,
          quantity: 1,
          image: p.image
        }
      ]
    })
  }

  const updateQty = (id: string, d: number) => {
    setCart(prev =>
      prev
        .map(i =>
          i.product_id === id
            ? { ...i, quantity: i.quantity + d }
            : i
        )
        .filter(i => i.quantity > 0)
    )
  }

  // ---------------- BARCODE ----------------
  const handleBarcode = (code: string) => {
    const p = products.find((x: any) => x.sku === code)
    if (!p) return toast.error("Not found")

    addToCart(p)
    setBarcode("")
  }

  // ---------------- HOLD ----------------
  const holdOrder = () => {
    if (!cart.length) return

    setHolds(prev => [...prev, { id: Date.now().toString(), items: cart }])
    setCart([])
  }

  const restore = (h: HoldOrder) => {
    setCart(h.items)
    setHolds(prev => prev.filter(i => i.id !== h.id))
  }

  // ---------------- TOTAL ----------------
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  // ---------------- CHECKOUT ----------------
  const checkout = async () => {
    if (!cart.length) return

    try {
      await createSale.mutateAsync({
        sale_details: cart.map(i => ({
          product_id: i.product_id,
          quantity: i.quantity,
          price: i.price
        }))
      })

      toast.success("Success")
      setReceiptOpen(true)
      setCart([])

      qc.invalidateQueries(["products"])
    } catch {
      toast.error("Error")
    }
  }

  return (
    <div className="grid grid-cols-12 h-screen bg-gray-100">

      {/* LEFT - PRODUCTS */}
      <div className="col-span-8 flex flex-col">

        {/* HEADER */}
        <div className="p-4 bg-white border-b">
          <h1 className="text-xl font-bold">POS System</h1>

          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Search product..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <Input
              placeholder="Scan barcode..."
              value={barcode}
              onChange={e => setBarcode(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleBarcode(barcode)}
            />
          </div>
        </div>

        {/* PRODUCTS */}
        <ScrollArea className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((p: any) => (
              <Card
                key={p.product_id}
                className="p-3 cursor-pointer hover:shadow-md"
                onClick={() => addToCart(p)}
              >
                <img src={p.image} className="h-24 w-full object-cover rounded" />

                <div className="mt-2">
                  <p className="text-sm">{p.product_name}</p>
                  <p className="text-blue-500">${p.price}</p>
                </div>

                <Badge className="mt-2">{p.stock_qty} stock</Badge>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* RIGHT - CART */}
      <div className="col-span-4 bg-white border-l flex flex-col">

        <div className="p-4 border-b">
          <h2 className="font-bold">Cart ({cart.length})</h2>
        </div>

        <ScrollArea className="flex-1 p-4">
          {cart.map(i => (
            <div key={i.product_id} className="border-b py-2">
              <p className="text-sm">{i.name}</p>
              <p className="text-blue-500">${i.price}</p>

              <div className="flex gap-2 mt-2">
                <Button size="sm" onClick={() => updateQty(i.product_id, -1)}>
                  <Minus />
                </Button>

                <span>{i.quantity}</span>

                <Button size="sm" onClick={() => updateQty(i.product_id, 1)}>
                  <Plus />
                </Button>

                <Button size="sm" variant="destructive">
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>

        <Separator />

        {/* SUMMARY */}
        <div className="p-4 space-y-2">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>

          <div className="flex gap-2">
            <Button variant="outline" onClick={holdOrder}>
              Hold
            </Button>

            <Button className="flex-1" onClick={checkout}>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay
            </Button>
          </div>
        </div>

        {/* HELD ORDERS */}
        <div className="p-4 border-t">
          <p className="text-sm font-bold">Held Orders</p>

          {holds.map(h => (
            <Button
              key={h.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => restore(h)}
            >
              {h.items.length} items
            </Button>
          ))}
        </div>
      </div>

      {/* RECEIPT */}
      <Dialog open={receiptOpen} onOpenChange={setReceiptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receipt</DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            {cart.map(i => (
              <div key={i.product_id} className="flex justify-between">
                <span>{i.name}</span>
                <span>{i.price * i.quantity}</span>
              </div>
            ))}
          </div>

          <Separator />

          <p className="font-bold">Total: {total.toFixed(2)}</p>
        </DialogContent>
      </Dialog>

    </div>
  )
}
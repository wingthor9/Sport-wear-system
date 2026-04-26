// hooks/useCart.ts
import { useEffect, useState } from "react"
import { CartItem } from "./type"



export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return []
        const saved = localStorage.getItem("pos_cart")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("pos_cart", JSON.stringify(cart))
    }, [cart])

    const add = (item: CartItem) => {
        setCart(prev => {
            const exist = prev.find(i => i.product_id === item.product_id)

            if (exist) {
                return prev.map(i =>
                    i.product_id === item.product_id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            }

            return [...prev, item]
        })
    }

    const update = (id: string, delta: number) => {
        setCart(prev =>
            prev
                .map(i =>
                    i.product_id === id
                        ? { ...i, quantity: i.quantity + delta }
                        : i
                )
                .filter(i => i.quantity > 0)
        )
    }

    const remove = (id: string) => {
        setCart(prev => prev.filter(i => i.product_id !== id))
    }

    const clear = () => {
        setCart([])
        localStorage.removeItem("pos_cart")
    }

    const subtotal = cart.reduce((s, i) => {
        const price = Number(i.price) || 0
        const qty = Number(i.quantity) || 0

        return s + price * qty
    }, 0)

    const tax = subtotal * 0.08
    const total = subtotal + tax

    return {
        cart,
        add,
        update,
        remove,
        clear,
        subtotal,
        tax,
        total
    }
}
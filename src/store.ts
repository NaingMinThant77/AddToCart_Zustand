import { create } from "zustand"
import { CartItem } from "./types/CartItem"
import { toast } from "react-toastify"

type CartStore = {
    cart: CartItem[]
    addToCart: (product: Omit<CartItem, "quantity">) => void
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    clearCart: () => void
    totalPrice: () => number
    removeFromCart: (id: number) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
    addToCart: (product) => {
        set((state) => {
            const existingProduct = state.cart.find((item) => item.id === product.id)
            const updatedCart = existingProduct
                ? state.cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
                : [...state.cart, { ...product, quantity: 1 }]

            localStorage.setItem("cart", JSON.stringify(updatedCart))
            toast.success("Added to cart!")
            return { cart: updatedCart }
        })
    },
    removeFromCart: (id) => {
        set((state) => {
            const updatedCart = state.cart.filter((item) => item.id !== id)
            localStorage.setItem("cart", JSON.stringify(updatedCart))
            toast.warn("Removed from cart!")
            return { cart: updatedCart }
        })
    },
    increaseQuantity: (id) => {
        set((state) => {
            const updatedCart = state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
            localStorage.setItem("cart", JSON.stringify(updatedCart))
            return { cart: updatedCart }
        })
    },
    decreaseQuantity: (id) => {
        set((state) => {
            const updatedCart = state.cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ).filter((item) => item.quantity > 0)
            localStorage.setItem("cart", JSON.stringify(updatedCart))
            return { cart: updatedCart }
        })
    },
    clearCart: () => {
        localStorage.removeItem("cart")
        set({ cart: [] })
        toast.error("Cart cleared!")
    },
    totalPrice: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}))

import { create } from "zustand"
import { Product } from "./types/Product"

type CartStore = {
    products: Product[]
    currentPage: number
    productsPerPage: number
    totalPages: number
    fetchProducts: () => Promise<void>
    setCurrentPage: (page: number) => void
}

export const useStoreData = create<CartStore>((set, get) => ({
    products: [],
    currentPage: 1,
    productsPerPage: 12,
    totalPages: 1,

    fetchProducts: async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products")
            const data: Product[] = await response.json()
            set({
                products: data,
                totalPages: Math.ceil(data.length / get().productsPerPage),
            })
        } catch (error) {
            console.error("Failed to fetch products:", error)
        }
    },
    setCurrentPage: (page) => { set({ currentPage: page }) },
}))

import { useState } from "react"
import { useCartStore } from "../store"
import Card from "./Card"

const Cart = () => {
    const cart = useCartStore((state) => state.cart)
    const clearCart = useCartStore((state) => state.clearCart)
    const totalPrice = useCartStore((state) => state.totalPrice)

    const [cartPage, setCartPage] = useState(1)
    const itemsPerPage = 4
    const cartTotalPages = Math.ceil(cart.length / itemsPerPage)
    const cartStartIndex = (cartPage - 1) * itemsPerPage
    const cartEndIndex = cartStartIndex + itemsPerPage
    const currentCartItems = cart.slice(cartStartIndex, cartEndIndex)

    return (
        <div>
            <div className="flex justify-between items-center font-bold text-xl">
                <h2>Your Cart : {cart.length}</h2>
                <h2>Total: ${totalPrice().toFixed(2)}</h2>
            </div>
            <div className="text-right my-2">
                <button className='bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600' onClick={clearCart}>Clear All Carts</button>
            </div>
            <div className="my-3">
                {currentCartItems.length !== 0 ? <Card products={currentCartItems} startIndex={cartStartIndex} />
                    : <p className="text-red-600 my-4">No products in your cart!</p>
                }
            </div>

            {/* Cart Pagination */}
            {cart.length > itemsPerPage && (
                <div className="flex justify-center gap-2 mt-4">
                    <button disabled={cartPage === 1} onClick={() => setCartPage(cartPage - 1)}>⬅ Prev</button>
                    <span>Page {cartPage} of {cartTotalPages}</span>
                    <button disabled={cartPage === cartTotalPages} onClick={() => setCartPage(cartPage + 1)}>Next ➡</button>
                </div>
            )}
        </div>
    )
}

export default Cart

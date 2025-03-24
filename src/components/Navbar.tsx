import { FaShoppingCart } from "react-icons/fa"
import { useCartStore } from "../store"

const Navbar = () => {
    const cartCount = useCartStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0))

    return (
        <nav className="flex justify-between items-center p-4 px-10 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">My Shop</h1>
            <div className="relative">
                <FaShoppingCart size={24} />
                {cartCount > 0 ? (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{cartCount}</span>
                ) : <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">0</span>}
            </div>
        </nav>
    )
}

export default Navbar

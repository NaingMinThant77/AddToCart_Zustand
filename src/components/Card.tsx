import { useCartStore } from "../store"
import { CartItem } from "../types/CartItem";

type CardProps = {
    products: CartItem[];
    startIndex: number;
};

const Card = ({ products, startIndex }: CardProps) => {
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

    return (
        <div className='flex flex-col gap-2'>
            {products.map((product, index) => (
                <div key={product.id} className='border-1 p-2 rounded-lg relative flex justify-between'>
                    <button className="absolute text-xs -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                        onClick={() => removeFromCart(product.id)}>X</button>
                    <div className="w-40">
                        <h2 className="font-bold mr-3">{startIndex + index + 1}. {product.title.substring(0, 10)} ...</h2>
                    </div>
                    <p>${product.price.toFixed(2)}</p>
                    <div className="flex gap-2 mr-5">
                        <button className='bg-blue-500 text-xs font-bold text-white px-2 py-1 rounded-lg hover:bg-blue-600'
                            onClick={() => increaseQuantity(product.id)}> Increase </button>
                        <h2>Qty: {product.quantity}</h2>
                        <button className='bg-blue-500 text-xs font-bold text-white px-2 py-1 rounded-lg hover:bg-blue-600'
                            onClick={() => decreaseQuantity(product.id)}> Decrease </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Card;

import { useEffect } from 'react'
import { ToastContainer } from "react-toastify"
import Cart from './components/Cart'
// import { FakeData } from './data/FakeData'
import { useCartStore } from './store'
import Navbar from './components/Navbar'
import { useStoreData } from './storeData'

function App() {
  const addToCart = useCartStore((state) => state.addToCart)
  const { products, fetchProducts, currentPage, setCurrentPage, productsPerPage, totalPages } = useStoreData()

  useEffect(() => {
    fetchProducts()
  }, [])

  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct)

  return (
    <>
      <Navbar />
      <div className='w-1/2 mx-auto py-4'>
        <div >
          <h2 className='text-4xl text-center font-bold mb-6'>Products</h2>
          <div className='flex gap-2 flex-wrap items-center justify-center'>
            {products.length > 0 ? (
              currentProducts.map((data, index) => (
                <div key={data.id} className='border-1 p-2 rounded-lg w-40 h-25 relative'>
                  <h2>{data.title.substring(0, 12)} ...</h2>
                  <p>${data.price.toFixed(2)}</p>
                  <button className='bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600'
                    onClick={() => addToCart(data)}>
                    Add to Cart
                  </button>
                  <button className="absolute text-xs -top-2 -right-2 bg-black text-white px-2 py-1 rounded-lg">
                    {indexOfFirstProduct + index + 1}
                  </button>
                </div>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-4">
            <button className='px-3 py-1 bg-gray-300 rounded-md' disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}>⬅ Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button className='px-3 py-1 bg-gray-300 rounded-md' disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}>Next ➡
            </button>
          </div>
        </div>

        <div > <Cart /></div>
        <ToastContainer />
      </div>
    </>
  )
}

export default App

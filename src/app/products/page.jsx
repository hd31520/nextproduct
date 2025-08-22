// src/app/products/page.js
import Link from 'next/link'
import { connectToDatabase } from '@/lib/mongodb'

async function getProducts() {
  try {
    const { db } = await connectToDatabase()
    const products = await db
      .collection('products')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    return products.map(product => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toString() || new Date().toString(),
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Products</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-xl">No products available yet.</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Add some products from the dashboard to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{product.description}</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">${product.price}</p>
                <Link
                  href={`/products/${product._id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
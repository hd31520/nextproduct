// src/app/products/[id]/page.js
import { connectToDatabase } from '@/lib/mongodb'
import { notFound } from 'next/navigation'
import { ObjectId } from 'mongodb'

async function getProduct(id) {
  try {
    const { db } = await connectToDatabase()
    const product = await db
      .collection('products')
      .findOne({ _id: new ObjectId(id) })
    
    if (!product) return null
    
    return {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt.toString(),
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">${product.price}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Added on {new Date(product.createdAt).toLocaleDateString()}
            </span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  return {
    title: product.name,
    description: product.description,
  }
}
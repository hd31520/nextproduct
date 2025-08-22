// src/components/sections/Hero.js
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to ProductApp</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover amazing products and manage your inventory with our powerful tools.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/products"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Browse Products
          </Link>
          <Link
            href="/login"
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}
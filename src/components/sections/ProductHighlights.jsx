// src/components/sections/ProductHighlights.js
import { Package, Shield, TrendingUp } from 'lucide-react'

const features = [
  {
    name: 'Wide Selection',
    description: 'Explore thousands of products across various categories.',
    icon: Package,
  },
  {
    name: 'Secure Management',
    description: 'Manage your products with our secure and reliable platform.',
    icon: Shield,
  },
  {
    name: 'Growth Tools',
    description: 'Use our analytics tools to grow your business effectively.',
    icon: TrendingUp,
  },
]

export default function ProductHighlights() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose ProductApp?</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            We provide everything you need to manage your products effectively.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-800 rounded-md mb-4">
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-90 dark:text-white mb-2">{feature.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
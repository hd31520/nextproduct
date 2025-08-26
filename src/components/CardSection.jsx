"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CardSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0, 3))); // Show only first 3 products
  }, []);

  return (
    <section className="py-10 bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Shop</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="card bg-base-100 shadow-xl border border-gray-200"
            >
              <figure>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-lg font-semibold">${product.price}</p>
                {product.originalPrice && (
                  <p className="line-through text-gray-400">${product.originalPrice}</p>
                )}
                <div className="card-actions justify-end">
                  <Link href={`/products/${product.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Products button */}
        <div className="text-center mt-8">
          <Link href="/products" className="btn btn-outline btn-primary">
            Show All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
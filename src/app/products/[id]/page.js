"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetails() {
  const params = useParams();
  const productId = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stockQuantity || 1)) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < (product?.stockQuantity || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }
  console.log(product)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link href="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-10">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumb mb-6">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>{product.name}</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.images ? product.images[selectedImage] : product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded border-2 ${
                      selectedImage === index ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="badge badge-primary">{product.brand}</span>
              <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="rating rating-sm">
                {[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked={i < Math.floor(product.rating)}
                    readOnly
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.rating}) • {product.reviews} reviews
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <div className="badge badge-success">In Stock</div>
                  <span className="text-sm text-gray-600">
                    {product.stockQuantity} available
                  </span>
                </>
              ) : (
                <div className="badge badge-error">Out of Stock</div>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h3 className="font-semibold mb-2">Specifications:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium capitalize">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            {product.inStock && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="join">
                    <button className="join-item btn" onClick={decrementQuantity}>
                      -
                    </button>
                    <input
                      type="number"
                      className="join-item btn input input-bordered w-16 text-center"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={product.stockQuantity}
                    />
                    <button className="join-item btn" onClick={incrementQuantity}>
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="btn btn-primary flex-1">Add to Cart</button>
                  <button className="btn btn-secondary flex-1">Buy Now</button>
                </div>
              </div>
            )}

            {/* Category */}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                Category: <span className="font-medium">{product.category}</span>
                {product.subcategory && (
                  <> • <span className="font-medium">{product.subcategory}</span></>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* You would fetch related products here based on category */}
            <div className="card bg-base-100 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-sm">More from {product.brand}</h3>
                <p className="text-xs text-gray-600">
                  Explore other products in this category
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link href={`/products?category=${product.category}`} className="btn btn-sm btn-outline">
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
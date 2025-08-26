"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Filter and sort products based on search, category, and sort options
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch(sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Get unique categories
  const categories = ["all", ...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <section className="py-10 bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Shop</h2>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="flex justify-center">
            <div className="join w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered join-item w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn join-item" onClick={() => setSearchTerm("")}>
                Clear
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {/* Category Filter */}
            <select 
              className="select select-bordered select-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
            
            {/* Sort Filter */}
            <select 
              className="select select-bordered select-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Reset Filters */}
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSortBy("name");
              }}
            >
              Reset Filters
            </button>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "all" && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Show All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="card bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
                >
                  <figure className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 w-full object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 badge badge-error">
                        Out of Stock
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-2 left-2 badge badge-primary">
                        Sale
                      </div>
                    )}
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="rating rating-sm">
                        {[...Array(5)].map((_, i) => (
                          <input
                            key={i}
                            type="radio"
                            name={`rating-${product.id}`}
                            className="mask mask-star-2 bg-orange-400"
                            checked={i < Math.floor(product.rating)}
                            readOnly
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.rating})
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-lg font-semibold">${product.price}</p>
                      {product.originalPrice && (
                        <p className="line-through text-gray-400 text-sm">
                          ${product.originalPrice}
                        </p>
                      )}
                    </div>
                    
                    <div className="card-actions justify-end mt-4">
                      <Link 
                        href={`/products/${product.id}`} 
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                      {product.inStock && (
                        <button className="btn btn-secondary btn-sm">
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Navigation */}
            <div className="text-center mt-8">
              <div className="join">
                <button className="join-item btn">«</button>
                <button className="join-item btn">Page 1</button>
                <button className="join-item btn">»</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
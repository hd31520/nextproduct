"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, PackagePlus, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const [active, setActive] = useState("overview");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  // 🔒 Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // redirect to home if not logged in
    }
  }, [user, loading, router]);

  // fetch products & users
  useEffect(() => {
    if (active === "overview" || active === "users") {
      fetch("/api/products").then(res => res.json()).then(setProducts);
      fetch("/api/users").then(res => res.json()).then(setUsers);
    }
  }, [active]);

  // handle add product
  async function handleAddProduct(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const product = Object.fromEntries(form.entries());

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Product added ✅");
      e.target.reset();
      setActive("overview"); // redirect to overview
    }
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">Dashboard</div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            ["overview", "Overview", <LayoutDashboard key="d" className="w-5 h-5 mr-3" />],
            ["add-product", "Add Product", <PackagePlus key="p" className="w-5 h-5 mr-3" />],
            ["users", "Users", <User key="u" className="w-5 h-5 mr-3" />],
            ["settings", "Settings", <Settings key="s" className="w-5 h-5 mr-3" />],
          ].map(([key, label, icon]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`flex items-center w-full px-4 py-2 rounded-xl ${
                active === key ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 rounded-xl hover:bg-gray-200"
          >
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 capitalize">{active}</h1>

        {active === "overview" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p._id} className="p-4 bg-white rounded-xl shadow">
                  <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded" />
                  <h3 className="font-semibold mt-2">{p.name}</h3>
                  <p>${p.price}</p>
                  <p className="text-sm text-gray-500">{p.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "add-product" && (
          <form onSubmit={handleAddProduct} className="p-6 bg-white rounded-2xl shadow max-w-lg space-y-4">
            <input name="name" placeholder="Product Name" className="w-full p-3 border rounded-xl" required />
            <input name="price" type="number" step="0.01" placeholder="Price" className="w-full p-3 border rounded-xl" required />
            <input name="originalPrice" type="number" step="0.01" placeholder="Original Price" className="w-full p-3 border rounded-xl" />
            <input name="image" type="url" placeholder="Image URL" className="w-full p-3 border rounded-xl" required />
            <input name="category" placeholder="Category" className="w-full p-3 border rounded-xl" />
            <input name="subcategory" placeholder="Subcategory" className="w-full p-3 border rounded-xl" />
            <input name="brand" placeholder="Brand" className="w-full p-3 border rounded-xl" />
            <textarea name="description" placeholder="Description" className="w-full p-3 border rounded-xl"></textarea>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600">
              Add Product
            </button>
          </form>
        )}

        {active === "users" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <ul className="space-y-2">
              {users.map(u => (
                <li key={u._id} className="p-4 bg-white rounded-xl shadow flex justify-between">
                  <span>{u.name} ({u.email})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "settings" && (
          <div className="p-6 bg-white rounded-2xl shadow">
            <p>Settings content goes here...</p>
          </div>
        )}
      </main>
    </div>
  );
}

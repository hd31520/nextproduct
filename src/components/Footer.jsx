"use client";

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-xl font-bold text-primary">Shoper</h2>
          <p className="mt-3 text-sm">
            Your trusted platform for managing products and growing your business.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-primary">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li><a href="/products" className="hover:text-blue-500">Products</a></li>
            <li><a href="/dashboard" className="hover:text-blue-500">Dashboard</a></li>
            <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold text-primary">Contact Us</h3>
          <p className="mt-3 text-sm">Email: mdhridoy3240@gmail.com</p>
          <p className="text-sm">Phone: +880 1741 165673</p>
          <div className="flex gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" className="hover:text-blue-600">Facebook</a>
            <a href="https://twitter.com" target="_blank" className="hover:text-blue-400">Twitter</a>
            <a href="https://linkedin.com" target="_blank" className="hover:text-blue-700">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} Shoper. All rights reserved.
      </div>
    </footer>
  );
}

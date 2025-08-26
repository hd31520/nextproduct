"use client";

export default function About() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Image */}
        <div className="flex justify-center">
          <img
            src="https://i.ibb.co.com/GQGZKnfT/smart-tv-jpg.jpg"
            alt="About Us"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            About Our Shop
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            Welcome to our online store! We are passionate about bringing you the 
            best quality products at affordable prices. Our mission is to make 
            online shopping simple, fun, and reliable for everyone. 
          </p>
          <p className="text-lg leading-relaxed mb-6">
            With a wide range of categories and exclusive collections, we aim 
            to be your one-stop solution for all shopping needs. Your satisfaction 
            is our top priority, and we’re always here to help. 
          </p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </section>
  );
}

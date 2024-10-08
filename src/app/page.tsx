"use client";

import ProductCard from "@/components/shared/ProductCard";
import { products } from "@/lib/constants";

export default function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 md:px-8">
      <h1 className="text-center my-8 text-3xl md:text-4xl font-semibold">
        Welcome to Muta Engine Next.js Project
      </h1>

      <section>
        <ul className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 md:gap-8 lg:gap-10 my-4">
          {products?.map((product: any, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </ul>
      </section>
    </main>
  );
}

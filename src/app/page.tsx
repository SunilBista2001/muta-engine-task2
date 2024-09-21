import { getProducts } from "@/actions/product";
import ProductCard from "@/components/shared/ProductCard";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen max-w-7xl mx-auto">
      <h1 className="text-center my-8 text-3xl md:text-4xl font-semibold">
        Welcome to Muta Engine Next.js Project
      </h1>

      <section>
        <ul className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 justify-center md:gap-12 my-4">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ul>
      </section>
    </main>
  );
}

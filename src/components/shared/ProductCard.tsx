import Image from "next/image";
import DefaultProductPng from "@/assets/default-product.png";
import Link from "next/link";

function ProductCard({ product }: { product: AppOutput.ProductItem }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-60">
      <Image
        src={product?.image ?? DefaultProductPng}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-lg mb-4 hover:opacity-80 cursor-pointer hover:scale-110 transition-all"
      />
      <div className="space-y-2">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-lg font-bold">
          Price: ${Number(product.price).toFixed(2)}
        </p>
        <Link href={`/payment/${product._id}?productPrice=${product.price}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Buy Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;

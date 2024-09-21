"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");

  if (!productId) {
    redirect("/");
  }

  return (
    <>
      <div className="h-screen flex flex-col space-y-7 justify-center items-center">
        <h1 className="text-black text-4xl">
          You have successfully made a payment! 🎉
        </h1>
        <Link href="/" className="text-blue-500">
          Go back to home
        </Link>
      </div>
    </>
  );
}

"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";
import CheckoutForm from "../CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function BookEvent() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="my-4">
        <span className="text-red-600">Test:</span> Card No. 4242 4242 4242 4242
      </h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm productId={id} />
      </Elements>
    </div>
  );
}

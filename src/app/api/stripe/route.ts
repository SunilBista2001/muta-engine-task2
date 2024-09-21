import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { amount } = await req.json();

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: "USD",
      });

      return new NextResponse(paymentIntent.client_secret, { status: 200 });
    } catch (err: any) {
      console.error(err);
      return new NextResponse(err.message, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  } else {
    return new NextResponse(null, {
      status: 405,
      statusText: "Method Not Allowed",
    });
  }
}

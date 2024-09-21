"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const checkoutSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
});

const CheckoutForm = ({ productId }: { productId: string }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const amount = searchParams.get("productPrice");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    setLoading(true);
    setErrorMessage("");

    const cardElement = elements?.getElement(CardElement);

    if (!executeRecaptcha) return;

    if (!cardElement) {
      setErrorMessage("Card information not available.");
      setLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha("submit");

      // Verifying Recaptcha on backend without showing end user the challenges
      const recaptchaResponse = await axios.post(
        "/api/recaptchaVerify",
        {
          token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!recaptchaResponse.data.success) {
        setErrorMessage("ReCAPTCHA verification failed on the server.");
        setLoading(false);
        return;
      }

      const { data: clientSecret } = await axios.post("/api/stripe", {
        amount,
      });

      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: values.name,
            email: values.email,
          },
        },
      });

      setLoading(false);
      router.push(`/success?productId=${productId}`);
    } catch (error) {
      console.error("Error processing payment:", error);
      setErrorMessage("Payment failed, please try again.");
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 shadow-md w-96 p-8"
      >
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="eg. johndoe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Card Details</FormLabel>
          <CardElement className="mb-8 border p-2 shadow-sm rounded-md" />
        </FormItem>

        <Button
          variant={loading ? "destructive" : "default"}
          disabled={loading}
          type="submit"
        >
          {loading ? "Processing..." : "Pay with Stripe"}
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;

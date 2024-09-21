import type { Metadata } from "next";
import { Provider } from "@/providers/sessionProvider";
import GoogleCaptchaProvider from "@/providers/GoogleCaptchaProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muta Engine - Task 2",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <GoogleCaptchaProvider>
          <body className=" bg-gray-50 dark:bg-gray-900">{children}</body>
        </GoogleCaptchaProvider>
      </Provider>
    </html>
  );
}

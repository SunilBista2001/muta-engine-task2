import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const { token } = await req.json();

    const secretKey = process.env.RECAPTCHA_SECRET_KEY!;

    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
      );

      if (response.data) {
        return NextResponse.json({
          success: true,
          message: "ReCAPTCHA verification successful.",
          score: response.data.score,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "ReCAPTCHA verification failed.",
        });
      }
    } catch (err: any) {
      console.error(err);
      return new NextResponse(err.message, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}

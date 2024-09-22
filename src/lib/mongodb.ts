import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://btwitsbista:SlUJ2OigGR7VjgS6@next-auth.kioaw.mongodb.net/next-auth?retryWrites=true&w=majority&appName=next-auth";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI as string);

    if (conn.connection.readyState === 1) {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
};

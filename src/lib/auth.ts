import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        await connectDB();

        user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );

        if (!user) {
          throw new Error("No user found!");
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordMatch) {
          throw new Error("Invalid password!");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

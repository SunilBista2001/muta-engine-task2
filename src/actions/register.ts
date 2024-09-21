"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: SchemaInput.UserDocument) => {
  const { email, password, name } = values;

  try {
    await connectDB();
    const userFound = await User.findOne({ email });
    if (userFound) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword: null,
    });
    await user.save();

    return {
      message: "User registered successfully",
    };
  } catch (e) {
    console.error(e);
  }
};

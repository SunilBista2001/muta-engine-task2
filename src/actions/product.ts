"use server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export const getProducts = async () => {
  try {
    await connectDB();
    const products = await Product.find<AppOutput.ProductItem>();
    return products;
  } catch (e) {
    console.error(e);
  }
};

export const getProduct = async (id: string) => {
  try {
    await connectDB();
    const product = await Product.findById<AppOutput.ProductItem>(id);
    return product;
  } catch (e) {
    console.error(e);
  }
};

export const createProduct = async (values: SchemaInput.ProductDocument) => {
  try {
    await connectDB();
    const product = new Product(values);
    await product.save();
    return product;
  } catch (e) {
    console.error(e);
  }
};

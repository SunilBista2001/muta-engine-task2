import mongoose from "mongoose";

const productSchema = new mongoose.Schema<SchemaInput.ProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: String,
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model<SchemaInput.ProductDocument>("Product", productSchema);

export default Product;

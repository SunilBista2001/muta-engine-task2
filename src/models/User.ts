import mongoose from "mongoose";

const userSchema = new mongoose.Schema<SchemaInput.UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    phone: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models?.User ||
  mongoose.model<SchemaInput.UserDocument>("User", userSchema);

export default User;

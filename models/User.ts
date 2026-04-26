import mongoose, { Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, trim: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

export const UserModel =
  mongoose.models.User ?? mongoose.model("User", UserSchema);

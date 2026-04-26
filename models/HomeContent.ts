import mongoose, { Schema, type InferSchemaType } from "mongoose";

const HomeContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export type HomeContentDoc = InferSchemaType<typeof HomeContentSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const HomeContentModel =
  mongoose.models.HomeContent ?? mongoose.model("HomeContent", HomeContentSchema);

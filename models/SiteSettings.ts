import mongoose, { Schema, type InferSchemaType } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    nav: { type: Schema.Types.Mixed, required: true },
    footer: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export type SiteSettingsDoc = InferSchemaType<typeof SiteSettingsSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const SiteSettingsModel =
  mongoose.models.SiteSettings ?? mongoose.model("SiteSettings", SiteSettingsSchema);

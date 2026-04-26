import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ProjectPageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    payload: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export type ProjectPageDoc = InferSchemaType<typeof ProjectPageSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ProjectPageModel =
  mongoose.models.ProjectPage ?? mongoose.model("ProjectPage", ProjectPageSchema);

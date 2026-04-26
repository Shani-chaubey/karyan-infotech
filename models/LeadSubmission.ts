import mongoose, { Schema, type InferSchemaType } from "mongoose";

const LeadSubmissionSchema = new Schema(
  {
    source: {
      type: String,
      enum: ["enquiry_modal", "contact_page"],
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },
    project: { type: String, default: "" },
    message: { type: String, default: "" },
    /** Optional path where the user submitted (e.g. /contact). */
    pagePath: { type: String, default: "" },
  },
  { timestamps: true }
);

export type LeadSubmissionDoc = InferSchemaType<typeof LeadSubmissionSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const LeadSubmissionModel =
  mongoose.models.LeadSubmission ??
  mongoose.model("LeadSubmission", LeadSubmissionSchema);

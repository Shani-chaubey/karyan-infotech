/**
 * Seeds the home page Split contact section (gallery, social, phone, WhatsApp, buttons).
 * Requires: MONGODB_URI in environment (.env is loaded automatically).
 *
 * Run:
 *   npm run seed:home:split-contact
 */
import "dotenv/config";
import mongoose from "mongoose";
import { HomeContentModel } from "../models/HomeContent";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is missing in environment.");
  process.exit(1);
}

const SPLIT_CONTACT = {
  videoSrc: "",
  videoPoster: "",
  galleryImages: [
    {
      src: "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Karyan-CityWalk.jpg",
      alt: "Karyan CityWalk — sales gallery panorama",
    },
    {
      src: "https://karyaninfratech.co.in/wp-content/uploads/2026/04/20260409_1252_Image-Generation_remix_01knrhxdp4exssq8ndhw9y4r45.png",
      alt: "Karyan Trevana — luxury residences at NH-9",
    },
    {
      src: "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Avenue-IV.jpg",
      alt: "Karyan Avenue IV — Wave City",
    },
    {
      src: "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Karyan-Square.jpg",
      alt: "Karyan Square — NH-9 retail",
    },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/karyanstreetwalk" },
    { label: "Facebook", href: "https://www.facebook.com/karyanNh24" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/karyan-infratech" },
    { label: "YouTube", href: "https://www.youtube.com/@karyaninfratech" },
    { label: "X", href: "https://x.com/karyaninfratech" },
  ],
  phone: "+91 920 600 1002",
  phoneHref: "tel:+919206001002",
  whatsapp: "+91 920 600 1002",
  whatsappHref: "https://wa.me/919206001002",
  ctaButtons: [
    { label: "Meet our experts" },
    { label: "Call for Site Visit" },
  ],
};

async function main() {
  await mongoose.connect(uri!);
  const doc = await HomeContentModel.findOne({ key: "default" }).lean();
  const currentData =
    doc?.data && typeof doc.data === "object" ? (doc.data as Record<string, unknown>) : {};

  await HomeContentModel.findOneAndUpdate(
    { key: "default" },
    {
      $set: {
        key: "default",
        data: {
          ...currentData,
          splitCta: SPLIT_CONTACT,
        },
      },
    },
    { upsert: true }
  );

  console.log("Seeded home Split contact section.");
}

main()
  .catch((error) => {
    console.error("Failed to seed split contact:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });

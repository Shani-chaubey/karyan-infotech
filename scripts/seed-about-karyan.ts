/**
 * Generates richer About page CMS data for Karyan and writes it to MongoDB.
 * Requires: MONGODB_URI in environment (.env is loaded automatically).
 *
 * Run:
 *   npm run seed:about
 */
import "dotenv/config";
import mongoose from "mongoose";
import { SitePageModel } from "../models/SitePage";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is missing in environment.");
  process.exit(1);
}

const ABOUT_PAYLOAD = {
  headerBgImage: "",
  headerHeading: "About Us",
  headerSubheading:
    "A legacy-led development company shaping premium residences and commercial destinations in Delhi NCR.",
  storySections: [
    {
      eyebrow: "Our Foundation",
      heading: "A Legacy Built Across Generations",
      subheading: "Karyan Infratech combines business heritage with modern execution discipline.",
      imageSrc: "/images/proverview.jpg",
      imageAlt: "Karyan legacy and vision",
      paragraphs: [
        "Karyan Infratech emerges from a multi-generation entrepreneurial background known for operational rigor and long-term value creation. This foundation helps us approach real estate with responsibility, not short-term intent.",
        "By combining institutional planning with local market intelligence, we build projects that are practical to live in, viable to invest in, and resilient over time.",
      ],
      stats: [
        { num: "15+", label: "Years of collective development focus" },
        { num: "3", label: "Core verticals supporting execution depth" },
        { num: "100%", label: "Commitment to compliance-first planning" },
        { num: "24x7", label: "Customer response and sales support mindset" },
      ],
    },
    {
      eyebrow: "Our Approach",
      heading: "Planned, Transparent, Customer-Focused",
      subheading: "Every stage is structured for clarity and confidence.",
      imageSrc: "/images/trevana-main.webp",
      imageAlt: "Karyan project planning process",
      paragraphs: [
        "From land evaluation to design coordination and final delivery readiness, our process emphasizes transparency in communication and measurable checkpoints for progress.",
        "We align architecture, engineering, market positioning, and post-sales support so customers and channel partners receive consistency across the full lifecycle.",
      ],
      stats: [
        { num: "5", label: "Structured stages from concept to launch" },
        { num: "1", label: "Integrated team for design and delivery alignment" },
      ],
    },
    {
      eyebrow: "Our Promise",
      heading: "Designing Long-Term Value for Delhi NCR",
      subheading: "Premium intent backed by practical execution.",
      imageSrc: "/images/karyan-citywalk.jpg",
      imageAlt: "Karyan future-ready developments",
      paragraphs: [
        "Our portfolio strategy spans residential, retail, and mixed-use opportunities in growth corridors with strong demand visibility. We prioritize location strength, usability, and asset longevity.",
        "At Karyan Infratech, quality is not an afterthought; it is a baseline. We remain committed to building enduring communities and commercially relevant spaces for the future.",
      ],
      stats: [
        { num: "3", label: "Portfolio directions: residential, retail, commercial" },
        { num: "NCR", label: "Focused geography for deeper execution control" },
      ],
    },
  ],
  ctaTitle: "Do You Need Professionals?",
  ctaDescription: "Our team is ready to help you find your dream home or investment property.",
  ctaPrimaryLabel: "View Projects",
  ctaPrimaryHref: "/projects",
};

async function main() {
  await mongoose.connect(uri as string);
  console.log("Connected to MongoDB");

  await SitePageModel.findOneAndUpdate(
    { slug: "about" },
    {
      $set: {
        slug: "about",
        metaTitle: "About Us",
        metaDescription:
          "Learn about Karyan Infratech LLP — legacy, process discipline, and customer-focused development across Delhi NCR.",
        payload: ABOUT_PAYLOAD,
      },
    },
    { upsert: true }
  );

  console.log("Seeded About page with generated Karyan story sections.");
  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

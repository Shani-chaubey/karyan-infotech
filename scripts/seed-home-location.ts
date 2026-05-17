/**
 * Seeds the home page Location intelligence section (Growth Potential Corridors).
 * Requires: MONGODB_URI in environment (.env is loaded automatically).
 *
 * Run:
 *   npm run seed:home:location
 */
import "dotenv/config";
import mongoose from "mongoose";
import { HomeContentModel } from "../models/HomeContent";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is missing in environment.");
  process.exit(1);
}

const LOCATION_SECTION = {
  eyebrow: "Location intelligence",
  title: "Growth Potential Corridors",
  body: "NH-9 and NH-24 form one of North India’s highest-momentum growth axes — linking Delhi NCR to Ghaziabad, Noida, Meerut, and Hapur with infrastructure scale that continues to reshape real estate and manufacturing demand.",
  bulletsHtml: `<h3>NH9 / NH24 Expressway</h3>
<ul>
<li>Driving Real Estate &amp; Manufacturing Industry Growth in Ghaziabad &amp; Noida.</li>
<li>One of the busiest highways in North India.</li>
<li>Expansion to 14 lanes &amp; a dedicated high-speed lane has transformed real estate dynamics.</li>
<li>Connecting Delhi to major cities like Noida, Ghaziabad, Meerut &amp; Hapur.</li>
</ul>
<h3>Townships at NH9</h3>
<ul>
<li>Crossings Republik: One of India&rsquo;s first global townships (360 Acres).</li>
<li>Wave City: Asia&rsquo;s Largest smart city project (4,200 Acres).</li>
<li>Aditya World City: An Integrated Township (200+ Acres).</li>
<li>The Prestige City: A premium self-contained Township (62.5 Acres).</li>
</ul>
<h3>Growth &amp; Returns</h3>
<ul>
<li>The impact of NH24 / NH9: Prices Tripled over the last 5 years.</li>
<li>Affordable housing demand brought huge end-user base.</li>
<li>Rental demand driven by corporate hubs in Noida &amp; Delhi.</li>
</ul>`,
  corridorsHtml: `<p><strong>Karyan Presence at NH 9</strong></p>
<ul>
<li><span>Trevana</span> — <span>Luxury Residences at NH9</span></li>
<li><span>NH9</span> — <span>Studio Apartments &amp; Premium Retail at NH9</span></li>
<li><span>Avenue IV</span> — <span>Premium Retail Mall at Wave City, NH9</span></li>
<li><span>Square</span> — <span>Hi-Street mall at Wave City, NH9</span></li>
<li><span>CityWalk</span> — <span>Hi-Street mall at Wave City, NH9</span></li>
</ul>`,
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
          location: LOCATION_SECTION,
        },
      },
    },
    { upsert: true }
  );

  console.log("Seeded home Location intelligence section (Growth Potential Corridors).");
}

main()
  .catch((error) => {
    console.error("Failed to seed home location section:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });

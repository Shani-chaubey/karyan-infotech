/**
 * Seeds the Privacy Policy content page in MongoDB.
 * Requires: MONGODB_URI in environment (.env is loaded automatically).
 *
 * Run:
 *   npm run seed:privacy-policy
 */
import "dotenv/config";
import mongoose from "mongoose";
import { ContentPageModel } from "../models/ContentPage";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is missing in environment.");
  process.exit(1);
}

const SLUG = "privacy-policy";

const BODY = `
<h2>Introduction</h2>
<p>Karyan Infratech LLP ("Karyan", "we", "us") respects your privacy. This policy explains how we collect, use, and protect personal information when you visit our website, submit an enquiry, or interact with our sales channels.</p>

<h2>Information we collect</h2>
<ul>
<li>Contact details you provide (name, phone, email) through enquiry forms or callbacks.</li>
<li>Project preferences and messages you share with our team.</li>
<li>Technical data such as browser type, device, and approximate location from standard analytics logs.</li>
</ul>

<h2>How we use your information</h2>
<ul>
<li>To respond to enquiries and schedule site visits.</li>
<li>To share project updates, brochures, and offers you have requested.</li>
<li>To improve our website experience and comply with applicable law.</li>
</ul>

<h2>Sharing and retention</h2>
<p>We do not sell your personal data. Information may be shared with authorised partners who assist in sales, marketing, or customer support under confidentiality obligations. We retain data only as long as needed for the purposes above or as required by law.</p>

<h2>Your choices</h2>
<p>You may request access, correction, or deletion of your personal information by contacting us using the details on our Contact page. You may opt out of promotional messages at any time.</p>

<h2>Security</h2>
<p>We use reasonable administrative and technical safeguards to protect your information. No online transmission is completely secure; please share sensitive documents only through channels we provide.</p>

<h2>Updates</h2>
<p>We may update this policy from time to time. The revised version will be posted on this page with an updated effective date.</p>

<h2>Contact</h2>
<p>For privacy-related questions, reach us via the phone number or enquiry form on <a href="/contact">our Contact page</a>.</p>
`.trim();

async function main() {
  await mongoose.connect(uri!);
  const title = "Privacy Policy";
  await ContentPageModel.findOneAndUpdate(
    { slug: SLUG },
    {
      $set: {
        slug: SLUG,
        title,
        body: BODY,
        metaTitle: `${title} | Karyan Infratech`,
        metaDescription:
          "How Karyan Infratech collects, uses, and protects your personal information when you visit our website or submit an enquiry.",
      },
    },
    { upsert: true }
  );
  console.log(`Privacy Policy seeded at /${SLUG}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

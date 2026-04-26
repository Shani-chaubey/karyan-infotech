import type { ProjectPayload } from "../types";

const IMG_CW =
  "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Karyan-CityWalk.jpg";
const IMG_CW_ALT =
  "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Karyan-Square.jpg";
const IMG_SQ =
  "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Karyan-Square.jpg";
const IMG_SQ_G =
  "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Karyan-CityWalk.jpg";
const IMG_TR =
  "https://karyaninfratech.co.in/wp-content/uploads/2026/04/20260409_1252_Image-Generation_remix_01knrhxdp4exssq8ndhw9y4r45.png";
const IMG_TR_ALT =
  "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Avenue-IV.jpg";
const IMG_AV =
  "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Avenue-IV.jpg";
const IMG_AV_ALT =
  "https://karyaninfratech.co.in/wp-content/uploads/2024/11/Karyan-Square.jpg";

export const DEFAULT_PROJECT_PAGES: { slug: string; payload: ProjectPayload }[] = [
  {
    slug: "karyan-square",
    payload: {
      metadata: {
        title: "Karyan Square | Retail Shops & Office Spaces",
        description:
          "Karyan Square – Retail shops & office space at Wave City, NH-24, Ghaziabad. Competitive rates from ₹6,500/sq. ft.",
      },
      header: {
        title: "Karyan Square",
        breadcrumbs: [
          { label: "Projects", href: "/projects" },
          { label: "Karyan Square" },
        ],
        bgImage: IMG_SQ,
      },
      investmentHighlights: [
        {
          icon: "IndianRupee",
          title: "Starting Rate",
          value: "₹6,500/sq. ft.",
          description: "Competitive pricing in a high-demand location",
        },
        {
          icon: "TrendingUp",
          title: "Size Range",
          value: "180 – 454 sq. ft.",
          description: "Flexible unit sizes for businesses of all scales",
        },
        {
          icon: "MapPin",
          title: "Location",
          value: "Wave City, NH-24",
          description: "Strategic placement in Delhi NCR's fastest-growing township",
        },
      ],
      mainTitle: "A Landmark Commercial Destination",
      introParagraphs: [
        "Karyan Square, situated within the innovative Wave City along Wave City Marg, Ghaziabad, represents a modern commercial destination tailored for businesses, shoppers, and investors alike.",
        "The project offers retail spaces from 180 sq. ft. to 454 sq. ft. with competitive rates starting at approximately ₹6,500 per sq. ft. Investors can expect promising returns due to the strategic location in a high-demand area with rising foot traffic.",
        "A 2-side open plot ensures enhanced visibility, natural light, and dual-side accessibility — perfect for retail businesses aiming to maximize customer engagement.",
      ],
      benefitsTitle: "Key Benefits",
      benefits: [
        "2-side open plot for enhanced visibility",
        "Natural light and ventilation",
        "Better design flexibility",
        "Dual-side customer access",
        "Prime Wave City, NH-24 location",
        "NH-24 connectivity to Delhi & Noida",
        "Multiple lifts & escalators",
        "Ample parking facility",
        "Part of integrated smart city",
        "Retail spaces from 180 to 454 sq. ft.",
      ],
      gallery: [
        { src: IMG_SQ, alt: "Karyan Square" },
        { src: IMG_SQ_G, alt: "Karyan Square — retail context" },
      ],
      leasingBox: {
        title: "Leasing & Pricing Options",
        intro:
          "Karyan Square offers flexible leasing terms to accommodate both established businesses and new ventures:",
        bullets: [
          "Size Options: 180 sq. ft. to 454 sq. ft.",
          "Starting Rate: ₹6,500 per sq. ft.",
          "Long-term and short-term leasing available",
          "Flexible terms tailored to business needs",
          "Promising ROI with rising foot traffic",
        ],
      },
      specs: [
        { label: "Project Type", value: "Commercial – Retail & Office" },
        { label: "Plot Type", value: "2-Side Open" },
        { label: "Unit Size", value: "180 – 454 sq. ft." },
        { label: "Starting Price", value: "₹6,500/sq. ft." },
        { label: "Location", value: "Wave City, NH-24" },
        { label: "Status", value: "Ongoing" },
      ],
      sidebarFormTitle: "Enquire About Karyan Square",
      cta: {
        title: "Invest in Karyan Square Today",
        description:
          "Prime retail & office spaces at Wave City, NH-24. Starting from ₹6,500/sq. ft. with promising returns.",
        enquiryProject: "square",
      },
    },
  },
  {
    slug: "karyan-citywalk",
    payload: {
      metadata: {
        title: "Karyan CityWalk | High Street Retail Project",
        description:
          "Karyan CityWalk – High Street Retail Project with modern amenities at Delhi–Meerut Expressway. Retail units from 150 to 3000 sq. ft.",
      },
      header: {
        title: "Karyan CityWalk",
        breadcrumbs: [
          { label: "Projects", href: "/projects" },
          { label: "Karyan CityWalk" },
        ],
        bgImage: IMG_CW,
      },
      investmentHighlights: [
        {
          icon: "IndianRupee",
          title: "Flexible bands",
          value: "150 – 3,000 sq. ft.",
          description: "From kiosks to anchor formats — scalable frontages",
        },
        {
          icon: "TrendingUp",
          title: "Expressway catchment",
          value: "DME · Ghaziabad",
          description: "High visibility corridor with rising residential density",
        },
        {
          icon: "MapPin",
          title: "Location",
          value: "Delhi–Meerut E-Way",
          description: "Strategic frontage for drive-by and destination retail",
        },
      ],
      mainTitle: "The Future of High Street Retail",
      introParagraphs: [
        "Karyan CityWalk is a premier High Street Retail Project designed with modern amenities and state-of-the-art infrastructure at the Delhi–Meerut Expressway. It is strategically positioned in Ghaziabad to attract high foot traffic and serve a rapidly growing population.",
        "With retail units ranging from 150 sq. ft. to 3,000 sq. ft., Karyan CityWalk accommodates a wide variety of businesses — from small boutiques and cafés to flagship showrooms and fitness centers.",
        "The open floor layouts, wide corridors, and strategic placement of units ensures maximum visibility and customer footfall for every retailer.",
      ],
      unitTypesTitle: "Available Unit Types",
      unitTypes: [
        { size: "Small Units", area: "150 – 500 sq. ft.", ideal: "Boutiques, Cafes, Services" },
        { size: "Medium Units", area: "500 – 1500 sq. ft.", ideal: "Fashion, Electronics, F&B" },
        { size: "Large Units", area: "1500 – 3000 sq. ft.", ideal: "Anchors, Showrooms, Gyms" },
      ],
      benefitsTitle: "Key Benefits",
      benefits: [
        "Wide corridors & pedestrian-friendly pathways",
        "Ample parking space for visitors",
        "High-speed lifts & escalators",
        "24/7 security & CCTV surveillance",
        "Power backup for common areas",
        "Water harvesting systems",
        "Fire safety systems",
        "Signage & branding opportunities",
        "Modular retail unit designs",
        "Strategic location on expressway",
      ],
      gallery: [
        { src: IMG_CW, alt: "Karyan CityWalk" },
        { src: IMG_CW_ALT, alt: "Karyan CityWalk — retail context" },
      ],
      leasingBox: {
        title: "Leasing & Investment Highlights",
        intro:
          "CityWalk is structured for operators who care about loading, ceiling height, and future catchment — with a leasing desk that walks you from expression of interest to fit-out planning.",
        bullets: [
          "Frontage-led unit planning with servicing clarity for F&B and retail",
          "Structured CAM and common-area load disclosures during diligence",
          "Fit-out coordination windows aligned with shell & core handover",
          "Leasing desk support for LOI → agreement milestones",
          "Strong visibility blocks along primary pedestrian flows",
        ],
      },
      specs: [
        { label: "Project Type", value: "High Street Retail" },
        { label: "Unit Size", value: "150 – 3000 sq. ft." },
        { label: "Location", value: "Delhi–Meerut Expressway" },
        { label: "Status", value: "Ongoing" },
        { label: "Possession", value: "On Request" },
        { label: "Developer", value: "Karyan Infratech LLP" },
      ],
      sidebarFormTitle: "Enquire About CityWalk",
      cta: {
        title: "Own a Space in Karyan CityWalk",
        description:
          "High Street Retail units from 150 sq. ft. on Delhi–Meerut Expressway. Ideal for businesses of all sizes.",
        enquiryProject: "citywalk",
      },
    },
  },
  {
    slug: "karyan-trevana",
    payload: {
      metadata: {
        title: "Karyan Trevana | Premium 3 & 4 BHK Residences",
        description:
          "Karyan Trevana Residences – Premium 3 & 4 BHK at NH-24, Ghaziabad. Ground + 38 floors across 6 acres, opposite Wave City.",
      },
      header: {
        title: "Karyan Trevana",
        breadcrumbs: [
          { label: "Projects", href: "/projects" },
          { label: "Karyan Trevana" },
        ],
        bgImage: IMG_TR,
      },
      investmentHighlights: [
        {
          icon: "Home",
          title: "Configurations",
          value: "3 & 4 BHK",
          description: "Spacious plans with daylight and cross-ventilation focus",
        },
        {
          icon: "Layers",
          title: "Towers & floors",
          value: "G + 38",
          description: "Three high-rise towers across a ~6 acre campus",
        },
        {
          icon: "MapPin",
          title: "Address",
          value: "NH-24 · Ghaziabad",
          description: "Opposite Wave City with expressway-grade connectivity",
        },
      ],
      mainTitle: "Luxury Living Redefined",
      introParagraphs: [
        "Karyan Trevana Residences is a prestigious residential project located at NH-24, Ghaziabad, directly opposite to Wave City. This landmark development offers premium 3 and 4 BHK residences designed for the discerning homebuyer.",
        "Spread across approximately 6 acres, Karyan Trevana Residences will feature 3 striking high-rise towers soaring up to Ground + 38 floors, offering breathtaking views and world-class amenities.",
        "Every aspect of Karyan Trevana has been thoughtfully designed to provide residents with an unparalleled lifestyle experience. From the grand entrance lobby to the rooftop amenity deck, no detail has been overlooked.",
      ],
      benefitsTitle: "Key Benefits",
      benefits: [
        "3 BHK & 4 BHK premium residences",
        "Ground + 38 floors high-rise towers",
        "Spread across approximately 6 acres",
        "Opposite Wave City, NH-24 Ghaziabad",
        "World-class amenities & clubhouse",
        "24/7 security & surveillance",
        "Landscaped gardens & recreational zones",
        "Dedicated parking for residents",
        "RERA approved project",
        "Vastu compliant designs",
      ],
      gallery: [
        { src: IMG_TR, alt: "Karyan Trevana" },
        { src: IMG_TR_ALT, alt: "Karyan Trevana — context" },
      ],
      leasingBox: {
        title: "Plans, Pricing & Possession",
        intro:
          "Trevana is marketed with transparent construction updates and bank-friendly documentation. Our desk shares the latest inventory band, typical floor plates, and payment schedules on enquiry.",
        bullets: [
          "Clubhouse, pool deck, and indoor sports planned around resident circulation",
          "Drop-off and lobby sequences designed for security and privacy",
          "Structured payment milestones aligned to construction stages",
          "Sample flat and finishing palette reviews before final selections",
          "Dedicated relationship manager from enquiry to possession",
        ],
      },
      specs: [
        { label: "Project Type", value: "Residential" },
        { label: "Configuration", value: "3 BHK & 4 BHK" },
        { label: "Total Towers", value: "3 High-Rise Towers" },
        { label: "Floors", value: "Ground + 38 Floors" },
        { label: "Total Area", value: "~6 Acres" },
        { label: "Location", value: "NH-24, Ghaziabad" },
        { label: "Status", value: "In Progress" },
        { label: "Facing", value: "Wave City" },
      ],
      locationSidebar: {
        title: "Location",
        body: "NH-24 (Delhi–Meerut Expressway), Ghaziabad, Uttar Pradesh — Opposite Wave City",
        badges: [
          { icon: "Building2", text: "3 Towers" },
          { icon: "Maximize2", text: "6 Acres" },
        ],
      },
      sidebarFormTitle: "Register Your Interest",
      cta: {
        title: "Interested in Karyan Trevana?",
        description:
          "Schedule a free site visit and explore premium 3 & 4 BHK residences at NH-24, Ghaziabad.",
        enquiryProject: "trevana",
        primaryLabel: "Book Site Visit",
        secondaryLabel: "Call Now",
        secondaryHref: "tel:+919206001002",
      },
    },
  },
  {
    slug: "karyan-avenue-iv",
    payload: {
      metadata: {
        title: "Karyan Avenue IV | First Mall at Wave City",
        description:
          "Karyan Avenue IV – First Mall at Wave City, NH-24, Ghaziabad. 700+ shops, four-screen multiplex, fine dining by award-winning Studio Lotus.",
      },
      header: {
        title: "Karyan Avenue IV",
        breadcrumbs: [
          { label: "Projects", href: "/projects" },
          { label: "Karyan Avenue IV" },
        ],
        bgImage: IMG_AV,
      },
      investmentHighlights: [
        {
          icon: "Store",
          title: "Retail mix",
          value: "700+ shops",
          description: "Multi-level retail, dining, and entertainment in one landmark",
        },
        {
          icon: "TrendingUp",
          title: "Frontage",
          value: "575 feet",
          description: "3-side open plot for visibility and access",
        },
        {
          icon: "MapPin",
          title: "Location",
          value: "Wave City, NH-24",
          description: "14-lane Delhi–Meerut Expressway connectivity",
        },
      ],
      mainTitle: "First Mall at Wave City",
      introParagraphs: [
        "Karyan Avenue IV is a landmark development positioned as a prime investment and lifestyle opportunity in the thriving area of Wave City, Ghaziabad. This project is not just about location — it's about smart design, functionality, and convenience.",
        "Located near the 14-lane Delhi–Meerut Expressway, Avenue IV offers excellent connectivity to major urban centers. The 3-side open plot design with 575 feet frontage ensures unparalleled visibility and accessibility.",
        "Avenue IV stands out with its award-winning design by Studio Lotus, known for creating environments that balance aesthetics with functionality. With 700+ shops, a four-screen multiplex, fine dining, and multi-level parking, this is truly Wave City's first world-class mall.",
      ],
      benefitsTitle: "Key Benefits",
      benefits: [
        "700+ shops across multiple floors",
        "Four-screen multiplex entertainment",
        "Fine dining restaurants",
        "3-side open plot design",
        "575 feet frontage",
        "Multi-level parking facility",
        "Award-winning design by Studio Lotus",
        "Structural engineering by NNC Design International",
        "MEP solutions by CESPL",
        "Design-oriented atrium",
        "Contemporary facade architecture",
        "14-lane Delhi–Meerut Expressway access",
      ],
      architectsTitle: "The Design Team",
      architects: [
        {
          name: "Studio Lotus",
          role: "Architectural Design",
          description:
            "Award-winning architecture firm known for creating environments that balance aesthetics with functionality.",
        },
        {
          name: "NNC Design International",
          role: "Structural Engineering",
          description:
            "Innovative structural engineering ensuring top-notch infrastructure and long-term sustainability.",
        },
        {
          name: "CESPL",
          role: "MEP Solutions",
          description:
            "Cutting-edge mechanical, electrical, and plumbing solutions for modern efficiency.",
        },
      ],
      gallery: [
        { src: IMG_AV, alt: "Karyan Avenue IV" },
        { src: IMG_AV_ALT, alt: "Karyan Avenue IV — context" },
      ],
      leasingBox: {
        title: "Leasing & Investment Highlights",
        intro:
          "Avenue IV is positioned for brands and investors who want first-mover advantage in Wave City's retail evolution — with leasing logic that matches visibility, loading, and long-term footfall.",
        bullets: [
          "Anchor, mini-anchor, and inline retail zones with clear servicing grids",
          "F&B-ready ceiling heights and exhaust provisions on select floors",
          "Multiplex and entertainment footfall drivers integrated into the plan",
          "Structured handover phasing for fit-out and launch coordination",
          "Investment-grade documentation and leasing desk support",
        ],
      },
      specs: [
        { label: "Project Type", value: "Commercial – Mall" },
        { label: "Plot Type", value: "3-Side Open" },
        { label: "Frontage", value: "575 Feet" },
        { label: "Shops", value: "700+" },
        { label: "Location", value: "Wave City, NH-24" },
        { label: "Status", value: "In Progress" },
        { label: "Architect", value: "Studio Lotus" },
      ],
      sidebarFormTitle: "Enquire About Avenue IV",
      cta: {
        title: "Invest in Avenue IV",
        description:
          "The first mall at Wave City, NH-24. 700+ retail spaces, multiplex, dining — all in one landmark destination.",
        enquiryProject: "avenue-iv",
      },
    },
  },
];

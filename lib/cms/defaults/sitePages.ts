export const DEFAULT_SITE_PAGES = [
  {
    slug: "about",
    metaTitle: "About Us",
    metaDescription:
      "Learn about Karyan Infratech LLP — a vision born of the Karyan Group.",
    payload: {
      headerBgImage: "",
      headerHeading: "About Us",
      headerSubheading: "Learn about our vision, legacy, and commitment to quality development.",
      storySections: [
        {
          eyebrow: "Karyan Infratech LLP",
          heading: "About Karyan Infratech",
          subheading: "Built on legacy, driven by transparent execution.",
          imageSrc: "/images/proverview.jpg",
          imageAlt: "Karyan Infratech",
          paragraphs: [
            "Karyan Infratech is a new venture by the Karyan Group, a third-generation business family with multiple verticals in textiles, warehousing, and unmanned aerial vehicles (drones). With over 15 years of experience and expertise, Karyan Infratech is backed by the Karyan Group and select promoters of the Savior Group – premier real estate developers of Delhi/NCR.",
            "At Karyan Infratech, we maintain a high level of professionalism with a strong focus on customer satisfaction. We offer transparency and accountability through each stage, from acquisition to construction, completion, marketing, and sales.",
          ],
          stats: [
            { num: "15", label: "ACRE OF LAND BANK" },
            { num: "280", label: "Acre land bank, Delhi NCR" },
            { num: "23000", label: "SQ MTR OF COMMERCIAL SPACE" },
            { num: "8+", label: "PLUS PROJECTS DELIVERED" },
          ],
        },
      ],
      ctaTitle: "Do You Need Professionals?",
      ctaDescription:
        "Our team is ready to help you find your dream home or investment property.",
      ctaPrimaryLabel: "View Projects",
      ctaPrimaryHref: "/projects",
    },
  },
  {
    slug: "contact",
    metaTitle: "Contact",
    metaDescription: "Get in touch with Karyan Infratech. Schedule a free site visit.",
    payload: {
      headerBgImage: "",
      headerHeading: "Contact",
      headerSubheading: "Talk to our team for site visits, pricing details, and project guidance.",
      heroTitle: "We aim to shape your dreams into reality",
      contactHeading: "FIND US ON:",
      formHeading: "Contact Form",
      contactItems: [
        {
          icon: "Phone",
          label: "Call",
          value: "+919206001002",
          href: "tel:+919206001002",
        },
        {
          icon: "Mail",
          label: "Email",
          value: "info@karyaninfratech.co.in",
          href: "mailto:info@karyaninfratech.co.in",
        },
        {
          icon: "MapPin",
          label: "Address",
          value: "Wave City, NH-24, Ghaziabad, UP",
          href: "#",
        },
        {
          icon: "Clock",
          label: "Hours",
          value: "Mon–Sat: 10 AM – 7 PM",
          href: "#",
        },
      ],
      mapIframeSrc:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14008.762!2d77.4538!3d28.6719!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zWave+City+NH-24+Ghaziabad!5e0!3m2!1sen!2sin!4v1",
      mapTitle: "Karyan Infratech Location",
    },
  },
  {
    slug: "projects",
    metaTitle: "Our Projects",
    metaDescription:
      "Explore Karyan Infratech's premium real estate portfolio — residential, commercial, and retail projects in Delhi NCR.",
    payload: {
      headerBgImage: "",
      headerHeading: "Our Projects",
      headerSubheading: "Discover our residential, retail, and commercial developments across Delhi NCR.",
      eyebrow: "Our Portfolio",
      title: "Premium Real Estate Developments",
      subtitle:
        "From luxury residences to high-street retail and commercial complexes, our projects set benchmarks in quality and design across Delhi NCR.",
      projects: [
        {
          title: "Karyan Trevana",
          description:
            "Premium 3 & 4 BHK residences at NH-24, Ghaziabad opposite Wave City. Spread across approximately 6 acres, featuring 3 striking high-rise towers soaring up to Ground + 38 floors. A landmark residential development redefining luxury living.",
          image: "/images/trevana-main.webp",
          href: "/karyan-trevana",
          type: "Residential",
          location: "NH-24, Ghaziabad",
          status: "IN PROGRESS",
          featured: true,
          order: 1,
        },
        {
          title: "Karyan CityWalk",
          description:
            "High Street Retail Project with modern amenities & state of the art infrastructure at Delhi–Meerut Expressway. Retail units ranging from 150 sq. ft. to 3,000 sq. ft. for diverse business needs.",
          image: "/images/karyan-citywalk.jpg",
          href: "/karyan-citywalk",
          type: "Retail",
          location: "Delhi–Meerut Expressway",
          status: "ONGOING",
          featured: false,
          order: 2,
        },
        {
          title: "Karyan Avenue IV",
          description:
            "First Mall at Wave City, NH-24. Award-winning design by Studio Lotus with 700+ shops, four-screen multiplex, fine dining, and multi-level parking. A landmark commercial development.",
          image: "/images/avenue-iv.jpg",
          href: "/karyan-avenue-iv",
          type: "Commercial",
          location: "Wave City, NH-24",
          status: "IN PROGRESS",
          featured: false,
          order: 3,
        },
        {
          title: "Karyan Square",
          description:
            "Premium retail shops & office spaces at Wave City, Ghaziabad. Strategic location with excellent connectivity. Competitive rates starting at ₹6,500/sq. ft. with 2-side open plot advantage.",
          image: "/images/karyan-square.jpg",
          href: "/karyan-square",
          type: "Commercial",
          location: "Wave City, NH-24",
          status: "ONGOING",
          featured: false,
          order: 4,
        },
      ],
    },
  },
  {
    slug: "blog",
    metaTitle: "Blog | Latest News & Updates",
    metaDescription:
      "Stay updated with the latest news, insights, and updates from Karyan Infratech about real estate in Delhi NCR.",
    payload: {
      headerBgImage: "",
      headerHeading: "Blog",
      headerSubheading: "Market insights, updates, and practical real-estate perspectives from our team.",
      eyebrow: "Insights & Updates",
      title: "Real Estate News & Insights",
    },
  },
] as const;

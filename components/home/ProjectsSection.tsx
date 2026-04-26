import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Karyan Trevana",
    description:
      "Karyan Trevana Residences, address is NH-24, Ghaziabad opposite to Wave City. Offer premium 3 and 4 BHK residences. Spread across approximately 6 acres*, Karyan Trevana Residences will feature 3 striking high-rise towers* soaring up to Ground + 38 floors",
    image: "/images/trevana-hero.png",
    href: "/karyan-trevana",
  },
  {
    title: "Karyan CityWalk",
    description:
      "High Street Retail Project with modern amenities & state of the art infrastructure At Delhi-Meerut Expressway",
    image: "/images/karyan-citywalk.jpg",
    href: "/karyan-citywalk",
  },
  {
    title: "Karyan Avenue IV",
    description:
      "Karyan Avenue IV Wave City NH-24 (Delhi-Meerut Expressway) Ghaziabad First Mall At Wave City, NH-24(Delhi - Meerut Expressway) Ghaziabad",
    image: "/images/avenue-iv.jpg",
    href: "/karyan-avenue-iv",
  },
  {
    title: "Karyan Square",
    description:
      "Karyan Square Wave City NH-24 (Delhi-Meerut Expressway) Ghaziabad Retail Shops & Office Space At Wave City, NH-24(Delhi - Meerut Expressway) Ghaziabad",
    image: "/images/karyan-square.jpg",
    href: "/karyan-square",
  },
];

export default function ProjectsSection() {
  return (
    <section style={{ background: "#f5f5f5" }} className="py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section label */}
        <div className="text-center mb-10">
          <h4
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "#655E56" }}
          >
            Our Projects
          </h4>
          <div className="w-10 h-0.5 mx-auto" style={{ background: "#F7B90F" }} />
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="block group bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="font-bold text-base mb-2 group-hover:text-[#F7B90F] transition-colors"
                  style={{ color: "#292929" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-sm leading-relaxed line-clamp-3"
                  style={{ color: "#5e646a" }}
                >
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

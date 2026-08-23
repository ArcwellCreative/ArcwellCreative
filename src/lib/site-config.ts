export const siteConfig = {
  name: "Arcwell Creative",
  tagline: "Independent Creative Studio",
  description:
    "Arcwell Creative creates websites, branding, social marketing, and professional visual design for local and growing businesses.",
  url: "https://arcwellcreative.com",
};

export const navigation = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// REPLACE WITH REAL ARCWELL PHONE NUMBER WHEN AVAILABLE
export const contactInformation = {
  email: "arcwellcreative@gmail.com",
  phone: "YOUR_PHONE_HERE",
  location: "Based in the U.S. — working with local businesses everywhere.",
};

// REPLACE WITH REAL ARCWELL SOCIAL LINKS WHEN AVAILABLE
export const socialLinks: { label: string; href: string }[] = [
  // { label: "Instagram", href: "https://instagram.com/YOUR_HANDLE" },
  // { label: "LinkedIn", href: "https://linkedin.com/company/YOUR_COMPANY" },
];

export const services = [
  {
    number: "01",
    title: "Website Design",
    description:
      "Modern, responsive websites built around your business, brand, and customers.",
  },
  {
    number: "02",
    title: "Brand Mark",
    description:
      "Custom logo design and logo rebranding that gives your business a mark it can grow into.",
  },
  {
    number: "03",
    title: "Social Marketing",
    description:
      "Scroll-stopping content and ad campaigns built to grow your following and bring in customers.",
  },
  {
    number: "04",
    title: "Print & Business Materials",
    description:
      "Business cards, flyers, signage concepts, menus, and other branded collateral.",
  },
];

// REPLACE WITH REAL ARCWELL PROJECTS as the portfolio grows
export const projects = [
  {
    number: "01",
    category: "Local Service Brand",
    discipline: "Brand Identity + Website",
    kind: "browser" as const,
  },
  {
    number: "02",
    category: "Automotive",
    discipline: "Social Marketing + Digital Design",
    kind: "poster" as const,
  },
  {
    number: "03",
    category: "Restaurant / Hospitality",
    discipline: "Branding + Print",
    kind: "mark" as const,
  },
  {
    number: "04",
    category: "Modern Professional Service",
    discipline: "Website + Identity",
    kind: "grid" as const,
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn about the business, customers, goals, and current visual identity.",
  },
  {
    number: "02",
    title: "Direction",
    description:
      "We establish the visual approach, messaging, and creative direction.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "We design, refine, and build the agreed creative deliverables.",
  },
  {
    number: "04",
    title: "Deliver",
    description:
      "Final files or website assets are prepared, polished, and ready to use.",
  },
];

export const whyArcwell = [
  {
    title: "Designed Around Your Business",
    description:
      "No cookie-cutter templates. The visual direction is shaped around the company.",
  },
  {
    title: "Clear, Modern Design",
    description: "Professional design without unnecessary clutter.",
  },
  {
    title: "One Creative Partner",
    description:
      "Website, branding, social marketing, and print can all live under one visual direction.",
  },
  {
    title: "Built for Real Businesses",
    description:
      "Design decisions should support credibility, clarity, and customer perception — not simply look artistic.",
  },
];

export const serviceOptions = [
  "Website",
  "Website Redesign",
  "Logo / Branding",
  "Social Marketing",
  "Business Cards / Print",
];

// src/data/content.ts
// All portfolio text lives here. Components read from this file — edit content here only.

export const personal = {
  name: "Sawera",
  role: "Computer Science Student · Web Developer · Founder",
  taglines: [
    "CS @ Beijing Institute of Technology",
    "Freelance web developer since 2021",
    "Building PatternForge — where code meets crochet",
  ],
  location: "Beijing, China",
  email: "saweraamir25@gmail.com",
  // Phone & WeChat intentionally left off the public site — share them on request.
  resumeUrl: "/Sawera_Resume.pdf", // put the PDF in /public
    photo: "/sawera.jpg",
};

export const socials = [
  { name: "GitHub", url: "https://github.com/saweraamir", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/saweraamir", icon: "linkedin" },
  { name: "Email", url: "mailto:saweraamir25@gmail.com", icon: "mail" },
];

export const about = {
  paragraphs: [
    "I'm a Computer Science student at Beijing Institute of Technology on a fully funded Chinese Government (CSC) Scholarship. Before that I completed two semesters of CS at COMSATS University Islamabad with a 3.7 GPA.",
    "Since 2021 I've built websites for international clients through Fiverr and Upwork, from corporate sites in Singapore to fashion brands in Dubai. During COVID-19 I founded a women-led crochet business that grew to a team of 20.",
    "Right now I'm combining both worlds in PatternForge, a Python tool that generates and validates crochet patterns. I'm looking for software engineering internships.",
  ],
  stats: [
    { value: "4+", label: "Years freelancing" },
    { value: "20", label: "Women employed" },
    { value: "233", label: "Tests passing in PatternForge" },
    { value: "5", label: "Languages spoken" },
  ],
};

export const skills = {
  programming: [
    { name: "Java", icon: "java" },
    { name: "C++", icon: "cplusplus" },
    { name: "C", icon: "c" },
    { name: "Python", icon: "python" },
    { name: "PHP", icon: "php" },
    { name: "HTML", icon: "html5" },
    { name: "CSS", icon: "css3" },
  ],
  tools: [
    { name: "Git / GitHub", icon: "git" },
    { name: "VS Code", icon: "vscode" },
    { name: "IntelliJ IDEA", icon: "intellij" },
    { name: "Gradle", icon: "gradle" },
    { name: "WordPress", icon: "wordpress" },
    { name: "Elementor", icon: "elementor" },
  ],
  languages: [
    { name: "English", level: "IELTS 7.0" },
    { name: "Mandarin", level: "HSK 5" },
    { name: "Urdu", level: "Native" },
    { name: "Punjabi", level: "Fluent" },
    { name: "Arabic", level: "Basic" },
  ],
};

export type Experience = {
  title: string;
  org: string;
  location: string;
  date: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    title: "Independent Research: PatternForge",
    org: "Personal project (Python)",
    location: "Beijing",
    date: "2026 – Present",
    points: [
      "CLI tool that generates round-by-round crochet instructions from a target diameter and stitch gauge, with text and JSON output.",
      "Pattern validator with 7 rules (structure, stitch continuity, counts, dimensions, circle growth, US conventions); 233 automated tests passing.",
      "Modular architecture designed as a base for image-based stitch recognition and AI-assisted pattern generation.",
    ],
  },
  {
    title: "Freelance Web Developer",
    org: "Fiverr & Upwork",
    location: "Remote",
    date: "Aug 2021 – Present",
    points: [
      "Led end-to-end development of two corporate websites for MCS United Group Holdings (Singapore); technical consultant for domain acquisition and Microsoft business email migration.",
      "Built front-end websites for international brands, including Dubai fashion label By ALL'E, using WordPress, Elementor, custom CSS and PHP.",
    ],
  },
  {
    title: "Freelance Content & Technical Writer",
    org: "Fiverr & Upwork",
    location: "Remote",
    date: "Aug 2021 – Present",
    points: [
      "Company profiles, website copy and blogs on tech, healthcare, beauty and fashion for clients in the US, UK, UAE, France and Australia.",
    ],
  },
  {
    title: "Founder",
    org: "Women-Led Crochet Startup",
    location: "Pakistan",
    date: "2020 – Present",
    points: [
      "Founded during COVID-19 to create income for women working from home.",
      "Recruited and managed a team of 20; ran orders, quality control and delivery.",
      "Generated PKR 500,000+ in sales nationwide.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string; // put screenshots in /public/projects
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "PatternForge",
    description:
      "Generates and validates crochet patterns from a target size and gauge. 7-rule validator, 233 tests, modular design ready for AI-assisted generation.",
    tech: ["Python", "CLI", "JSON", "pytest"],
    github: "https://github.com/saweraamir", // replace with repo link
    image: "/projects/patternforge.png",
    featured: true,
  },
  {
    name: "Electronic Health Record System",
    description:
      "OOP-based EHR application with a custom UI and a secure login and user-management module with input validation.",
    tech: ["Java", "Gradle", "OOP"],
    github: "https://github.com/saweraamir", // replace with repo link
    image: "/projects/ehr.png",
  },
  {
    name: "Management System Suite",
    description:
      "Cinema, library and university management systems applying inheritance, polymorphism and encapsulation.",
    tech: ["Java", "OOP"],
    github: "https://github.com/saweraamir", // replace with repo link
    image: "/projects/management.png",
  },
  {
    name: "Ping Pong Game",
    description: "Real-time game with custom physics and rendering logic.",
    tech: ["C++", "Raylib"],
    github: "https://github.com/saweraamir", // replace with repo link
    image: "/projects/pingpong.png",
  },
  {
    name: "MCS United Group Holdings",
    description: "Two corporate websites built end to end for a Singapore-based group (client work).",
    tech: ["WordPress", "Elementor", "CSS", "PHP"],
    live: "", // add URL if you're allowed to link it
    image: "/projects/mcs.png",
  },
  {
    name: "By ALL'E",
    description: "Front-end website for a Dubai fashion label (client work).",
    tech: ["WordPress", "Elementor", "CSS"],
    live: "", // add URL if you're allowed to link it
    image: "/projects/byalle.png",
  },
];

export const education = [
  {
    school: "Beijing Institute of Technology",
    degree: "Bachelor's in Computer Science",
    date: "Sep 2026 – Jun 2030 (expected)",
    location: "Beijing",
    note: "Fully funded Chinese Government Scholarship (CSC)",
  },
  {
    school: "Capital Normal University",
    degree: "Preparatory Program in Chinese Language and Culture",
    date: "2025 – 2026",
    location: "Beijing",
    note: "Completed",
  },
  {
    school: "COMSATS University Islamabad, Lahore Campus",
    degree: "BS Computer Science (two semesters)",
    date: "2024 – 2025",
    location: "Lahore, Pakistan",
    note: "GPA 3.7/4.0 · Programming fundamentals, OOP (Java, C++)",
  },
];

export const awards = [
  "Chinese Government (CSC) Scholarship, full funding",
  "3rd place nationally, International Kangaroo Science Contest (Pakistan)",
  "Full merit-based scholarship at a top-ranked high school",
];

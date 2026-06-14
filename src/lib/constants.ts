import type { ExperienceEntry, ActivityEntry, HobbyEntry } from "@/types";

// ── Experience ────────────────────────────────────────────────────────────────
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "yc-jam-it",
    company: "Y Combinator / Jam It!",
    role: "Co-Founder",
    startDate: "Jan 2026",
    endDate: "Feb 2026",
    location: "Boston, MA (Remote)",
    description: [
      "Co-founded Jam It!, a music-tech startup, as part of Y Combinator's program.",
      "Led product development and go-to-market strategy for a social DJ platform.",
      "Collaborated with co-founder to iterate rapidly on user feedback and product vision.",
    ],
    brandColor: "#FF6600",
    logoPlaceholder: "yc-jam-it",
  },
  {
    id: "akamai",
    company: "Akamai Technologies",
    role: "Software Engineering Intern",
    startDate: "May 2025",
    endDate: "Aug 2025",
    location: "Cambridge, MA",
    description: [
      "Worked on distributed systems and edge-computing infrastructure at one of the world's largest CDN providers.",
      "Contributed to internal tooling improvements and performance optimization pipelines.",
      "Collaborated with cross-functional engineering teams in an Agile sprint environment.",
    ],
    brandColor: "#009BDE",
    logoPlaceholder: "akamai",
  },
  {
    id: "hamilton-broadcast",
    company: "Hamilton Broadcast Engineering, LLC",
    role: "Electronics & Biomedical Technician",
    startDate: "Mar 2020",
    endDate: "Aug 2025",
    location: "Des Plaines, IL",
    description: [
      "Repaired and maintained broadcast electronics, AV equipment, and biomedical devices.",
      "Diagnosed complex circuit-level failures using oscilloscopes and multimeters.",
      "Documented repair procedures and maintained parts inventory for 100+ equipment units.",
    ],
    brandColor: "#1A1A2E",
    logoPlaceholder: "hamilton-broadcast",
  },
  {
    id: "argonne",
    company: "Argonne National Laboratory",
    role: "Research Assistant",
    startDate: "Sep 2024",
    endDate: "May 2025",
    location: "Lemont, IL",
    description: [
      "Assisted researchers on cutting-edge projects at a U.S. Department of Energy national laboratory.",
      "Conducted experiments, collected data, and contributed to scientific analysis pipelines.",
      "Presented findings internally and contributed to written research documentation.",
    ],
    brandColor: "#004B87",
    logoPlaceholder: "argonne",
  },
  {
    id: "northwestern-ctd",
    company: "Northwestern University CTD",
    role: "Assistant Teacher",
    startDate: "Jul 2024",
    endDate: "Aug 2024",
    location: "Evanston, IL",
    description: [
      "Assisted lead instructors at Northwestern's Center for Talent Development summer program.",
      "Supported students in STEM coursework and facilitated hands-on project sessions.",
      "Mentored high-achieving middle and high school students in advanced subject matter.",
    ],
    brandColor: "#4E2A84",
    logoPlaceholder: "northwestern-ctd",
  },
  {
    id: "gbs",
    company: "Glenbrook South High School",
    role: "Engineering Lab Assistant & Assistant Teacher",
    startDate: "Aug 2021",
    endDate: "May 2025",
    location: "Glenview, IL",
    description: [
      "Managed and maintained engineering lab equipment and safety protocols.",
      "Assisted teachers in delivering engineering curriculum to 100+ students per semester.",
      "Mentored underclassmen on design-build-test projects and competition preparation.",
    ],
    brandColor: "#002147",
    logoPlaceholder: "glenbrook-south",
  },
  {
    id: "mit-splash",
    company: "MIT Splash",
    role: "Teacher",
    startDate: "Nov 2025",
    endDate: "Nov 2025",
    location: "Cambridge, MA",
    description: [
      "Designed and taught an original course for high school students at MIT's Splash program.",
      "Engaged with motivated students during one of the largest student-run educational events.",
    ],
    brandColor: "#A31F34",
    logoPlaceholder: "mit-splash",
  },
  {
    id: "habitat-humanity",
    company: "Habitat for Humanity",
    role: "Group Leader & Student Volunteer",
    startDate: "Jul 2024",
    endDate: "Jul 2024",
    location: "Manistique, MI",
    description: [
      "Led a group of student volunteers on a weeklong build trip in rural Michigan.",
      "Coordinated daily construction tasks including framing, roofing, and finishing work.",
      "Fostered teamwork and community engagement among diverse volunteer cohorts.",
    ],
    brandColor: "#009BDE",
    logoPlaceholder: "habitat-humanity",
  },
];

// ── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "jam-it",
    title: "Jam It!",
    monogram: "JI",
    category: "Software",
    accentColor: "#E85D20",
    year: "Jan–Feb 2026",
    shortDescription:
      "Music-tech social DJ app co-founded as part of Y Combinator. 5★ on the App Store, 53 downloads in 60 days.",
    fullDescription:
      "Co-founded and launched Jam It! on the App Store with direct funding from Y Combinator. Achieved a 5-star rating, over 1,000 views, 53 downloads, and $25 of in-app purchases within 60 days. Designed low-fidelity and high-fidelity prototypes in Figma, built game logic and song compatibility in Swift and SwiftUI, and designed the marketing website in TypeScript, Node.js, and React deployed on Vercel and Cloudflare.",
    badge: "YC Funded",
  },
  {
    id: "digital-logic-trainer",
    title: "Digital Logic Trainer",
    monogram: "DL",
    category: "Hardware",
    accentColor: "#2563EB",
    year: "2024",
    shortDescription:
      "Custom PCB teaching tool for digital logic gates, flip-flops, and combinational circuits.",
    fullDescription:
      "Designed and manufactured a custom printed circuit board intended as a hands-on educational tool for digital electronics. The board allows students to wire and test logic gates, flip-flops, multiplexers, and combinational circuits using physical jumpers and onboard LEDs. Schematic and layout designed in KiCAD and EasyEDA Pro.",
    badge: null,
  },
  {
    id: "maine-east-radio",
    title: "Maine East Radio Station",
    monogram: "ME",
    category: "Hardware",
    accentColor: "#0D9488",
    year: "2022–2023",
    shortDescription:
      "Designed and built a full broadcast radio station for Maine East High School, now serving 2,340+ listeners.",
    fullDescription:
      "Planned, designed, and implemented a complete AM/FM broadcast radio station for Maine East High School as part of work at Hamilton Broadcast Engineering. The station serves over 2,340 listeners. Work included antenna system design, transmitter configuration, studio wiring, and signal path verification using spectrum analyzers and oscilloscopes.",
    badge: null,
  },
  {
    id: "tesla-coil",
    title: "Tesla Coil",
    monogram: "TC",
    category: "Hardware",
    accentColor: "#7C3AED",
    year: "2023",
    shortDescription:
      "Hand-wound solid-state Tesla coil (SSTC) capable of producing 12-inch plasma streamers.",
    fullDescription:
      "Designed and built a solid-state Tesla coil from scratch, including primary and secondary coil winding, resonant frequency tuning, IGBT driver circuit design, and safety interlock systems. Capable of producing 12-inch continuous plasma streamers. All circuit design completed in KiCAD; mathematical resonance calculations performed by hand.",
    badge: null,
  },
  {
    id: "3d-rocket",
    title: "3D Printed Reusable Rocket",
    monogram: "RK",
    category: "Hardware",
    accentColor: "#D97706",
    year: "2024",
    shortDescription:
      "Fully 3D printed rocket with avionics bay, parachute deployment, and dual-event recovery system.",
    fullDescription:
      "Designed and 3D printed a multi-stage model rocket with an integrated avionics bay for altimeter-triggered dual-event parachute deployment. The airframe, nose cone, and fins were modeled in Autodesk Fusion 360 and printed on a Prusa MINI+. Recovery system uses a main chute and drogue chute for safe descent.",
    badge: null,
  },
  {
    id: "bluetooth-drone",
    title: "Bluetooth Drone",
    monogram: "BD",
    category: "Hardware",
    accentColor: "#6B7280",
    year: "2023",
    shortDescription:
      "Custom quadcopter with Bluetooth control, PID stabilization, and a fully 3D-printed frame.",
    fullDescription:
      "Built a custom quadcopter from scratch with a 3D-printed PLA frame, brushless motors, ESCs, and a flight controller programmed with PID stabilization loops. Control interface implemented over Bluetooth using a custom mobile app. Frame designed in Fusion 360; firmware written in C++ on Arduino.",
    badge: null,
  },
] as const;

export type Project = (typeof PROJECTS)[number];

// ── Activities ────────────────────────────────────────────────────────────────
export const ACTIVITIES: ActivityEntry[] = [
  {
    id: "mit-motorsports",
    title: "MIT Motorsports",
    role: "Member",
    startDate: "Sep 2025",
    endDate: "Present",
    description: "Member of MIT's Formula SAE team designing and building a race car from scratch.",
    highlights: ["Electrical subsystem", "Formula SAE competition"],
  },
  {
    id: "engineering-club",
    title: "Engineering Club",
    role: "Member",
    startDate: "Sep 2021",
    endDate: "May 2025",
    description: "Active member of Glenbrook South's Engineering Club, leading hands-on projects.",
    highlights: ["Project leadership", "Mentorship"],
  },
  {
    id: "vex-robotics",
    title: "VEX Robotics",
    role: "Team Captain",
    startDate: "Sep 2021",
    endDate: "May 2025",
    description: "Competed in VEX Robotics competitions, achieving 5th place at the state level.",
    highlights: ["5th in State", "Team Captain", "Robot design and programming"],
  },
  {
    id: "science-olympiad",
    title: "Science Olympiad",
    role: "Competitor",
    startDate: "Sep 2021",
    endDate: "May 2025",
    description: "Competed in Science Olympiad achieving top placements at regional and state levels.",
    highlights: ["2nd at Regionals", "9th at State"],
  },
  {
    id: "math-team",
    title: "Math Team",
    role: "Competitor",
    startDate: "Sep 2021",
    endDate: "May 2025",
    description: "Competed in high school math competitions at regional, state, and national levels.",
    highlights: ["10th at State", "8th nationally in Math Madness"],
  },
  {
    id: "glenviews-got-steam",
    title: "Glenview's Got STEAM",
    role: "Volunteer & Organizer",
    startDate: "Sep 2022",
    endDate: "May 2025",
    description:
      "Helped organize and run a community STEAM fair promoting science and engineering for kids.",
    highlights: ["Community outreach", "STEM education"],
  },
  {
    id: "private-tutor",
    title: "Private Tutor / TLC",
    role: "Tutor",
    startDate: "Sep 2021",
    endDate: "May 2025",
    description:
      "Provided private tutoring in math, science, and engineering subjects to 150+ students.",
    highlights: ["150+ students", "Math & Science", "TLC program"],
  },
  {
    id: "jv-swim",
    title: "JV Swim Team",
    role: "Swimmer",
    startDate: "Sep 2021",
    endDate: "May 2023",
    description: "Competed on the Glenbrook South JV swim team.",
    highlights: ["Freestyle", "Backstroke"],
  },
  {
    id: "polish-school",
    title: "Polish School",
    role: "Student",
    startDate: "2010",
    endDate: "2025",
    description:
      "Attended Polish language and cultural school for 15 years, maintaining fluency and heritage.",
    highlights: ["Fluent Polish", "Cultural heritage", "15 years"],
  },
];

// ── Hobbies ───────────────────────────────────────────────────────────────────
export const HOBBIES: HobbyEntry[] = [
  {
    id: "dj",
    title: "DJ",
    description:
      "Mixing and performing music on a Pioneer DDJ-FLX4 controller. Passion for house, techno, and electronic music.",
    vibe: "creative",
  },
  {
    id: "skiing",
    title: "Skiing",
    description:
      "Downhill skiing in the Midwest and beyond. Love the speed and the mountains.",
    vibe: "adventure",
  },
  {
    id: "swimming",
    title: "Swimming",
    description:
      "Competitive and recreational swimming. Former JV swimmer, now a regular at the pool.",
    vibe: "athletic",
  },
  {
    id: "working-out",
    title: "Working Out",
    description:
      "Lifting, calisthenics, and staying active. Consistency over intensity.",
    vibe: "athletic",
  },
  {
    id: "reading",
    title: "Reading",
    description:
      "Voracious reader across sci-fi, philosophy, biographies, and technical books.",
    vibe: "intellectual",
  },
  {
    id: "car-work",
    title: "Car Work",
    description:
      "DIY automotive maintenance and mods. Learning the car inside and out.",
    vibe: "mechanical",
  },
  {
    id: "family-friends",
    title: "Family & Friends",
    description:
      "Quality time with family and close friends is a top priority. Polish roots and a tight-knit community.",
    vibe: "personal",
  },
];

// ── Navigation ────────────────────────────────────────────────────────────────
export const NAV_TABS = [
  { id: "home",       label: "Home",        href: "/home" },
  { id: "experience", label: "Experience",  href: "/experience" },
  { id: "projects",   label: "Projects",    href: "/projects" },
  { id: "activities", label: "Activities",  href: "/activities" },
  { id: "hobbies",    label: "Hobbies",     href: "/hobbies" },
  { id: "about",      label: "About Me",    href: "/about" },
  { id: "contact",    label: "Contact",     href: "/contact" },
] as const;

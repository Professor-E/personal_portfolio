import type { ExperienceEntry, ActivityEntry } from "@/types";

// ── Experience ────────────────────────────────────────────────────────────────
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "akamai",
    company: "Akamai Technologies",
    role: "Software Engineering Intern",
    startDate: "May 2026",
    endDate: "Present",
    location: "Cambridge, MA (Remote)",
    summary:
      "Built a TypeScript CLI tool that streamlined SDK integration for Akamai's Bot & Abuse Protection platform across five mobile frameworks.",
    stats: [
      { value: "5", label: "platforms supported" },
      { value: "CLI", label: "SDK integration tool" },
      { value: "Multi-threaded", label: "detection engine" },
    ],
    description: [
      "Built a CLI tool in TypeScript to streamline SDK integration for Akamai's Bot & Abuse Protection platform",
      "Extended SDK compatibility across 5 platforms: iOS, Android, React Native, Flutter, and Cordova",
      "Engineered bot and malware detection with multi-threaded platform rendering and cross-platform network handling",
    ],
    brandColor: "#009BDE",
    logoPlaceholder: "akamai",
    logo: "/images/logos/akamai.svg",
  },
  {
    id: "yc-jam-it",
    company: "Jam It! (Y Combinator Funded)",
    role: "Co-Founder",
    startDate: "Jan 2026",
    endDate: "Feb 2026",
    location: "Boston, MA (Remote)",
    summary:
      "Co-founded and launched Jam It! on the App Store with direct funding from Y Combinator, owning UI/UX, backend, and the marketing site.",
    stats: [
      { value: "5\u2605", label: "App Store rating" },
      { value: "1,000+", label: "views" },
      { value: "53", label: "downloads" },
      { value: "$25", label: "in-app purchases" },
    ],
    description: [
      "Co-founded and launched \u201CJam It!\u201D on the App Store with direct funding from Y Combinator",
      "Achieved a 5-star App Store rating, over 1,000 views, 53 downloads, and $25 of in-app purchases within 60 days",
      "Designed UI/UX in Figma and built backend game logic and song compatibility in Swift",
      "Designed the marketing website in TypeScript, Node.js, and React, hosted on Vercel and Cloudflare",
    ],
    brandColor: "#FF6600",
    logoPlaceholder: "yc-jam-it",
    logo: "/images/logos/yc.svg",
  },
  {
    id: "hamilton-broadcast",
    company: "Hamilton Broadcast Engineering, LLC",
    role: "Electronics & Biomedical Technician",
    startDate: "Mar 2020",
    endDate: "Aug 2025",
    location: "Des Plaines, IL",
    summary:
      "Designed and built a full broadcast radio station for Maine East High School and contributed to a confidential AI-driven biomedical product.",
    stats: [
      { value: "2,340", label: "radio listeners" },
      { value: "20", label: "study volunteers" },
      { value: "NVIDIA AI", label: "data sampling" },
    ],
    description: [
      "Assisted in designing a confidential biomedical product, with data sampled using NVIDIA's AI from 20 volunteers",
      "Helped design and build a radio station for Maine East High School serving 2,340 listeners",
      "Designed circuit boards using KiCAD, EasyEDA Pro, MultiSIM, and Visual Studio Code",
      "Responsible for prototype development, testing, data analysis, and system debugging",
    ],
    brandColor: "#1A1A2E",
    logoPlaceholder: "hamilton-broadcast",
    logo: "/images/logos/hamilton.jpg",
  },
  {
    id: "mit-splash",
    company: "Splash at MIT",
    role: "Teacher",
    startDate: "Nov 2025",
    endDate: "Nov 2025",
    location: "Cambridge, MA",
    summary:
      "Taught 86 high school students multivariable calculus, electrical engineering, and public speaking at MIT's Splash program.",
    stats: [
      { value: "86", label: "students taught" },
      { value: "3", label: "subjects covered" },
    ],
    description: [
      "Taught 86 high school students about multivariable calculus, electrical engineering, and public speaking",
      "Covered multidimensional functions, vectors, digital electronics and circuits, and public speaking skills",
    ],
    brandColor: "#A31F34",
    logoPlaceholder: "mit-splash",
    logo: "/images/logos/mit.svg",
  },
  {
    id: "argonne",
    company: "Argonne National Laboratory",
    role: "Research Assistant",
    startDate: "Sep 2024",
    endDate: "May 2025",
    location: "Lemont, IL",
    summary:
      "Ran statistical and biomedical research on plastic-degrading microbes at a U.S. Department of Energy national laboratory.",
    stats: [
      { value: "20,000", label: "simulations analyzed" },
      { value: "Python & R", label: "analysis stack" },
    ],
    description: [
      "Conducted statistical and biomedical research on plastic-degrading microbes",
      "Used Python and R to analyze 20,000 data simulations, identifying plastic-degrading genomes",
    ],
    brandColor: "#004B87",
    logoPlaceholder: "argonne",
    logo: "/images/logos/argonne.svg",
  },
  {
    id: "northwestern-ctd",
    company: "Northwestern University",
    role: "Assistant Teacher",
    startDate: "Jul 2024",
    endDate: "Aug 2024",
    location: "Evanston, IL",
    summary:
      "Taught advanced high-school statistics and probability to 18 middle school students through lessons, grading, and biweekly reviews.",
    stats: [
      { value: "18", label: "students mentored" },
      { value: "1.5 hr", label: "biweekly reviews" },
    ],
    description: [
      "Helped teach advanced high-school statistics and probability to 18 middle school students",
      "Created assignments, graded homework and tests, and led 1.5-hour biweekly review sessions",
    ],
    brandColor: "#4E2A84",
    logoPlaceholder: "northwestern-ctd",
    logo: "/images/logos/northwestern.svg",
  },
  {
    id: "gbs",
    company: "Glenbrook South High School",
    role: "Engineering Lab Assistant & Assistant Teacher",
    startDate: "Aug 2021",
    endDate: "May 2025",
    location: "Glenview, IL",
    summary:
      "Lectured 100+ students on Arduino, CAD, and 3D printing while maintaining a $50,000 makerspace of CNC, laser, and fabrication tools.",
    stats: [
      { value: "100+", label: "students taught" },
      { value: "$50K", label: "makerspace managed" },
      { value: "20", label: "summer students" },
    ],
    description: [
      "Lectured 100+ students on Arduino, Fusion 360, PrusaSlicer, 3D printing, and makerspace safety and operations",
      "Maintained a $50,000 makerspace with a CNC router, laser cutters, 3D printers, saws, and other power tools",
      "Helped teach CAD design, 3D modeling, and 3D printing to 20 students at the high school's summer school",
    ],
    brandColor: "#002147",
    logoPlaceholder: "glenbrook-south",
    logo: "/images/logos/gbs.jpg",
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
export const HOBBIES = [
  {
    id: "dj",
    name: "DJing",
    monogram: "DJ",
    accentColor: "#7C3AED",
    category: "Music",
    tagline: "Pioneer DDJ-FLX4 — house, techno, and electronic music.",
    description:
      "DJing is where engineering meets creativity for me. I mix primarily house and techno on a Pioneer DDJ-FLX4, using Rekordbox for track management and set preparation. I love the technical side — beat matching, EQ transitions, building energy across a set — as much as the musical side. It is one of the few things that completely clears my head after a long day of problem sets.",
    chips: ["Pioneer DDJ-FLX4", "Rekordbox", "House / Techno"],
    imagePath: "/hobbies/dj.png",
  },
  {
    id: "skiing",
    name: "Skiing",
    monogram: "SK",
    accentColor: "#0369A1",
    category: "Outdoors",
    tagline: "Black diamonds and long runs — the steeper the better.",
    description:
      "I have been skiing since I was a kid and it remains one of my favorite ways to spend a winter weekend. I gravitate toward black diamond runs and enjoy pushing my technique on steeper terrain. There is something uniquely satisfying about the combination of speed, precision, and reading the mountain — it scratches the same problem-solving itch that engineering does, just with more adrenaline.",
    chips: ["Alpine skiing", "Black diamonds", "Midwest + Colorado"],
    imagePath: "/hobbies/skiing.png",
  },
  {
    id: "working-out",
    name: "Working Out",
    monogram: "WO",
    accentColor: "#374151",
    category: "Fitness",
    tagline: "Daily training — consistency over intensity.",
    description:
      "I train daily and treat the gym as a non-negotiable part of my routine. Lifting gives me a reliable way to build discipline and mental clarity that carries directly into academic and engineering work. I focus on compound movements and progressive overload, tracking everything methodically — the same approach I apply to projects and problem sets.",
    chips: ["Strength training", "Daily routine", "Progressive overload"],
    imagePath: "/hobbies/working-out.png",
    // Show the whole pizza rather than cropping it to fill the card.
    imageFit: "contain",
    // Margins around the contained pizza read as white rather than the accent.
    imageBackground: "#ffffff",
  },
  {
    id: "hiking",
    name: "Backpacking & Hiking",
    monogram: "HK",
    accentColor: "#4D7C0F",
    category: "Outdoors",
    tagline: "Trailheads, summits, and multi-day trips off the grid.",
    description:
      "Backpacking and hiking are how I disconnect and reset. I love the planning that goes into a trip — mapping routes, dialing in gear weight, and reading terrain and weather — almost as much as the time on the trail itself. There is a simple, methodical satisfaction in covering ground under your own power and solving small problems as they come, which feels a lot like engineering with a much better view.",
    chips: ["Trail hiking", "Multi-day trips", "Gear & route planning"],
    imagePath: "/hobbies/hiking.png",
  },
  {
    id: "cars",
    name: "Car Work",
    monogram: "CR",
    accentColor: "#DC2626",
    category: "Engineering",
    tagline: "Wrenching, modifications, and understanding how things work.",
    description:
      "Working on cars is a natural extension of my love for hands-on engineering. I enjoy doing my own maintenance and modifications — understanding every system, diagnosing issues from first principles, and improving performance where I can. It is the same mindset as PCB debugging or circuit design, just at a larger, greasier scale.",
    chips: ["Maintenance & repair", "Modifications", "Diagnostics"],
    imagePath: "/hobbies/cars.png",
  },
  {
    id: "learning",
    name: "Learning",
    monogram: "LN",
    accentColor: "#4338CA",
    category: "Growth",
    tagline: "Online courses, side projects, and chasing curiosity.",
    description:
      "I treat learning as a constant, self-directed habit rather than something confined to the classroom. Whether it is working through online courses, picking up a new tool for a side project, or going deep on a topic that caught my attention, I love the process of building understanding from the ground up. Staying curious and teaching myself new skills is what keeps both my engineering work and my interests moving forward.",
    chips: ["Self-directed", "Online courses", "Side projects"],
    imagePath: "",
  },
  {
    id: "reading",
    name: "Reading",
    monogram: "RD",
    accentColor: "#D97706",
    category: "Learning",
    tagline:
      "Engineering textbooks, biographies, and anything that teaches me something new.",
    description:
      "I read consistently across engineering, science, biography, and history. Some of my favorites include Electronic Principles by Malvino, which I worked through cover to cover during my time at Hamilton Broadcast Engineering, and biographies of engineers and scientists who applied theory to change the world. Reading is how I fill the gaps between formal coursework and practical work.",
    chips: ["Engineering & science", "Biographies", "History"],
    imagePath: "/hobbies/reading.png",
    // Book cover should be shown in full rather than cropped to fill.
    imageFit: "contain",
    // Margins around the contained book read as white rather than the accent.
    imageBackground: "#ffffff",
  },
  {
    id: "family-friends",
    name: "Family & Friends",
    monogram: "FF",
    accentColor: "#16A34A",
    category: "Personal",
    tagline: "Polish roots, Chicago raised — the people who keep me grounded.",
    description:
      "Outside of everything else, time with family and friends is what matters most. I grew up in a close Polish-American household in the Chicago suburbs and that foundation — hard work, loyalty, showing up for the people around you — shapes how I approach everything. The best moments are the simple ones: cooking together, watching the game, or just being present.",
    chips: ["Polish-American", "Chicago suburbs", "Close-knit"],
    imagePath: "/hobbies/family.png",
  },
] as const;

export type Hobby = (typeof HOBBIES)[number];

// ── Extracurriculars ──────────────────────────────────────────────────────────
export const EXTRACURRICULARS = [
  {
    id: "engineering-club",
    name: "Engineering Club",
    monogram: "EC",
    accentColor: "#E85D20",
    category: "Leadership",
    roles: ["President", "Electronics Manager"],
    dateRange: "Aug 2021 – May 2025",
    shortDescription:
      "Led the largest non-volunteering club of 124 members with 7 active subsets — Maker Events, MakerFaire, VEX Robotics, Glenview's Got STEAM, CAD Club, Project Enable, and AI Club.",
    fullDescription:
      "As President (senior year) and Makerspace & Electronics Manager (freshman–junior year), I led a club of 124 members across 7 subsets. I organized monthly STEM volunteering events for 60+ elementary and middle schoolers, ran fundraisers raising $1,000+ for new makerspace equipment, and managed weekly meetings for each subset. Subsets included Maker Events (monthly tool lectures and build competitions), MakerFaire (year-long project showcase for 300+ attendees), VEX Robotics, Glenview's Got STEAM (STEAM outreach to 10 local schools), CAD Club, Project Enable (3D printing prosthetics for children), and AI Club.",
    stats: [
      { value: "124", label: "members" },
      { value: "7", label: "subsets" },
      { value: "$1,000+", label: "fundraised" },
    ],
  },
  {
    id: "vex-robotics",
    name: "VEX Robotics",
    monogram: "VR",
    accentColor: "#2563EB",
    category: "Competition",
    roles: ["Team Captain", "Programmer", "Hardware Engineer"],
    dateRange: "Aug 2022 – May 2025",
    shortDescription:
      "Team captain, hardware engineer, and programmer. Led a team of 7, placed 5th in State, and automated drivetrain code for a 60% efficiency gain.",
    fullDescription:
      "As Team Captain, I led a team of 7 students through three competitive seasons. I designed and built the robot's drivetrain and defensive subsystems, wrote autonomous gameplay code, and optimized the drivetrain for 60% greater efficiency over the prior year's robot. The team placed 5th in the Illinois State Championship. I also assisted in organizing competitions hosted at Glenbrook South with ~100 competitors and 10+ local high school teams, handled field inspection, and consulted with other teams on robot design and strategy.",
    stats: [
      { value: "5th", label: "in State" },
      { value: "100+", label: "competitors organized" },
      { value: "60%", label: "drivetrain efficiency gain" },
    ],
  },
  {
    id: "science-olympiad",
    name: "Science Olympiad",
    monogram: "SO",
    accentColor: "#0D9488",
    category: "Competition",
    roles: ["Team Leader", "Varsity Competitor"],
    dateRange: "Aug 2022 – May 2025",
    shortDescription:
      "Led and managed a team of 30. Placed 2nd at Regionals and 9th in State, improving team placement by 6 positions. Selected as ACS Competitor sophomore and senior year.",
    fullDescription:
      "I assisted in leading and managing a varsity Science Olympiad team of 30 students. I helped organize weekly team meetings, constructed practice tests for tryouts, advised coaches on event assignments, and assisted teammates in building competition solutions. The team placed 2nd in Regionals and 9th in State — an improvement of 6 places from the prior year. I personally competed in detector building, robot tour, chem lab, air trajectory, electric vehicle, and was selected as an American Chemical Society (ACS) competitor during my sophomore and senior years.",
    stats: [
      { value: "2nd", label: "Regionals" },
      { value: "9th", label: "State" },
      { value: "+6", label: "rank improvement" },
    ],
  },
  {
    id: "math-team",
    name: "Math Team",
    monogram: "MT",
    accentColor: "#7C3AED",
    category: "Competition",
    roles: ["General Member", "Orals Competitor"],
    dateRange: "Aug 2023 – May 2025",
    shortDescription:
      "Advanced competition math across general, orals, and Math Madness formats. Placed 10th in State and 8th nationally in Math Madness. AMC 10 & 12 competitor.",
    fullDescription:
      "I competed on the General and Orals math teams, practicing advanced competition mathematics including probability & statistics, algebra, geometry, trigonometry, and pre-calculus. On the Orals team I competed in applied mathematics covering digital logic circuits and game theory. I placed 10th in the Illinois State Math Competition and 8th nationally in the Math Madness tournament. I also helped teammates understand complex problems and explained solutions during team practice. Selected as an AMC 10 competitor freshman year and AMC 12 competitor junior and senior year.",
    stats: [
      { value: "10th", label: "in State" },
      { value: "8th", label: "national (Math Madness)" },
    ],
  },
  {
    id: "tutor",
    name: "Private Tutor & TLC Tutor",
    monogram: "TU",
    accentColor: "#16A34A",
    category: "Community & Volunteering",
    roles: ["Paid Private Tutor", "TLC Volunteer"],
    dateRange: "Aug 2021 – May 2025",
    shortDescription:
      "Tutored 150+ students across all levels — studies through AP and college. Average grade increase of 1–2 grade levels. Subjects spanning engineering, math, science, CS, English, and Spanish.",
    fullDescription:
      "I worked as a paid private tutor from freshman through senior year and as a volunteer tutor at the Titan Learning Center (TLC) during junior and senior year. I provided 1:1 and small group sessions for 150+ students at every course level from Studies through AP and Dual Enrollment college courses. I tutored every subject I had studied: Engineering, Physics, Chemistry, Biology, Algebra I through Multivariable Calculus, Computer Science (Java, C, C++, Arduino), English, Spanish, World History, and Government. I reported 100% student satisfaction and an average academic grade increase of 1–2 grade levels across all students.",
    stats: [
      { value: "150+", label: "students tutored" },
      { value: "300+", label: "hours" },
      { value: "+1–2", label: "grade levels avg" },
    ],
  },
  {
    id: "glenviews-got-steam",
    name: "Glenview's Got STEAM",
    monogram: "GS",
    accentColor: "#D97706",
    category: "Community & Volunteering",
    roles: ["Student Manager", "Volunteer"],
    dateRange: "Aug 2021 – May 2025",
    shortDescription:
      "Managed STEAM outreach events for 60 elementary and middle schoolers from 10 local schools. Organized 30 volunteers and raised $1,000+ for the public library.",
    fullDescription:
      "I helped lead and organize STEAM-related events for 20–60 elementary and middle school students from 10 different local schools. I planned presentational materials, organized budgets and materials for each activity, lectured on topics including 3D printing, electronics fundamentals, what engineering is, and how science and math apply to everyday life. I helped create fundraisers raising $1,000+ for the club and the local public library to purchase tools and equipment for community use. I also tracked volunteer participation and briefed the 30 volunteers before each event.",
    stats: [
      { value: "60", label: "students per event" },
      { value: "10", label: "local schools" },
      { value: "$1,000+", label: "raised for public library" },
    ],
  },
  {
    id: "jv-swim",
    name: "Junior Varsity Swim Team",
    monogram: "JV",
    accentColor: "#0369A1",
    category: "Competition",
    roles: ["Team Representative"],
    dateRange: "Nov 2021 – Jan 2023",
    shortDescription:
      "Long-distance free stroke JV swimmer. Red Cross lifeguard and CPR certified. Taught swim techniques and lifeguarding to teammates.",
    fullDescription:
      "I competed as a JV swimmer specializing in long-distance free stroke events. I also swam breaststroke, backstroke, and butterfly. I served as a team representative, demonstrated proper swimming technique to newer teammates, and participated in both team and individual training exercises. During this period I obtained my Red Cross lifeguard and CPR certifications while helping teach other swimmers proper lifeguarding techniques and emergency response procedures.",
    stats: [],
  },
  {
    id: "habitat-for-humanity",
    name: "Habitat for Humanity",
    monogram: "HH",
    accentColor: "#DC2626",
    category: "Community & Volunteering",
    roles: ["Group Leader", "Volunteer"],
    dateRange: "July 2024",
    shortDescription:
      "Week-long build trip to Manistique, MI. Painted interior and exterior of a home, refurbished a shelter, cleaned a local park, and cooked for families.",
    fullDescription:
      "I participated in a week-long Habitat for Humanity build trip to Manistique, Michigan, serving as a group leader. Our team primed and painted the interior and exterior of a residential home, refurbished a dormitory shelter, cleaned a local park of weeds and debris, assisted in cleaning a local business's dining area, and cooked meals for the families we were serving. I helped direct the work and coordinate volunteers throughout the week.",
    stats: [],
  },
] as const;

export type Extracurricular = (typeof EXTRACURRICULARS)[number];

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

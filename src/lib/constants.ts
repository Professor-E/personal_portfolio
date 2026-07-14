import type { ExperienceEntry } from "@/types";

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
    // Live marketing site — surfaces as a browser-chrome bar on the active
    // Experience card (see LiveSitePreview.tsx, variant "bar").
    website: "https://jamit-ios.com",
  },
  {
    id: "handshake",
    company: "Handshake AI Fellowship",
    role: "Electrical Engineering Domain Expert",
    startDate: "June 2026",
    endDate: "Present",
    location: "Glenview, IL (Remote)",
    summary:
      "Served as an electrical engineering domain expert for Handshake AI, designing PCBs, circuits, and grading rubrics to train and benchmark AI models.",
    stats: [
      { value: "PCB", label: "design & layout" },
      { value: "Analog + Digital", label: "circuit analysis" },
      { value: "AI training", label: "rubrics & benchmarks" },
    ],
    description: [
      "Orchestrated electrical engineering tasks revolving around schematic and PCB design, PCB layout, and circuit analysis",
      "Designed grading rubrics and technical benchmarks for technical tasks and other domain experts to complete",
      "Completed PCB design, digital and analog circuits, and circuit analysis tasks to help train AI with feedback",
    ],
    brandColor: "#7FA000",
    logoPlaceholder: "handshake",
    logo: "/images/logos/handshake.png",
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
      "A guess-the-song party game my cofounders and I took from an idea to the App Store, backed by Y Combinator. 5★ in its first 60 days.",
    fullDescription:
      "Jam It! began as a simple question — how fast can you and your friends name a song? — and grew into a vinyl-themed, guess-the-song party game funded by Y Combinator. Within 60 days on the App Store it earned a 5-star rating, 1,000+ views, 53 downloads, and our first $25 of in-app purchases (a milestone is a milestone!). I designed the UI/UX from low-fidelity sketches to high-fidelity Figma prototypes, wrote the game logic and song-compatibility backend in Swift and SwiftUI, and built the marketing site — the one previewed below — in TypeScript, Node.js, and React on Vercel and Cloudflare.",
    badge: "YC Funded",
    imagePath: "/projects/jam-it.png",
    // Live marketing site — surfaces as a chip on the grid card and a
    // browser-window preview in the lightbox (see LiveSitePreview.tsx).
    website: "https://jamit-ios.com",
    websiteImage: "/projects/jamit-site.png",
  },
  {
    id: "digital-logic-trainer",
    title: "Digital Logic Trainer",
    monogram: "DL",
    category: "Hardware",
    accentColor: "#2563EB",
    year: "2024",
    shortDescription:
      "A PCB learning kit that peels the lid off the 'black box' of an IC — logic gates built from bare transistors, one blinking bit at a time.",
    fullDescription:
      "This one came from teaching: students kept asking what actually happens inside a logic chip, and pointing at a black epoxy square wasn't cutting it. So I designed a trainer board that rebuilds the classic logic gates from individual 2N2222A transistors — flip a switch, watch the LEDs, and see exactly how 1s and 0s come to be. I drew the schematic and layout in KiCAD and EasyEDA Pro, then wrote the full build documentation and released it under a CC BY-SA license so anyone can build one — or teach with it.",
    badge: null,
    imagePath: "/projects/digital-logic-trainer.png",
  },
  {
    id: "maine-east-radio",
    title: "Maine East Radio Station",
    monogram: "ME",
    category: "Hardware",
    accentColor: "#0D9488",
    year: "2022–2023",
    shortDescription:
      "A full broadcast radio station I helped plan, build, and wire for Maine East High School — now on the air for 2,340+ listeners.",
    fullDescription:
      "As part of my work at Hamilton Broadcast Engineering, I helped plan, design, and build a complete broadcast radio station for Maine East High School — from studio wiring and transmitter setup to verifying the signal path with oscilloscopes and spectrum analyzers. Today the station reaches 2,340+ listeners. Flipping a transmitter on and hearing a school find its voice never gets old.",
    badge: null,
    imagePath: "/projects/maine-east-radio.png",
  },
  {
    id: "tesla-coil",
    title: "Tesla Coil",
    monogram: "TC",
    category: "Hardware",
    accentColor: "#7C3AED",
    year: "2023",
    shortDescription:
      "Hand-wound solid-state Tesla coil (SSTC) that throws 12-inch plasma streamers. Equal parts physics lesson and light show.",
    fullDescription:
      "I built this solid-state Tesla coil from scratch — winding the primary and secondary coils by hand, working the resonance math out on paper, designing the IGBT driver circuit in KiCAD, and wiring in safety interlocks before the first spark ever flew. The payoff is continuous 12-inch plasma streamers, on demand. It's the closest you can get to keeping a lightning storm on a workbench.",
    badge: null,
    imagePath: "/projects/tesla-coil.png",
  },
  {
    id: "3d-rocket",
    title: "3D Printed Reusable Rocket",
    monogram: "RK",
    category: "Hardware",
    accentColor: "#D97706",
    year: "2024",
    shortDescription:
      "Fully 3D-printed rocket with an avionics bay and dual-parachute recovery — built to fly, land softly, and fly again.",
    fullDescription:
      "I modeled the airframe, nose cone, and fins in Autodesk Fusion 360 and printed everything on a Prusa MINI+, then fit an avionics bay with an altimeter that triggers dual-event recovery — a drogue chute at apogee and the main chute closer to the ground. 'Reusable' is the whole point: a soft landing means the afternoon of launches isn't over.",
    badge: null,
    imagePath: "/projects/3d-rocket.png",
  },
  {
    id: "bluetooth-drone",
    title: "Bluetooth Drone",
    monogram: "BD",
    category: "Hardware",
    accentColor: "#6B7280",
    year: "2023",
    shortDescription:
      "Custom quadcopter with a 3D-printed frame, hand-tuned PID stabilization, and a phone for a remote.",
    fullDescription:
      "I built this quadcopter from the frame up: a 3D-printed PLA frame modeled in Fusion 360, brushless motors and ESCs, and a flight controller running PID stabilization loops I wrote in C++ on Arduino — all steered over Bluetooth from a custom mobile app. Tuning PID by hand is a rite of passage; every wobble is just the math telling you to try again.",
    badge: null,
    imagePath: "/projects/bluetooth-drone.png",
  },
  {
    id: "maine-south-radio",
    title: "Maine South Radio Station",
    monogram: "MS",
    category: "Hardware",
    accentColor: "#B91C1C",
    year: "2023",
    shortDescription:
      "Gave WMTH — Maine South High School's radio station — a second life: full teardown, rewiring, and back on the air.",
    fullDescription:
      "Another Hamilton Broadcast Engineering project: a complete rebuild of WMTH, Maine South High School's broadcast station. We tore the studio down to the racks, rewired the equipment, installed the console and monitors, and verified the signal path end to end so the station could return to reliable on-air broadcasting — good as new, with decades of character intact.",
    badge: null,
    imagePath: "/projects/maine-south-radio.png",
  },
  {
    id: "electric-longboard",
    title: "Electric Longboard",
    monogram: "EL",
    category: "Hardware",
    accentColor: "#6D28D9",
    year: "2023",
    shortDescription:
      "Custom electric longboard — belt-drive motor, hand-built battery pack, wireless throttle, and very few excuses left to walk.",
    fullDescription:
      "I built this longboard from the deck up: a brushless belt-drive motor, a custom lithium battery pack in a sealed enclosure, an electronic speed controller, and a handheld wireless remote for throttle and braking. Half the fun was in the tuning — shaping the acceleration and regenerative-braking curves until the ride felt smooth enough to genuinely trust.",
    badge: null,
    imagePath: "/projects/electric-longboard.png",
  },
  {
    id: "electric-go-kart",
    title: "Electric Go Kart",
    monogram: "GK",
    category: "Hardware",
    accentColor: "#DC2626",
    year: "2022",
    shortDescription:
      "Battery-powered go kart on a welded steel frame — chain drive, real torque, and a grin included with every lap.",
    fullDescription:
      "A fully electric go kart built around a welded steel frame: a series battery pack feeding a motor controller, a chain-and-sprocket drivetrain, steering and seat mounting, and power wiring with proper safety cutoffs. Tuning the drivetrain was a balancing act between usable torque and top speed — though electric torque off the line makes every lap feel faster than the numbers say.",
    badge: null,
    imagePath: "/projects/electric-go-kart.png",
  },
  {
    id: "digital-clock",
    title: "Digital Clock",
    monogram: "CL",
    category: "Hardware",
    accentColor: "#059669",
    year: "2022",
    shortDescription:
      "Microcontroller digital clock with a multiplexed seven-segment display — hand-soldered, programmed in C, always on time.",
    fullDescription:
      "I built this clock around a microcontroller and a DS-series real-time clock module, driving a multiplexed seven-segment display on a board I soldered myself. The timekeeping, alarm, and button-based time-setting logic are all written in C. Nothing teaches you to respect timing quite like debugging the thing responsible for keeping it.",
    badge: null,
    imagePath: "/projects/digital-clock.png",
  },
  {
    id: "3d-guitar",
    title: "3D Printed Electric Guitar",
    monogram: "GT",
    category: "Hardware",
    accentColor: "#CA8A04",
    year: "2024",
    shortDescription:
      "A playable electric guitar with a 3D-printed honeycomb body, bolt-on neck, and hand-wired single-coil pickups.",
    fullDescription:
      "I modeled the body in Fusion 360 with a parametric honeycomb infill — partly to save weight, mostly because it looks fantastic — printed it in sections, and assembled it with a bolt-on neck, pickups, bridge, and control electronics before the final wiring and setup. The best part is that it doesn't just hang on the wall. It plays.",
    badge: null,
    imagePath: "/projects/3d-guitar.png",
  },
  {
    id: "3d-printing",
    title: "3D Printing",
    monogram: "3D",
    category: "Hardware",
    accentColor: "#0EA5E9",
    year: "2019–Present",
    shortDescription:
      "Years of additive manufacturing — designing, slicing, and printing the parts that show up in half the projects on this page.",
    fullDescription:
      "3D printing is the quiet workhorse behind most of my builds — drone frames, rocket fins, guitar bodies, helmet shells. I model in Fusion 360, slice in PrusaSlicer, and print on FDM machines including my Prusa MINI+, tuning settings and designing for printability along the way. Most of my projects start life as a sketch and a spool of filament.",
    badge: null,
    imagePath: "/projects/3d-printing.png",
  },
  {
    id: "jingle",
    title: "Jingle — Personal AI Assistant",
    monogram: "JN",
    category: "Software",
    accentColor: "#8B5CF6",
    year: "2025",
    shortDescription:
      "Jingle, my personal AI assistant — voice queries, scheduling, and automations for the everyday things I kept forgetting.",
    fullDescription:
      "Jingle is a personal AI assistant I built to handle the everyday stuff: voice queries, scheduling, reminders, and automations wired into the tools I already use. Under the hood it pairs a large language model with voice input and an extensible command system, tuned for a fast, conversational back-and-forth. Think of it as a helpful roommate who never sleeps — and only occasionally mishears me.",
    badge: null,
    imagePath: "/projects/jingle.png",
  },
  {
    id: "penny-hockey",
    title: "Penny Hockey Board",
    monogram: "PH",
    category: "Hardware",
    accentColor: "#92400E",
    year: "2023",
    shortDescription:
      "Handcrafted wooden penny-hockey board, built from raw stock for fast (and surprisingly competitive) tabletop games.",
    fullDescription:
      "I built this penny-hockey — knock hockey, depending on where you grew up — board from raw stock: cutting and finishing the playing surface, rails, and goal slots, then sanding everything down to a smooth, durable finish so the puck really flies. Simple materials, careful measurement, and a great deal of highly competitive quality-assurance testing.",
    badge: null,
    imagePath: "/projects/penny-hockey.png",
  },
  {
    id: "custom-pc",
    title: "Custom PC",
    monogram: "PC",
    category: "Hardware",
    accentColor: "#1F2937",
    year: "2021",
    shortDescription:
      "Hand-built desktop PC — researched, assembled, cable-managed, and tuned until it ran cool, quiet, and fast.",
    fullDescription:
      "The classic engineer's rite of passage: I researched and picked every component — CPU, GPU, motherboard, memory, storage, power supply, cooling — then assembled the build, configured the BIOS, tuned the thermals, and set up the OS for the balance of performance and reliability I wanted. And yes, the cable management is still something I'm proud of.",
    badge: null,
    imagePath: "/projects/custom-pc.png",
  },
  {
    id: "halloween-lantern",
    title: "Halloween Lantern",
    monogram: "HL",
    category: "Hardware",
    accentColor: "#EA580C",
    year: "2024",
    shortDescription:
      "A jack-o'-lantern lantern glowing with warm LEDs — spooky on the outside, circuits on the inside.",
    fullDescription:
      "I built this Halloween lantern with a menacing jack-o'-lantern face cut into the enclosure and warm LEDs inside for a flickering, candlelit glow — minus the fire hazard. The housing is fabricated to read as weathered wood, with a removable roof for access to the lighting. October engineering is still engineering!",
    badge: null,
    imagePath: "/projects/halloween-lantern.png",
  },
  {
    id: "iron-man-helmet",
    title: "Iron-Man Helmet",
    monogram: "IH",
    category: "Hardware",
    accentColor: "#64748B",
    year: "2023",
    shortDescription:
      "Wearable, 3D-printed Iron Man helmet with a hand-finished, battle-worn silver paint job.",
    fullDescription:
      "I printed this full-size Iron Man helmet in sections, then got to the slow, satisfying part: sanding, filling, and hand-painting a battle-worn silver finish with brushed weathering. It's sized to actually be worn, cutout eye lenses and all. Some projects solve problems — this one just makes everyone who tries it on stand up a little straighter.",
    badge: null,
    imagePath: "/projects/iron-man-helmet.png",
  },
  {
    id: "octo-pi",
    title: "Octo-Pi Automation",
    monogram: "OP",
    category: "Software",
    accentColor: "#C51A4A",
    year: "2023",
    shortDescription:
      "Raspberry Pi 4 + OctoPrint, so my 3D printers take orders from anywhere — remote control, timelapses, and batch runs.",
    fullDescription:
      "I put my 3D printers on the network with a Raspberry Pi 4 running OctoPi (OctoPrint): full remote control from anywhere, automatic timelapses of every print, and batch automation for running large jobs back to back without me hovering in between. The printers work nights now. I don't.",
    badge: null,
    imagePath: "/projects/octo-pi.png",
  },
] as const;

export type Project = (typeof PROJECTS)[number];

// Fixed per-category colors for the Projects page — every project in a given
// category shows the same tag color, regardless of that project's own
// individual accentColor (which still drives its card's other accents).
export const PROJECT_CATEGORY_COLORS: Record<string, string> = {
  Hardware: "#2563EB",
  Software: "#EA580C",
  Research: "#7C3AED",
};

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
      "DJing is where engineering meets creativity for me. I mix mostly house and techno on a Pioneer DDJ-FLX4, with Rekordbox handling track management and set prep. I love the technical side — beat matching, EQ transitions, building energy across a set — every bit as much as the musical side. It's one of the few things that completely clears my head after a long day of problem sets.",
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
      "I've been skiing since I was a kid, and it's still my favorite way to spend a winter weekend. I gravitate toward black diamonds and love pushing my technique on steeper terrain. There's something uniquely satisfying about the mix of speed, precision, and reading the mountain — it scratches the same problem-solving itch that engineering does, just with a lot more adrenaline.",
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
      "I train daily — the gym is the non-negotiable part of my routine. Lifting builds the kind of discipline and mental clarity that carries straight into problem sets and projects. I keep the programming simple: compound movements, progressive overload, and a training log I maintain as methodically as any lab notebook.",
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
      "Backpacking and hiking are how I disconnect and reset. I love the planning that goes into a trip — mapping routes, dialing in gear weight, reading terrain and weather — almost as much as the time on the trail itself. There's a simple, methodical satisfaction in covering ground under your own power and solving small problems as they come up. It's basically engineering with a much better view.",
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
      "Working on cars is hands-on engineering at its most honest. I do my own maintenance and modifications — understanding every system, diagnosing issues from first principles, and improving performance where I can. It's the same mindset as PCB debugging or circuit design, just at a larger, considerably greasier scale.",
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
      "Learning is a constant, self-directed habit for me, not something confined to a classroom. Whether it's working through an online course, picking up a new tool for a side project, or going way too deep on a topic that caught my attention, I love building understanding from the ground up. Chasing curiosity is what keeps both my engineering work and everything else on this site moving forward.",
    chips: ["Self-directed", "Online courses", "Side projects"],
    imagePath: "/hobbies/learning.png",
    // Book cover should be shown in full rather than cropped to fill.
    imageFit: "contain",
    // Margins around the contained cover read as white rather than the accent.
    imageBackground: "#ffffff",
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
      "I read consistently across engineering, science, biography, and history. A favorite is Electronic Principles by Malvino — I worked through it cover to cover during my time at Hamilton Broadcast Engineering, and it taught me more practical circuit intuition than any class. Beyond textbooks, I love biographies of engineers and scientists who took theory and changed the world with it. Reading is how I fill the gaps between coursework and the workbench.",
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
      "Underneath everything else on this site, time with family and friends is what matters most. I grew up in a close Polish-American household in the Chicago suburbs — eleven years of Saturday Polish school included — and that foundation of hard work, loyalty, and showing up for your people shapes how I approach everything. The best moments are the simple ones: cooking together, watching the game, or just being present.",
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
      "President of the school's largest non-volunteering club — 124 members, 7 subsets, and a makerspace that never sat still.",
    fullDescription:
      "Engineering Club was my home base in high school. I spent freshman through junior year as Makerspace & Electronics Manager and served as President my senior year, leading 124 members across 7 subsets: Maker Events (monthly tool lectures and build competitions), MakerFaire (a year-long project showcase for 300+ students and 100+ visitors), VEX Robotics, Glenview's Got STEAM, CAD Club, Project Enable (3D-printing prosthetics donated to children in need), and AI Club. Along the way we ran monthly STEM events for 60 elementary and middle schoolers and raised $1,000+ for new makerspace equipment. My favorite part was simpler than any of that: watching someone use a tool for the first time and immediately start planning what they'd build with it.",
    stats: [
      { value: "124", label: "members" },
      { value: "7", label: "subsets" },
      { value: "$1,000+", label: "fundraised" },
    ],
    imagePath: "/extracurriculars/engineering-club.png",
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
      "Team captain, hardware engineer, and programmer — led a team of 7 to 5th in State with a drivetrain 60% more efficient than the year before.",
    fullDescription:
      "As Team Captain I led our team of 7 through three build seasons — designing and building the drivetrain and defensive subsystems, writing the autonomous gameplay code, and reworking the drivetrain for a 60% efficiency gain over the prior year's robot (which went on to score 150% of the previous season's score). We placed 5th at the Illinois State Championship. I also helped organize the VEX competitions hosted at our school with ~100 competitors, handled field inspection, and consulted other teams on their robots and strategy — because the best part of robotics is that everyone wants everyone's robot to work.",
    stats: [
      { value: "5th", label: "in State" },
      { value: "100+", label: "competitors organized" },
      { value: "60%", label: "drivetrain efficiency gain" },
    ],
    imagePath: "/extracurriculars/vex-robotics.png",
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
      "Helped lead a varsity team of 30 to 2nd at Regionals and 9th in State — a six-place jump from the season before.",
    fullDescription:
      "I helped lead and manage our varsity Science Olympiad team of 30 — organizing weekly meetings, writing tryout tests, advising coaches on event assignments, and helping teammates build out their competition solutions. We took 2nd at Regionals and 9th in State, six places better than the prior year. My own events kept me happily busy: detector building, robot tour, chem lab, air trajectory, and electric vehicle, plus selection as an American Chemical Society (ACS) competitor in my sophomore and senior years. If it involved building something and then being graded on it, I signed up.",
    stats: [
      { value: "2nd", label: "Regionals" },
      { value: "9th", label: "State" },
      { value: "+6", label: "rank improvement" },
    ],
    imagePath: "/extracurriculars/science-olympiad.png",
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
      "General and Orals competitor — 10th in State, 8th nationally in Math Madness, and living proof that digital logic counts as a sport.",
    fullDescription:
      "I competed on the General and Orals math teams — probability and statistics, algebra, geometry, trigonometry, and pre-calculus, all at competition speed. Orals was my favorite: applied mathematics in digital logic circuits and game theory, the rare corner of competition math that overlaps with my electrical-engineering life. I placed 10th in State and 8th nationally in the Math Madness tournament, competed in the AMC 10 and AMC 12, and spent plenty of practices at the whiteboard walking teammates through solutions — still the fastest way I know to find the gaps in your own understanding.",
    stats: [
      { value: "10th", label: "in State" },
      { value: "8th", label: "national (Math Madness)" },
    ],
    imagePath: "/extracurriculars/math-team.png",
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
      "Tutored 150+ students across every level — studies through AP and college — with an average grade increase of about 5%.",
    fullDescription:
      "I worked as a paid private tutor from freshman through senior year, and as a volunteer tutor at the Titan Learning Center (TLC) during junior and senior year — 1:1 and small-group sessions for 150+ students, from Studies through AP and Dual Enrollment college courses. My rule was simple: if I had studied it, I tutored it — Engineering, Physics, Chemistry, Biology, Algebra I through Multivariable Calculus, Computer Science (Java, C, C++, Arduino), English, Spanish, World History, and Government. Across all my students I reported 100% satisfaction and an average academic grade increase of about 5% — but the wins that stuck with me were the 'ohhh, THAT's what that means' moments.",
    stats: [
      { value: "150+", label: "students tutored" },
      { value: "300+", label: "hours" },
      { value: "+5%", label: "avg grade increase" },
    ],
    imagePath: "/extracurriculars/tutor.png",
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
      "Ran STEAM outreach for up to 60 elementary and middle schoolers from 10 local schools — 30 volunteers, $1,000+ raised for the public library.",
    fullDescription:
      "Glenview's Got STEAM is where I learned that explaining how a 3D printer works to a third grader is harder — and more fun — than actually using one. I helped lead and organize STEAM events for 20–60 elementary and middle schoolers from 10 local schools: planning the presentations, budgeting the materials, briefing our 30 volunteers before each event, and teaching everything from electronics fundamentals to 'what even is engineering?'. We also ran fundraisers that raised $1,000+ for the club and the local public library, so the tools we taught with could stay in the community.",
    stats: [
      { value: "60", label: "students per event" },
      { value: "10", label: "local schools" },
      { value: "$1,000+", label: "raised for public library" },
    ],
    imagePath: "/extracurriculars/glenviews-got-steam.png",
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
      "Long-distance freestyle JV swimmer, team representative, and Red Cross lifeguard & CPR certified.",
    fullDescription:
      "I swam long-distance freestyle for the JV team — with breaststroke, backstroke, and butterfly mixed in — served as team representative, and helped newer teammates clean up their technique. Along the way I earned my Red Cross lifeguard and CPR certifications and taught other swimmers proper lifeguarding and emergency response. Early-morning practices also taught me my most transferable skill: showing up.",
    stats: [],
    imagePath: "/extracurriculars/jv-swim.png",
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
      "Week-long build trip to Manistique, MI — painting a home inside and out, refurbishing a shelter, and cooking for the families we served.",
    fullDescription:
      "I spent a week in Manistique, Michigan on a Habitat for Humanity build trip, serving as a group leader. Our team primed and painted a home inside and out, refurbished a dormitory shelter, cleaned up a local park, helped a local business clean its dining area, and cooked meals for the families we were serving — and I helped direct the work and coordinate volunteers throughout the week. It was the least technical work on this page, and some of the most rewarding.",
    stats: [],
    imagePath: "/extracurriculars/habitat-for-humanity.png",
  },
] as const;

export type Extracurricular = (typeof EXTRACURRICULARS)[number];

// Fixed per-category colors for the Extracurriculars page — every activity in
// a given category shows the same tag, role-pill, and stat-chip color,
// regardless of that activity's own individual accentColor (which still
// drives its icon background and hover underline).
export const EXTRACURRICULAR_CATEGORY_COLORS: Record<string, string> = {
  Leadership: "#2563EB",
  Competition: "#EA580C",
  "Community & Volunteering": "#16A34A",
};

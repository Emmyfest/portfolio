/* ============================================================================
   PORTFOLIO DATA — single source of truth
   ----------------------------------------------------------------------------
   This is the ONLY file you should need to touch to update your content.
   The HTML/CSS/JS render everything below automatically. To add a new
   project, image, or service — just add another object to the right array.

   HOW TO ADD AN IMAGE
   --------------------
   1. Drop the image file into /assets/images/
   2. Reference it as: src: "assets/images/your-file.jpg"
   3. If you leave src empty (""), a placeholder swatch is generated
      automatically so the layout never breaks while you're gathering photos.

   REQUIRED EDITS BEFORE LAUNCH (search for "TODO")
   --------------------------------------------------------------------------
============================================================================ */

window.PORTFOLIO_DATA = {

  // ---------------------------------------------------------------------
  // META — your identity + contact channels
  // ---------------------------------------------------------------------
  meta: {
    name: "Emmanuel Oladipo F.",
    role: "Multidisciplinary Engineer & Designer",
    tagline: "Systems, sketched, soldered, coded and cooled.",
    location: "Nigeria", // TODO

    // Profile photo — drop a headshot into /assets/images/ and point to it,
    // e.g. "assets/images/headshot.jpg". Leave blank to show an initials seal.
    photo: "assets/images/dp.jpg",

    // Bio — each string in this array becomes its own paragraph.
    bio: [
      "I'm a student in the Faculty of Technology, studying Agricultural & Environmental " +
      "Engineering at the University of Ibadan, Nigeria. Alongside my studies, I serve as " +
      "the Project Manager for Enactus University of Ibadan, coordinating social enterprise " +
      "projects from idea through to execution.",
      "Outside the classroom, my work spans five disciplines that all come from the same " +
      "habit: understand a system properly before you build it. I design brand and print " +
      "work, build backend and frontend software, prototype embedded and automation systems, " +
      "model and fabricate in AutoCAD/Fusion 360 and PCB design, and apply thermodynamics to " +
      "the installation, diagnosis and repair of air conditioning and refrigeration systems."
    ],

    // Short facts shown in the profile card — edit freely, add/remove rows.
    quickFacts: [
      { label: "Based in",   value: "Ibadan, Nigeria" },
      { label: "Experience", value: "5+ years" },
      { label: "Focus",      value: "Design · Software · Hardware · HVAC" },
      { label: "Available for", value: "Contract & project work" }
    ],

    whatsappNumber: "2348108357213", // TODO — digits only, country code first, no + or spaces
    whatsappPresetMessage: "Hi! I saw your portfolio and I'd like to talk about a project.",
    linkedinUrl: "https://www.linkedin.com/in/emmanuel-oladipo-776726319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", // TODO
    email: "emmanueloladipo729@gmail.com" // optional, leave blank to hide
  },

  // ---------------------------------------------------------------------
  // SKILLS — each one is a "sheet" in the drawing set (hence the
  // designator codes, e.g. GD-01). Order here = order on the hub page.
  //
  // "type" controls which detail template is used:
  //   "gallery"  -> categorized image galleries (Graphic Design, CAD/PCB)
  //   "projects" -> project case-study cards (Software, Embedded)
  //   "services" -> service list + capability tags (Thermodynamics/HVAC)
  // ---------------------------------------------------------------------
  skills: [
    {
      id: "graphic-design",
      title: "Graphic Design",
      short: "Brand identities, flyers, letterheads & house designs.",
      type: "gallery",
      intro: "Visual design across print and digital — from a church program to a full company brand kit. Every project below is grouped by category; click a thumbnail to view it full-size. These are few of the many design projects I've completed for clients and personal work.",
      categories: [
        {
          name: "House Designs",
          note: "Architectural renders, floor-plan visuals & elevation graphics.",
          images: [
            { src: "assets/images/house.webp", caption: "House Plan" },
            { src: "assets/images/house1.webp", caption: "House Layout" },
            { src: "assets/images/house3.jpg", caption: "Site layout render" }
          ]
        },
        {
          name: "Church Flyers",
          note: "Event flyers, program booklets & social announcement graphics.",
          images: [
            { src: "assets/images/1.webp", caption: "Sunday service flyer" },
            { src: "assets/images/2.png", caption: "FAQs Flyer Design" },
            { src: "assets/images/3.png", caption: "Word conference poster" }
          ]
        },
        {
          name: "Company Designs",
          note: "Brand identity systems — logos, color systems & marketing collateral.",
          images: [
            { src: "assets/images/c1.webp", caption: "Company Advertisement" },
            { src: "assets/images/c2.jpg", caption: "Engineering Company Design" },
            { src: "assets/images/c3.webp", caption: "Real Estate Design" }
          ]
        },
        {
          name: "Letterheads",
          note: "Corporate stationery & document templates.",
          images: [
            { src: "assets/images/l1.png", caption: "Corporate letterhead" },
            { src: "assets/images/l2.jpg", caption: "Sample Letterhead" }
          ]
        }
      ]
    },

    {
      id: "software",
      designator: "SW-02",
      title: "Backend & Frontend Development",
      short: "Full-stack web systems — from database to interface.",
      type: "projects",
      intro: "End-to-end web development — APIs, databases, and the interfaces on top of them. There are other projects I've worked on, but these are the ones I can share publicly. Click a card to view the live site.",
      projects: [
        {
          name: "Agric. Engineering Official Website",
          stack: "e.g. Flask · PostgreSQL · React",
          description: "Official website for Agric. Engineering.",
          link: "https://aeeui.onrender.com/",
          image: "assets/images/agr.png"
        },
        {
          name: "AFRICA-RII Official Website",
          stack: "e.g. Django · REST API",
          description: "Official website for African Rural Interventions Initiative.",
          link: "https://africarii.org/",
          image: "assets/images/afr.png"
        }
      ]
    },

    {
      id: "embedded-automation",
      designator: "EA-03",
      title: "Embedded Systems & Automation",
      short: "Microcontrollers, sensors & automated control systems.",
      type: "projects",
      intro: "Firmware and hardware-in-the-loop systems — sensing, control logic, and automation. These are a few of the embedded systems and automation projects I've designed, prototyped, and built. Click a card to view the project details.",
      projects: [
        {
          name: "Raspberry Pi Waste Bin Automation",
          stack: "e.g. Raspberry Pi · Python · Tensorflow · OpenCV",
          description: "A smart waste bin automation system which recognizes the type of waste before opening the compartment and also rewards users for proper disposal.",
          link: "",
          image: "assets/images/mac.png"
        },
        {
          name: "ESP32 Air Dryer",
          stack: "e.g. ESP32 · I2C sensors · DHT · Web dashboard",
          description: "An air dryer controlled by an ESP32 microcontroller, measuring the temperature and humidity of the environment of the item and logging the data.",
          link: "",
          image: "assets/images/air.png"
        }
      ]
    },


  ]
};

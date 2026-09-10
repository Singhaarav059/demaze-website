export const serviceCategories = [
  {
    key: "ai-ml",
    name: "AI & ML",
    summary:
      "We build AI-powered solutions that transform data into insights, automate complex tasks, and drive smarter decisions. From predictive analytics to computer vision and generative AI, our systems help businesses innovate and scale with confidence.",
    items: [
      "Predictive Analytics & Forecasting",
      "NLP & Conversational AI",
      "Computer Vision & Image Processing",
      "Generative Models & Content Synthesis",
      "Recommendation Systems & Personalization",
      "AI Dashboards & Insights",
    ],
  },
  {
    key: "web-mobile-saas",
    name: "Web / Mobile App / SaaS",
    summary:
      "We create scalable software and applications that deliver seamless user experiences and business value. From enterprise SaaS platforms to web and mobile apps, our solutions are built to perform, adapt, and grow with your needs.",
    items: [
      "Web App Development",
      "Mobile App Development",
      "Custom SaaS Development",
      "Workflow Automation",
      "API Development & System Integration",
      "Progressive Web App (PWA)",
    ],
  },
  {
    key: "ecommerce",
    name: "E-commerce",
    summary:
      "We build intelligent eCommerce platforms that elevate shopping experiences, improve conversions, and drive growth. From multi-vendor marketplaces to subscription commerce and AI-powered personalization, our solutions help retailers thrive in the digital-first era.",
    items: [
      "D2C / Multi-Vendor Marketplace",
      "AI-Powered Personalization & Recommendation",
      "Subscription / Rental & Recurring Billing Models",
      "Checkout, Payment & Fraud Protection",
      "Inventory, Fulfillment & Logistics Integration",
      "UI/UX for Storefront & Customer Experience",
    ],
  },
  {
    key: "cloud",
    name: "Cloud",
    summary:
      "We design cloud architectures that ensure scalability, security, and resilience for modern businesses. From cloud migration to DevOps automation and disaster recovery, our services help you optimize performance and reduce costs.",
    items: [
      "Cloud Migration & Modernization",
      "Cloud Native App Development",
      "Multi-Cloud & Hybrid Cloud Architecture",
      "Cloud Security, Compliance & Governance",
      "Observability, Monitoring & Performance Optimization",
      "Disaster Recovery, Backup & Business Continuity",
    ],
  },
];

export const platformTabs = [
  "AI & ML",
  "Web",
  "Mobile App",
  "UI/UX",
  "eCommerce",
  "Cloud",
];

export const techStackFlat = [
  "Langchain",
  "Python",
  "Tensorflow",
  "OpenAI",
  "Hugging Face",
  "Pinecone Database",
  "Apache Kafka",
  "Elastic Search",
];

/**
 * Real logo marks for the home and services tech marquees. `name` is the label
 * shown beside each mark (kept as visible text so the row still reads as a
 * word); `logo` is a file that exists in public/. The screen-reader summaries
 * on each marquee use these names, and the duplicated (looping) track renders
 * its logos with alt="" while the first track carries the accessible name, so
 * the logo images themselves are decorative.
 */
export const techLogos: { name: string; logo: string }[] = [
  { name: "Langchain", logo: "/tech-langchain.png" },
  { name: "Python", logo: "/tech-python.webp" },
  { name: "TensorFlow", logo: "/tech-tensorflow.png" },
  { name: "OpenAI", logo: "/tech-openai.png" },
  { name: "Hugging Face", logo: "/tech-huggingface.png" },
  { name: "Pinecone Database", logo: "/tech-pinecone.png" },
  { name: "Apache Kafka", logo: "/tech-kafka.png" },
  { name: "Elasticsearch", logo: "/tech-elastic.png" },
];

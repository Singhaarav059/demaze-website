export type Project = {
  slug: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "luxury-car-dealer-software",
    image: "/projects/luxury-car-dealer-software.webp",
    title: "AI-Based software for luxury car dealers",
    description:
      "This comprehensive AI-based software solution was developed for one of India's largest luxury car dealerships to streamline various operations, including used car valuation, new car EMI calculations, car refurbishment management, and serving as a powerful backend system for the sales team. The tool enhances operational efficiency and significantly improves the customer experience, making it an indispensable asset for the dealership.",
    tags: [
      "Accurate Used Car Valuations",
      "Instant New Car EMIs",
      "Seamless Car Refurbishment",
      "Efficient Sales Team Backend",
    ],
    featured: true,
  },
  {
    slug: "investigative-case-management",
    image: "/projects/investigative-case-management.webp",
    title: "Investigative Case Management Software",
    description:
      "It is an advanced web-based software designed to enhance the capabilities of private investigators with AI-powered tools and comprehensive case management features. It supports seamless organization of case information and media, secure data storage, and automated workflow management, accessible from anywhere.",
    tags: [
      "Case Management",
      "AI-Powered Tools",
      "Document Automation, Subscription-based Auto Deposit Pricing Model",
      "Web-Based Access & Data Security",
    ],
    featured: true,
  },
  {
    slug: "luxury-ecommerce-platform",
    image: "/projects/luxury-ecommerce-platform.webp",
    title: "AI-Powered luxury eCommerce Platform",
    description:
      "Developed a modern e-commerce and lifestyle platform focused on sustainability and luxury retail. The project involved designing and implementing intuitive user journeys, personalization mechanisms, and secure data handling to ensure a premium digital experience. The result was a scalable, user-friendly solution aligned with the client's vision for innovation and environmental responsibility.",
    tags: [
      "AI-Powered Search, Try-ons, Recommendations, Price Models",
      "AI-Powered Dashboard & Analytics, Custom Drag & Drop CMS",
      "Live Selling, Workflow Automations, Product Authentication",
      "Smart Order & Inventory Management",
    ],
    featured: true,
  },
  {
    slug: "senior-engagement-platform",
    image: "/projects/senior-engagement-platform.webp",
    title: "Senior Engagement & Support platform",
    description:
      "Sukoon Unlimited is an innovative platform designed to help seniors lead a connected, purposeful, and fulfilled life by providing access to support, meaningful conversations, and activities. The platform offers various services including personalized coaching, meetups, and a community of compassionate individuals, all aimed at reducing isolation and fostering connections. Sukoon Unlimited serves as a dedicated space for seniors to share experiences, seek guidance, and participate in enriching discussions that enhance mental and emotional well-being.",
    tags: [
      "Speak with Sarathis, Club Sukoon",
      "Coaching and Counseling",
      "Meetups and Social Engagements",
      "Sukoon Corner Blog",
    ],
    featured: true,
  },
  {
    slug: "multi-vendor-ecommerce-marketplace",
    image: "/projects/multi-vendor-ecommerce-marketplace.webp",
    title: "Multi-vendor eCommerce Marketplace",
    description:
      "It is Australian and New Zealand's leading online marketplace where shoppers, good causes and retailers can do better shopping to get the latest trends, shoes, dresses, accessories and more. This app contains many features like category-wise products, easy searching, wishlist, brands, drop auction, currency converter, add to cart and buy with many payment options.",
    tags: [
      "Enhanced Shopping Experience",
      "Increased Reach for Retailers",
      "Multi-vendor Features, Live Auction",
      "Achieved 99% Lighthouse Score",
    ],
  },
  {
    slug: "food-grocery-delivery-app",
    image: "/projects/food-grocery-delivery-app.webp",
    title: "Multi-shoppers Food & Grocery Delivery App",
    description:
      "It is a cross-platform application developed using Flutter for user-facing apps and ReactJS for the admin panel. The platform is designed to empower local shop vendors by enabling them to sell their products online and manage their digital stores efficiently. It provides a seamless experience for both customers and shop owners, offering features that facilitate easy product listing, inventory management, and customer interaction.",
    tags: [
      "Buy Grocery, Household Items, & Restaurant's Food",
      "User App, Seller App, Rider (Delivery Person) App",
      "Customer & Delivery Management, Account Management",
      "Complete Control of Digital Store, Delivery Areas Setting",
    ],
  },
  {
    slug: "car-service-engagement-platform",
    image: "/projects/car-service-engagement-platform.webp",
    title: "Car service & customer engagement platform",
    description:
      "The platform is a web and mobile-based application designed to enhance the efficiency of the service department of an authorized car dealership in India. The platform streamlines customer data management, service tracking, automated communication, and role-based access to improve operational efficiency and enhance customer experience. The application automates service reminders, tracks customer interactions, and provides real-time analytics to optimize the dealership's Preventive Maintenance (PM), General Repairs (GR), and Body & Paint (BP) services.",
    tags: [
      "Data Management & Integration",
      "Admin Dashboard & Reporting",
      "Automated Communication & Customer Engagement",
      "Role-Based User Access, Customer Data Management",
    ],
  },
  {
    slug: "b2b-gift-marketplace",
    image: "/projects/b2b-gift-marketplace.webp",
    title: "B2B Gift Marketplace",
    description:
      "It is a comprehensive multi-vendor e-commerce platform developed to streamline the gifting business by connecting resellers and manufacturers in a seamless ecosystem. Designed with scalability, automation, and efficiency in mind, it enables resellers to grow their business, manufacturers to scale production, and administrators to oversee the entire system effortlessly.",
    tags: [
      "Reseller Application",
      "Manufacturer Portal",
      "AI-Powered Product Discovery",
      "Admin Dashboard & Analytics",
    ],
  },
  {
    slug: "global-payment-transfer-platform",
    image: "/projects/global-payment-transfer-platform.webp",
    title: "Global Payment transfer platform",
    description:
      "It is an advanced digital payment platform that utilizes blockchain technology to simplify global money transfers. With a focus on efficiency and security, it enables fast, low-cost, and seamless cross-border transactions using stablecoins. By removing traditional banking intermediaries, it reduces transaction costs and processing times. Whether for personal or business transactions, it ensures funds are transferred quickly, safely, and affordably, offering a more accessible financial solution for individuals and businesses worldwide.",
    tags: ["Global Payments", "Blockchain Technology", "Stablecoin Integration", "User Empowerment"],
  },
  {
    slug: "cma-report-generation-software",
    image: "/projects/cma-report-generation-software.webp",
    title: "CMA Report Generation Software",
    description:
      "The Credit Monitoring Arrangement (CMA) Report Generation Software is a cloud-based platform designed to streamline and automate the preparation of CMA reports. Developed using ReactJS and NodeJS, this platform includes comprehensive features that enable users to create detailed reports with all necessary data tables and charts. The software allows users to prepare, edit, and finalize CMA reports efficiently and provides options to download the reports in PDF and Excel formats.",
    tags: [
      "Comprehensive Data Tables and Charts",
      "Cloud-Based Platform",
      "PDF and Excel Downloads",
      "Efficient Report Preparation",
    ],
  },
  {
    slug: "recruitment-platform",
    image: "/projects/recruitment-platform.webp",
    title: "Recruitment platform",
    description:
      "This is a recruitment consultancy platform that streamlines the hiring process for businesses of all types. With its user-friendly interface and powerful features, it makes it easy for employers to find, manage, and track the progress of job candidates. The platform allows employers to create job listings and provides a real-time chat feature for communication between employers and employees. Businesses can track the progress of candidates throughout the hiring process, from application to offer letter, while candidates can find their best employers to join.",
    tags: [
      "Job Listing Creation",
      "Real-Time Chat Functionality",
      "Candidate Progress Tracking",
      "Analytics & Reporting Tools",
    ],
  },
  {
    slug: "task-staff-document-platform",
    image: "/projects/task-staff-document-platform.webp",
    title: "Task, Staff & Document management platform",
    description:
      "It is a cross-platform application designed to digitally transform insurance and investment agencies by streamlining tasks, staff, and document management. Built for admins, heads, and field & office staff, the platform enables seamless task assignment, real-time communication, and document handling. With real-time messaging powered by WebSockets, team members can collaborate efficiently, while heads can track progress and follow up on tasks. The system ensures secure document storage, categorizing files under respective policy or investment holders, making retrieval quick and organized.",
    tags: [
      "Cross-Platform Task Management",
      "Task Status Updates & Follow-Ups",
      "Family-Wise Document Upload & Search",
      "Enhanced Workflow Efficiency",
    ],
  },
  {
    slug: "educational-courses-lms-platform",
    image: "/projects/educational-courses-lms-platform.webp",
    title: "Educational courses & LMS platform",
    description:
      "A learning management platform built to bring courses, learner progress, and content discovery into one place. It gives learners a personal dashboard to track their courses, uses AI-powered search to help them find the right content faster, and includes VR-based modules for a more immersive way to learn.",
    tags: [
      "Website & Learning Management System",
      "User Dashboard for Learners",
      "Search & AI-Powered Recommendations",
      "VR Content Access for Immersive Learning",
    ],
    note: "Description rewritten to match this project's own feature set, the live site currently shows the B2B Gift Marketplace description here by mistake.",
  },
  {
    slug: "ai-storyboard-platform",
    image: "/projects/ai-storyboard-platform.webp",
    title: "Storyboard creation for films with AI",
    description:
      "It is a cutting-edge platform designed to transform the storyboard creation process using generative AI and advanced algorithms. This innovative tool allows filmmakers, advertisers, and content creators to convert scripts into stunning visual storyboards within minutes. It analyzes scripts, breaks them down scene by scene, and provides powerful editing tools to ensure narrative coherence and creative control.",
    tags: [
      "Script to Storyboard Conversion",
      "Effortless Iteration",
      "Context Consistency & Creative Control",
      "Intuitive Editing Tools",
    ],
  },
  {
    slug: "insurance-management-platform",
    image: "/projects/insurance-management-platform.webp",
    title: "Insurance management platform",
    description:
      "Introducing InsureTech, the ultimate cross-platform Flutter application designed to revolutionize insurance management. With its sleek and modern UI, users can seamlessly store and access all their insurance details in one centralized hub. Gone are the days of missing premium due dates. InsureTech keeps users informed with timely notifications, ensuring they never overlook important payments or coverage updates. From health to auto and everything in between, users can effortlessly manage all types of insurances within this powerful app.",
    tags: [
      "Centralized Insurance Hub, User-Friendly, Modern UI",
      "Timely Notifications, Easy Coverage Updates",
      "Automatic Payment Reminders",
    ],
    note: "Dropped a stray 'Seamless Car Refurbishment' tag, copy-pasted from the car dealer project on the live site and unrelated to insurance.",
  },
  {
    slug: "social-commerce-platform",
    image: "/projects/social-commerce-platform.webp",
    title: "Social media & social commerce platform",
    description:
      "It is a social media and social commerce platform where users can connect through shared interests like singing, dancing, sports, and more. Join community groups, share content, engage with others, and shop directly from peer-to-peer listings using in-app crypto wallets. With features like leaderboards, brand promotions, and a personalized user profile, it creates a dynamic space for creators, consumers, and brands to interact.",
    tags: [
      "Community-Based Interaction, Content Sharing",
      "In-App Messaging",
      "Peer-to-Peer Marketplace, Crypto Wallet Integration",
      "Leaderboards, Engaging & Rewarding Experience",
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

// The three flagship builds get a dedicated, individually art-directed chapter
// on the homepage. Everything else (including other "featured" work) lives in
// the archive index.
const flagshipSlugs = [
  "luxury-car-dealer-software",
  "investigative-case-management",
  "luxury-ecommerce-platform",
] as const;

// Each of these now has its own art-directed chapter component on the homepage
// (FlagshipAutomotive, FlagshipInvestigative, FlagshipEcommerce). They are
// deliberately not driven off a shared template: the whole point of a flagship
// is that its treatment is built around what that project actually did.
export const flagshipProjects = flagshipSlugs.map(
  (slug) => projects.find((p) => p.slug === slug)!,
);

export const archiveProjects = projects.filter((p) => !flagshipSlugs.includes(p.slug as (typeof flagshipSlugs)[number]));

import mongoose from 'mongoose';
import config from '../app/config/index.js';
import Blog from '../app/modules/blog/blog.model.js';
import Project from '../app/modules/project/project.model.js';
import CaseStudy from '../app/modules/caseStudy/caseStudy.model.js';
import Service from '../app/modules/service/service.model.js';
import TeamMember from '../app/modules/teamMember/teamMember.model.js';
import Testimonial from '../app/modules/testimonial/testimonial.model.js';
import FAQ from '../app/modules/faq/faq.model.js';

const MOCK_BLOGS = [
  {
    title: "Why one team beats five vendors",
    contentHtml: "<p>What changes when a single team owns your whole stack instead of five separate contracts.</p>",
    excerpt: "What changes when a single team owns your whole stack instead of five separate contracts.",
    category: "BUSINESS",
    isMock: true
  },
  {
    title: "Scaling through the enrollment spike",
    contentHtml: "<p>How we architected a learning platform to handle 10x traffic without a single dropped connection.</p>",
    excerpt: "How we architected a learning platform to handle 10x traffic without a single dropped connection.",
    category: "EDUCATION",
    isMock: true
  },
  {
    title: "The problem with off-the-shelf AI",
    contentHtml: "<p>Why generic AI tools fail in specialized business environments, and how to build agents that actually understand your context.</p>",
    excerpt: "Why generic AI tools fail in specialized business environments, and how to build agents that actually understand your context.",
    category: "TECHNOLOGY",
    isMock: true
  }
];

const MOCK_PROJECTS = [
  {
    name: "Gnexoai",
    description: "Applied agents and model integrations that demonstrate what our AI Development and AI Agents services deliver in a live product.",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKW9BODTXSDuHpUCoEYxuINZPRr0Voa02EpWeU3uOiHs75Ytyk0QdB8UyLihT9EVeA6EaO-zLfJ3vt_e6J2eeDued9ynTslAxpB25O_6b_bJQs3rPwi3sgC4FAeRgoEZ4X5hhxBdpBWqA3G3UJIzKg4K8GCe1ZPesyGdIp6DgtcOUKhw8QhW2vvkwUbpqwQSDMfKv6o3c1u9sMhKMB4m86kC53UnQ7o7uQpso6j_orKwz_ygLx89f2",
    tags: ["Automation", "Fine-tuning"],
    isMock: true
  },
  {
    name: "GloHosting",
    description: "Our managed hosting infrastructure that we run for our own software and offer directly to clients who need dependable hosting.",
    heroImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfoxLTv3890AwsLDjSg5ifVEE2uJ_Fum7XScuGdtcb1LvK9237XIQ8gEPIm37G-Qb04g8pl4bxbpKsr0Kpe2DmrJPr6WPcScrvH096p-R-3Z3bYlVkpqjMBT3x4lhY7cIhj6RLQJC2BbEcJN20yM4C8KAQlA1I0OtIe9JwhP5esP5eq8VqIesLHldW1mURhRz9ndBwpocGzHlkcBeRmt_14Eb7LZawQXcPR89Xu3ooXUnbQwoASmCe",
    tags: ["99.9% Uptime", "Cloud Native"],
    isMock: true
  }
];

const MOCK_CASES = [
  {
    clientName: "Regional Logistics Operator",
    sector: "BUSINESS",
    teamSize: "50–200 staff",
    challenge: "Dispatch and invoicing ran through spreadsheets and phone calls, capping how many routes the team could take on.",
    approach: "Built a custom dispatch tool with an AI agent that auto-assigns routes and flags exceptions for review.",
    outcome: "Manual dispatch time cut significantly, with the same team now handling 2x daily route capacity.",
    keyStats: [{ number: "40%+", label: "Faster dispatch time" }],
    isMock: true
  },
  {
    clientName: "Independent Training College",
    sector: "EDUCATION",
    teamSize: "11–50 staff",
    challenge: "Learning portal slowed to a crawl during enrollment spikes and exams, overwhelming support staff.",
    approach: "Rebuilt backend architecture and migrated to GloHosting with planned capacity scaling.",
    outcome: "Zero downtime through peak cycles, with avg. support response times held under 1 hour.",
    keyStats: [{ number: "100%", label: "Uptime through enrollment" }],
    isMock: true
  },
  {
    clientName: "Government Department",
    sector: "INSTITUTIONAL",
    teamSize: "200+ staff",
    challenge: "A 15-year-old case-management system was too slow but too risky to touch without service gaps.",
    approach: "Migrated services in stages, running old and new systems in parallel until each module was validated.",
    outcome: "Full modernization completed with zero resident service disruption throughout the transition.",
    keyStats: [{ number: "0", label: "Service interruptions" }],
    isMock: true
  }
];

const MOCK_SERVICES = [
  {
    title: "IT Services",
    description: "Day-to-day infrastructure and support so your systems stay reliable while your team focuses on the work.",
    features: ["Network setup & maintenance", "Cloud migration & infra", "Helpdesk & on-site support"],
    isMock: true
  },
  {
    title: "Software Development",
    description: "Custom-built platforms and internal tools, engineered for the scale you're growing into.",
    features: ["Custom web platforms", "Workflow automation", "API design & integration"],
    isMock: true
  },
  {
    title: "AI Development",
    description: "Applied AI that works with your actual data, built to run reliably inside a real product.",
    features: ["Model fine-tuning", "RAG data pipelines", "Predictive applied ML"],
    isMock: true
  },
  {
    title: "AI Agents",
    description: "Autonomous agents that carry out multi-step work end to end, under defined guardrails.",
    features: ["Workflow automation agents", "Customer-ops agents", "Reasoning & tool-use agents"],
    isMock: true
  },
  {
    title: "App Development",
    description: "Mobile and web apps built from first prototype through to a polished, store-ready release.",
    features: ["Native iOS & Android", "Cross-platform solutions", "App Store launch support"],
    isMock: true
  },
  {
    title: "Hosting",
    description: "Managed hosting via GloHosting so your systems have somewhere dependable to live from day one.",
    features: ["Managed cloud deployment", "Uptime & backup monitoring", "Scaling & security management"],
    isMock: true
  }
];

const MOCK_TEAM = [
  { name: "Founder Name", jobTitle: "FOUNDER / CEO", bio: "Sales, client relationships & strategy.", isMock: true },
  { name: "Technical Lead Name", jobTitle: "TECH LEAD / CTO", bio: "Architecture, delivery quality & hiring.", isMock: true },
  { name: "PM Name", jobTitle: "PROJECT MANAGER", bio: "Client delivery, timelines & quality control.", isMock: true },
  { name: "BD Name", jobTitle: "BUSINESS DEV", bio: "Pipeline, proposals & new relationships.", isMock: true }
];

const MOCK_TESTIMONIALS = [
  {
    quoteText: "We stopped juggling three vendors for infrastructure, software, and support. Techflect just handles it, and tells us plainly when something needs attention.",
    clientName: "Operations Director",
    jobRole: "Business Solutions client",
    isMock: true
  },
  {
    quoteText: "Our learning platform used to slow to a crawl during enrollment week. It hasn't happened since Techflect took over hosting and support.",
    clientName: "Academic Systems Lead",
    jobRole: "Education client",
    isMock: true
  },
  {
    quoteText: "They modernized our case-management system in stages, with zero disruption to the service our staff depend on daily.",
    clientName: "IT Program Manager",
    jobRole: "Institutional client",
    isMock: true
  }
];

const MOCK_FAQS = [
  {
    question: "Do you only work with large enterprises?",
    answer: "No. We work with organizations where technology is critical to operations. That includes fast-growing mid-market businesses, independent schools, and established institutions.",
    isMock: true
  },
  {
    question: "Can we hire you for just one service?",
    answer: "Yes. While our strength is in providing full-spectrum coverage, you can engage us specifically for Software Development, AI, or Hosting if that's where your current gap lies.",
    isMock: true
  },
  {
    question: "How does a project actually start?",
    answer: "With a discovery conversation about your goals, constraints, and existing systems. See the five-step process above. Nothing gets built before a scoped plan is approved.",
    isMock: true
  },
  {
    question: "Are Gnexoai and GloHosting separate companies?",
    answer: "No — they're Techflect projects. Built and run by the same team behind our client work to prove our disciplines in live environments.",
    isMock: true
  }
];

const seedMockData = async () => {
  try {
    await mongoose.connect(config.database_url);
    console.log('Connected to database for seeding mock data.');

    // Remove existing mock data
    await Blog.deleteMany({ isMock: true });
    await Project.deleteMany({ isMock: true });
    await CaseStudy.deleteMany({ isMock: true });
    await Service.deleteMany({ isMock: true });
    await TeamMember.deleteMany({ isMock: true });
    await Testimonial.deleteMany({ isMock: true });
    await FAQ.deleteMany({ isMock: true });

    // Insert new mock data
    await Blog.insertMany(MOCK_BLOGS);
    await Project.insertMany(MOCK_PROJECTS);
    await CaseStudy.insertMany(MOCK_CASES);
    await Service.insertMany(MOCK_SERVICES);
    await TeamMember.insertMany(MOCK_TEAM);
    await Testimonial.insertMany(MOCK_TESTIMONIALS);
    await FAQ.insertMany(MOCK_FAQS);

    console.log('Mock data seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding mock data:', error);
    process.exit(1);
  }
};

seedMockData();

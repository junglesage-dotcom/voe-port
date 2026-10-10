import { SiteSettings, Expertise, PortfolioProject, Research, MediaItem, BlogPost, ContactSubmission } from './types';

const STORAGE_PREFIX = 'voe_';

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
}

// Default settings
const defaultSettings: SiteSettings = {
  name: 'Vanessa Osarumen Ekhaese',
  monogram: 'VOE',
  headline: 'Researcher, Developer & Innovator',
  bio: 'A dedicated professional committed to leveraging technology and research to create meaningful impact. Passionate about building solutions that bridge the gap between innovation and practical application.',
  email: 'vanessa@ekhaese.com',
  phone: '',
  location: 'Nigeria',
  socialLinks: [
    { platform: 'LinkedIn', url: '#' },
    { platform: 'GitHub', url: '#' },
    { platform: 'Twitter', url: '#' },
  ],
  footerText: '© 2024 Vanessa Osarumen Ekhaese. All rights reserved.',
  seoTitle: 'Vanessa Osarumen Ekhaese | Portfolio',
  seoDescription: 'Professional portfolio of Vanessa Osarumen Ekhaese — Researcher, Developer, and Innovator.',
};

const defaultExpertise: Expertise[] = [
  {
    id: '1',
    name: 'Software Development',
    slug: 'software-development',
    summary: 'Building robust, scalable applications with modern technologies.',
    description: 'Full-stack development expertise spanning frontend interfaces, backend systems, and cloud infrastructure. Focused on creating maintainable, performant software solutions.',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Cloud Computing', 'API Design'],
    icon: 'code',
    order: 1,
    featured: true,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Research & Analysis',
    slug: 'research-analysis',
    summary: 'Rigorous research methodologies applied to real-world problems.',
    description: 'Conducting systematic investigations to generate actionable insights. Combining quantitative and qualitative methods to address complex challenges.',
    skills: ['Data Analysis', 'Literature Review', 'Statistical Methods', 'Research Design', 'Technical Writing', 'Peer Review'],
    icon: 'microscope',
    order: 2,
    featured: true,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Project Management',
    slug: 'project-management',
    summary: 'Leading teams and projects from conception to delivery.',
    description: 'Managing cross-functional teams and complex projects using agile methodologies. Ensuring timely delivery while maintaining quality standards.',
    skills: ['Agile/Scrum', 'Stakeholder Management', 'Risk Assessment', 'Resource Planning', 'Communication', 'Documentation'],
    icon: 'target',
    order: 3,
    featured: true,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const defaultProjects: PortfolioProject[] = [
  {
    id: '1',
    title: 'Community Health Platform',
    slug: 'community-health-platform',
    category: 'Web Application',
    summary: 'A digital platform connecting communities with healthcare resources and information.',
    challenge: 'Bridging the gap between healthcare providers and underserved communities through accessible technology.',
    approach: 'Designed a responsive web application with offline capabilities, multi-language support, and intuitive navigation for diverse user groups.',
    outcomes: 'Successfully deployed to pilot communities with positive user feedback and measurable engagement improvements.',
    tools: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    coverImage: '',
    externalUrl: '',
    projectDate: '2024-03',
    order: 1,
    featured: true,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Data Visualization Dashboard',
    slug: 'data-visualization-dashboard',
    category: 'Data Science',
    summary: 'An interactive dashboard for monitoring and analyzing key performance indicators.',
    challenge: 'Making complex datasets accessible and actionable for non-technical stakeholders.',
    approach: 'Built an intuitive interface with real-time data updates, customizable views, and export capabilities.',
    outcomes: 'Reduced decision-making time and improved data-driven insights across the organization.',
    tools: ['D3.js', 'Python', 'Flask', 'SQLite'],
    coverImage: '',
    externalUrl: '',
    projectDate: '2024-01',
    order: 2,
    featured: true,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const defaultResearch: Research[] = [
  {
    id: '1',
    title: 'Technology Adoption in Emerging Markets',
    slug: 'technology-adoption-emerging-markets',
    abstract: 'An investigation into factors influencing technology adoption patterns in developing economies.',
    description: 'This research examines the socio-economic, infrastructural, and cultural factors that affect how communities in emerging markets adopt and integrate new technologies into daily life and business operations.',
    authors: ['Vanessa Osarumen Ekhaese'],
    publicationDate: '2024-02',
    venue: 'Journal of Technology & Development',
    doi: '',
    keywords: ['technology adoption', 'emerging markets', 'digital divide', 'innovation'],
    citationText: 'Ekhaese, V.O. (2024). Technology Adoption in Emerging Markets. Journal of Technology & Development.',
    bibtex: '@article{ekhaese2024technology,\n  title={Technology Adoption in Emerging Markets},\n  author={Ekhaese, Vanessa Osarumen},\n  journal={Journal of Technology & Development},\n  year={2024}\n}',
    externalUrl: '',
    order: 1,
    featured: true,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const defaultMedia: MediaItem[] = [
  {
    id: '1',
    title: 'Tech Conference Presentation',
    description: 'Presenting research findings at the annual technology conference.',
    category: 'Presentations',
    imageUrl: '',
    altText: 'Vanessa presenting at a tech conference',
    date: '2024-03-15',
    attribution: '',
    order: 1,
    featured: true,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Community Workshop',
    description: 'Leading a digital literacy workshop for community members.',
    category: 'Workshops',
    imageUrl: '',
    altText: 'Workshop session with community members',
    date: '2024-02-20',
    attribution: '',
    order: 2,
    featured: false,
    status: 'published',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building for Impact: Technology in Community Development',
    slug: 'building-for-impact-technology-community-development',
    excerpt: 'Exploring how thoughtful technology design can create lasting positive change in communities.',
    body: '## The Intersection of Technology and Community\n\nWhen we build technology with community needs at the center, we create solutions that truly matter. This post explores principles and practices for developing technology that creates lasting impact.\n\n### Understanding Community Context\n\nBefore writing a single line of code, it is essential to understand the community you are building for. This means spending time listening, observing, and learning about existing practices, challenges, and aspirations.\n\n### Designing for Accessibility\n\nTechnology should be accessible to everyone, regardless of technical literacy, device capabilities, or connectivity. This means designing for low-bandwidth environments, multiple languages, and various ability levels.\n\n### Measuring What Matters\n\nImpact is not just about user numbers. It is about whether lives have genuinely improved, whether barriers have been reduced, and whether communities feel empowered rather than dependent.',
    authorName: 'Vanessa Osarumen Ekhaese',
    featuredImage: '',
    featuredImageAlt: '',
    categories: ['Technology', 'Community'],
    tags: ['social-impact', 'development', 'design'],
    publishDate: '2024-03-01',
    updatedAt: '2024-03-01',
    status: 'published',
    featured: true,
    seoTitle: '',
    seoDescription: '',
    createdAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'Research Methods for the Modern Developer',
    slug: 'research-methods-modern-developer',
    excerpt: 'How applying research methodologies can make you a better software developer and problem solver.',
    body: '## Why Developers Should Think Like Researchers\n\nSoftware development and research share more common ground than most people realize. Both require systematic thinking, careful observation, and the ability to draw meaningful conclusions from data.\n\n### The Hypothesis-Driven Approach\n\nEvery feature you build is essentially a hypothesis: "If we build X, users will benefit in Y way." Treating development this way changes how you plan, build, and evaluate your work.\n\n### Data-Informed Decisions\n\nRather than relying on intuition alone, good developers collect and analyze data to guide their decisions. This could be user analytics, performance metrics, or A/B testing results.',
    authorName: 'Vanessa Osarumen Ekhaese',
    featuredImage: '',
    featuredImageAlt: '',
    categories: ['Development', 'Research'],
    tags: ['methodology', 'best-practices', 'growth'],
    publishDate: '2024-02-15',
    updatedAt: '2024-02-15',
    status: 'published',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    createdAt: '2024-02-15T00:00:00Z',
  },
];

// Store API
export const store = {
  // Settings
  getSettings(): SiteSettings {
    return getItem<SiteSettings>('settings', defaultSettings);
  },
  setSettings(settings: SiteSettings): void {
    setItem('settings', settings);
  },

  // Expertise
  getExpertise(): Expertise[] {
    return getItem<Expertise[]>('expertise', defaultExpertise);
  },
  setExpertise(items: Expertise[]): void {
    setItem('expertise', items);
  },
  getPublishedExpertise(): Expertise[] {
    return this.getExpertise().filter(e => e.status === 'published').sort((a, b) => a.order - b.order);
  },

  // Portfolio
  getProjects(): PortfolioProject[] {
    return getItem<PortfolioProject[]>('projects', defaultProjects);
  },
  setProjects(items: PortfolioProject[]): void {
    setItem('projects', items);
  },
  getPublishedProjects(): PortfolioProject[] {
    return this.getProjects().filter(p => p.status === 'published').sort((a, b) => a.order - b.order);
  },

  // Research
  getResearch(): Research[] {
    return getItem<Research[]>('research', defaultResearch);
  },
  setResearch(items: Research[]): void {
    setItem('research', items);
  },
  getPublishedResearch(): Research[] {
    return this.getResearch().filter(r => r.status === 'published').sort((a, b) => a.order - b.order);
  },

  // Media
  getMedia(): MediaItem[] {
    return getItem<MediaItem[]>('media', defaultMedia);
  },
  setMedia(items: MediaItem[]): void {
    setItem('media', items);
  },
  getPublishedMedia(): MediaItem[] {
    return this.getMedia().filter(m => m.status === 'published').sort((a, b) => a.order - b.order);
  },

  // Blog
  getBlogPosts(): BlogPost[] {
    return getItem<BlogPost[]>('blog', defaultBlogPosts);
  },
  setBlogPosts(items: BlogPost[]): void {
    setItem('blog', items);
  },
  getPublishedBlogPosts(): BlogPost[] {
    return this.getBlogPosts()
      .filter(b => b.status === 'published')
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  },

  // Contact submissions
  getSubmissions(): ContactSubmission[] {
    return getItem<ContactSubmission[]>('submissions', []);
  },
  addSubmission(submission: ContactSubmission): void {
    const submissions = this.getSubmissions();
    submissions.unshift(submission);
    setItem('submissions', submissions);
  },
  markSubmissionRead(id: string): void {
    const submissions = this.getSubmissions();
    const sub = submissions.find(s => s.id === id);
    if (sub) sub.read = true;
    setItem('submissions', submissions);
  },
  deleteSubmission(id: string): void {
    setItem('submissions', this.getSubmissions().filter(s => s.id !== id));
  },

  // Auth (simple session management)
  getSession(): { authenticated: boolean; expiresAt: number } | null {
    return getItem('session', null);
  },
  setSession(session: { authenticated: boolean; expiresAt: number } | null): void {
    setItem('session', session);
  },
  isAuthenticated(): boolean {
    const session = this.getSession();
    return session?.authenticated === true && session.expiresAt > Date.now();
  },

  // Reset all data
  resetAll(): void {
    Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX)).forEach(k => localStorage.removeItem(k));
  },
};

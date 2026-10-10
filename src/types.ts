export interface SiteSettings {
  name: string;
  monogram: string;
  headline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: { platform: string; url: string }[];
  footerText: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Expertise {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  skills: string[];
  icon: string;
  order: number;
  featured: boolean;
  status: 'draft' | 'published' | 'unpublished';
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  challenge: string;
  approach: string;
  outcomes: string;
  tools: string[];
  coverImage: string;
  externalUrl: string;
  projectDate: string;
  order: number;
  featured: boolean;
  status: 'draft' | 'published' | 'unpublished';
  createdAt: string;
  updatedAt: string;
}

export interface Research {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  description: string;
  authors: string[];
  publicationDate: string;
  venue: string;
  doi: string;
  keywords: string[];
  citationText: string;
  bibtex: string;
  externalUrl: string;
  order: number;
  featured: boolean;
  status: 'draft' | 'published' | 'unpublished';
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  altText: string;
  date: string;
  attribution: string;
  order: number;
  featured: boolean;
  status: 'draft' | 'published' | 'unpublished';
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  authorName: string;
  featuredImage: string;
  featuredImageAlt: string;
  categories: string[];
  tags: string[];
  publishDate: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'unpublished' | 'scheduled';
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  organization: string;
  projectType: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AdminSession {
  authenticated: boolean;
  expiresAt: number;
}

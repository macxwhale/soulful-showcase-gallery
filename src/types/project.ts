
export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  previewImage: string;
  logo: string;
  tags: string[];
  category: string;
  featured: boolean;
  publishedDate: string;
  techStack: string[];
  aiNarrative: string;
  notes: string;
  is_published?: boolean;
  
  // Enhanced case study fields
  problemStatement?: string;
  solutionApproach?: string;
  userPersonas?: string[];
  designProcess?: DesignProcessStep[];
  results?: ProjectResult[];
  challenges?: string[];
  teamMembers?: TeamMember[];
  projectDuration?: string;
  clientTestimonial?: ClientTestimonial;
  beforeAfterImages?: BeforeAfterImage[];
  prototypeUrl?: string;
  galleryImages?: string[];
  keyFeatures?: string[];
  userJourney?: string;
  designSystem?: DesignSystemInfo;
}

export interface DesignProcessStep {
  title: string;
  description: string;
  duration?: string;
  deliverables?: string[];
  image?: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  description?: string;
  improvement?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

export interface ClientTestimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
  rating?: number;
}

export interface BeforeAfterImage {
  before: string;
  after: string;
  caption?: string;
}

export interface DesignSystemInfo {
  colors?: string[];
  typography?: string[];
  components?: string[];
  description?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  techStack: string[];
  aiNarrative: string;
  logo: string;
  previewImage: string;
  featured: boolean;
  notes: string;
  url: string;
  publishedDate: string;
  is_published: boolean;
  
  // Enhanced case study fields
  problemStatement?: string;
  solutionApproach?: string;
  userPersonas?: string[];
  designProcess?: DesignProcessStep[];
  results?: ProjectResult[];
  challenges?: string[];
  teamMembers?: TeamMember[];
  projectDuration?: string;
  clientTestimonial?: ClientTestimonial;
  beforeAfterImages?: BeforeAfterImage[];
  prototypeUrl?: string;
  galleryImages?: string[];
  keyFeatures?: string[];
  userJourney?: string;
  designSystem?: DesignSystemInfo;
}

// Updated database structure to properly handle JSON metadata
export interface DatabaseProject {
  id: string;
  domain: string;
  metadata: ProjectData; // This will be JSON in the database but typed as ProjectData
  created_at: string;
  updated_at: string;
  created_by?: string;
}

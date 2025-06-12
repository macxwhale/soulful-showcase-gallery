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
  challengeDetails?: ChallengeDetails;
}

export interface ChallengeDetails {
  businessProblem: string;
  userProblem: string;
  targetUsers: TargetUser[];
  painPoints: string[];
  keyRequirements: string[];
  constraints: ProjectConstraint[];
  successCriteria: string[];
  stakeholderGoals: StakeholderGoal[];
  competitiveContext?: string;
  businessImpact?: string;
}

export interface TargetUser {
  persona: string;
  demographics: string;
  goals: string[];
  frustrations: string[];
  context: string;
}

export interface ProjectConstraint {
  type: 'technical' | 'business' | 'design' | 'regulatory' | 'timeline' | 'budget';
  description: string;
  impact: string;
}

export interface StakeholderGoal {
  stakeholder: string;
  goals: string[];
  priority: 'high' | 'medium' | 'low';
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
  category?: 'business' | 'user' | 'technical' | 'design';
  timeframe?: string;
  methodology?: string;
}

export interface BusinessImpact {
  revenue?: {
    increase?: string;
    value?: string;
    timeframe?: string;
  };
  conversion?: {
    before?: string;
    after?: string;
    improvement?: string;
  };
  engagement?: {
    metric: string;
    improvement: string;
    details?: string;
  }[];
  cost?: {
    savings?: string;
    efficiency?: string;
  };
  roi?: string;
}

export interface UserFeedback {
  type: 'testimonial' | 'review' | 'survey' | 'interview';
  quote: string;
  author?: string;
  role?: string;
  rating?: number;
  source?: string;
  date?: string;
}

export interface ProjectAwards {
  title: string;
  organization: string;
  year: string;
  category?: string;
  link?: string;
}

export interface LessonsLearned {
  challenge: string;
  solution: string;
  outcome: string;
  application?: string;
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
  challengeDetails?: ChallengeDetails;
  businessImpact?: BusinessImpact;
  userFeedback?: UserFeedback[];
  projectAwards?: ProjectAwards[];
  lessonsLearned?: LessonsLearned[];
  usageStatistics?: {
    activeUsers?: string;
    sessions?: string;
    retention?: string;
    satisfaction?: string;
  };
  stakeholderFeedback?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    context?: string;
  }[];
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

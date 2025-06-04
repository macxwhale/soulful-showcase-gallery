
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
}

// Simplified database structure with domain-based storage
export interface DatabaseProject {
  id: string;
  domain: string;
  metadata: ProjectData; // All project data stored as JSON
  created_at: string;
  updated_at: string;
  created_by?: string;
}

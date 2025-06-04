
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

// Updated database structure to properly handle JSON metadata
export interface DatabaseProject {
  id: string;
  domain: string;
  metadata: ProjectData; // This will be JSON in the database but typed as ProjectData
  created_at: string;
  updated_at: string;
  created_by?: string;
}

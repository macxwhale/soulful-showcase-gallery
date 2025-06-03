
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

export interface DatabaseProject {
  id: string;
  domain: string;
  project_data: Project;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

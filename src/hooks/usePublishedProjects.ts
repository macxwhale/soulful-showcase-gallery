
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DatabaseProject, Project, ProjectData } from '@/types/project';

export const usePublishedProjects = () => {
  return useQuery({
    queryKey: ['published-projects'],
    queryFn: async () => {
      console.log('Fetching published projects from database...');
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching published projects:', error);
        throw error;
      }
      
      console.log('Fetched projects:', data);
      
      // Transform the raw database data to match our types
      const typedProjects: DatabaseProject[] = data.map(project => ({
        ...project,
        metadata: project.metadata as unknown as ProjectData
      }));
      
      // Filter published projects and transform to frontend Project format
      const publishedProjects = typedProjects
        .filter((project: DatabaseProject) => project.metadata.is_published)
        .map((project: DatabaseProject): Project => ({
          id: project.id,
          title: project.metadata.title,
          description: project.metadata.description,
          url: project.metadata.url || project.domain,
          previewImage: project.metadata.previewImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          logo: project.metadata.logo || '🚀',
          tags: project.metadata.tags || [],
          category: project.metadata.category || 'Web Development',
          featured: project.metadata.featured || false,
          publishedDate: project.metadata.publishedDate || new Date(project.created_at).toISOString().split('T')[0],
          techStack: project.metadata.techStack || [],
          aiNarrative: project.metadata.aiNarrative || project.metadata.description,
          notes: project.metadata.notes || '',
          is_published: project.metadata.is_published
        }));
      
      console.log('Transformed published projects:', publishedProjects);
      return publishedProjects;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};

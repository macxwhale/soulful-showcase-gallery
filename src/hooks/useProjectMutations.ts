
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProjectData } from '@/types/project';

export const useProjectMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Analyze website mutation
  const analyzeMutation = useMutation({
    mutationFn: async (domain: string) => {
      const { data, error } = await supabase.functions.invoke('analyze-website', {
        body: { domain }
      });
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }
    },
    onError: (error: any) => {
      toast({
        title: "Analysis Failed",
        description: error.message || 'Failed to analyze website',
        variant: "destructive"
      });
    }
  });

  // Save project mutation
  const saveMutation = useMutation({
    mutationFn: async (data: { domain: string; projectData: ProjectData; isUpdate?: boolean; id?: string }) => {
      if (data.isUpdate && data.id) {
        const { error } = await supabase
          .from('projects')
          .update({ metadata: data.projectData as unknown as any })
          .eq('id', data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert({ domain: data.domain, metadata: data.projectData as unknown as any });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({
        title: "Success",
        description: "Project saved successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Save Failed",
        description: error.message || 'Failed to save project',
        variant: "destructive"
      });
    }
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast({
        title: "Success",
        description: "Project deleted successfully."
      });
    }
  });

  return {
    analyzeMutation,
    saveMutation,
    deleteMutation
  };
};

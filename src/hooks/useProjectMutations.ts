
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProjectData } from '@/types/project';
import { captureWebsiteScreenshot } from '@/utils/screenshotCapture';

export const useProjectMutations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Analyze website mutation
  const analyzeMutation = useMutation({
    mutationFn: async (domain: string) => {
      console.log('🔍 Starting website analysis for:', domain);
      
      // First, analyze the website
      const { data, error } = await supabase.functions.invoke('analyze-website', {
        body: { domain }
      });
      
      if (error) throw error;
      
      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }
      
      console.log('✅ Website analysis completed, now capturing screenshot...');
      
      // Then, capture a screenshot
      try {
        const screenshot = await captureWebsiteScreenshot(domain, {
          width: 1200,
          height: 630,
          format: 'png',
          quality: 0.9
        });
        
        console.log('📸 Screenshot captured successfully');
        
        // Add screenshot to project data
        data.data.previewImage = screenshot;
        data.data.autoGeneratedScreenshot = true;
        
      } catch (screenshotError) {
        console.warn('📸 Screenshot capture failed, using default:', screenshotError);
        // Don't fail the entire analysis if screenshot fails
        data.data.previewImage = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80';
        data.data.autoGeneratedScreenshot = false;
      }
      
      return data;
    },
    onSuccess: (data) => {
      if (!data.success) {
        throw new Error(data.error || 'Analysis failed');
      }
      console.log('🎉 Analysis and screenshot generation completed!');
    },
    onError: (error: any) => {
      console.error('❌ Analysis failed:', error);
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

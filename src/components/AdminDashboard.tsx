
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProjectData, DatabaseProject } from '@/types/project';
import { useProjectMutations } from '@/hooks/useProjectMutations';
import WebsiteAnalysisForm from './admin/WebsiteAnalysisForm';
import ProjectPreview from './admin/ProjectPreview';
import ProjectsList from './admin/ProjectsList';

const AdminDashboard = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewData, setPreviewData] = useState<ProjectData | null>(null);
  const [editingProject, setEditingProject] = useState<DatabaseProject | null>(null);
  const [currentDomain, setCurrentDomain] = useState('');
  const { toast } = useToast();

  const { analyzeMutation, saveMutation, deleteMutation } = useProjectMutations();

  // Fetch all projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform the data to match our types, handling JSON metadata
      return data.map(project => ({
        ...project,
        metadata: project.metadata as unknown as ProjectData
      })) as DatabaseProject[];
    }
  });

  const handleAnalyze = async (domain: string) => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setCurrentDomain(domain);
    
    try {
      const result = await analyzeMutation.mutateAsync(domain);
      if (result.success) {
        setPreviewData(result.data);
        toast({
          title: "Analysis Complete",
          description: "Website analysis completed successfully."
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = (data: ProjectData) => {
    if (editingProject) {
      saveMutation.mutate({
        domain: editingProject.domain,
        projectData: data,
        isUpdate: true,
        id: editingProject.id
      });
    } else {
      saveMutation.mutate({ domain: currentDomain, projectData: data });
    }
    
    // Reset state after save
    setPreviewData(null);
    setEditingProject(null);
    setCurrentDomain('');
  };

  const handleCancel = () => {
    setPreviewData(null);
    setEditingProject(null);
    setCurrentDomain('');
  };

  const handleEdit = (project: DatabaseProject) => {
    setEditingProject(project);
    setPreviewData(null);
  };

  const handleTogglePublish = (project: DatabaseProject) => {
    const updatedData = {
      ...project.metadata,
      is_published: !project.metadata.is_published
    };
    
    saveMutation.mutate({
      domain: project.domain,
      projectData: updatedData,
      isUpdate: true,
      id: project.id
    });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <WebsiteAnalysisForm 
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />

        {(previewData || editingProject) && (
          <ProjectPreview
            data={previewData || editingProject!.metadata}
            domain={currentDomain || editingProject!.domain}
            onSave={handleSave}
            onCancel={handleCancel}
            isEditing={!!editingProject}
          />
        )}

        <ProjectsList
          projects={projects}
          isLoading={isLoading}
          onEdit={handleEdit}
          onTogglePublish={handleTogglePublish}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;

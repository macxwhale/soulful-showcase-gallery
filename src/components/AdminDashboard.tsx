
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

  // Fetch all projects from the database
  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      console.log('Fetching projects from database...');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }
      
      console.log('Fetched projects:', data);
      
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
      console.log('Analyzing domain:', domain);
      const result = await analyzeMutation.mutateAsync(domain);
      if (result.success) {
        console.log('Analysis successful:', result.data);
        setPreviewData(result.data);
        toast({
          title: "Analysis Complete",
          description: "Website analysis completed successfully."
        });
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = (data: ProjectData) => {
    console.log('Saving project data:', data);
    
    if (editingProject) {
      console.log('Updating existing project:', editingProject.id);
      saveMutation.mutate({
        domain: editingProject.domain,
        projectData: data,
        isUpdate: true,
        id: editingProject.id
      });
    } else {
      console.log('Creating new project for domain:', currentDomain);
      saveMutation.mutate({ domain: currentDomain, projectData: data });
    }
    
    // Reset state after save
    setPreviewData(null);
    setEditingProject(null);
    setCurrentDomain('');
  };

  const handleCancel = () => {
    console.log('Canceling edit/preview');
    setPreviewData(null);
    setEditingProject(null);
    setCurrentDomain('');
  };

  const handleEdit = (project: DatabaseProject) => {
    console.log('Editing project:', project.id);
    setEditingProject(project);
    setPreviewData(null);
  };

  const handleTogglePublish = (project: DatabaseProject) => {
    const newStatus = !project.metadata.is_published;
    console.log(`${newStatus ? 'Publishing' : 'Unpublishing'} project:`, project.id);
    
    const updatedData = {
      ...project.metadata,
      is_published: newStatus
    };
    
    saveMutation.mutate({
      domain: project.domain,
      projectData: updatedData,
      isUpdate: true,
      id: project.id
    });
  };

  const handleDelete = (id: string) => {
    console.log('Deleting project:', id);
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and curate your project portfolio</p>
        </div>
        
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

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Send, Eye, EyeOff, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProjectData, DatabaseProject } from '@/types/project';

const AdminDashboard = () => {
  const [domain, setDomain] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewData, setPreviewData] = useState<ProjectData | null>(null);
  const [editingProject, setEditingProject] = useState<DatabaseProject | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      if (data.success) {
        setPreviewData(data.data);
        toast({
          title: "Analysis Complete",
          description: "Website analysis completed successfully."
        });
      } else {
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
          .update({ metadata: data.projectData as any })
          .eq('id', data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert({ domain: data.domain, metadata: data.projectData as any });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      setPreviewData(null);
      setEditingProject(null);
      setDomain('');
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

  const handleAnalyze = async () => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      await analyzeMutation.mutateAsync(domain);
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
      saveMutation.mutate({ domain, projectData: data });
    }
  };

  const togglePublish = (project: DatabaseProject) => {
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        {/* Domain Analysis Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze New Website</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter domain (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1"
                disabled={isAnalyzing}
              />
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !domain.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        {(previewData || editingProject) && (
          <ProjectPreview
            data={previewData || editingProject!.metadata}
            domain={domain || editingProject!.domain}
            onSave={handleSave}
            onCancel={() => {
              setPreviewData(null);
              setEditingProject(null);
            }}
            isEditing={!!editingProject}
          />
        )}

        {/* Projects List */}
        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {projects?.map((project) => (
                  <div
                    key={project.id}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold">{project.metadata.title}</h3>
                        <Badge variant={project.metadata.is_published ? "default" : "secondary"}>
                          {project.metadata.is_published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{project.domain}</p>
                      <p className="text-sm text-gray-500">{project.metadata.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProject(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => togglePublish(project)}
                      >
                        {project.metadata.is_published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMutation.mutate(project.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {projects?.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No projects yet. Start by analyzing a website above.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Project Preview Component
interface ProjectPreviewProps {
  data: ProjectData;
  domain: string;
  onSave: (data: ProjectData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const ProjectPreview = ({ data, domain, onSave, onCancel, isEditing = false }: ProjectPreviewProps) => {
  const [editedData, setEditedData] = useState<ProjectData>(data);

  const updateField = (field: keyof ProjectData, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Project' : 'Preview & Edit'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={editedData.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Input
              value={editedData.category}
              onChange={(e) => updateField('category', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            value={editedData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">AI Narrative</label>
          <Textarea
            value={editedData.aiNarrative}
            onChange={(e) => updateField('aiNarrative', e.target.value)}
            rows={6}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <Input
              value={editedData.tags.join(', ')}
              onChange={(e) => updateField('tags', e.target.value.split(',').map(t => t.trim()))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
            <Input
              value={editedData.techStack.join(', ')}
              onChange={(e) => updateField('techStack', e.target.value.split(',').map(t => t.trim()))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <Textarea
            value={editedData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={() => onSave(editedData)}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? 'Update' : 'Save'} Project
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;

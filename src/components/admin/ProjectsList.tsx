
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye, EyeOff, Trash2, Star } from 'lucide-react';
import { DatabaseProject } from '@/types/project';

interface ProjectsListProps {
  projects: DatabaseProject[] | undefined;
  isLoading: boolean;
  onEdit: (project: DatabaseProject) => void;
  onTogglePublish: (project: DatabaseProject) => void;
  onDelete: (id: string) => void;
}

const ProjectsList = ({ projects, isLoading, onEdit, onTogglePublish, onDelete }: ProjectsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Projects ({projects?.length || 0})</CardTitle>
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
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        {project.metadata.logo && (
                          <span className="text-lg">{project.metadata.logo}</span>
                        )}
                        <h3 className="font-semibold text-lg">{project.metadata.title}</h3>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant={project.metadata.is_published ? "default" : "secondary"}>
                          {project.metadata.is_published ? "Published" : "Draft"}
                        </Badge>
                        {project.metadata.featured && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline">{project.metadata.category}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{project.domain}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{project.metadata.description}</p>
                    
                    {project.metadata.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {project.metadata.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.metadata.tags.length > 3 && (
                          <span className="text-xs px-2 py-1 text-gray-500">
                            +{project.metadata.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      Published: {project.metadata.publishedDate || 'Not set'} • Created: {new Date(project.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onTogglePublish(project)}
                      title={project.metadata.is_published ? "Unpublish" : "Publish"}
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
                      onClick={() => onDelete(project.id)}
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {projects?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🚀</div>
                <p className="text-gray-500 text-lg mb-2">No projects yet</p>
                <p className="text-gray-400">Start by analyzing a website above to create your first project.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsList;

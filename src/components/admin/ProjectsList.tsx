
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Eye, EyeOff, Trash2 } from 'lucide-react';
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
                    onClick={() => onEdit(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onTogglePublish(project)}
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
  );
};

export default ProjectsList;

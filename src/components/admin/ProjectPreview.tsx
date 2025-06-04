
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { ProjectData } from '@/types/project';

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

export default ProjectPreview;

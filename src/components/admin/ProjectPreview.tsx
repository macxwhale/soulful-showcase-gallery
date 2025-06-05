
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
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
        {/* Basic Information */}
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

        {/* URLs and Media */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Website URL</label>
            <Input
              value={editedData.url}
              onChange={(e) => updateField('url', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Preview Image URL</label>
            <Input
              value={editedData.previewImage}
              onChange={(e) => updateField('previewImage', e.target.value)}
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Logo/Emoji</label>
            <Input
              value={editedData.logo}
              onChange={(e) => updateField('logo', e.target.value)}
              placeholder="🚀"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Published Date</label>
            <Input
              type="date"
              value={editedData.publishedDate}
              onChange={(e) => updateField('publishedDate', e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={editedData.featured}
                onCheckedChange={(checked) => updateField('featured', checked)}
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={editedData.is_published}
                onCheckedChange={(checked) => updateField('is_published', checked)}
              />
              <label htmlFor="published" className="text-sm font-medium">Published</label>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-2">AI Narrative</label>
          <Textarea
            value={editedData.aiNarrative}
            onChange={(e) => updateField('aiNarrative', e.target.value)}
            rows={6}
            placeholder="Tell the story behind this project..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <Input
              value={editedData.tags.join(', ')}
              onChange={(e) => updateField('tags', e.target.value.split(',').map(t => t.trim()))}
              placeholder="React, TypeScript, Tailwind"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
            <Input
              value={editedData.techStack.join(', ')}
              onChange={(e) => updateField('techStack', e.target.value.split(',').map(t => t.trim()))}
              placeholder="React, Node.js, PostgreSQL"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <Textarea
            value={editedData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            rows={3}
            placeholder="Additional notes, achievements, or special mentions..."
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

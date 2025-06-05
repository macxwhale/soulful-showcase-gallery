
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2, Camera } from 'lucide-react';

interface WebsiteAnalysisFormProps {
  onAnalyze: (domain: string) => void;
  isAnalyzing: boolean;
}

const WebsiteAnalysisForm = ({ onAnalyze, isAnalyzing }: WebsiteAnalysisFormProps) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      onAnalyze(domain.trim());
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Website Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter domain (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1"
            disabled={isAnalyzing}
          />
          <Button type="submit" disabled={isAnalyzing || !domain.trim()}>
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing & Capturing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Analyze Website
              </>
            )}
          </Button>
        </form>
        
        {isAnalyzing && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800">
              <Camera className="w-4 h-4" />
              <span className="font-medium">Auto-generating screenshot...</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              We're analyzing the website and capturing a beautiful screenshot for you!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WebsiteAnalysisForm;

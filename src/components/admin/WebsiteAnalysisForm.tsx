
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send } from 'lucide-react';

interface WebsiteAnalysisFormProps {
  onAnalyze: (domain: string) => Promise<void>;
  isAnalyzing: boolean;
}

const WebsiteAnalysisForm = ({ onAnalyze, isAnalyzing }: WebsiteAnalysisFormProps) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = async () => {
    if (!domain.trim()) return;
    await onAnalyze(domain);
    setDomain('');
  };

  return (
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
            onClick={handleSubmit}
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
  );
};

export default WebsiteAnalysisForm;

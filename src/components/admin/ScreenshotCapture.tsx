
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Camera, Download, Eye, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { captureHeroSection, ScreenshotOptions } from '@/utils/screenshotCapture';

const ScreenshotCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [options, setOptions] = useState<ScreenshotOptions>({
    width: 1200,
    height: 630,
    format: 'png',
    quality: 0.9
  });
  const { toast } = useToast();

  const presetDimensions = [
    { label: 'Social Media (1200x630)', width: 1200, height: 630 },
    { label: 'Full HD (1920x1080)', width: 1920, height: 1080 },
    { label: 'Desktop (1440x900)', width: 1440, height: 900 },
    { label: 'Mobile (375x812)', width: 375, height: 812 },
    { label: 'Thumbnail (400x225)', width: 400, height: 225 }
  ];

  const handleCapture = async () => {
    setIsCapturing(true);
    
    try {
      // Open homepage in a new window for capture
      const newWindow = window.open('/', '_blank', `width=${options.width},height=${options.height}`);
      
      if (!newWindow) {
        throw new Error('Could not open preview window');
      }

      // Wait for the window to load
      await new Promise(resolve => {
        newWindow.onload = resolve;
        setTimeout(resolve, 3000); // Fallback timeout
      });

      // Capture the hero section
      const screenshotData = await captureHeroSection(options);
      setScreenshot(screenshotData);
      
      // Close the preview window
      newWindow.close();
      
      toast({
        title: "Screenshot Captured! 📸",
        description: "Hero section captured successfully."
      });
    } catch (error) {
      console.error('Capture failed:', error);
      toast({
        title: "Capture Failed",
        description: "Could not capture the hero section. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsCapturing(false);
    }
  };

  const handleDownload = () => {
    if (!screenshot) return;
    
    const link = document.createElement('a');
    link.download = `hero-section-${Date.now()}.${options.format}`;
    link.href = screenshot;
    link.click();
  };

  const handlePreview = () => {
    if (!screenshot) return;
    
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>Hero Section Preview</title></head>
          <body style="margin:0;padding:20px;background:#f0f0f0;display:flex;justify-content:center;align-items:center;">
            <img src="${screenshot}" style="max-width:100%;max-height:100%;box-shadow:0 10px 30px rgba(0,0,0,0.3);border-radius:8px;" />
          </body>
        </html>
      `);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Hero Section Screenshot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Preset Dimensions</label>
            <Select onValueChange={(value) => {
              const preset = presetDimensions.find(p => p.label === value);
              if (preset) {
                setOptions(prev => ({ ...prev, width: preset.width, height: preset.height }));
              }
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Choose preset" />
              </SelectTrigger>
              <SelectContent>
                {presetDimensions.map((preset) => (
                  <SelectItem key={preset.label} value={preset.label}>
                    {preset.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Width</label>
            <Input
              type="number"
              value={options.width}
              onChange={(e) => setOptions(prev => ({ ...prev, width: parseInt(e.target.value) || 1200 }))}
              min="100"
              max="4000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Height</label>
            <Input
              type="number"
              value={options.height}
              onChange={(e) => setOptions(prev => ({ ...prev, height: parseInt(e.target.value) || 630 }))}
              min="100"
              max="4000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <Select value={options.format} onValueChange={(value: 'png' | 'jpeg' | 'webp') => 
              setOptions(prev => ({ ...prev, format: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Capture Button */}
        <div className="flex gap-3">
          <Button 
            onClick={handleCapture} 
            disabled={isCapturing}
            className="flex-1"
          >
            {isCapturing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Capturing...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 mr-2" />
                Capture Hero Section
              </>
            )}
          </Button>
        </div>

        {/* Preview */}
        {screenshot && (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Screenshot Preview</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={handlePreview}>
                    <Eye className="w-4 h-4 mr-1" />
                    Full View
                  </Button>
                  <Button size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="relative bg-white rounded border overflow-hidden">
                <img 
                  src={screenshot} 
                  alt="Hero section screenshot"
                  className="w-full h-auto max-h-64 object-contain"
                />
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                Dimensions: {options.width}x{options.height} • Format: {options.format?.toUpperCase()}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">📸 How it works:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Choose your preferred dimensions and format</li>
            <li>• Click "Capture Hero Section" to take a screenshot</li>
            <li>• A new window will open briefly to capture the hero section</li>
            <li>• Download or preview your beautiful screenshot!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenshotCapture;

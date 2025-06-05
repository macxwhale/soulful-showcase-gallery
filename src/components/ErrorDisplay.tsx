
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorDisplay = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  className = "" 
}: ErrorDisplayProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-slate-600 text-lg mb-4 text-center max-w-md">{message}</p>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorDisplay;

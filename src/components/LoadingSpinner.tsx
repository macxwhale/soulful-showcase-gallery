
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

const LoadingSpinner = ({ message = "Loading...", className = "" }: LoadingSpinnerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <Loader2 className="w-8 h-8 animate-spin text-rose-500 mb-4" />
      <p className="text-slate-600 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;

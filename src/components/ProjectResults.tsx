
import { ProjectResult } from "@/types/project";
import { TrendingUp, Award, Target } from "lucide-react";

interface ProjectResultsProps {
  results: ProjectResult[];
}

const ProjectResults = ({ results }: ProjectResultsProps) => {
  const getIcon = (metric: string) => {
    const metricLower = metric.toLowerCase();
    if (metricLower.includes('increase') || metricLower.includes('improvement') || metricLower.includes('growth')) {
      return <TrendingUp className="w-6 h-6" />;
    }
    if (metricLower.includes('award') || metricLower.includes('recognition')) {
      return <Award className="w-6 h-6" />;
    }
    return <Target className="w-6 h-6" />;
  };

  const getCardColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-purple-500 to-purple-600',
      'from-rose-500 to-rose-600',
      'from-orange-500 to-orange-600',
      'from-teal-500 to-teal-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Project Impact & Results</h3>
        <p className="text-slate-600">Measurable outcomes that demonstrate the success of our design solution</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getCardColor(index)} p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300`}
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
              <div className="w-full h-full rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
            </div>
            
            {/* Icon */}
            <div className="relative z-10 mb-4">
              {getIcon(result.metric)}
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="text-3xl font-bold mb-2">{result.value}</div>
              <div className="text-lg font-semibold mb-2">{result.metric}</div>
              {result.improvement && (
                <div className="text-sm opacity-90 mb-2">
                  ↗️ {result.improvement}
                </div>
              )}
              {result.description && (
                <p className="text-sm opacity-80 leading-relaxed">{result.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
        <h4 className="text-xl font-bold text-slate-800 mb-4">Impact Summary</h4>
        <p className="text-slate-600 leading-relaxed">
          Our comprehensive design approach delivered measurable improvements across key performance indicators. 
          These results demonstrate the effectiveness of user-centered design in achieving business objectives 
          and enhancing user experience.
        </p>
      </div>
    </div>
  );
};

export default ProjectResults;

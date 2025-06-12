
import { DesignProcessStep } from "@/types/project";
import { Clock, CheckCircle } from "lucide-react";

interface DesignProcessTimelineProps {
  steps: DesignProcessStep[];
}

const DesignProcessTimeline = ({ steps }: DesignProcessTimelineProps) => {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-slate-800 mb-8">Design Process</h3>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-purple-200"></div>
        
        {steps.map((step, index) => (
          <div key={index} className="relative flex items-start space-x-6 pb-12 last:pb-0">
            {/* Timeline Node */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-16 left-1/2 w-0.5 h-12 bg-gradient-to-b from-blue-500 to-purple-500 transform -translate-x-1/2"></div>
              )}
            </div>
            
            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-slate-800">{step.title}</h4>
                  {step.duration && (
                    <div className="flex items-center text-slate-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.duration}
                    </div>
                  )}
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-4">{step.description}</p>
                
                {step.deliverables && step.deliverables.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-slate-800 mb-2">Deliverables:</h5>
                    <ul className="space-y-1">
                      {step.deliverables.map((deliverable, delIndex) => (
                        <li key={delIndex} className="flex items-center text-slate-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {step.image && (
                  <div className="mt-4">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignProcessTimeline;

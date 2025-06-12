
import { ProjectResult, BusinessImpact, UserFeedback, ProjectAwards, LessonsLearned } from "@/types/project";
import { TrendingUp, Award, Target, DollarSign, Users, Star, Trophy, Lightbulb, BarChart3 } from "lucide-react";

interface ProjectResultsProps {
  results?: ProjectResult[];
  businessImpact?: BusinessImpact;
  userFeedback?: UserFeedback[];
  projectAwards?: ProjectAwards[];
  lessonsLearned?: LessonsLearned[];
  usageStatistics?: {
    activeUsers?: string;
    sessions?: string;
    retention?: string;
    satisfaction?: string;
  };
  stakeholderFeedback?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    context?: string;
  }[];
}

const ProjectResults = ({ 
  results = [], 
  businessImpact, 
  userFeedback = [], 
  projectAwards = [], 
  lessonsLearned = [],
  usageStatistics,
  stakeholderFeedback = []
}: ProjectResultsProps) => {
  const getIcon = (metric: string, category?: string) => {
    if (category === 'business') return <DollarSign className="w-6 h-6" />;
    if (category === 'user') return <Users className="w-6 h-6" />;
    if (category === 'technical') return <BarChart3 className="w-6 h-6" />;
    
    const metricLower = metric.toLowerCase();
    if (metricLower.includes('increase') || metricLower.includes('improvement') || metricLower.includes('growth')) {
      return <TrendingUp className="w-6 h-6" />;
    }
    if (metricLower.includes('award') || metricLower.includes('recognition')) {
      return <Award className="w-6 h-6" />;
    }
    return <Target className="w-6 h-6" />;
  };

  const getCardColor = (index: number, category?: string) => {
    if (category === 'business') return 'from-green-500 to-green-600';
    if (category === 'user') return 'from-blue-500 to-blue-600';
    if (category === 'technical') return 'from-purple-500 to-purple-600';
    if (category === 'design') return 'from-pink-500 to-pink-600';
    
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

  const hasAnyContent = results.length > 0 || businessImpact || userFeedback.length > 0 || 
                       projectAwards.length > 0 || lessonsLearned.length > 0 || usageStatistics ||
                       stakeholderFeedback.length > 0;

  if (!hasAnyContent) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <p className="text-gray-500 text-lg">Project results coming soon</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-bold text-slate-800 mb-4">Impact & Results</h3>
        <p className="text-slate-600 text-lg">Measurable outcomes demonstrating the success and ROI of our design solution</p>
      </div>
      
      {/* Key Metrics */}
      {results.length > 0 && (
        <div>
          <h4 className="text-2xl font-bold text-slate-800 mb-6">Key Performance Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getCardColor(index, result.category)} p-6 text-white shadow-xl transform hover:scale-105 transition-transform duration-300`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <div className="w-full h-full rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
                </div>
                
                {/* Icon */}
                <div className="relative z-10 mb-4">
                  {getIcon(result.metric, result.category)}
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
                  {result.timeframe && (
                    <div className="text-xs opacity-75 mb-2">
                      📅 {result.timeframe}
                    </div>
                  )}
                  {result.description && (
                    <p className="text-sm opacity-80 leading-relaxed">{result.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Business Impact */}
      {businessImpact && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
          <div className="flex items-center mb-6">
            <DollarSign className="w-8 h-8 text-green-600 mr-3" />
            <h4 className="text-2xl font-bold text-green-800">Business Impact</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessImpact.revenue && (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">{businessImpact.revenue.increase}</div>
                <div className="text-green-600">Revenue Increase</div>
                {businessImpact.revenue.timeframe && (
                  <div className="text-sm text-green-500">{businessImpact.revenue.timeframe}</div>
                )}
              </div>
            )}
            
            {businessImpact.conversion && (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">{businessImpact.conversion.improvement}</div>
                <div className="text-green-600">Conversion Improvement</div>
                <div className="text-sm text-green-500">
                  {businessImpact.conversion.before} → {businessImpact.conversion.after}
                </div>
              </div>
            )}
            
            {businessImpact.cost?.savings && (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">{businessImpact.cost.savings}</div>
                <div className="text-green-600">Cost Savings</div>
              </div>
            )}
            
            {businessImpact.roi && (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">{businessImpact.roi}</div>
                <div className="text-green-600">Return on Investment</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Usage Statistics */}
      {usageStatistics && (
        <div>
          <h4 className="text-2xl font-bold text-slate-800 mb-6">Live Product Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {usageStatistics.activeUsers && (
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-800">{usageStatistics.activeUsers}</div>
                <div className="text-blue-600">Active Users</div>
              </div>
            )}
            
            {usageStatistics.sessions && (
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-800">{usageStatistics.sessions}</div>
                <div className="text-purple-600">Sessions</div>
              </div>
            )}
            
            {usageStatistics.retention && (
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-orange-800">{usageStatistics.retention}</div>
                <div className="text-orange-600">Retention Rate</div>
              </div>
            )}
            
            {usageStatistics.satisfaction && (
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-800">{usageStatistics.satisfaction}</div>
                <div className="text-green-600">Satisfaction Score</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Feedback */}
      {userFeedback.length > 0 && (
        <div>
          <h4 className="text-2xl font-bold text-slate-800 mb-6">User Feedback</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userFeedback.map((feedback, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    {feedback.rating && (
                      <div className="flex mr-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < feedback.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`} 
                          />
                        ))}
                      </div>
                    )}
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{feedback.type}</span>
                  </div>
                  {feedback.date && (
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                  )}
                </div>
                
                <blockquote className="text-gray-700 italic mb-4">"{feedback.quote}"</blockquote>
                
                {(feedback.author || feedback.role) && (
                  <div className="text-sm text-gray-600">
                    {feedback.author && <span className="font-medium">{feedback.author}</span>}
                    {feedback.role && <span>, {feedback.role}</span>}
                    {feedback.source && <span> • {feedback.source}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stakeholder Feedback */}
      {stakeholderFeedback.length > 0 && (
        <div>
          <h4 className="text-2xl font-bold text-slate-800 mb-6">Stakeholder Testimonials</h4>
          <div className="space-y-6">
            {stakeholderFeedback.map((feedback, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200">
                <blockquote className="text-lg text-slate-700 italic leading-relaxed mb-4">
                  "{feedback.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">{feedback.author}</div>
                    <div className="text-slate-600">{feedback.position}</div>
                    <div className="text-slate-500">{feedback.company}</div>
                  </div>
                  {feedback.context && (
                    <div className="text-sm text-slate-500 italic">{feedback.context}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Awards & Recognition */}
      {projectAwards.length > 0 && (
        <div>
          <h4 className="text-2xl font-bold text-slate-800 mb-6">Awards & Recognition</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectAwards.map((award, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                <Trophy className="w-8 h-8 text-yellow-600 mb-4" />
                <h5 className="font-bold text-slate-800 mb-2">{award.title}</h5>
                <p className="text-slate-600 mb-2">{award.organization}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{award.year}</span>
                  {award.category && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{award.category}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons Learned */}
      {lessonsLearned.length > 0 && (
        <div>
          <h4 className="text-2xl font-bold text-slate-800 mb-6">Key Learnings</h4>
          <div className="space-y-6">
            {lessonsLearned.map((lesson, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start">
                  <Lightbulb className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h5 className="font-bold text-blue-800 mb-2">Challenge</h5>
                    <p className="text-blue-700 mb-4">{lesson.challenge}</p>
                    
                    <h5 className="font-bold text-blue-800 mb-2">Solution</h5>
                    <p className="text-blue-700 mb-4">{lesson.solution}</p>
                    
                    <h5 className="font-bold text-blue-800 mb-2">Outcome</h5>
                    <p className="text-blue-700 mb-4">{lesson.outcome}</p>
                    
                    {lesson.application && (
                      <>
                        <h5 className="font-bold text-blue-800 mb-2">Future Application</h5>
                        <p className="text-blue-700">{lesson.application}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* ROI Summary */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-8 rounded-2xl border border-slate-200">
        <h4 className="text-xl font-bold text-slate-800 mb-4">Bottom-Line Impact</h4>
        <p className="text-slate-600 leading-relaxed">
          Our user-centered design approach delivered measurable improvements across all key performance indicators. 
          The combination of enhanced user experience, streamlined workflows, and data-driven optimizations resulted 
          in significant business value and demonstrated a strong return on investment for stakeholders.
        </p>
      </div>
    </div>
  );
};

export default ProjectResults;


import { ChallengeDetails } from "@/types/project";
import { AlertTriangle, Users, Target, Clock, DollarSign, Shield, Code, Building } from "lucide-react";

interface ChallengeSectionProps {
  challengeDetails: ChallengeDetails;
}

const ChallengeSection = ({ challengeDetails }: ChallengeSectionProps) => {
  const getConstraintIcon = (type: string) => {
    switch (type) {
      case 'technical': return <Code className="w-5 h-5" />;
      case 'business': return <Building className="w-5 h-5" />;
      case 'timeline': return <Clock className="w-5 h-5" />;
      case 'budget': return <DollarSign className="w-5 h-5" />;
      case 'regulatory': return <Shield className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getConstraintColor = (type: string) => {
    switch (type) {
      case 'technical': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'business': return 'bg-green-50 border-green-200 text-green-800';
      case 'timeline': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'budget': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'regulatory': return 'bg-red-50 border-red-200 text-red-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Business & User Problems */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Problem */}
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
          <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
            <Building className="w-6 h-6 mr-2" />
            Business Challenge
          </h3>
          <p className="text-red-700 leading-relaxed">{challengeDetails.businessProblem}</p>
          {challengeDetails.businessImpact && (
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <p className="text-sm text-red-600">
                <strong>Business Impact:</strong> {challengeDetails.businessImpact}
              </p>
            </div>
          )}
        </div>

        {/* User Problem */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center">
            <Users className="w-6 h-6 mr-2" />
            User Challenge
          </h3>
          <p className="text-blue-700 leading-relaxed">{challengeDetails.userProblem}</p>
        </div>
      </div>

      {/* Target Users */}
      {challengeDetails.targetUsers && challengeDetails.targetUsers.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Users className="w-7 h-7 mr-3" />
            Target Users
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challengeDetails.targetUsers.map((user, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">{user.persona}</h4>
                <p className="text-slate-600 text-sm mb-4">{user.demographics}</p>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-green-700 mb-2">Goals</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {user.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-red-700 mb-2">Frustrations</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {user.frustrations.map((frustration, frustIndex) => (
                        <li key={frustIndex} className="flex items-start">
                          <span className="text-red-500 mr-2">✗</span>
                          {frustration}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 italic">{user.context}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pain Points */}
      {challengeDetails.painPoints && challengeDetails.painPoints.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <AlertTriangle className="w-7 h-7 mr-3" />
            Key Pain Points
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challengeDetails.painPoints.map((painPoint, index) => (
              <div key={index} className="flex items-start p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-orange-800 font-medium">{painPoint}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirements & Constraints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Requirements */}
        {challengeDetails.keyRequirements && challengeDetails.keyRequirements.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              Key Requirements
            </h3>
            <div className="space-y-3">
              {challengeDetails.keyRequirements.map((requirement, index) => (
                <div key={index} className="flex items-start p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-green-800">{requirement}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Constraints */}
        {challengeDetails.constraints && challengeDetails.constraints.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Project Constraints
            </h3>
            <div className="space-y-3">
              {challengeDetails.constraints.map((constraint, index) => (
                <div key={index} className={`p-4 border rounded-lg ${getConstraintColor(constraint.type)}`}>
                  <div className="flex items-center mb-2">
                    {getConstraintIcon(constraint.type)}
                    <span className="ml-2 font-semibold capitalize">{constraint.type}</span>
                  </div>
                  <p className="text-sm mb-2">{constraint.description}</p>
                  <p className="text-xs opacity-80">
                    <strong>Impact:</strong> {constraint.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stakeholder Goals */}
      {challengeDetails.stakeholderGoals && challengeDetails.stakeholderGoals.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Building className="w-7 h-7 mr-3" />
            Stakeholder Goals
          </h3>
          <div className="space-y-4">
            {challengeDetails.stakeholderGoals.map((stakeholder, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-800">{stakeholder.stakeholder}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(stakeholder.priority)}`}>
                    {stakeholder.priority} priority
                  </span>
                </div>
                <ul className="space-y-2">
                  {stakeholder.goals.map((goal, goalIndex) => (
                    <li key={goalIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">→</span>
                      <span className="text-slate-700">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Criteria */}
      {challengeDetails.successCriteria && challengeDetails.successCriteria.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <Target className="w-7 h-7 mr-3" />
            Success Criteria
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challengeDetails.successCriteria.map((criteria, index) => (
              <div key={index} className="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-purple-800 font-medium">{criteria}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitive Context */}
      {challengeDetails.competitiveContext && (
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-slate-800 mb-3">Competitive Context</h3>
          <p className="text-slate-700 leading-relaxed">{challengeDetails.competitiveContext}</p>
        </div>
      )}
    </div>
  );
};

export default ChallengeSection;

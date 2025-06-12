import { useState } from "react";
import { Project } from "@/types/project";
import ProjectModalHeader from "@/components/ProjectModalHeader";
import ProjectModalTabs from "@/components/ProjectModalTabs";
import ProjectModalOverview from "@/components/ProjectModalOverview";
import ProjectModalTeam from "@/components/ProjectModalTeam";
import DesignProcessTimeline from "@/components/DesignProcessTimeline";
import ProjectResults from "@/components/ProjectResults";
import ChallengeSection from "@/components/ChallengeSection";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "challenge" | "process" | "results" | "team">("overview");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <ProjectModalHeader project={project} onClose={onClose} />
        
        <div className="overflow-y-auto max-h-[calc(90vh-20rem)]">
          <ProjectModalTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="p-8">
            {activeTab === "overview" && (
              <ProjectModalOverview project={project} />
            )}
            
            {activeTab === "challenge" && (
              <div className="space-y-8">
                {project.challengeDetails ? (
                  <ChallengeSection challengeDetails={project.challengeDetails} />
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-400 text-6xl mb-4">🎯</div>
                    <p className="text-gray-500 text-lg">Challenge details coming soon</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "process" && (
              <div className="space-y-8">
                {project.designProcess && project.designProcess.length > 0 ? (
                  <DesignProcessTimeline steps={project.designProcess} />
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-400 text-6xl mb-4">🎨</div>
                    <p className="text-gray-500 text-lg">Design process details coming soon</p>
                  </div>
                )}
                
                {/* User Journey */}
                {project.userJourney && (
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">User Journey</h3>
                    <div className="p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <p className="text-blue-700 leading-relaxed">{project.userJourney}</p>
                    </div>
                  </div>
                )}
                
                {/* Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Challenges & Solutions</h3>
                    <div className="space-y-4">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                          <p className="text-orange-700">{challenge}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "results" && (
              <ProjectResults 
                results={project.results}
                businessImpact={project.businessImpact}
                userFeedback={project.userFeedback}
                projectAwards={project.projectAwards}
                lessonsLearned={project.lessonsLearned}
                usageStatistics={project.usageStatistics}
                stakeholderFeedback={project.stakeholderFeedback}
              />
            )}
            
            {activeTab === "team" && (
              <ProjectModalTeam project={project} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

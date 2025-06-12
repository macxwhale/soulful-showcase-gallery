
import { Calendar, Clock, Award } from "lucide-react";
import { Project } from "@/types/project";
import TeamCredits from "@/components/TeamCredits";

interface ProjectModalTeamProps {
  project: Project;
}

const ProjectModalTeam = ({ project }: ProjectModalTeamProps) => {
  return (
    <div className="space-y-8">
      {project.teamMembers && project.teamMembers.length > 0 ? (
        <TeamCredits members={project.teamMembers} />
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <p className="text-gray-500 text-lg">Team credits coming soon</p>
        </div>
      )}
      
      {/* Project Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-slate-50 rounded-xl">
          <Calendar className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <div className="font-semibold text-slate-800">Published</div>
          <div className="text-slate-600">
            {new Date(project.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
        
        {project.projectDuration && (
          <div className="text-center p-6 bg-slate-50 rounded-xl">
            <Clock className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <div className="font-semibold text-slate-800">Duration</div>
            <div className="text-slate-600">{project.projectDuration}</div>
          </div>
        )}
        
        <div className="text-center p-6 bg-slate-50 rounded-xl">
          <Award className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <div className="font-semibold text-slate-800">Category</div>
          <div className="text-slate-600">{project.category}</div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModalTeam;

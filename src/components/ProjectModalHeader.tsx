
import { X, Link as LinkIcon, Star, Clock } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectModalHeaderProps {
  project: Project;
  onClose: () => void;
}

const ProjectModalHeader = ({ project, onClose }: ProjectModalHeaderProps) => {
  return (
    <div className="relative">
      <div className="h-80 overflow-hidden">
        <img 
          src={project.previewImage} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
      >
        <X className="w-6 h-6" />
      </button>
      
      {/* Project Header Info */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center mb-4">
            <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl shadow-lg mr-6">
              {project.logo}
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{project.title}</h2>
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
                  {project.category}
                </span>
                {project.featured && (
                  <div className="flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm rounded-full">
                    <Star className="w-4 h-4 mr-1" />
                    Featured
                  </div>
                )}
                {project.projectDuration && (
                  <div className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.projectDuration}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex space-x-3">
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full hover:bg-white transition-all duration-300 shadow-lg font-medium"
            >
              <LinkIcon className="w-5 h-5 mr-2" />
              Visit Live Site
            </a>
            {project.prototypeUrl && (
              <a 
                href={project.prototypeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg font-medium"
              >
                View Prototype
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModalHeader;

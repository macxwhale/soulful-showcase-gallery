
import { useState } from "react";
import { ExternalLink, Calendar, Users, TrendingUp, Clock, Star } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  featured?: boolean;
}

const ProjectCard = ({ project, onClick, featured = false }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] ${
        featured ? "md:col-span-1 border-2 border-gradient-to-r from-rose-200 to-pink-200" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Image Container with Professional Overlay */}
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.previewImage} 
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        
        {/* Professional Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-60"
        }`}></div>
        
        {/* Company Logo */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg border border-white/20">
          {project.logo}
        </div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
            ⭐ Featured
          </div>
        )}
        
        {/* Client Type Badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-sm font-medium rounded-full border border-white/30 shadow-sm">
          {project.category}
        </div>

        {/* Quick Action */}
        <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}>
          <a 
            href={project.url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Visit</span>
          </a>
        </div>
      </div>
      
      {/* Enhanced Content Section */}
      <div className="p-6">
        {/* Project Title & Meta Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(project.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </div>
            {project.projectDuration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {project.projectDuration}
              </div>
            )}
          </div>
        </div>
        
        {/* Project Description */}
        <div className="mb-4">
          <p className="text-slate-600 mb-3 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Results Preview */}
        {project.results && project.results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
            {project.results.slice(0, 2).map((result, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center text-green-600 mb-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-semibold">{result.value}</span>
                </div>
                <div className="text-xs text-slate-500 truncate">{result.metric}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center text-green-600 mb-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">Success</span>
              </div>
              <div className="text-xs text-slate-500">Delivered</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-blue-600 mb-1">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm font-semibold">Client</span>
              </div>
              <div className="text-xs text-slate-500">Satisfied</div>
            </div>
          </div>
        )}
        
        {/* Technology Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 text-sm rounded-full font-medium border border-rose-200 hover:from-rose-100 hover:to-pink-100 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-sm rounded-full">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Enhanced Call to Action */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-500 font-medium">bunisystems.com</span>
            {project.clientTestimonial?.rating && (
              <div className="flex items-center">
                {[...Array(Math.min(5, Math.floor(project.clientTestimonial.rating)))].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
            )}
          </div>
          
          <span className="text-rose-500 font-semibold group-hover:text-rose-600 transition-colors duration-300 flex items-center">
            View Case Study 
            <span className={`ml-1 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}>→</span>
          </span>
        </div>
      </div>
      
      {/* Professional Border Effect */}
      <div className={`absolute inset-0 border-2 rounded-2xl transition-all duration-300 pointer-events-none ${
        isHovered ? "border-rose-300 shadow-lg" : "border-transparent"
      }`}></div>
    </div>
  );
};

export default ProjectCard;


import { useState } from "react";
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
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
        featured ? "md:col-span-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(project)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.previewImage} 
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-70"
        }`}></div>
        
        {/* Logo */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg">
          {project.logo}
        </div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-semibold rounded-full">
            Featured
          </div>
        )}
        
        {/* Category */}
        <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
          {project.category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-rose-600 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-rose-100 hover:text-rose-700 transition-colors duration-300"
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
        
        {/* Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">
            {new Date(project.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          
          <span className="text-rose-500 font-medium group-hover:text-rose-600 transition-colors duration-300">
            View Details →
          </span>
        </div>
      </div>
      
      {/* Hover Effect Border */}
      <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 ${
        isHovered ? "border-gradient-to-r from-rose-400 to-pink-400" : ""
      }`}></div>
    </div>
  );
};

export default ProjectCard;

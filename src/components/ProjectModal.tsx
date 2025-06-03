
import { useState } from "react";
import { X, Link as LinkIcon, Star } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "technical" | "story">("overview");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <img 
            src={project.previewImage} 
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Logo and Title Overlay */}
          <div className="absolute bottom-6 left-6 flex items-center">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl shadow-lg mr-4">
              {project.logo}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
                  {project.category}
                </span>
                {project.featured && (
                  <div className="flex items-center px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm rounded-full">
                    <Star className="w-4 h-4 mr-1" />
                    Featured
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-16rem)]">
          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex space-x-8 px-6">
              {[
                { key: "overview", label: "Overview" },
                { key: "technical", label: "Technical" },
                { key: "story", label: "Story" }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 border-b-2 font-semibold transition-colors duration-300 ${
                    activeTab === tab.key
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Project Description</h3>
                  <p className="text-slate-600 leading-relaxed">{project.description}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Published</h3>
                    <p className="text-slate-600">
                      {new Date(project.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Project URL</h3>
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-rose-600 hover:text-rose-700 font-medium"
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Visit Project
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "technical" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Technology Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.techStack.map((tech, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-slate-100 rounded-lg text-center font-medium text-slate-700 hover:bg-slate-200 transition-colors duration-300"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
                
                {project.notes && (
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Development Notes</h3>
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <p className="text-slate-700 leading-relaxed">{project.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "story" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Project Story</h3>
                  <div className="prose prose-lg text-slate-600 leading-relaxed">
                    <p>{project.aiNarrative}</p>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                  <p className="text-sm text-slate-600 italic">
                    "Every project tells a story of innovation, creativity, and the human spirit. 
                    This narrative was crafted to capture the essence and impact of this digital experience."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;


import { Star } from "lucide-react";
import { Project } from "@/types/project";
import ImageGallery from "@/components/ImageGallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

interface ProjectModalOverviewProps {
  project: Project;
}

const ProjectModalOverview = ({ project }: ProjectModalOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* Problem Statement */}
      {project.problemStatement && (
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
          <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center">
            🎯 The Challenge
          </h3>
          <p className="text-red-700 leading-relaxed">{project.problemStatement}</p>
        </div>
      )}
      
      {/* Solution Approach */}
      {project.solutionApproach && (
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
          <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
            💡 Our Solution
          </h3>
          <p className="text-green-700 leading-relaxed">{project.solutionApproach}</p>
        </div>
      )}
      
      {/* Project Description */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Project Overview</h3>
        <p className="text-slate-600 leading-relaxed text-lg">{project.description}</p>
      </div>
      
      {/* Image Gallery */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Visual Showcase</h3>
          <ImageGallery images={project.galleryImages} />
        </div>
      )}
      
      {/* Before/After Comparisons */}
      {project.beforeAfterImages && project.beforeAfterImages.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Before & After</h3>
          <BeforeAfterSlider images={project.beforeAfterImages} />
        </div>
      )}
      
      {/* Key Features */}
      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <span className="text-blue-800 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Technology Stack */}
      <div>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">Technology Stack</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {project.techStack.map((tech, index) => (
            <div 
              key={index}
              className="p-4 bg-slate-100 rounded-xl text-center font-medium text-slate-700 hover:bg-slate-200 transition-colors duration-300"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
      
      {/* Client Testimonial */}
      {project.clientTestimonial && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200">
          <div className="flex items-start space-x-4">
            {project.clientTestimonial.avatar && (
              <img 
                src={project.clientTestimonial.avatar} 
                alt={project.clientTestimonial.author}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <blockquote className="text-lg text-slate-700 italic leading-relaxed mb-4">
                "{project.clientTestimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">{project.clientTestimonial.author}</div>
                  <div className="text-slate-600">{project.clientTestimonial.position}</div>
                  <div className="text-slate-500">{project.clientTestimonial.company}</div>
                </div>
                {project.clientTestimonial.rating && (
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < project.clientTestimonial!.rating! 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectModalOverview;

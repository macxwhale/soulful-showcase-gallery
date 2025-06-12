
import { useState } from "react";
import { X, Link as LinkIcon, Star, Users, Clock, Award, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Project } from "@/types/project";
import ImageGallery from "@/components/ImageGallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import DesignProcessTimeline from "@/components/DesignProcessTimeline";
import ProjectResults from "@/components/ProjectResults";
import TeamCredits from "@/components/TeamCredits";
import ChallengeSection from "@/components/ChallengeSection";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "challenge" | "process" | "results" | "team">("overview");

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "challenge", label: "Challenge & Problem" },
    { key: "process", label: "Design Process" },
    { key: "results", label: "Results & Impact" },
    { key: "team", label: "Team & Credits" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="relative bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header with Hero Image */}
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
        
        {/* Enhanced Content with Tabs */}
        <div className="overflow-y-auto max-h-[calc(90vh-20rem)]">
          {/* Tab Navigation */}
          <div className="border-b border-slate-200 bg-white sticky top-0 z-10">
            <div className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-6 border-b-2 font-semibold transition-colors duration-300 ${
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
          <div className="p-8">
            {activeTab === "overview" && (
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
              <div className="space-y-8">
                {project.results && project.results.length > 0 ? (
                  <ProjectResults results={project.results} />
                ) : (
                  <div className="text-center py-16">
                    <div className="text-gray-400 text-6xl mb-4">📊</div>
                    <p className="text-gray-500 text-lg">Project results coming soon</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "team" && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

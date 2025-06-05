
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorDisplay from "@/components/ErrorDisplay";
import { Project } from "@/types/project";
import { usePublishedProjects } from "@/hooks/usePublishedProjects";

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch published projects from database
  const { data: projects = [], isLoading, error, refetch } = usePublishedProjects();

  // Generate categories dynamically from actual data
  const categories = ["All", ...Array.from(new Set(projects.map(project => project.category)))];
  
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <HeroSection />
        <LoadingSpinner 
          message="Loading amazing projects..." 
          className="min-h-[400px]"
        />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <HeroSection />
        <ErrorDisplay 
          message="Failed to load projects. Please check your connection and try again."
          onRetry={() => refetch()}
          className="min-h-[400px]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      
      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="px-6 py-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Handpicked showcases that represent our finest work and innovative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* All Projects Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Project Gallery
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Explore our complete collection of digital experiences and innovative solutions
            </p>
            
            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🚀</div>
              <p className="text-gray-500 text-lg mb-2">
                {projects.length === 0 ? "No projects published yet" : `No projects in "${selectedCategory}" category`}
              </p>
              <p className="text-gray-400">
                {projects.length === 0 
                  ? "Check back soon for amazing projects!" 
                  : "Try selecting a different category to see more projects."
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Index;


import { useState } from "react";
import Navigation from "@/components/Navigation";
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

  console.log('🏠 Homepage - Total published projects:', projects.length);

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
        <Navigation />
        <HeroSection />
        <LoadingSpinner 
          message="Loading our portfolio..." 
          className="min-h-[400px]"
        />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <HeroSection />
        <ErrorDisplay 
          message="Failed to load our portfolio. Please check your connection and try again."
          onRetry={() => refetch()}
          className="min-h-[400px]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <HeroSection />
      
      {/* Featured Case Studies Section */}
      {featuredProjects.length > 0 && (
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full text-sm font-semibold mb-4">
              🏆 Featured Work
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover how bunisystems has helped businesses achieve their digital transformation goals 
              through innovative web solutions and strategic partnerships.
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
      <section id="projects" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              💼 Our Portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Client Case Studies
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Browse our complete collection of successful client projects. Each case study demonstrates 
              our expertise in delivering results-driven digital solutions.
            </p>
            
            {/* Enhanced Category Filter */}
            {categories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg transform scale-105"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:scale-105"
                    }`}
                  >
                    {category}
                    {category !== "All" && (
                      <span className="ml-2 text-xs opacity-75">
                        ({projects.filter(p => p.category === category).length})
                      </span>
                    )}
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
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🚀</div>
              <p className="text-gray-500 text-lg mb-2">
                {projects.length === 0 ? "Portfolio coming soon" : `No projects in "${selectedCategory}" category`}
              </p>
              <p className="text-gray-400 mb-6">
                {projects.length === 0 
                  ? "We're currently updating our portfolio with our latest client success stories." 
                  : "Try selecting a different category to explore more of our work."
                }
              </p>
              {projects.length === 0 && (
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl max-w-md mx-auto border border-blue-200">
                  <p className="text-blue-700 text-sm">
                    💡 <strong>Want to see our work?</strong> Visit our <a href="https://bunisystems.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">main website</a> to learn about our services and get in touch.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Project Modal */}
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

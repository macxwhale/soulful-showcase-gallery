
import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { Project } from "@/types/project";

// Sample project data - in a real app this would come from your backend/database
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "EcoTrack - Sustainability Dashboard",
    description: "A comprehensive platform helping businesses track and reduce their environmental impact through data visualization and actionable insights.",
    url: "https://ecotrack-demo.com",
    previewImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    logo: "🌱",
    tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
    category: "Environmental Tech",
    featured: true,
    publishedDate: "2024-05-15",
    techStack: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL", "Docker"],
    aiNarrative: "EcoTrack emerged from a passion to make environmental responsibility accessible to businesses of all sizes. This platform transforms complex sustainability data into beautiful, actionable insights that drive real change.",
    notes: "Winner of the Green Tech Innovation Award 2024. Helped 200+ companies reduce their carbon footprint by an average of 30%."
  },
  {
    id: "2",
    title: "MindfulSpace - Meditation App",
    description: "A serene digital sanctuary offering guided meditations, breathing exercises, and mindfulness tools for modern wellness.",
    url: "https://mindfulspace-app.com",
    previewImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    logo: "🧘",
    tags: ["React Native", "Firebase", "Audio API"],
    category: "Health & Wellness",
    featured: true,
    publishedDate: "2024-04-22",
    techStack: ["React Native", "Firebase", "Web Audio API", "Stripe", "Push Notifications"],
    aiNarrative: "Born from the belief that mental wellness should be as accessible as physical fitness, MindfulSpace creates a calm oasis in our chaotic digital world. Every interaction is designed to bring peace and clarity.",
    notes: "Featured on Apple App Store's 'Apps We Love'. Over 100k downloads in first 6 months."
  },
  {
    id: "3",
    title: "ArtisanMarket - Creator Marketplace",
    description: "A vibrant platform connecting independent artists and craftspeople with collectors who appreciate authentic, handmade creations.",
    url: "https://artisanmarket-platform.com",
    previewImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    logo: "🎨",
    tags: ["Vue.js", "Stripe", "AWS"],
    category: "E-commerce",
    featured: false,
    publishedDate: "2024-03-10",
    techStack: ["Vue.js", "Nuxt.js", "Stripe Connect", "AWS S3", "MongoDB"],
    aiNarrative: "ArtisanMarket celebrates the human touch in an increasingly automated world. This platform doesn't just sell products—it tells stories, connects hearts, and preserves the beautiful tradition of handcrafted artistry.",
    notes: "Supporting 500+ independent creators across 25 countries. Facilitating fair trade and sustainable practices."
  },
  {
    id: "4",
    title: "CodeMentor - Learning Platform",
    description: "An interactive coding education platform that makes programming accessible through personalized learning paths and real-world projects.",
    url: "https://codementor-learn.com",
    previewImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    logo: "💻",
    tags: ["Next.js", "OpenAI", "Supabase"],
    category: "Education",
    featured: false,
    publishedDate: "2024-02-28",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "Supabase", "Tailwind CSS"],
    aiNarrative: "CodeMentor transforms the often intimidating journey of learning to code into an adventure of discovery. With AI-powered guidance and hands-on projects, every student finds their unique path to programming mastery.",
    notes: "92% completion rate for courses. Partnership with 15+ tech companies for job placement."
  }
];

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Environmental Tech", "Health & Wellness", "E-commerce", "Education"];
  
  const filteredProjects = selectedCategory === "All" 
    ? sampleProjects 
    : sampleProjects.filter(project => project.category === selectedCategory);

  const featuredProjects = sampleProjects.filter(project => project.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      
      {/* Featured Projects Section */}
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>
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

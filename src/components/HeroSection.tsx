
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-rose-400/20 via-transparent to-purple-400/20"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-rose-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-orange-400/25 to-red-400/25 rounded-full blur-lg animate-pulse delay-1000"></div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-400/20 to-pink-400/20 backdrop-blur-sm rounded-full text-rose-300 font-medium mb-6 border border-rose-400/30">
            bunisystems.com
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in delay-200">
          Curated Digital
          <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Experiences
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-500">
          A thoughtfully curated collection of web projects that blend innovation with emotion, 
          technology with humanity, creating digital experiences that truly matter.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-700">
          <button 
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explore Projects
            <ArrowDown className="inline-block ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
          </button>
          
          <a 
            href="https://bunisystems.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
          >
            Visit bunisystems.com
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

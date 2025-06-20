
import { useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm dark:bg-slate-900/95 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BS</span>
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-white">bunisystems</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Project Portfolio</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#projects" 
              className="text-slate-600 hover:text-rose-600 font-medium transition-colors duration-300 dark:text-slate-300 dark:hover:text-rose-400"
            >
              Projects
            </a>
            <a 
              href="https://bunisystems.com/about" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-rose-600 font-medium transition-colors duration-300 flex items-center dark:text-slate-300 dark:hover:text-rose-400"
            >
              About Us
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <a 
              href="https://bunisystems.com/contact" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-rose-600 font-medium transition-colors duration-300 flex items-center dark:text-slate-300 dark:hover:text-rose-400"
            >
              Contact
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <ThemeToggle />
            <a 
              href="https://bunisystems.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium flex items-center"
            >
              Main Site
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-300 dark:hover:bg-slate-800"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col space-y-3">
              <a 
                href="#projects" 
                className="text-slate-600 hover:text-rose-600 font-medium py-2 dark:text-slate-300 dark:hover:text-rose-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="https://bunisystems.com/about" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-rose-600 font-medium py-2 flex items-center dark:text-slate-300 dark:hover:text-rose-400"
              >
                About Us
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <a 
                href="https://bunisystems.com/contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-rose-600 font-medium py-2 flex items-center dark:text-slate-300 dark:hover:text-rose-400"
              >
                Contact
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
              <a 
                href="https://bunisystems.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full hover:from-rose-600 hover:to-pink-600 transition-all duration-300 font-medium w-fit"
              >
                Main Site
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

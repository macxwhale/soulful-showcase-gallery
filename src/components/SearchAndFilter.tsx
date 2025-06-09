
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  categories: string[];
  technologies: string[];
}

interface FilterOptions {
  category: string;
  technology: string;
  sortBy: string;
}

const SearchAndFilter = ({ onSearch, onFilter, categories, technologies }: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: "All",
    technology: "All",
    sortBy: "newest"
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { category: "All", technology: "All", sortBy: "newest" };
    setFilters(clearedFilters);
    setSearchQuery("");
    onSearch("");
    onFilter(clearedFilters);
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects, technologies, or clients..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white shadow-sm"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center space-x-2 rounded-full"
        >
          <Filter className="w-4 h-4" />
          <span>Advanced Filters</span>
        </Button>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Filter Projects</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-1 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Industry/Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange({ category: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Technology
              </label>
              <select
                value={filters.technology}
                onChange={(e) => handleFilterChange({ technology: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="All">All Technologies</option>
                {technologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              variant="outline"
              onClick={clearFilters}
              className="mr-3"
            >
              Clear All
            </Button>
            <Button
              onClick={() => setIsFilterOpen(false)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;


interface ProjectModalTabsProps {
  activeTab: "overview" | "challenge" | "process" | "results" | "team";
  setActiveTab: (tab: "overview" | "challenge" | "process" | "results" | "team") => void;
}

const ProjectModalTabs = ({ activeTab, setActiveTab }: ProjectModalTabsProps) => {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "challenge", label: "Challenge & Problem" },
    { key: "process", label: "Design Process" },
    { key: "results", label: "Results & Impact" },
    { key: "team", label: "Team & Credits" }
  ];

  return (
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
  );
};

export default ProjectModalTabs;

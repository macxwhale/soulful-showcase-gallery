
import { TeamMember } from "@/types/project";
import { Users, Mail } from "lucide-react";

interface TeamCreditsProps {
  members: TeamMember[];
}

const TeamCredits = ({ members }: TeamCreditsProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Project Team</h3>
        <p className="text-slate-600">The talented individuals who brought this vision to life</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            {/* Avatar */}
            <div className="mb-4">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto object-cover shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
            </div>
            
            {/* Info */}
            <h4 className="text-lg font-bold text-slate-800 mb-1">{member.name}</h4>
            <p className="text-slate-600 font-medium mb-4">{member.role}</p>
            
            {/* Role Badge */}
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {member.role}
            </div>
          </div>
        ))}
      </div>
      
      {/* Team Message */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h4 className="text-xl font-bold text-slate-800 mb-4">Collaborative Excellence</h4>
        <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
          This project was a testament to the power of collaborative design. Each team member brought unique 
          expertise and perspectives that contributed to the final success of the project.
        </p>
      </div>
    </div>
  );
};

export default TeamCredits;

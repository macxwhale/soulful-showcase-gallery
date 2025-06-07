
import { Code, Palette, Zap, Heart, Award, MapPin } from 'lucide-react';

const AboutSection = () => {
  const skills = [
    { name: 'Frontend Development', level: 95, icon: Code },
    { name: 'UI/UX Design', level: 88, icon: Palette },
    { name: 'Performance Optimization', level: 92, icon: Zap },
    { name: 'User Experience', level: 90, icon: Heart },
  ];

  const achievements = [
    { year: '2024', title: 'Senior Developer', company: 'bunisystems.com' },
    { year: '2023', title: '50+ Projects Delivered', company: 'Various Clients' },
    { year: '2022', title: 'Full-Stack Certification', company: 'Tech Institute' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            About Me
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer and designer who loves creating digital experiences 
            that blend beautiful design with cutting-edge technology. With over 5 years of experience, 
            I help businesses transform their ideas into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Profile Info */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">My Journey</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Started as a curious developer fascinated by the intersection of design and technology. 
                Over the years, I've specialized in creating seamless web experiences that not only look 
                beautiful but perform exceptionally well.
              </p>
              <p className="text-slate-600 leading-relaxed">
                I believe in writing clean, maintainable code and designing interfaces that users love. 
                Every project is an opportunity to push boundaries and deliver something extraordinary.
              </p>
            </div>

            <div className="flex items-center text-slate-600 mb-4">
              <MapPin className="w-5 h-5 mr-2 text-rose-400" />
              <span>Based in San Francisco, CA</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Figma'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Core Skills</h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <skill.icon className="w-5 h-5 mr-3 text-rose-400" />
                      <span className="font-medium text-slate-700">{skill.name}</span>
                    </div>
                    <span className="text-sm text-slate-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-rose-400 to-pink-400 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">Career Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-lg font-bold text-rose-500 mb-2">{achievement.year}</div>
                <div className="font-semibold text-slate-800 mb-1">{achievement.title}</div>
                <div className="text-slate-600 text-sm">{achievement.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

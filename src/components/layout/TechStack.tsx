import React from 'react';
import { resumeData } from '../../data/resume';
import { Database, Layout, Server, Cloud, Target } from 'lucide-react';

export const TechStack: React.FC = () => {
  const categories = [
    { name: 'Backend', icon: Server, skills: resumeData.skills.backend },
    { name: 'Frontend', icon: Layout, skills: resumeData.skills.frontend },
    { name: 'Databases', icon: Database, skills: resumeData.skills.databases },
    { name: 'Cloud & DevOps', icon: Cloud, skills: resumeData.skills.cloudDevops },
    { name: 'Engineering Focus', icon: Target, skills: resumeData.skills.engineeringFocus },
  ];

  return (
    <div className="py-20 space-y-12">
      <div className="space-y-4 max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-white">Technical Arsenal</h2>
        <p className="text-zinc-400 text-lg">
          A collection of technologies and tools I use to build reliable SaaS applications and backend APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.name} className="lg:first:col-span-2 card p-6 group hover:bg-zinc-900 transition-all hover:border-accent/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                <cat.icon size={20} />
              </div>
              <h3 className="font-bold text-white tracking-tight group-hover:text-accent transition-colors">{cat.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-2 py-1 text-xs font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 rounded-md group-hover:border-zinc-700 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

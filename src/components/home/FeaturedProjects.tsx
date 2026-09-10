import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Building, MapPin } from 'lucide-react';

export const FeaturedProjects: React.FC = () => {
  const { projects, setPage, setSelectedProjectId } = useApp();

  const featured = projects.filter((p) => p.isFeatured).slice(0, 4);

  const handleCardClick = (id: string) => {
    setSelectedProjectId(id);
    setPage('projects');
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E3E6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Label & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
            FEATURED PROJECTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1F3A] tracking-tight uppercase font-heading">
            BUILT WITH PURPOSE
          </h2>
          <div className="w-12 h-1 bg-[#F5A623] mx-auto mt-4 rounded-full" />
        </div>

        {/* 4-Column Card Grid matching reference layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featured.map((project) => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project.id)}
              className="group bg-white rounded-lg border border-[#E3E6EB] hover:border-slate-300 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Project Info Block */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wide group-hover:text-[#F5A623] transition-colors line-clamp-2 leading-snug mb-1.5">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#5A6678] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>

                {/* Outline tag button matching reference */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-block text-[11px] font-bold text-[#0B1F3A] uppercase tracking-wider px-2.5 py-1 rounded border border-[#0B1F3A]/30 bg-slate-50 group-hover:bg-[#0B1F3A] group-hover:text-white transition-colors">
                    {project.service}
                  </span>

                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    AED {(parseFloat(project.value.replace(/[^0-9.]/g, '')) / 1000000).toFixed(0)}M
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Right "View All Projects →" link matching reference */}
        <div className="flex justify-end">
          <button
            onClick={() => setPage('projects')}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#0B1F3A] uppercase hover:text-[#F5A623] transition-colors py-2"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-4 h-4 text-[#F5A623]" />
          </button>
        </div>
      </div>
    </section>
  );
};

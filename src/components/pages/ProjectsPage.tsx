import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectItem } from '../../types';
import {
  Search,
  Filter,
  MapPin,
  Building,
  Calendar,
  X,
  ArrowUpDown,
  LayoutGrid,
  Table as TableIcon,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, selectedProjectId, setSelectedProjectId } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // If navigated with selectedProjectId, open modal
  React.useEffect(() => {
    if (selectedProjectId) {
      const match = projects.find((p) => p.id === selectedProjectId);
      if (match) setActiveModalProject(match);
    }
  }, [selectedProjectId, projects]);

  // Unique service types
  const serviceOptions = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.service)));
    return ['all', ...list];
  }, [projects]);

  // Unique categories
  const categoryOptions = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.category)));
    return ['all', ...list];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.consultant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesService = serviceFilter === 'all' || p.service === serviceFilter;
      const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

      return matchesSearch && matchesService && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, serviceFilter, categoryFilter, statusFilter]);

  return (
    <div className="bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
            DELIVERED PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight font-heading mb-4">
            PROJECTS COMPLETED & UNDERWAY
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            A comprehensive record of landmark assignments across the United Arab Emirates, State of
            Kuwait, State of Qatar, and Kingdom of Bahrain.
          </p>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section className="sticky top-[69px] z-30 bg-white border-b border-[#E3E6EB] py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by project, client, or consultant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
              {/* Service Select */}
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[#E3E6EB] text-xs font-semibold text-[#0B1F3A] bg-white focus:outline-none focus:border-[#F5A623]"
              >
                <option value="all">All Services</option>
                {serviceOptions
                  .filter((s) => s !== 'all')
                  .map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </select>

              {/* Status Select */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-[#E3E6EB] text-xs font-semibold text-[#0B1F3A] bg-white focus:outline-none focus:border-[#F5A623]"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="in_progress">In Progress</option>
              </select>

              {/* View Switcher Toggle */}
              <div className="flex items-center rounded-lg border border-[#E3E6EB] p-0.5 bg-slate-100 ml-auto">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 transition ${
                    viewMode === 'table'
                      ? 'bg-white text-[#0B1F3A] shadow-xs'
                      : 'text-slate-500 hover:text-[#0B1F3A]'
                  }`}
                  title="Table View"
                >
                  <TableIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Table</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 transition ${
                    viewMode === 'grid'
                      ? 'bg-white text-[#0B1F3A] shadow-xs'
                      : 'text-slate-500 hover:text-[#0B1F3A]'
                  }`}
                  title="Grid Cards"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects List Display */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-xs text-slate-500 font-medium flex justify-between items-center">
            <span>
              Displaying <strong className="text-[#0B1F3A]">{filteredProjects.length}</strong> of{' '}
              {projects.length} verified projects
            </span>
            {(serviceFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setServiceFilter('all');
                  setStatusFilter('all');
                }}
                className="text-amber-600 hover:underline font-semibold"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E3E6EB] p-12 text-center">
              <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#0B1F3A] mb-1">No matching projects found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                Try loosening your search terms or filter selection.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setServiceFilter('all');
                  setStatusFilter('all');
                }}
                className="px-4 py-2 bg-[#0B1F3A] text-white text-xs font-bold rounded"
              >
                Reset Search Filters
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* Interactive Filterable Table matching specification table */
            <div className="bg-white rounded-xl border border-[#E3E6EB] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0B1F3A] text-white font-extrabold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Project</th>
                      <th className="py-3.5 px-4">Service</th>
                      <th className="py-3.5 px-4">Client</th>
                      <th className="py-3.5 px-4">Project Value</th>
                      <th className="py-3.5 px-4">Consultant</th>
                      <th className="py-3.5 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredProjects.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-amber-50/50 transition-colors ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                        }`}
                      >
                        <td className="py-3 px-4 font-bold text-[#0B1F3A] max-w-xs">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                item.status === 'completed' ? 'bg-[#0B1F3A]' : 'bg-[#F5A623]'
                              }`}
                              title={item.status === 'completed' ? 'Completed' : 'In Progress'}
                            />
                            <span className="line-clamp-2">{item.name}</span>
                          </div>
                          <div className="text-[11px] text-slate-400 font-normal pl-4">
                            {item.location}
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[#0B1F3A] font-semibold text-[11px] border border-slate-200">
                            {item.service}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-slate-900 font-medium">
                          {item.client}
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-[#0B1F3A] whitespace-nowrap">
                          {item.value === 'N/A'
                            ? 'N/A'
                            : item.value.startsWith('AED')
                            ? item.value
                            : `AED ${item.value}`}
                        </td>

                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate" title={item.consultant}>
                          {item.consultant}
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => setActiveModalProject(item)}
                            className="p-1.5 rounded text-[#0B1F3A] hover:text-[#F5A623] hover:bg-slate-100 transition"
                            title="View Project Brief"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Grid View */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveModalProject(item)}
                  className="group bg-white rounded-xl border border-[#E3E6EB] hover:border-[#F5A623]/50 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
                          item.status === 'completed'
                            ? 'bg-[#0B1F3A] text-white'
                            : 'bg-[#F5A623] text-[#0B1F3A]'
                        }`}
                      >
                        {item.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-wider block mb-1">
                        {item.service}
                      </span>
                      <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wide group-hover:text-[#F5A623] transition-colors line-clamp-2 leading-snug mb-2">
                        {item.name}
                      </h3>
                      <div className="text-xs text-slate-600 mb-1">
                        Client: <strong className="text-slate-800">{item.client}</strong>
                      </div>
                      <div className="text-xs text-slate-500 mb-3 truncate">
                        Consultant: {item.consultant}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-[#0B1F3A]">
                      <span>VALUE:</span>
                      <span>
                        {item.value === 'N/A'
                          ? 'N/A'
                          : item.value.startsWith('AED')
                          ? item.value
                          : `AED ${item.value}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative aspect-[16/9] w-full bg-slate-900">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => {
                  setActiveModalProject(null);
                  setSelectedProjectId(null);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-[#F5A623] tracking-wider uppercase font-mono">
                  {activeModalProject.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                    activeModalProject.status === 'completed'
                      ? 'bg-slate-100 text-[#0B1F3A]'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {activeModalProject.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] uppercase font-heading mb-4">
                {activeModalProject.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-6">
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Client Organization</span>
                  <span className="font-bold text-[#0B1F3A]">{activeModalProject.client}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Service Rendered</span>
                  <span className="font-bold text-[#0B1F3A]">{activeModalProject.service}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Lead / Associate Consultant</span>
                  <span className="font-bold text-[#0B1F3A]">{activeModalProject.consultant}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase text-[10px]">Project Commercial Value</span>
                  <span className="font-bold text-[#F5A623] font-mono text-sm">
                    {activeModalProject.value === 'N/A'
                      ? 'Confidential / Classified'
                      : activeModalProject.value.startsWith('AED')
                      ? activeModalProject.value
                      : `AED ${activeModalProject.value}`}
                  </span>
                </div>
              </div>

              <p className="text-[#5A6678] text-sm leading-relaxed mb-6">
                {activeModalProject.description ||
                  'Delivered in strict compliance with ISO 9001 quality assurance systems, international surveying benchmarks, and statutory municipal codes across the Arabian Gulf.'}
              </p>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    setSelectedProjectId(null);
                  }}
                  className="px-5 py-2.5 rounded border border-slate-300 text-xs font-bold text-[#0B1F3A] hover:bg-slate-100"
                >
                  Close Brief
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

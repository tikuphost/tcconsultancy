import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectItem } from '../../types';
import { Building, Plus, Search, Trash2, Edit2, Star, CheckCircle, X } from 'lucide-react';

export const AdminProjectsSection: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for new project
  const [name, setName] = useState('');
  const [service, setService] = useState('Design Consultancy');
  const [client, setClient] = useState('');
  const [value, setValue] = useState('15,000,000');
  const [consultant, setConsultant] = useState('TC Consultancy FZC');
  const [location, setLocation] = useState('Sharjah, UAE');
  const [category, setCategory] = useState('Commercial');
  const [status, setStatus] = useState<'completed' | 'in_progress'>('completed');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1000&q=80'
  );

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.consultant.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !client) {
      showToast('Please provide Project Name and Client', 'warning');
      return;
    }

    const newProj: ProjectItem = {
      id: 'proj-' + Date.now(),
      name,
      service,
      client,
      value: value.startsWith('AED') ? value : `AED ${value}`,
      consultant,
      location,
      category,
      coordinates: [25.3284, 55.5165],
      featured,
      image,
      status,
      description: 'Delivered in strict compliance with ISO 9001 quality assurance standards.',
    };

    addProject(newProj);
    setIsAddModalOpen(false);
    // Reset
    setName('');
    setClient('');
    setValue('15,000,000');
  };

  const toggleFeatured = (proj: ProjectItem) => {
    updateProject(proj.id, { featured: !proj.featured });
    showToast(`Project "${proj.name}" featured status toggled`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading flex items-center gap-2">
            <Building className="w-5 h-5 text-[#F5A623]" />
            <span>PROJECTS REPOSITORY ({projects.length})</span>
          </h1>
          <p className="text-xs text-[#5A6678]">
            Manage delivered assignments, live site coordinates, and featured homepage showcases.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase px-4 py-2.5 rounded-lg shadow-xs tracking-wider flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter and Table */}
      <div className="bg-white rounded-xl border border-[#E3E6EB] overflow-hidden shadow-xs">
        <div className="p-3.5 border-b border-[#E3E6EB] bg-slate-50 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project name, client, or consultant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] bg-white focus:outline-none focus:border-[#F5A623]"
            />
          </div>

          <span className="text-xs text-slate-500 font-mono">
            Showing {filtered.length} of {projects.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 px-4">Project Name</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Consultant</th>
                <th className="py-3 px-4 font-mono text-right">Value</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-bold text-[#0B1F3A] truncate">{proj.name}</div>
                    <div className="text-[10px] text-slate-400">{proj.location}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[#0B1F3A] font-semibold text-[11px] border border-slate-200">
                      {proj.service}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-medium text-slate-800 truncate max-w-[180px]">
                    {proj.client}
                  </td>

                  <td className="py-3 px-4 text-slate-500 truncate max-w-[180px]">
                    {proj.consultant}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-[#0B1F3A] whitespace-nowrap">
                    {proj.value === 'N/A'
                      ? 'N/A'
                      : proj.value.startsWith('AED')
                      ? proj.value
                      : `AED ${proj.value}`}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        proj.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {proj.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleFeatured(proj)}
                      className={`p-1 rounded transition ${
                        proj.featured ? 'text-amber-500 hover:text-amber-600' : 'text-slate-300 hover:text-slate-500'
                      }`}
                      title={proj.featured ? 'Featured on Home' : 'Not Featured'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50 transition"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-extrabold text-[#0B1F3A] uppercase">
                ADD NEW DELIVERED PROJECT
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al Khan Mixed-Use Tower"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-slate-200 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service Type</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-200 bg-white"
                  >
                    <option value="Design Consultancy">Design Consultancy</option>
                    <option value="Cost Consultancy">Cost Consultancy</option>
                    <option value="Cost Advice">Cost Advice</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Structural & MEP Design">Structural & MEP Design</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-200 bg-white"
                  >
                    <option value="Government">Government</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Education">Education</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ministry of Labour"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-200 focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Project Value (AED)</label>
                  <input
                    type="text"
                    placeholder="15,000,000"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-200 focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consultant</label>
                  <input
                    type="text"
                    value={consultant}
                    onChange={(e) => setConsultant(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-200 focus:outline-none focus:border-[#F5A623]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-200 focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-[#F5A623]"
                />
                <label htmlFor="featuredCheck" className="text-slate-700 font-bold">
                  Feature this project on the homepage showcase strip
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded border border-slate-300 font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#0B1F3A] hover:bg-[#071528] text-[#F5A623] font-bold uppercase shadow"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

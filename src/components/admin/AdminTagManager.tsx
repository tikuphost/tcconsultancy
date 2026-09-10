import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatTag } from '../../types';
import { Tag, Plus, Trash2, Edit2, Shield, Check, X, AlertTriangle } from 'lucide-react';

export const AdminTagManager: React.FC = () => {
  const { chatTags, createChatTag, updateChatTag, deleteChatTag, showToast } = useApp();

  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3B82F6');
  const [newTagDesc, setNewTagDesc] = useState('');

  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  const COLOR_PALETTE = [
    '#EF4444', // Red (Urgent)
    '#F59E0B', // Amber (Bulk RFQ)
    '#10B981', // Emerald (Commercial)
    '#3B82F6', // Blue (Design)
    '#8B5CF6', // Purple (VIP)
    '#EC4899', // Pink (High Priority)
    '#0B1F3A', // Navy (Core)
    '#06B6D4', // Cyan (MEP)
    '#64748B', // Slate (General)
  ];

  const handleCreateTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) {
      showToast('Tag name cannot be empty', 'warning');
      return;
    }

    createChatTag(newTagName.trim(), newTagColor, newTagDesc.trim() || undefined);
    setNewTagName('');
    setNewTagDesc('');
  };

  const startEdit = (tag: ChatTag) => {
    setEditingTagId(tag.id);
    setEditName(tag.name);
    setEditColor(tag.color);
  };

  const saveEdit = (tagId: string) => {
    if (!editName.trim()) return;
    updateChatTag(tagId, { name: editName.trim(), color: editColor });
    setEditingTagId(null);
  };

  const cancelEdit = () => {
    setEditingTagId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading flex items-center gap-2">
          <Tag className="w-5 h-5 text-[#F5A623]" />
          <span>ROUTING TAG TAXONOMY & MANAGER</span>
        </h1>
        <p className="text-xs text-[#5A6678]">
          Configure custom classification tags for live chat sessions, tender leads, and client priority routing.
        </p>
      </div>

      {/* Top Card: Create New Tag */}
      <div className="bg-white p-6 rounded-xl border border-[#E3E6EB] shadow-xs">
        <h2 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-4">
          CREATE NEW CLASSIFICATION TAG
        </h2>

        <form onSubmit={handleCreateTag} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Tag Name */}
            <div className="md:col-span-5">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Tag Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. VIP Client, Civil Defence, High-Rise"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-4">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Description / Routing Rule
              </label>
              <input
                type="text"
                placeholder="e.g. Route to QS division"
                value={newTagDesc}
                onChange={(e) => setNewTagDesc(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-3 flex items-end">
              <button
                type="submit"
                className="w-full bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase py-2.5 rounded-lg shadow-xs tracking-wider flex items-center justify-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Tag</span>
              </button>
            </div>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-2">
              Color Palette Preset
            </label>
            <div className="flex items-center gap-2">
              {COLOR_PALETTE.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => setNewTagColor(color)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    newTagColor === color
                      ? 'scale-110 ring-2 ring-offset-2 ring-[#0B1F3A]'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}

              {/* Tag Live Preview */}
              <div className="ml-4 flex items-center gap-2 pl-4 border-l border-slate-200">
                <span className="text-[11px] text-slate-400">Live Preview:</span>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                  style={{ backgroundColor: newTagColor }}
                >
                  {newTagName.trim() || 'Sample Tag'}
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Tags Table */}
      <div className="bg-white rounded-xl border border-[#E3E6EB] overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E3E6EB] flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider">
            ALL CONFIGURED TAGS ({chatTags.length})
          </h2>
          <span className="text-xs text-slate-400 font-mono">System & Custom Taxonomy</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 px-4">Tag Display</th>
                <th className="py-3 px-4">Hex Code</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-center">Usage in Threads</th>
                <th className="py-3 px-4 text-center">Type</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {chatTags.map((tag) => {
                const isEditing = editingTagId === tag.id;

                return (
                  <tr key={tag.id} className="hover:bg-slate-50/70 transition">
                    {/* Tag Display */}
                    <td className="py-3 px-4">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-1 rounded border border-slate-300 text-xs font-bold"
                        />
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                          style={{ backgroundColor: tag.color }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                          <span>{tag.name}</span>
                        </span>
                      )}
                    </td>

                    {/* Hex Code */}
                    <td className="py-3 px-4 font-mono text-slate-500">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          {COLOR_PALETTE.slice(0, 5).map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setEditColor(c)}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      ) : (
                        tag.color
                      )}
                    </td>

                    {/* Description */}
                    <td className="py-3 px-4 text-slate-600">
                      {tag.description || 'General routing tag'}
                    </td>

                    {/* Usage Count */}
                    <td className="py-3 px-4 text-center font-mono font-bold text-[#0B1F3A]">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                        {tag.usageCount}
                      </span>
                    </td>

                    {/* System or Custom */}
                    <td className="py-3 px-4 text-center">
                      {tag.isSystem ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">
                          <Shield className="w-3 h-3 text-[#0B1F3A]" /> System
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold uppercase">
                          Custom
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => saveEdit(tag.id)}
                            className="p-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            title="Save changes"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1 rounded bg-slate-100 text-slate-600 hover:bg-slate-200"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => startEdit(tag)}
                            className="p-1.5 text-slate-400 hover:text-[#0B1F3A] hover:bg-slate-100 rounded transition"
                            title="Edit Tag"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {!tag.isSystem && (
                            <button
                              onClick={() => deleteChatTag(tag.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                              title="Delete Tag"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

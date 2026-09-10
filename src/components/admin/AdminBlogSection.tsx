import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';
import { Newspaper, Plus, CheckCircle, XCircle, Trash2, Eye, Clock } from 'lucide-react';

export const AdminBlogSection: React.FC = () => {
  const { blogPosts, updateBlogPostStatus, addBlogPost, showToast } = useApp();

  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('COMMERCIAL MANAGEMENT');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [tagsInput, setTagsInput] = useState('Cost Engineering, FIDIC, UAE');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) {
      showToast('Please provide Title and Body content', 'warning');
      return;
    }

    const newPost: BlogPost = {
      id: 'post-' + Date.now(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title,
      category,
      excerpt: excerpt || title,
      body,
      authorName: 'TC Consultancy Editorial Board',
      authorRole: 'Senior Directors',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      publishedAt: 'October 2026',
      readTime: Math.max(3, Math.ceil(body.split(' ').length / 180)),
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      status: 'published',
    };

    addBlogPost(newPost);
    setIsNewModalOpen(false);
    setTitle('');
    setBody('');
    setExcerpt('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0B1F3A] uppercase font-heading flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-[#F5A623]" />
            <span>NEWS BULLETIN & EDITORIAL PIPELINE</span>
          </h1>
          <p className="text-xs text-[#5A6678]">
            Manage technical viewpoints, cost control bulletins, and approve moderated industry submissions.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase px-4 py-2.5 rounded-lg shadow-xs tracking-wider flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl border border-[#E3E6EB] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4 text-center">Read Time</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="font-bold text-[#0B1F3A] line-clamp-1">{post.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{post.excerpt}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-[#0B1F3A]">
                      {post.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700">
                    <div className="font-medium">{post.authorName}</div>
                    <div className="text-[10px] text-slate-400">{post.publishedAt}</div>
                  </td>

                  <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                    {post.readTime} min
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        post.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : post.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {post.status !== 'published' && (
                        <button
                          onClick={() => updateBlogPostStatus(post.id, 'published')}
                          className="px-2.5 py-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold uppercase transition flex items-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Publish</span>
                        </button>
                      )}

                      {post.status === 'published' && (
                        <button
                          onClick={() => updateBlogPostStatus(post.id, 'draft')}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold uppercase transition"
                        >
                          Unpublish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Article Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-extrabold text-[#0B1F3A] uppercase mb-4">
              PUBLISH TECHNICAL BULLETIN ARTICLE
            </h2>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Headline / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigating GCC Supply Chain Volatility in 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200 focus:outline-none focus:border-[#F5A623]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-slate-200 bg-white"
                  >
                    <option value="COMMERCIAL MANAGEMENT">COMMERCIAL MANAGEMENT</option>
                    <option value="COST CONSULTANCY">COST CONSULTANCY</option>
                    <option value="DESIGN CONSULTANCY">DESIGN CONSULTANCY</option>
                    <option value="PROJECT MANAGEMENT">PROJECT MANAGEMENT</option>
                    <option value="COMPANY NEWS">COMPANY NEWS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Excerpt Summary</label>
                <input
                  type="text"
                  placeholder="Brief lead paragraph..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded border border-slate-200"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Body *</label>
                <textarea
                  rows={8}
                  required
                  placeholder="Draft your engineering brief, regulatory insights, and cost engineering recommendations..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full p-3 rounded border border-slate-200 focus:outline-none focus:border-[#F5A623] resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded border border-slate-300 font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-[#0B1F3A] hover:bg-[#071528] text-[#F5A623] font-bold uppercase shadow"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

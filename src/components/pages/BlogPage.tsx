import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';
import {
  Search,
  Tag,
  Clock,
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  Share2,
  Check,
  Bookmark,
  MessageSquare,
  Send,
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const {
    blogPosts,
    selectedPostSlug,
    setSelectedPostSlug,
    setPage,
    showToast,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Active post reader view
  const activePost = useMemo(() => {
    if (!selectedPostSlug) return null;
    return blogPosts.find((p) => p.slug === selectedPostSlug);
  }, [selectedPostSlug, blogPosts]);

  // Categories list
  const categories = useMemo(() => {
    const list = Array.from(new Set(blogPosts.map((p) => p.category)));
    return ['all', ...list];
  }, [blogPosts]);

  // All tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    blogPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [blogPosts]);

  // Filtered published posts
  const publishedPosts = blogPosts.filter((p) => p.status === 'published');

  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.body.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesTag = !selectedTag || p.tags.includes(selectedTag);

      return matchesSearch && matchesCat && matchesTag;
    });
  }, [publishedPosts, searchQuery, selectedCategory, selectedTag]);

  const featuredPost = publishedPosts[0];

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    showToast('Article URL copied to clipboard', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentEmail || !commentText) {
      showToast('Please fill out all comment fields', 'warning');
      return;
    }
    showToast('Comment submitted for editorial moderation', 'info');
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast(`Subscribed ${newsletterEmail} to TC Consultancy Engineering Bulletin`, 'success');
    setNewsletterEmail('');
  };

  // -------------------------------------------------------------
  // RENDER SINGLE POST READING VIEW
  // -------------------------------------------------------------
  if (activePost) {
    const related = publishedPosts
      .filter((p) => p.id !== activePost.id)
      .slice(0, 3);

    return (
      <div className="bg-[#F8FAFC] py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
            <button
              onClick={() => setSelectedPostSlug(null)}
              className="hover:text-[#0B1F3A] flex items-center gap-1 font-bold"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> News Bulletin
            </button>
            <span>/</span>
            <span className="text-[#F5A623] uppercase font-bold">{activePost.category}</span>
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded bg-[#0B1F3A] text-white text-[11px] font-extrabold uppercase tracking-wider mb-4">
              {activePost.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] leading-tight font-heading mb-4">
              {activePost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <img
                  src={activePost.authorAvatar}
                  alt={activePost.authorName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-[#0B1F3A]">{activePost.authorName}</div>
                  <div className="text-[10px] text-slate-400">{activePost.authorRole}</div>
                </div>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activePost.publishedAt}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{activePost.readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Hero Cover Image */}
          <div className="rounded-2xl overflow-hidden mb-10 shadow-lg aspect-[16/9] bg-slate-900">
            <img
              src={activePost.coverImage}
              alt={activePost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-4 mb-12">
            <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed italic border-l-4 border-[#F5A623] pl-4 py-1">
              {activePost.excerpt}
            </p>

            <div className="text-sm sm:text-base whitespace-pre-line text-slate-700 leading-relaxed font-sans">
              {activePost.body}
            </div>
          </div>

          {/* Tag List */}
          <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-slate-200 mb-8">
            <Tag className="w-4 h-4 text-slate-400" />
            {activePost.tags.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Share Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#E3E6EB] mb-12">
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
              Share this engineering perspective
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Author Bio Card */}
          <div className="p-6 rounded-2xl bg-[#0B1F3A] text-white flex items-center gap-5 mb-14">
            <img
              src={activePost.authorAvatar}
              alt={activePost.authorName}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#F5A623] shrink-0"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#F5A623] tracking-widest font-mono">
                AUTHOR BIO
              </span>
              <h3 className="text-base font-extrabold text-white">{activePost.authorName}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Senior engineering director at TC Consultancy FZC, advising government entities and private
                developers across the UAE, Qatar, and Kuwait.
              </p>
            </div>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mb-14">
              <h3 className="text-lg font-extrabold text-[#0B1F3A] uppercase tracking-wide mb-6">
                RELATED ARTICLES & BRIEFS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setSelectedPostSlug(post.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-xl border border-[#E3E6EB] hover:border-[#F5A623] p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] font-extrabold text-[#F5A623] uppercase block mb-1">
                        {post.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#0B1F3A] line-clamp-2 mb-2 leading-snug">
                        {post.title}
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {post.readTime} min read
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Editorial Moderated Comments */}
          <div className="bg-white rounded-2xl border border-[#E3E6EB] p-6 sm:p-8">
            <h3 className="text-base font-extrabold text-[#0B1F3A] uppercase tracking-wide mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#F5A623]" />
              LEAVE A TECHNICAL REMARK
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Remarks undergo moderation before publication to maintain technical integrity.
            </p>

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
                />
              </div>
              <textarea
                rows={3}
                placeholder="Share your perspective or query regarding this engineering brief..."
                required
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] resize-none"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#0B1F3A] hover:bg-[#071528] text-white text-xs font-bold uppercase rounded shadow inline-flex items-center gap-2"
              >
                <span>Submit Remark</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER BLOG INDEX / NEWS BULLETIN
  // -------------------------------------------------------------
  return (
    <div className="bg-[#F8FAFC]">
      {/* Header Banner */}
      <section className="bg-[#0B1F3A] text-white py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#F5A623] text-xs font-extrabold tracking-widest uppercase font-mono block mb-2">
            INSIGHTS & UPDATES
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase leading-tight font-heading mb-4">
            ENGINEERING PERSPECTIVES FROM THE FIELD
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Technical bulletins, commercial management methodologies, and project spotlights curated
            by chartered surveyors and senior directors.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="sticky top-[69px] z-30 bg-white border-b border-[#E3E6EB] py-4 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles & case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F5A623]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedTag(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#0B1F3A] text-white'
                      : 'text-[#5A6678] hover:bg-slate-100'
                  }`}
                >
                  {cat === 'all' ? 'All Topics' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid & Sidebar Layout */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Posts Grid (8 cols) */}
            <div className="lg:col-span-8">
              {/* Featured Post Card (if no search filter applied) */}
              {!searchQuery && selectedCategory === 'all' && !selectedTag && featuredPost && (
                <div
                  onClick={() => setSelectedPostSlug(featuredPost.slug)}
                  className="group bg-white rounded-2xl border border-[#E3E6EB] hover:border-[#F5A623] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer mb-10"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded bg-[#F5A623] text-[#0B1F3A] text-[10px] font-extrabold uppercase tracking-wider shadow">
                        FEATURED BRIEF
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                      <span className="font-extrabold text-[#F5A623] uppercase font-mono">
                        {featuredPost.category}
                      </span>
                      <span>•</span>
                      <span>{featuredPost.readTime} min read</span>
                      <span>•</span>
                      <span>{featuredPost.publishedAt}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] uppercase font-heading group-hover:text-[#F5A623] transition-colors mb-3">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm text-[#5A6678] leading-relaxed mb-4">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0B1F3A] group-hover:text-[#F5A623]">
                      <span>Read Full Perspective</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Remaining Posts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPostSlug(post.slug)}
                    className="group bg-white rounded-xl border border-[#E3E6EB] hover:border-[#F5A623] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded bg-[#0B1F3A]/90 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-xs">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} min read</span>
                          <span>•</span>
                          <span>{post.publishedAt}</span>
                        </div>
                        <h3 className="text-sm font-extrabold text-[#0B1F3A] uppercase tracking-wide group-hover:text-[#F5A623] transition-colors line-clamp-2 leading-snug mb-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-[#5A6678] line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0B1F3A]">
                        <span>Read Article</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Newsletter Subscription Band */}
              <div className="bg-[#0B1F3A] text-white p-6 rounded-2xl shadow-md border border-slate-800">
                <span className="text-[#F5A623] text-[10px] font-extrabold uppercase font-mono tracking-widest block mb-2">
                  BULLETIN SUBSCRIPTION
                </span>
                <h3 className="text-base font-extrabold uppercase font-heading mb-2">
                  GET ENGINEERING INSIGHTS DELIVERED
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  Join 1,200+ GCC project developers, consultants, and procurement managers receiving
                  our monthly cost & design digests.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    placeholder="name@organization.ae"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-slate-800 text-xs text-white placeholder-slate-400 border border-slate-700 focus:outline-none focus:border-[#F5A623]"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#F5A623] hover:bg-[#E8911A] text-[#0B1F3A] font-extrabold text-xs uppercase py-2.5 rounded shadow tracking-wider"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              </div>

              {/* Tag Cloud */}
              <div className="bg-white p-6 rounded-2xl border border-[#E3E6EB] shadow-sm">
                <h4 className="text-xs font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#F5A623]" />
                  TOPIC TAG CLOUD
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                        selectedTag === tag
                          ? 'bg-[#0B1F3A] text-[#F5A623] font-bold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="mt-3 text-[11px] text-amber-600 font-bold hover:underline block"
                  >
                    Clear tag filter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

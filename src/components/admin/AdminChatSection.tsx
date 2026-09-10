import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatSession, ChatMessage } from '../../types';
import {
  Search,
  Tag,
  Filter,
  Send,
  User,
  Building,
  Check,
  X,
  Plus,
  Clock,
  Paperclip,
  CheckCheck,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

export const AdminChatSection: React.FC = () => {
  const {
    chatSessions,
    activeSessionId,
    setActiveSessionId,
    sendStaffMessage,
    updateSessionTags,
    updateSessionStatus,
    updateSessionPriority,
    updateSessionNotes,
    chatTags,
    createChatTag,
    showToast,
  } = useApp();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'pending' | 'resolved'>('all');
  const [selectedFilterTags, setSelectedFilterTags] = useState<string[]>([]);
  const [tagMatchMode, setTagMatchMode] = useState<'any' | 'all'>('any');

  // Input & Reply state
  const [replyText, setReplyText] = useState('');
  const [staffNotes, setStaffNotes] = useState('');
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [isContextDrawerOpen, setIsContextDrawerOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Active Session
  const activeSession = useMemo(() => {
    return chatSessions.find((s) => s.id === activeSessionId) || chatSessions[0];
  }, [chatSessions, activeSessionId]);

  // Sync staff notes when session changes
  useEffect(() => {
    if (activeSession) {
      setStaffNotes(activeSession.staffNotes || '');
    }
  }, [activeSession?.id]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages]);

  // Toggle filter tag
  const toggleFilterTag = (tagName: string) => {
    setSelectedFilterTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  };

  // Filtered Sessions
  const filteredSessions = useMemo(() => {
    return chatSessions.filter((s) => {
      // Search match
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        s.customerName.toLowerCase().includes(query) ||
        s.customerEmail.toLowerCase().includes(query) ||
        s.customerCompany.toLowerCase().includes(query) ||
        s.messages.some((m) => m.message.toLowerCase().includes(query));

      // Status match
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter;

      // Multi-tag match
      let matchesTags = true;
      if (selectedFilterTags.length > 0) {
        if (tagMatchMode === 'any') {
          matchesTags = selectedFilterTags.some((t) => s.tags.includes(t));
        } else {
          matchesTags = selectedFilterTags.every((t) => s.tags.includes(t));
        }
      }

      return matchesSearch && matchesStatus && matchesTags;
    });
  }, [chatSessions, searchQuery, statusFilter, selectedFilterTags, tagMatchMode]);

  // Handle Send Staff Message
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeSession) return;

    sendStaffMessage(activeSession.id, replyText.trim());
    setReplyText('');
  };

  // Quick Canned Macros
  const applyCannedResponse = (text: string) => {
    setReplyText(text);
  };

  // Add Tag to Active Session
  const handleAddTagToSession = (tagName: string) => {
    if (!activeSession) return;
    if (activeSession.tags.includes(tagName)) {
      showToast(`Tag "${tagName}" is already applied`, 'info');
      return;
    }

    // If tag doesn't exist in library, create it with a pleasant random tone
    const exists = chatTags.some((t) => t.name.toLowerCase() === tagName.toLowerCase());
    if (!exists) {
      createChatTag(tagName, '#3B82F6');
    }

    const updated = [...activeSession.tags, tagName];
    updateSessionTags(activeSession.id, updated);
    setNewTagInput('');
    setShowTagDropdown(false);
  };

  // Remove Tag from Active Session
  const handleRemoveTagFromSession = (tagName: string) => {
    if (!activeSession) return;
    const updated = activeSession.tags.filter((t) => t !== tagName);
    updateSessionTags(activeSession.id, updated);
  };

  // Save notes on blur
  const handleBlurNotes = () => {
    if (activeSession) {
      updateSessionNotes(activeSession.id, staffNotes);
      showToast('Staff notes updated', 'info');
    }
  };

  // Canned Responses library
  const cannedList = [
    {
      label: 'Welcome & SLA',
      text: 'Good day. Thank you for contacting TC Consultancy FZC. How may our engineering directors assist your project today?',
    },
    {
      label: 'Acknowledge Specs',
      text: 'We have registered your project requirements. A chartered Quantity Surveyor (MRICS) is currently reviewing the gross floor area to prepare an indicative proposal.',
    },
    {
      label: 'Office & Direct Line',
      text: 'Our headquarters is located at Sharjah Airport International Free Zone (SAIF Zone), P.O. Box 7970. You can reach our engineering directorate directly at +971 6 557 3924.',
    },
  ];

  return (
    <div className="h-[calc(100vh-125px)] flex flex-col bg-white rounded-xl border border-[#E3E6EB] overflow-hidden shadow-xs">
      {/* 3-Column Split Pane Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========================================================= */}
        {/* COLUMN 1: THREADS LIST WITH MULTI-TAG FILTER (330px width) */}
        {/* ========================================================= */}
        <div className="w-80 lg:w-96 border-r border-[#E3E6EB] flex flex-col bg-slate-50 shrink-0">
          {/* Top Search & Filter Bar */}
          <div className="p-3 border-b border-[#E3E6EB] bg-white space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, company, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#E3E6EB] text-xs text-[#0B1F3A] focus:outline-none focus:border-[#F5A623] bg-slate-50"
              />
            </div>

            {/* Status Segmented Control */}
            <div className="flex items-center rounded-lg border border-[#E3E6EB] p-0.5 bg-slate-100 text-[11px] font-bold">
              {(['all', 'open', 'pending', 'resolved'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`flex-1 py-1 rounded capitalize transition ${
                    statusFilter === st
                      ? 'bg-white text-[#0B1F3A] shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Multi-Select Tag Filter Pills */}
            <div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                <span className="font-bold uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#F5A623]" />
                  FILTER BY TAGS ({selectedFilterTags.length})
                </span>

                {selectedFilterTags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTagMatchMode(tagMatchMode === 'any' ? 'all' : 'any')}
                      className="text-amber-700 font-mono font-bold hover:underline"
                    >
                      [{tagMatchMode.toUpperCase()}]
                    </button>
                    <button
                      onClick={() => setSelectedFilterTags([])}
                      className="text-slate-400 hover:text-slate-700 font-bold"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Tag Badges horizontally scrollable */}
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1">
                {chatTags.map((tag) => {
                  const isSelected = selectedFilterTags.includes(tag.name);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleFilterTag(tag.name)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#0B1F3A] text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tag.color }} />
                      <span>{tag.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Threads List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#E3E6EB]">
            {filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                No inquiry threads match your current filters.
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isSelected = session.id === activeSession?.id;
                const lastMsg = session.messages[session.messages.length - 1];

                return (
                  <div
                    key={session.id}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`p-3.5 cursor-pointer transition flex flex-col gap-1.5 ${
                      isSelected ? 'bg-white border-l-4 border-l-[#F5A623] shadow-xs' : 'hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#0B1F3A] text-[#F5A623] font-bold text-xs flex items-center justify-center shrink-0">
                          {session.customerName.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-[#0B1F3A] truncate">
                            {session.customerName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {session.customerCompany} · {session.customerCountry}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[10px] text-slate-400 font-mono">
                          {session.lastActive.split(' ')[0]}
                        </div>
                        {session.unreadStaffCount > 0 && (
                          <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[9px] font-bold">
                            {session.unreadStaffCount}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Last message snippet */}
                    <div className="text-[11px] text-slate-600 line-clamp-1 pl-9">
                      {lastMsg ? lastMsg.message : 'No messages'}
                    </div>

                    {/* Assigned Tag Pills */}
                    {session.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pl-9 pt-0.5">
                        {session.tags.slice(0, 3).map((tName) => {
                          const tagDef = chatTags.find((t) => t.name === tName);
                          return (
                            <span
                              key={tName}
                              className="px-1.5 py-0.2 rounded text-[9px] font-bold text-white tracking-wide"
                              style={{ backgroundColor: tagDef?.color || '#3B82F6' }}
                            >
                              {tName}
                            </span>
                          );
                        })}
                        {session.tags.length > 3 && (
                          <span className="text-[9px] text-slate-400 font-mono">
                            +{session.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 2: ACTIVE CONVERSATION STREAM */}
        {/* ========================================================= */}
        {activeSession ? (
          <div className="flex-1 flex flex-col bg-white min-w-0">
            {/* Conversation Header */}
            <div className="p-3.5 border-b border-[#E3E6EB] flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-bold text-xs">
                  {activeSession.customerName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-extrabold text-[#0B1F3A]">
                      {activeSession.customerName}
                    </h2>
                    <span
                      className={`px-2 py-0.2 rounded text-[9px] font-bold uppercase ${
                        activeSession.status === 'open'
                          ? 'bg-emerald-100 text-emerald-800'
                          : activeSession.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {activeSession.status}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase font-mono ${
                        activeSession.priority === 'urgent'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {activeSession.priority}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {activeSession.customerEmail} · {activeSession.customerCompany} ({activeSession.customerCountry})
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsContextDrawerOpen(!isContextDrawerOpen)}
                className={`p-1.5 rounded-lg border text-xs font-bold transition flex items-center gap-1 ${
                  isContextDrawerOpen
                    ? 'border-[#0B1F3A] bg-slate-100 text-[#0B1F3A]'
                    : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
                title="Toggle Context Drawer"
              >
                <span>Details & Tags</span>
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
              {activeSession.messages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isSystem = msg.sender === 'system';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? 'items-start' : isSystem ? 'items-center' : 'items-end'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-0.5 px-1 font-mono">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        isCustomer
                          ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                          : isSystem
                          ? 'bg-amber-50 text-amber-900 border border-amber-200/70 text-center font-medium'
                          : 'bg-[#0B1F3A] text-white rounded-tr-none'
                      }`}
                    >
                      {msg.message}

                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-200/50 text-[11px] flex items-center gap-1 text-amber-500">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>{msg.attachments.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Canned Macros Bar */}
            <div className="p-2 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 pl-2">
                <Sparkles className="w-3 h-3 text-[#F5A623]" /> Macros:
              </span>
              {cannedList.map((macro, idx) => (
                <button
                  key={idx}
                  onClick={() => applyCannedResponse(macro.text)}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-100/60 hover:text-[#0B1F3A] text-slate-700 text-[11px] font-medium whitespace-nowrap transition"
                >
                  {macro.label}
                </button>
              ))}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="p-3 bg-white border-t border-[#E3E6EB] flex items-center gap-2 shrink-0">
              <textarea
                rows={2}
                placeholder="Type response to client as TC Consultancy staff..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendReply(e);
                  }
                }}
                className="flex-1 p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-[#F5A623] focus:bg-white resize-none"
              />

              <button
                type="submit"
                disabled={!replyText.trim()}
                className="px-4 py-3 bg-[#0B1F3A] hover:bg-[#071528] text-[#F5A623] font-bold text-xs uppercase rounded-lg shadow-sm disabled:opacity-40 transition flex items-center gap-1.5"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-xs">
            Select an inquiry thread to inspect messages.
          </div>
        )}

        {/* ========================================================= */}
        {/* COLUMN 3: COLLAPSIBLE CONTEXT & TAG DRAWER (280px width) */}
        {/* ========================================================= */}
        {activeSession && isContextDrawerOpen && (
          <div className="w-72 border-l border-[#E3E6EB] bg-white p-4 overflow-y-auto space-y-5 shrink-0 text-xs">
            {/* Contact Details */}
            <div>
              <h3 className="text-[10px] font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-2">
                CLIENT DOSSIER
              </h3>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Organization</span>
                  <span className="font-bold text-[#0B1F3A]">{activeSession.customerCompany}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Email</span>
                  <span className="font-mono text-slate-700 truncate block">{activeSession.customerEmail}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Jurisdiction</span>
                  <span className="font-bold text-slate-700">{activeSession.customerCountry}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Session ID</span>
                  <span className="font-mono text-[10px] text-slate-500">{activeSession.id}</span>
                </div>
              </div>
            </div>

            {/* Status & Priority Selectors */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                  Thread Status
                </label>
                <select
                  value={activeSession.status}
                  onChange={(e) => updateSessionStatus(activeSession.id, e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 bg-white font-bold text-slate-800 focus:outline-none focus:border-[#F5A623]"
                >
                  <option value="open">Open (Active)</option>
                  <option value="pending">Pending (Awaiting Client)</option>
                  <option value="resolved">Resolved (Closed)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                  Urgency / Priority
                </label>
                <select
                  value={activeSession.priority}
                  onChange={(e) => updateSessionPriority(activeSession.id, e.target.value as any)}
                  className="w-full px-2.5 py-1.5 rounded border border-slate-200 bg-white font-bold text-slate-800 focus:outline-none focus:border-[#F5A623]"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* ⭐ THREAD TAGS MANAGER */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-extrabold text-[#0B1F3A] uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#F5A623]" />
                  SESSION TAGS ({activeSession.tags.length})
                </h3>
              </div>

              {/* Active Tag Chips with (x) delete */}
              <div className="flex flex-wrap gap-1.5 mb-3 min-h-[32px]">
                {activeSession.tags.map((tName) => {
                  const tagDef = chatTags.find((t) => t.name === tName);
                  const color = tagDef?.color || '#3B82F6';

                  return (
                    <span
                      key={tName}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold text-white shadow-xs"
                      style={{ backgroundColor: color }}
                    >
                      <span>{tName}</span>
                      <button
                        onClick={() => handleRemoveTagFromSession(tName)}
                        className="hover:bg-black/20 rounded p-0.5 transition"
                        title={`Remove tag ${tName}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>

              {/* Tag Adder Input & Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="Type to add or create tag..."
                    value={newTagInput}
                    onChange={(e) => {
                      setNewTagInput(e.target.value);
                      setShowTagDropdown(true);
                    }}
                    onFocus={() => setShowTagDropdown(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newTagInput.trim()) {
                        e.preventDefault();
                        handleAddTagToSession(newTagInput.trim());
                      }
                    }}
                    className="flex-1 px-2.5 py-1.5 rounded border border-slate-200 text-xs focus:outline-none focus:border-[#F5A623]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newTagInput.trim()) handleAddTagToSession(newTagInput.trim());
                    }}
                    disabled={!newTagInput.trim()}
                    className="p-1.5 bg-[#0B1F3A] text-[#F5A623] rounded disabled:opacity-40"
                    title="Add tag"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Autocomplete Dropdown */}
                {showTagDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 max-h-44 overflow-y-auto divide-y divide-slate-100 text-xs">
                    {chatTags
                      .filter(
                        (t) =>
                          !activeSession.tags.includes(t.name) &&
                          t.name.toLowerCase().includes(newTagInput.toLowerCase())
                      )
                      .map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleAddTagToSession(tag.name)}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between transition"
                        >
                          <span className="flex items-center gap-2 font-bold text-slate-700">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }} />
                            <span>{tag.name}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {tag.usageCount} uses
                          </span>
                        </button>
                      ))}

                    {newTagInput.trim() &&
                      !chatTags.some((t) => t.name.toLowerCase() === newTagInput.toLowerCase()) && (
                        <button
                          type="button"
                          onClick={() => handleAddTagToSession(newTagInput.trim())}
                          className="w-full text-left px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold flex items-center gap-2"
                        >
                          <Plus className="w-3 h-3 text-[#F5A623]" />
                          <span>Create new tag "{newTagInput}"</span>
                        </button>
                      )}
                  </div>
                )}
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-[10px] font-extrabold text-[#0B1F3A] uppercase tracking-wider mb-1.5">
                INTERNAL STAFF NOTES
              </h3>
              <textarea
                rows={3}
                placeholder="Private director notes, rate concessions, or FIDIC clauses..."
                value={staffNotes}
                onChange={(e) => setStaffNotes(e.target.value)}
                onBlur={handleBlurNotes}
                className="w-full p-2.5 rounded bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#F5A623] resize-none"
              />
              <span className="text-[9px] text-slate-400 block mt-0.5">
                Saved automatically on blur.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

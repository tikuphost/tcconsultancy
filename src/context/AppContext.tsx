import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageView,
  ProjectItem,
  BlogPost,
  ChatTag,
  ChatSession,
  Quotation,
  SystemTelemetry,
} from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_BLOG_POSTS,
  INITIAL_CHAT_TAGS,
  INITIAL_CHAT_SESSIONS,
  INITIAL_QUOTATIONS,
} from '../data/seedData';

interface ToastNotice {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  page: PageView;
  setPage: (p: PageView) => void;
  selectedServiceSlug: string | null;
  setSelectedServiceSlug: (s: string | null) => void;
  selectedPostSlug: string | null;
  setSelectedPostSlug: (s: string | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;

  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  adminTab: 'overview' | 'chat' | 'tags' | 'quotations' | 'projects' | 'blog' | 'database' | 'settings';
  setAdminTab: (tab: any) => void;

  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  projects: ProjectItem[];
  blogPosts: BlogPost[];
  chatTags: ChatTag[];
  chatSessions: ChatSession[];
  quotations: Quotation[];
  systemTelemetry: SystemTelemetry;
  telemetry: SystemTelemetry;
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;

  activeSessionId: string;
  setActiveSessionId: (id: string) => void;

  // Customer Chat action
  sendCustomerMessage: (text: string, userMeta?: { name: string; email: string; company: string; country?: string }) => void;
  // Admin Chat actions
  sendAgentMessage: (sessionId: string, text: string) => void;
  sendStaffMessage: (sessionId: string, text: string) => void;
  updateSessionTags: (sessionId: string, tags: string[]) => void;
  updateSessionStatus: (sessionId: string, status: ChatSession['status']) => void;
  updateSessionPriority: (sessionId: string, priority: ChatSession['priority']) => void;
  updateSessionNotes: (sessionId: string, notes: string) => void;
  assignSessionAgent: (sessionId: string, agent: string) => void;

  // Tag Management
  addTag: (label: string, colour: string) => void;
  updateTag: (id: string, updates: Partial<ChatTag>) => void;
  deleteTag: (id: string) => void;
  createChatTag: (name: string, color: string, description?: string) => void;
  updateChatTag: (id: string, updates: Partial<ChatTag>) => void;
  deleteChatTag: (id: string) => void;

  // Quotation actions
  addQuotation: (q: Quotation) => void;
  updateQuotationStatus: (id: string, status: Quotation['status']) => void;

  // Project actions
  addProject: (proj: ProjectItem) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Blog moderation
  updateBlogPostStatus: (id: string, status: BlogPost['status'], feedback?: string) => void;
  addBlogPost: (post: BlogPost) => void;

  // Toasts
  toasts: ToastNotice[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const safeParseLocalStorage = <T,>(key: string, fallback: T): T => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return fallback;
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (Array.isArray(fallback)) {
      return Array.isArray(parsed) && parsed.length > 0 ? (parsed as T) : fallback;
    }
    return parsed && typeof parsed === 'object' ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
};

const safeSetLocalStorage = (key: string, value: any) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // Gracefully handle storage quota or private mode restrictions
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<PageView>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [selectedPostSlug, setSelectedPostSlug] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'overview' | 'chat' | 'tags' | 'quotations' | 'projects' | 'blog' | 'database' | 'settings'>('overview');

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    safeParseLocalStorage('tc_projects', INITIAL_PROJECTS)
  );

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() =>
    safeParseLocalStorage('tc_blogs', INITIAL_BLOG_POSTS)
  );

  const [chatTags, setChatTags] = useState<ChatTag[]>(() =>
    safeParseLocalStorage('tc_chat_tags', INITIAL_CHAT_TAGS)
  );

  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() =>
    safeParseLocalStorage('tc_chat_sessions', INITIAL_CHAT_SESSIONS)
  );

  const [quotations, setQuotations] = useState<Quotation[]>(() =>
    safeParseLocalStorage('tc_quotations', INITIAL_QUOTATIONS)
  );

  const [activeSessionId, setActiveSessionId] = useState<string>('session-101');
  const [toasts, setToasts] = useState<ToastNotice[]>([]);

  // Hostinger Cloud Startup Simulated Telemetry
  const [telemetry] = useState<SystemTelemetry>({
    cpuLoadPercent: 18.4,
    cpuCores: 4,
    memoryUsedGB: 1.2,
    memoryTotalGB: 4.0,
    databaseUsedMB: 184.2,
    databaseMaxMB: 6144, // 6 GB
    activeThreads: 14,
    uptimeSeconds: 846200,
    cpuUsagePercent: 18.4,
    ramUsageMB: 1184,
    ramTotalMB: 4096,
    storageUsageGB: 21.8,
    storageTotalGB: 100,
    mysqlDbSizeMB: 184.2,
    mysqlMaxDbSizeMB: 6144,
    mysqlConnections: 4,
    activeNodeAppSlots: 1,
    inodesUsed: 142800,
    inodesMax: 2000000,
  });

  // Persist state updates to localStorage
  useEffect(() => {
    safeSetLocalStorage('tc_projects', projects);
  }, [projects]);

  useEffect(() => {
    safeSetLocalStorage('tc_blogs', blogPosts);
  }, [blogPosts]);

  useEffect(() => {
    safeSetLocalStorage('tc_chat_tags', chatTags);
  }, [chatTags]);

  useEffect(() => {
    safeSetLocalStorage('tc_chat_sessions', chatSessions);
  }, [chatSessions]);

  useEffect(() => {
    safeSetLocalStorage('tc_quotations', quotations);
  }, [quotations]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Scroll to top on page navigation
  const navigateToPage = (newPage: PageView) => {
    setPage(newPage);
    setSelectedPostSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Customer Chat Send
  const sendCustomerMessage = (
    text: string,
    userMeta?: { name: string; email: string; company: string; country?: string }
  ) => {
    let currentSessionId = activeSessionId;
    let targetSession = chatSessions.find((s) => s.id === currentSessionId);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!targetSession) {
      const newSession: ChatSession = {
        id: 'session-' + Date.now(),
        contactIdentifier: userMeta?.email || 'guest@client.ae',
        customerName: userMeta?.name || 'Visitor Lead',
        customerEmail: userMeta?.email || 'visitor@client.ae',
        customerCompany: userMeta?.company || 'Prospective Developer',
        customerCountry: userMeta?.country || 'UAE',
        status: 'waiting_agent',
        priority: 'normal',
        tags: ['New Lead', 'Technical Query'],
        adminNotes: 'Auto-created via Storefront floating chat widget.',
        assignedAgent: 'Unassigned',
        lastMessageText: text,
        lastMessageTime: 'Just now',
        unreadAdminCount: 1,
        unreadCustomerCount: 0,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        messages: [
          {
            id: 'msg-' + Date.now(),
            sessionId: 'session-' + Date.now(),
            sender: 'customer',
            senderName: userMeta?.name || 'Visitor Lead',
            message: text,
            timestamp: timeStr,
            read: true,
          },
        ],
      };
      setChatSessions((prev) => [newSession, ...prev]);
      setActiveSessionId(newSession.id);
      currentSessionId = newSession.id;

      // Auto reply from TC Desk Bot SLA acknowledgement
      setTimeout(() => {
        const botReply = {
          id: 'bot-' + Date.now(),
          sessionId: currentSessionId,
          sender: 'system' as const,
          senderName: 'TC Desk Bot',
          message:
            'Thank you for reaching TC Consultancy. Our engineering desk in Sharjah has logged your inquiry. An accredited consultant will connect shortly.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: true,
        };
        setChatSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId
              ? {
                  ...s,
                  messages: [...s.messages, botReply],
                  lastMessageText: botReply.message,
                  lastMessageTime: 'Just now',
                }
              : s
          )
        );
      }, 1200);
      return;
    }

    // Existing session
    const userMsg = {
      id: 'msg-' + Date.now(),
      sessionId: currentSessionId,
      sender: 'customer' as const,
      senderName: targetSession.customerName || 'Customer',
      message: text,
      timestamp: timeStr,
      read: true,
    };

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? {
              ...s,
              messages: [...s.messages, userMsg],
              lastMessageText: text,
              lastMessageTime: 'Just now',
              unreadAdminCount: s.unreadAdminCount + 1,
              status: s.status === 'closed' || s.status === 'resolved' ? 'waiting_agent' : s.status,
              updatedAt: now.toISOString(),
            }
          : s
      )
    );

    // Occasional simulated agent acknowledgement
    setTimeout(() => {
      const autoAgentReply = {
        id: 'agent-' + Date.now(),
        sessionId: currentSessionId,
        sender: 'agent' as const,
        senderName: targetSession.assignedAgent && targetSession.assignedAgent !== 'Unassigned'
          ? targetSession.assignedAgent
          : 'Simon Davies (QS Lead)',
        message: 'Thank you for the details. Reviewing your requirements now.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };

      setChatSessions((prev) =>
        prev.map((s) =>
          s.id === currentSessionId
            ? {
                ...s,
                messages: [...s.messages, autoAgentReply],
                lastMessageText: autoAgentReply.message,
                lastMessageTime: 'Just now',
                unreadCustomerCount: s.unreadCustomerCount + 1,
              }
            : s
        )
      );
    }, 2500);
  };

  // Agent Chat Send
  const sendAgentMessage = (sessionId: string, text: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const session = chatSessions.find((s) => s.id === sessionId);
    const agentName = session?.assignedAgent || 'TC Senior Consultant';

    const newMsg = {
      id: 'agent-msg-' + Date.now(),
      sessionId,
      sender: 'agent' as const,
      senderName: agentName,
      message: text,
      timestamp: timeStr,
      read: false,
    };

    setChatSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              messages: [...s.messages, newMsg],
              lastMessageText: text,
              lastMessageTime: 'Just now',
              unreadCustomerCount: s.unreadCustomerCount + 1,
              unreadAdminCount: 0,
              updatedAt: new Date().toISOString(),
            }
          : s
      )
    );
  };

  // Multi-Tag update
  const updateSessionTags = (sessionId: string, tags: string[]) => {
    setChatSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, tags } : s))
    );

    // Update usage counts
    setChatTags((prevTags) =>
      prevTags.map((tag) => {
        const count = chatSessions.filter((s) =>
          s.id === sessionId ? tags.includes(tag.label) : s.tags.includes(tag.label)
        ).length;
        return { ...tag, usageCount: count };
      })
    );

    showToast('Tags updated successfully', 'success');
  };

  const updateSessionStatus = (sessionId: string, status: ChatSession['status']) => {
    setChatSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, status } : s))
    );
    showToast(`Session status changed to ${status}`, 'info');
  };

  const updateSessionPriority = (sessionId: string, priority: ChatSession['priority']) => {
    setChatSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, priority } : s))
    );
    showToast(`Priority changed to ${priority}`, 'info');
  };

  const updateSessionNotes = (sessionId: string, adminNotes: string) => {
    setChatSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, adminNotes } : s))
    );
    showToast('Private notes saved', 'success');
  };

  const assignSessionAgent = (sessionId: string, assignedAgent: string) => {
    setChatSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, assignedAgent } : s))
    );
    showToast(`Assigned to ${assignedAgent}`, 'info');
  };

  // Tag Management CRUD
  const addTag = (label: string, colour: string) => {
    const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (chatTags.some((t) => t.slug === slug)) {
      showToast('A tag with this name already exists', 'error');
      return;
    }
    const newTag: ChatTag = {
      id: 'tag-' + Date.now(),
      label: label.trim(),
      slug,
      colour: colour || '#3B82F6',
      isSystem: false,
      usageCount: 0,
    };
    setChatTags((prev) => [...prev, newTag]);
    showToast(`Created tag "${label}"`, 'success');
  };

  const updateTag = (id: string, updates: Partial<ChatTag>) => {
    setChatTags((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    showToast('Tag updated', 'success');
  };

  const deleteTag = (id: string) => {
    const tagToDelete = chatTags.find((t) => t.id === id);
    if (!tagToDelete) return;
    if (tagToDelete.isSystem) {
      showToast('System tags are protected from deletion', 'warning');
      return;
    }
    // Remove from tag list
    setChatTags((prev) => prev.filter((t) => t.id !== id));
    // Remove from all sessions that reference this tag label
    setChatSessions((prev) =>
      prev.map((s) => ({
        ...s,
        tags: s.tags.filter((tLabel) => tLabel !== tagToDelete.label),
      }))
    );
    showToast(`Tag "${tagToDelete.label}" deleted`, 'info');
  };

  // Additional Tag CRUD helpers
  const createChatTag = (name: string, color: string, description?: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (chatTags.some((t) => (t.slug === slug || t.name === name || t.label === name))) {
      showToast('A tag with this name already exists', 'error');
      return;
    }
    const newTag: ChatTag = {
      id: 'tag-' + Date.now(),
      name: name.trim(),
      label: name.trim(),
      slug,
      color: color || '#3B82F6',
      colour: color || '#3B82F6',
      description: description || 'General routing tag',
      isSystem: false,
      usageCount: 0,
    };
    setChatTags((prev) => [...prev, newTag]);
    showToast(`Created tag "${name}"`, 'success');
  };

  const updateChatTag = (id: string, updates: Partial<ChatTag>) => {
    setChatTags((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updates,
              name: updates.name || updates.label || t.name || t.label,
              label: updates.label || updates.name || t.label || t.name,
              color: updates.color || updates.colour || t.color || t.colour,
              colour: updates.colour || updates.color || t.colour || t.color,
            }
          : t
      )
    );
    showToast('Tag updated', 'success');
  };

  const deleteChatTag = (id: string) => {
    deleteTag(id);
  };

  // Quotation Management
  const addQuotation = (q: Quotation) => {
    setQuotations((prev) => [q, ...prev]);
    showToast(`RFQ ${q.rfqNumber} registered successfully!`, 'success');
  };

  const updateQuotationStatus = (id: string, status: Quotation['status']) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
    showToast(`RFQ status updated to ${status}`, 'info');
  };

  // Project Management
  const addProject = (proj: ProjectItem) => {
    setProjects((prev) => [proj, ...prev]);
    showToast(`Project "${proj.name}" added to catalog`, 'success');
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Project updated', 'info');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    showToast('Project removed', 'info');
  };

  // Blog Moderation
  const updateBlogPostStatus = (id: string, status: BlogPost['status'], feedback?: string) => {
    setBlogPosts((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status,
              moderationFeedback: feedback,
              publishedAt: status === 'published' ? new Date().toISOString().split('T')[0] : b.publishedAt,
            }
          : b
      )
    );
    showToast(`Article status updated to ${status}`, 'info');
  };

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts((prev) => [post, ...prev]);
    showToast(`Article "${post.title}" published`, 'success');
  };

  const toast = toasts.length > 0 ? {
    message: toasts[0].message,
    type: (toasts[0].type === 'error' ? 'warning' : toasts[0].type) as 'success' | 'info' | 'warning',
  } : null;

  return (
    <AppContext.Provider
      value={{
        page,
        setPage: navigateToPage,
        selectedServiceSlug,
        setSelectedServiceSlug,
        selectedPostSlug,
        setSelectedPostSlug,
        selectedProjectId,
        setSelectedProjectId,
        isAdminMode,
        setIsAdminMode,
        adminTab,
        setAdminTab,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        isChatOpen,
        setIsChatOpen,
        projects,
        blogPosts,
        chatTags,
        chatSessions,
        quotations,
        systemTelemetry: telemetry,
        telemetry,
        toast,
        activeSessionId,
        setActiveSessionId,
        sendCustomerMessage,
        sendAgentMessage,
        sendStaffMessage: sendAgentMessage,
        updateSessionTags,
        updateSessionStatus,
        updateSessionPriority,
        updateSessionNotes,
        assignSessionAgent,
        addTag,
        updateTag,
        deleteTag,
        createChatTag,
        updateChatTag,
        deleteChatTag,
        addQuotation,
        updateQuotationStatus,
        addProject,
        updateProject,
        deleteProject,
        updateBlogPostStatus,
        addBlogPost,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

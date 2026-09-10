import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  MessageSquare,
  Tag,
  FileText,
  Building,
  Newspaper,
  Database,
  ShieldCheck,
} from 'lucide-react';

interface AdminSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentTab, onSelectTab }) => {
  const { chatSessions, quotations, chatTags, blogPosts } = useApp();

  const totalUnreadStaff = chatSessions.reduce((acc, s) => acc + s.unreadStaffCount, 0);
  const pendingRFQs = quotations.filter((q) => q.status === 'Pending').length;
  const pendingPosts = blogPosts.filter((b) => b.status === 'pending').length;

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview & KPIs',
      icon: LayoutDashboard,
    },
    {
      id: 'chat',
      label: 'Live Chat Inbox',
      icon: MessageSquare,
      badge: totalUnreadStaff > 0 ? totalUnreadStaff : null,
      badgeColor: 'bg-red-500 text-white',
    },
    {
      id: 'tags',
      label: 'Tag Manager',
      icon: Tag,
      badge: chatTags.length,
      badgeColor: 'bg-slate-700 text-slate-300',
    },
    {
      id: 'quotations',
      label: 'RFQ Pipeline',
      icon: FileText,
      badge: pendingRFQs > 0 ? `${pendingRFQs} new` : null,
      badgeColor: 'bg-amber-500 text-[#0B1F3A]',
    },
    {
      id: 'projects',
      label: 'Projects Catalog',
      icon: Building,
    },
    {
      id: 'blog',
      label: 'News Bulletin',
      icon: Newspaper,
      badge: pendingPosts > 0 ? `${pendingPosts} pend` : null,
      badgeColor: 'bg-sky-500 text-white',
    },
    {
      id: 'database',
      label: 'Telemetry & SQL',
      icon: Database,
    },
  ];

  return (
    <aside className="w-64 bg-[#071528] text-slate-300 border-r border-slate-800 flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-800">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#F5A623] block mb-1">
          NAVIGATION MENU
        </span>
        <div className="text-xs text-slate-400">Hostinger Cloud Deployment</div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition ${
                isActive
                  ? 'bg-[#F5A623] text-[#0B1F3A] shadow-sm font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0B1F3A]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-[#0B1F3A] text-white' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* ISO Quality Badge in footer */}
      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-2 text-slate-300 font-bold mb-1">
          <ShieldCheck className="w-4 h-4 text-[#F5A623]" />
          <span>ISO 9001:2015 Compliant</span>
        </div>
        <div>Standardized Engineering Quality Management Workflow</div>
      </div>
    </aside>
  );
};

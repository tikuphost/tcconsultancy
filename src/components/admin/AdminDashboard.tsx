import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTopNav } from './AdminTopNav';
import { AdminSidebar } from './AdminSidebar';
import { AdminOverviewSection } from './AdminOverviewSection';
import { AdminChatSection } from './AdminChatSection';
import { AdminTagManager } from './AdminTagManager';
import { AdminQuotationsSection } from './AdminQuotationsSection';
import { AdminProjectsSection } from './AdminProjectsSection';
import { AdminBlogSection } from './AdminBlogSection';
import { AdminDatabaseSection } from './AdminDatabaseSection';

export const AdminDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Admin Top Header with Telemetry */}
      <AdminTopNav />

      {/* Main Admin Workspace (Sidebar + Content) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

        {/* Dynamic Section Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentTab === 'overview' && (
              <AdminOverviewSection onNavigateTab={(tab) => setCurrentTab(tab)} />
            )}
            {currentTab === 'chat' && <AdminChatSection />}
            {currentTab === 'tags' && <AdminTagManager />}
            {currentTab === 'quotations' && <AdminQuotationsSection />}
            {currentTab === 'projects' && <AdminProjectsSection />}
            {currentTab === 'blog' && <AdminBlogSection />}
            {currentTab === 'database' && <AdminDatabaseSection />}
          </div>
        </main>
      </div>
    </div>
  );
};

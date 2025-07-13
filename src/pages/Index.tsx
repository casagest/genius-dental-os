import React from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AIInsights from "@/components/dashboard/AIInsights";
import ChatWidget from "@/components/chat/ChatWidget";
import AIModulesGrid from "@/components/dashboard/AIModulesGrid";
import BusinessMetrics from "@/components/dashboard/BusinessMetrics";
import QuickActions from "@/components/dashboard/QuickActions";
import { useRole } from "@/contexts/RoleContext";

const Index = () => {
  const { currentRole, getRoleConfig } = useRole();
  const roleConfig = getRoleConfig();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-4 space-y-6">
        {/* 🎯 BUSINESS METRICS - CEO Focus */}
        <div className="animate-fade-in">
          <BusinessMetrics />
        </div>

        {/* 📊 ROLE STATISTICS */}
        <div className="animate-slide-up animate-delay-100">
          <StatsGrid />
        </div>

        {/* 🚀 MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 animate-slide-up animate-delay-200">
          <div className="xl:col-span-3">
            <div className="medical-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="heading-secondary">🎯 Module Active pentru {roleConfig.name}</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Accesează direct funcțiile pentru rolul tău
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${roleConfig.gradientFrom} ${roleConfig.gradientTo}`}>
                  {currentRole.toUpperCase()}
                </div>
              </div>
              <AIModulesGrid />
            </div>
          </div>

          {/* RIGHT COLUMN - AI & Activity */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="medical-card p-6">
              <h3 className="heading-secondary mb-4">🧠 AI Insights</h3>
              <AIInsights />
            </div>
            
            {/* Recent Activity - Compact */}
            <div className="medical-card p-6">
              <h3 className="heading-secondary mb-4">📋 Activitate</h3>
              <RecentActivity />
            </div>

            {/* Quick Actions for current role */}
            <div className="medical-card p-6">
              <h3 className="heading-secondary mb-4">⚡ Acțiuni Rapide</h3>
              <QuickActions />
            </div>
          </div>
        </div>
      </main>

      {/* 💬 Global Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;

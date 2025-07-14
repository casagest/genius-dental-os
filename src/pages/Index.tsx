import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BusinessMetrics from "@/components/dashboard/BusinessMetrics";
import AIModulesGrid from "@/components/dashboard/AIModulesGrid";
import AIInsights from "@/components/dashboard/AIInsights";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import ChatWidget from "@/components/chat/ChatWidget";
import { useRole } from "@/contexts/RoleContext";

const Index = () => {
  const { currentRole, getRoleConfig } = useRole();
  const roleConfig = getRoleConfig();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background to-slate-900">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Header with Sidebar Toggle */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/20 bg-gradient-to-r from-background/95 to-card/95 backdrop-blur-xl">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              <DashboardHeader />
            </div>
          </div>
          
          {/* Main Content */}
          <main className="relative z-10 p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
            {/* 🎯 CEO BUSINESS METRICS */}
            <section className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-2">
                  Dashboard Executive
                </h2>
                <p className="text-muted-foreground">
                  Performanță în timp real pentru {roleConfig.name}
                </p>
              </div>
              <BusinessMetrics />
            </section>

            {/* 🚀 MAIN WORKSPACE */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* AI MODULES - Primary Focus */}
              <div className="lg:col-span-2">
                <div className="glass-card p-6 md:p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                        🎯 Module AI Active
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base">
                        Funcții specializate pentru {roleConfig.name}
                      </p>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm whitespace-nowrap">
                      {currentRole.toUpperCase()}
                    </div>
                  </div>
                  <AIModulesGrid />
                </div>
              </div>

              {/* INTELLIGENT SIDEBAR */}
              <div className="space-y-6">
                {/* AI INSIGHTS */}
                <div className="glass-card p-4 md:p-6 rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                      <span className="text-white font-bold">AI</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">
                      Insights Inteligente
                    </h3>
                  </div>
                  <AIInsights />
                </div>
                
                {/* RECENT ACTIVITY */}
                <div className="glass-card p-4 md:p-6 rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                      <span className="text-white font-bold">📊</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">
                      Activitate Live
                    </h3>
                  </div>
                  <RecentActivity />
                </div>

                {/* QUICK ACTIONS */}
                <div className="glass-card p-4 md:p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-xl">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-white font-bold">⚡</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">
                      Acțiuni Rapide
                    </h3>
                  </div>
                  <QuickActions />
                </div>
              </div>
            </section>
          </main>
        </SidebarInset>
      </div>

      {/* 💬 FLOATING CHAT WIDGET */}
      <ChatWidget />
    </SidebarProvider>
  );
};

export default Index;
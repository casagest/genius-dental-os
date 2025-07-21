import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BreadcrumbNav from "@/components/ui/breadcrumb-nav";
import ChatWidget from "@/components/chat/ChatWidget";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBackButton?: boolean;
  customActions?: React.ReactNode;
  className?: string;
}

const PageLayout = ({ 
  children, 
  title, 
  showBackButton = true, 
  customActions,
  className = ""
}: PageLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20">
        {/* Ambient Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
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
          
          {/* Breadcrumb Navigation */}
          <BreadcrumbNav 
            title={title}
            showBackButton={showBackButton}
            customActions={customActions}
          />
          
          {/* Page Content */}
          <main className={`relative z-10 p-4 md:p-6 lg:p-8 ${className}`}>
            {children}
          </main>
        </SidebarInset>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget />
    </SidebarProvider>
  );
};

export default PageLayout;
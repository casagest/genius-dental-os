import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex w-full">
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50">
          <DashboardHeader />
        </header>
        
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
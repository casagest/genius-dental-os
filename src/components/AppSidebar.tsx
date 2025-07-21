import { useState } from "react";
import { 
  Home, 
  Calendar, 
  Users, 
  Brain, 
  Activity, 
  Stethoscope, 
  BarChart3, 
  DollarSign, 
  Settings,
  Scissors,
  Heart,
  MessageSquare,
  Shield,
  Package,
  Zap,
  TrendingUp,
  FileText,
  Plus
} from "lucide-react";
import { NavLink } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    description: "Medical OS Dashboard"
  },
  {
    title: "Patient Portal", 
    url: "/patient-portal",
    icon: Heart,
    description: "Patient Management"
  },
  {
    title: "Appointments",
    url: "/appointments", 
    icon: Calendar,
    description: "Schedule Management"
  },
  {
    title: "Surgical Planning AI",
    url: "/surgical",
    icon: Scissors,
    description: "AI-Powered Surgery"
  },
  {
    title: "Clinical Agent",
    url: "/clinical",
    icon: Stethoscope,
    description: "AI Clinical Assistant"
  },
  {
    title: "CFO Dashboard",
    url: "/cfo",
    icon: DollarSign,
    description: "Financial Intelligence"
  },
  {
    title: "Inventory Brain",
    url: "/inventory",
    icon: Package,
    description: "Smart Inventory"
  },
  {
    title: "Lab Sync",
    url: "/labsync",
    icon: Activity,
    description: "Laboratory Integration"
  },
  {
    title: "AI Marketing",
    url: "/marketing",
    icon: TrendingUp,
    description: "Marketing Intelligence"
  },
  {
    title: "Business Intelligence",
    url: "/business-intelligence",
    icon: BarChart3,
    description: "Analytics & Reports"
  }
];

const integrationItems = [
  {
    title: "Integrations",
    url: "/integrations",
    icon: Zap,
    description: "System Integrations"
  },
  {
    title: "Native Features",
    url: "/native-features", 
    icon: Shield,
    description: "Native App Features"
  },
  {
    title: "Staff Management",
    url: "/staff",
    icon: Users,
    description: "Team Management"
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  
  return (
    <Sidebar className={collapsed ? "w-16" : "w-80"} collapsible="icon">
      <SidebarContent className="bg-gradient-to-b from-background via-background to-accent/5">
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/80">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-lg font-bold medical-gradient">MedicalCor</h2>
                <p className="text-xs text-muted-foreground">Genius OS</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
            Core Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-primary/5">
                    <NavLink 
                      to={item.url} 
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary/10 text-primary border-l-4 border-primary shadow-sm' 
                            : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Integrations */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
            System & Integrations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {integrationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-primary/5">
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary/10 text-primary border-l-4 border-primary shadow-sm' 
                            : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Features */}
        {!collapsed && (
          <div className="p-4 mt-auto">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI Powered</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Experience the future of dental practice management with our AI-driven modules.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs text-green-600">All systems operational</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
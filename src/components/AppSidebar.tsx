import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Stethoscope, 
  Users, 
  Settings, 
  BarChart3, 
  Megaphone, 
  Bot,
  Zap,
  Database,
  Microscope,
  Clock,
  CreditCard,
  Globe,
  Home,
  Brain,
  Scan,
  Shield,
  Star,
  Smartphone
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRole } from "@/contexts/RoleContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AppSidebar = () => {
  const location = useLocation();
  const { currentRole, getRoleConfig } = useRole();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const roleConfig = getRoleConfig();

  // Navigation items based on role
  const getNavigationItems = () => {
    const baseItems = [
      { title: "Dashboard", url: "/", icon: Home, badge: null },
      { title: "AI Clinical", url: "/clinical", icon: Brain, badge: "AI" },
      { title: "Programări", url: "/appointments", icon: Calendar, badge: null },
    ];

    const roleSpecificItems = {
      medic: [
        { title: "CBCT Scanner", url: "/cbct", icon: Scan, badge: "3D" },
        { title: "Planificare AI", url: "/surgical", icon: Microscope, badge: "AI" },
        { title: "Pacienți", url: "/patients", icon: Users, badge: null },
      ],
      asistent: [
        { title: "Inventar", url: "/inventory", icon: Database, badge: null },
        { title: "Laborator", url: "/lab", icon: Microscope, badge: null },
        { title: "Programări", url: "/appointments", icon: Clock, badge: null },
      ],
      receptie: [
        { title: "Check-in", url: "/checkin", icon: Users, badge: null },
        { title: "Plăți", url: "/payments", icon: CreditCard, badge: null },
        { title: "Programări", url: "/appointments", icon: Calendar, badge: null },
      ],
      tehnician: [
        { title: "Laborator", url: "/lab", icon: Microscope, badge: null },
        { title: "Inventar", url: "/inventory", icon: Database, badge: null },
        { title: "Comenzi", url: "/orders", icon: Zap, badge: null },
      ],
      ceo: [
        { title: "Dashboard CFO", url: "/cfo", icon: BarChart3, badge: "€" },
        { title: "Analytics", url: "/analytics", icon: BarChart3, badge: null },
        { title: "Marketing", url: "/marketing", icon: Megaphone, badge: "AI" },
        { title: "Rapoarte", url: "/reports", icon: Database, badge: null },
      ],
      marketing: [
        { title: "AI Marketing", url: "/marketing", icon: Megaphone, badge: "AI" },
        { title: "Campanii", url: "/campaigns", icon: Globe, badge: null },
        { title: "Analytics", url: "/analytics", icon: BarChart3, badge: null },
      ],
    };

    return [...baseItems, ...(roleSpecificItems[currentRole] || [])];
  };

  const integrationItems = [
    { title: "Integrari", url: "/integrations", icon: Settings, badge: null },
    { title: "iStoma Hub", url: "/istoma", icon: Globe, badge: "NEW" },
    { title: "All-on-X", url: "/allon", icon: Star, badge: "PRO" },
    { title: "Mobile Native", url: "/native-features", icon: Smartphone, badge: "📱" },
  ];

  const navigationItems = getNavigationItems();

  const isActiveRoute = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-primary/20 bg-gradient-to-b from-card to-background">
      <SidebarRail />
      
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg truncate bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MedicalCor
              </h2>
              <p className="text-xs text-muted-foreground truncate">
                {roleConfig.name}
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            {isCollapsed ? "•" : "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.url)}
                    className="w-full"
                  >
                    <Link 
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isActiveRoute(item.url)
                          ? 'bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30'
                          : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 truncate font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Integration Tools */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground">
            {isCollapsed ? "•" : "Integrari"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {integrationItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.url)}
                    className="w-full"
                  >
                    <Link 
                      to={item.url}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                        isActiveRoute(item.url)
                          ? 'bg-gradient-to-r from-secondary/20 to-accent/20 text-secondary border border-secondary/30'
                          : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 truncate font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="outline" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!isCollapsed && (
          <div className="glass-card p-3 rounded-xl border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Sistema Online</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Toate modulele AI sunt active
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
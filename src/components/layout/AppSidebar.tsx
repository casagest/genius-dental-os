import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Calendar, 
  Brain, 
  BarChart3, 
  Settings, 
  Home,
  Stethoscope,
  Search,
  Megaphone,
  Zap,
  DollarSign,
  Package,
  Users,
  Wrench,
  Activity
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRole } from "@/contexts/RoleContext";

const navigationItems = [
  { title: "🦄 GENIUS 3.0", url: "/medical-workflow", icon: Brain, roles: ['medic', 'asistent', 'ceo'], premium: true },
  { title: "🚀 AI SURGICAL", url: "/surgical-ai", icon: Brain, roles: ['medic'], premium: true },
  { title: "🔴 REAL-TIME MONITOR", url: "/surgical-monitor", icon: Activity, roles: ['medic', 'asistent'], premium: true },
  { title: "🔗 LAB SYNC GENIUS", url: "/lab-sync", icon: Wrench, roles: ['medic', 'tehnician'], premium: true },
  { title: "Dashboard", url: "/", icon: Home, roles: ['medic', 'asistent', 'receptie', 'tehnician', 'ceo', 'marketing'] },
  { title: "Appointments", url: "/appointments", icon: Calendar, roles: ['medic', 'asistent', 'receptie'] },
  { title: "Clinical Agent", url: "/clinical", icon: Brain, roles: ['medic'] },
  { title: "AllOnX Hub", url: "/allonx", icon: Zap, roles: ['medic'] },
  { title: "Lab Sync", url: "/labsync", icon: Wrench, roles: ['medic', 'tehnician'] },
  { title: "Inventory Brain", url: "/inventory", icon: Package, roles: ['asistent', 'tehnician'] },
  { title: "CFO Dashboard", url: "/cfo", icon: DollarSign, roles: ['ceo'] },
  { title: "AI Marketing", url: "/marketing", icon: Megaphone, roles: ['marketing', 'ceo'] },
  { title: "Integrations", url: "/integrations", icon: Settings, roles: ['ceo', 'marketing'] },
  { title: "Medical Dashboard", url: "/dashboard", icon: BarChart3, roles: ['medic', 'ceo'] },
  { title: "Patient Portal", url: "/patient-portal", icon: Users, roles: ['receptie', 'medic'] }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { currentRole } = useRole();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(currentRole)
  );

  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-holographic font-bold">
            🚀 Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className={`mr-2 h-4 w-4 ${item.premium ? 'text-holographic' : ''}`} />
                      {!collapsed && (
                        <span className={item.premium ? 'text-holographic font-bold' : ''}>
                          {item.title}
                          {item.premium && !collapsed && (
                            <span className="ml-2 text-xs bg-holographic/20 text-holographic px-2 py-0.5 rounded-full">
                              🦄 UNICORN
                            </span>
                          )}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
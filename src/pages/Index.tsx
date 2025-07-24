import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRole } from "@/contexts/RoleContext";
import { useRealData } from "@/hooks/useRealData";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, Users, Stethoscope, DollarSign, Clock, Activity,
  Plus, UserPlus, CalendarPlus, Wrench, FileText, AlertCircle,
  TrendingUp, TrendingDown, ArrowRight, Play, Pause
} from "lucide-react";

const Index = () => {
  const { currentRole, getRoleConfig } = useRole();
  const { data, stats, isLoading } = useRealData();
  const navigate = useNavigate();
  const roleConfig = getRoleConfig();
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Intelligent predictions based on dental workflow
  const getNextActions = () => {
    const actions = [];
    
    // If it's morning, suggest reviewing appointments
    const hour = new Date().getHours();
    if (hour < 10) {
      actions.push({ 
        title: "Revizuire Programări", 
        desc: "Verifică programările de astăzi", 
        action: () => navigate('/appointments'),
        priority: 'high'
      });
    }
    
    // If there are pending lab orders, prioritize them
    if (stats.pendingLabOrders > 0) {
      actions.push({ 
        title: "Comenzi Lab Pendinte", 
        desc: `${stats.pendingLabOrders} comenzi necesită atenție`, 
        action: () => navigate('/lab-sync'),
        priority: 'urgent'
      });
    }
    
    // If no appointments today, suggest patient outreach
    if (stats.appointmentsToday === 0) {
      actions.push({ 
        title: "Contact Pacienți", 
        desc: "Niciun pacient programat - contactează pacienții", 
        action: () => navigate('/patient-portal'),
        priority: 'medium'
      });
    }
    
    return actions;
  };

  const quickStats = [
    { 
      title: "Programări Astăzi", 
      value: stats.appointmentsToday, 
      icon: Calendar, 
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      change: "+12%",
      trend: "up",
      action: () => navigate('/appointments')
    },
    { 
      title: "Pacienți Activi", 
      value: stats.totalPatients, 
      icon: Users, 
      color: "text-green-500",
      bgColor: "bg-green-50",
      change: "+5%",
      trend: "up",
      action: () => navigate('/patient-portal')
    },
    { 
      title: "Tratamente în Curs", 
      value: stats.activeTreatments, 
      icon: Activity, 
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      change: "+3%",
      trend: "up",
      action: () => navigate('/medical-dashboard')
    },
    { 
      title: "Comenzi Lab", 
      value: stats.pendingLabOrders, 
      icon: Wrench, 
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      change: "-2%",
      trend: "down",
      action: () => navigate('/lab-sync')
    },
    { 
      title: "Venituri Luna", 
      value: `€${stats.totalRevenue}`, 
      icon: DollarSign, 
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      change: "+15%",
      trend: "up",
      action: () => navigate('/cfo-dashboard')
    },
    { 
      title: "Eficiență", 
      value: "94%", 
      icon: TrendingUp, 
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
      change: "+2%",
      trend: "up",
      action: () => navigate('/medical-dashboard')
    }
  ];

  const nextActions = getNextActions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section - Streamlined */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground p-6 rounded-xl mb-6 mx-6 mt-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">🦷 {roleConfig.name}</h1>
            <p className="text-base opacity-90">{roleConfig.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-75">Astăzi</p>
            <p className="text-xl font-semibold">{new Date().toLocaleDateString('ro-RO')}</p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview">Vizualizare Generală</TabsTrigger>
            <TabsTrigger value="patients">Pacienți</TabsTrigger>
            <TabsTrigger value="treatments">Tratamente</TabsTrigger>
            <TabsTrigger value="analytics">Analize</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats Grid - Compact & Clickable */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickStats.map((stat, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 border-l-4 border-l-primary"
                  onClick={stat.action}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {stat.trend === 'up' ? 
                          <TrendingUp className="h-3 w-3 text-green-500" /> : 
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        }
                        <span className={stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <p className="text-xl font-bold mb-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Intelligent Actions & Live Data */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
              {/* Intelligent Next Actions */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Play className="h-5 w-5 text-primary" />
                      Acțiuni Inteligente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-3">
                        {nextActions.map((action, index) => (
                          <div 
                            key={index}
                            className="p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                            onClick={action.action}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm">{action.title}</p>
                              <Badge variant={
                                action.priority === 'urgent' ? 'destructive' :
                                action.priority === 'high' ? 'default' : 'secondary'
                              } className="text-xs">
                                {action.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{action.desc}</p>
                          </div>
                        ))}
                        
                        {/* Quick Add Actions */}
                        <div className="pt-2 border-t">
                          <p className="text-xs font-medium mb-2 text-muted-foreground">Acțiuni Rapide</p>
                          <div className="grid grid-cols-2 gap-2">
                            <Button size="sm" variant="outline" onClick={() => navigate('/appointments')}>
                              <CalendarPlus className="h-3 w-3 mr-1" />
                              Programare
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => navigate('/patient-portal')}>
                              <UserPlus className="h-3 w-3 mr-1" />
                              Pacient
                            </Button>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>

              {/* Live Data Dashboard */}
              <div className="lg:col-span-5">
                <Card className="h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary animate-pulse" />
                        Date în Timp Real
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        Live
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      {isLoading ? (
                        <div className="space-y-3">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="animate-pulse bg-muted rounded-lg h-16" />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Recent Appointments */}
                          <div>
                            <p className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Programări Recente
                            </p>
                            <div className="space-y-2">
                              {data.appointments?.slice(0, 3).map((apt, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                  <div>
                                    <p className="text-sm font-medium">Pacient #{apt.id}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(apt.created_at).toLocaleString('ro-RO')}
                                    </p>
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {apt.status || 'programat'}
                                  </Badge>
                                </div>
                              )) || (
                                <p className="text-sm text-muted-foreground">Nicio programare recentă</p>
                              )}
                            </div>
                          </div>

                          {/* Recent Lab Orders */}
                          <div>
                            <p className="font-medium text-sm mb-2 flex items-center gap-2">
                              <Wrench className="h-4 w-4" />
                              Comenzi Lab
                            </p>
                            <div className="space-y-2">
                              {data.labOrders?.slice(0, 2).map((order, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                  <div>
                                    <p className="text-sm font-medium">Comandă #{order.id}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(order.created_at).toLocaleString('ro-RO')}
                                    </p>
                                  </div>
                                  <Badge variant={order.status === 'pending' ? 'destructive' : 'secondary'} className="text-xs">
                                    {order.status || 'pending'}
                                  </Badge>
                                </div>
                              )) || (
                                <p className="text-sm text-muted-foreground">Nicio comandă recentă</p>
                              )}
                            </div>
                          </div>

                          {/* Quick Access to Full Sections */}
                          <div className="pt-2 border-t">
                            <div className="grid grid-cols-2 gap-2">
                              <Button size="sm" variant="ghost" onClick={() => navigate('/appointments')} className="justify-start">
                                <ArrowRight className="h-3 w-3 mr-1" />
                                Vezi Tot Programări
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => navigate('/lab-sync')} className="justify-start">
                                <ArrowRight className="h-3 w-3 mr-1" />
                                Vezi Tot Lab
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Managementul Pacienților</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Interfața pentru pacienți va fi disponibilă în curând...</p>
                <Button className="mt-4" onClick={() => navigate('/patient-portal')}>
                  Accesează Portalul Pacienților
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="treatments">
            <Card>
              <CardHeader>
                <CardTitle>Managementul Tratamentelor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Interfața pentru tratamente va fi disponibilă în curând...</p>
                <Button className="mt-4" onClick={() => navigate('/medical-dashboard')}>
                  Accesează Dashboard Medical
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analize și Rapoarte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Interfața pentru analize va fi disponibilă în curând...</p>
                <Button className="mt-4" onClick={() => navigate('/cfo-dashboard')}>
                  Accesează Dashboard CFO
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

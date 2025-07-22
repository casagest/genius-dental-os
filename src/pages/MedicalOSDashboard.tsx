import React, { useState } from 'react';
import { Activity, Brain, Users, DollarSign, TrendingUp, CheckCircle, Zap, Target, BarChart3, Stethoscope, Microscope, Heart, Pill, Calendar, Shield, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { RevenueDashboard } from '@/components/analytics/RevenueDashboard';
import { SystemHealthMonitor } from '@/components/medical/SystemHealthMonitor';

export default function MedicalOSDashboard() {
  const [aiModules] = useState([
    { name: 'Diagnostic AI', progress: 94, status: 'active', accuracy: '99.7%' },
    { name: 'Treatment Planning', progress: 87, status: 'active', accuracy: '98.3%' },
    { name: 'Clinical Agent', progress: 100, status: 'active', accuracy: '99.9%' },
    { name: 'AllOnX Hub', progress: 100, status: 'active', accuracy: '100%' },
    { name: 'Lab Sync', progress: 65, status: 'processing', accuracy: '96.1%' }
  ]);

  const [dashboardMetrics] = useState({
    efficiency: 94,
    objectives: { completed: 7, total: 8 },
    patients: 24,
    revenue: 3240
  });

  const [liveActions] = useState([
    { id: 1, action: 'Incoming Patient File', status: 'new', time: '2 min ago', type: 'urgent' },
    { id: 2, action: 'Patient Priority Diagnosis', status: 'processing', time: '5 min ago', type: 'normal' },
    { id: 3, action: 'Lab Consultation', status: 'completed', time: '12 min ago', type: 'normal' },
    { id: 4, action: 'Check Alert', status: 'pending', time: '18 min ago', type: 'warning' }
  ]);

  const [quickActions] = useState([
    { title: 'Coordinate Muscle', status: 'online' },
    { title: 'Node Vocal', status: 'online' },
    { title: 'Tissue Laboratories', status: 'online' },
    { title: 'PlanVision AllonX', status: 'online' }
  ]);

  const [clinicalTools] = useState([
    { 
      name: 'Diagnostic AI', 
      tools: [
        { name: 'Radiograph Analysis', description: 'AI-powered imaging interpretation', status: 'active' },
        { name: 'Periodontal Assessment', description: 'Automated tissue health evaluation', status: 'active' },
        { name: 'Oral Cancer Screening', description: 'Early detection AI algorithms', status: 'active' }
      ]
    },
    { 
      name: 'Treatment Planning', 
      tools: [
        { name: 'Implant Planning', description: 'AI-guided implant positioning', status: 'active' },
        { name: 'Orthodontic Analysis', description: 'Comprehensive treatment mapping', status: 'processing' },
        { name: 'Restorative Planning', description: 'Optimal treatment sequencing', status: 'active' }
      ]
    },
    { 
      name: 'Patient Communication', 
      tools: [
        { name: 'Treatment Explanation', description: 'AI-generated patient education', status: 'active' },
        { name: 'Cost Estimation', description: 'Intelligent pricing analysis', status: 'standby' },
        { name: 'Appointment Reminders', description: 'Automated scheduling optimization', status: 'active' }
      ]
    }
  ]);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="h-16 flex items-center border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MedicalCor Genius OS
              </h1>
              <p className="text-sm text-muted-foreground">Intelligent Medical Dashboard</p>
            </div>
          </header>
          
          <main className="p-6 space-y-8 overflow-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Dashboard Intelligence
                </h1>
                <p className="text-lg text-muted-foreground">Performance & usage real time Medical Stomatology</p>
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <Activity className="w-4 h-4 mr-2" />
                  System Active
                </Badge>
                <Button className="bg-gradient-to-r from-primary to-accent text-white">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Central
                </Button>
              </div>
            </div>

            {/* Executive Dashboard Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Efficiency Active</p>
                      <p className="text-3xl font-bold text-primary">{dashboardMetrics.efficiency}%</p>
                      <p className="text-xs text-green-400">+2.7% trend</p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-primary opacity-60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Objectives Achieved</p>
                      <p className="text-3xl font-bold text-primary">{dashboardMetrics.objectives.completed}/{dashboardMetrics.objectives.total}</p>
                      <p className="text-xs text-green-400">87.5% complete</p>
                    </div>
                    <Target className="h-12 w-12 text-primary opacity-60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Patients Active</p>
                      <p className="text-3xl font-bold text-primary">{dashboardMetrics.patients}</p>
                      <p className="text-xs text-blue-400">+12 today</p>
                    </div>
                    <Users className="h-12 w-12 text-primary opacity-60" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue Today</p>
                      <p className="text-3xl font-bold text-primary">€{dashboardMetrics.revenue.toLocaleString()}</p>
                      <p className="text-xs text-green-400">+15.2%</p>
                    </div>
                    <DollarSign className="h-12 w-12 text-primary opacity-60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* AI Modules Active */}
              <Card className="border border-border/50 bg-card/50 backdrop-blur lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Module AI Active
                      </CardTitle>
                      <CardDescription>Complete operational state per AI Module: Stomatology</CardDescription>
                    </div>
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">LIVE</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {aiModules.map((module, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${module.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <div>
                            <p className="font-medium">{module.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {module.status === 'active' ? 'Diagnostic response and intelligence active' : 'Processing data streams...'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{module.progress}%</p>
                          <p className="text-xs text-muted-foreground">Accuracy: {module.accuracy}</p>
                        </div>
                      </div>
                      <Progress 
                        value={module.progress} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Insights Intelligence */}
              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Insights Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">AI Recommendations</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Optimizing patient management and workflow efficiency.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">AI Progress</span>
                        <span className="text-sm text-primary">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Clinical intelligence active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Actions & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Live Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {liveActions.map((action) => (
                    <div key={action.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className={`w-2 h-2 rounded-full ${action.type === 'urgent' ? 'bg-red-500' : action.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{action.action}</p>
                        <p className="text-xs text-muted-foreground">{action.time}</p>
                      </div>
                      <Badge variant="outline" className={action.status === 'completed' ? 'text-green-500 border-green-500/20' : action.status === 'processing' ? 'text-blue-500 border-blue-500/20' : 'text-yellow-500 border-yellow-500/20'}>
                        {action.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickActions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium">{action.title}</span>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-500/20">
                        online
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    AI Clinical Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-primary/10 hover:bg-primary/20 border border-primary/20">
                    <Microscope className="w-4 h-4 mr-2" />
                    Ready for diagnostics
                  </Button>
                  
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Radiological diagnostics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-400" />
                      <span className="text-sm">Real-time AI analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Risk prediction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">Treatment planning</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI-Powered Clinical Tools */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Powered Clinical Tools
                </CardTitle>
                <CardDescription>Advanced artificial intelligence modules for comprehensive patient care</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {clinicalTools.map((category, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-semibold text-lg text-primary">{category.name}</h3>
                      <div className="space-y-3">
                        {category.tools.map((tool, toolIndex) => (
                          <div key={toolIndex} className="p-4 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{tool.name}</h4>
                              <Badge variant="outline" className={tool.status === 'active' ? 'text-green-500 border-green-500/20' : tool.status === 'processing' ? 'text-blue-500 border-blue-500/20' : 'text-yellow-500 border-yellow-500/20'}>
                                {tool.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Practice Management */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/appointments'}>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Today's Schedule</h3>
                  <p className="text-3xl font-bold text-primary">18/20</p>
                  <p className="text-sm text-muted-foreground">Appointments filled</p>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/inventory'}>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Inventory Status</h3>
                  <p className="text-3xl font-bold text-green-400">92%</p>
                  <p className="text-sm text-muted-foreground">Stock levels optimal</p>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/patient-portal'}>
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Patient Portal</h3>
                  <p className="text-3xl font-bold text-red-400">Active</p>
                  <p className="text-sm text-muted-foreground">Communication hub</p>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/cfo'}>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Financial Overview</h3>
                  <p className="text-3xl font-bold text-yellow-400">€4.2k</p>
                  <p className="text-sm text-muted-foreground">Today's revenue</p>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Dashboards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  Revenue & Performance Analytics
                </h2>
                <RevenueDashboard />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  System Health Monitor
                </h2>
                <SystemHealthMonitor />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
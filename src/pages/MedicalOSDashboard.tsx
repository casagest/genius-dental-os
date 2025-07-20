import React, { useState, useEffect } from 'react';
import { Activity, Brain, Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, Zap, Target, BarChart3, Settings, Stethoscope, Microscope, Heart, Pill, Calendar, MessageSquare, FileText, Shield, Database, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageLayout from '@/components/layout/PageLayout';
import { RevenueDashboard } from '@/components/analytics/RevenueDashboard';
import { SystemHealthMonitor } from '@/components/medical/SystemHealthMonitor';

export default function MedicalOSDashboard() {
  const [systemStatus, setSystemStatus] = useState('optimal');
  const [aiModules, setAiModules] = useState([
    { name: 'Diagnostic AI', progress: 94, status: 'active', accuracy: '99.7%' },
    { name: 'Treatment Planning', progress: 87, status: 'active', accuracy: '98.3%' },
    { name: 'Clinical Agent', progress: 100, status: 'active', accuracy: '99.9%' },
    { name: 'AllOnX Hub', progress: 100, status: 'active', accuracy: '100%' },
    { name: 'Lab Sync', progress: 65, status: 'processing', accuracy: '96.1%' }
  ]);

  const [dashboardMetrics, setDashboardMetrics] = useState({
    efficiency: 94,
    objectives: { completed: 7, total: 8 },
    patients: 24,
    revenue: 3240
  });

  const [liveActions, setLiveActions] = useState([
    { id: 1, action: 'Incoming Patient File', status: 'new', time: '2 min ago', type: 'urgent' },
    { id: 2, action: 'Patient Priority Diagnosis', status: 'processing', time: '5 min ago', type: 'normal' },
    { id: 3, action: 'Lab Consultation', status: 'completed', time: '12 min ago', type: 'normal' },
    { id: 4, action: 'Check Alert', status: 'pending', time: '18 min ago', type: 'warning' }
  ]);

  const [quickActions, setQuickActions] = useState([
    { title: 'Coordinate Muscle', status: 'online', progress: null },
    { title: 'Node Vocal', status: 'online', progress: null },
    { title: 'Tissue Laboratories', status: 'online', progress: null },
    { title: 'PlanVision AllonX', status: 'online', progress: null }
  ]);

  const [clinicalTools, setClinicalTools] = useState([
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'optimal': case 'online': case 'completed':
        return 'status-optimal';
      case 'processing': case 'pending': case 'warning':
        return 'status-warning';
      case 'error': case 'critical': case 'urgent':
        return 'status-critical';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <PageLayout title="MedicalCor Genius OS" className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold medical-gradient">Dashboard Intelligence</h1>
          <p className="text-lg text-muted-foreground">Performance & usage real time Medical Stomatology</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="status-optimal">
            <Activity className="w-4 h-4 mr-2" />
            System Vocal
          </Badge>
          <Button className="neural-pulse">
            <Brain className="w-4 h-4 mr-2" />
            AI Central
          </Button>
        </div>
      </div>

      {/* Executive Dashboard Metrics */}
      <div className="neural-grid grid-cols-1 md:grid-cols-4">
        <Card className="medical-card">
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

        <Card className="medical-card">
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

        <Card className="medical-card">
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

        <Card className="medical-card">
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
        <Card className="medical-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Module AI Active
                </CardTitle>
                <CardDescription>Complete operational state per AI Module: Stomatology</CardDescription>
              </div>
              <Badge className="status-optimal">LIVE</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {aiModules.map((module, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(module.status)}`}></div>
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
                  style={{ 
                    background: `linear-gradient(90deg, ${getProgressColor(module.progress)} 0%, ${getProgressColor(module.progress)} ${module.progress}%, hsl(var(--muted)) ${module.progress}%)`
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Insights Intelligence */}
        <Card className="medical-card">
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
                <span className="text-sm font-medium text-primary">Recommend AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Prioritize prompt management optimal e generale forte.
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Progress AI</span>
                  <span className="text-sm text-primary">67%</span>
                </div>
                <Progress value={67} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Clinic de intelligence active</p>
              </div>
              
              <div className="pt-2 border-t border-border/50">
                <p className="text-sm font-medium mb-2">So generează recomandări:</p>
                <p className="text-xs text-muted-foreground">
                  AI analizează modele pentru o gestionare superioară pacienți/ale
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Actions & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Activate Live
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {liveActions.map((action) => (
              <div key={action.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(action.type)}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{action.action}</p>
                  <p className="text-xs text-muted-foreground">{action.time}</p>
                </div>
                <Badge variant="outline" className={getStatusColor(action.status)}>
                  {action.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Acțiuni Rapide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(action.status)}`}></div>
                  <span className="text-sm font-medium">{action.title}</span>
                </div>
                <Badge variant="outline" className={getStatusColor(action.status)}>
                  {action.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Assistant Clinic AI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-primary/10 hover:bg-primary/20 border border-primary/20">
              <Microscope className="w-4 h-4 mr-2" />
              Ready pentru diagnostice
            </Button>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">Diagnostic radilogiere</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-sm">AI analiză timp real avansat pe radiologic</span>
              </div>
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Predicție Pre-Risk-Ult</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Plan de tratament</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Clinical Tools */}
      <Card className="medical-card">
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
                        <Badge variant="outline" className={getStatusColor(tool.status)}>
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
        <Card className="medical-card hover-lift">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Today's Schedule</h3>
            <p className="text-3xl font-bold text-primary">18/20</p>
            <p className="text-sm text-muted-foreground">Appointments filled</p>
          </CardContent>
        </Card>

        <Card className="medical-card hover-lift">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Inventory Status</h3>
            <p className="text-3xl font-bold text-green-400">92%</p>
            <p className="text-sm text-muted-foreground">Stock levels optimal</p>
          </CardContent>
        </Card>

        <Card className="medical-card hover-lift">
          <CardContent className="p-6 text-center">
            <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Patient Satisfaction</h3>
            <p className="text-3xl font-bold text-red-400">4.8/5</p>
            <p className="text-sm text-muted-foreground">Based on 157 reviews</p>
          </CardContent>
        </Card>

        <Card className="medical-card hover-lift">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Treatment Acceptance</h3>
            <p className="text-3xl font-bold text-blue-400">78%</p>
            <p className="text-sm text-muted-foreground">Above industry average</p>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Quick Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Performance</span>
              <Badge className="status-optimal">Optimal</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">AI Processing</span>
              <Badge className="status-optimal">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backup Status</span>
              <Badge className="status-warning">Scheduled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Security Status</span>
              <Badge className="status-optimal">Protected</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Voice Assistant</span>
              <div className="w-10 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto Scan Review</span>
              <div className="w-10 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">AI Suggestions</span>
              <div className="w-10 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <div className="w-10 h-6 bg-primary rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health Monitor */}
      <SystemHealthMonitor />

      {/* Analytics & Performance */}
      <RevenueDashboard />
    </PageLayout>
  );
}
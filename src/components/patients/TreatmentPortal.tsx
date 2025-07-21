import React, { useState, useEffect } from 'react';
import { FileText, Calendar, CheckCircle, Clock, Target, TrendingUp, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TreatmentPlan {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  phases: TreatmentPhase[];
}

interface TreatmentPhase {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  scheduledDate?: string;
  completedDate?: string;
  notes?: string;
}

export function TreatmentPortal() {
  const [treatmentPlans, setTreatmentPlans] = useState<TreatmentPlan[]>([
    {
      id: '1',
      title: 'Comprehensive Dental Restoration',
      description: 'Complete oral rehabilitation including implants and crowns',
      status: 'in-progress',
      progress: 65,
      startDate: '2024-01-15',
      estimatedCompletion: '2024-06-15',
      phases: [
        {
          id: '1-1',
          name: 'Initial Assessment & X-rays',
          description: 'Complete oral examination and radiographic analysis',
          status: 'completed',
          scheduledDate: '2024-01-15',
          completedDate: '2024-01-15',
          notes: 'Comprehensive examination completed. 3D imaging shows optimal bone density.'
        },
        {
          id: '1-2',
          name: 'Surgical Phase - Implant Placement',
          description: 'Placement of dental implants in prepared sites',
          status: 'completed',
          scheduledDate: '2024-02-01',
          completedDate: '2024-02-01',
          notes: 'All 4 implants placed successfully. Healing cap installation completed.'
        },
        {
          id: '1-3',
          name: 'Healing & Integration',
          description: 'Osseointegration period for implant stability',
          status: 'active',
          scheduledDate: '2024-02-01',
          notes: 'Healing progressing excellently. Next check-up scheduled.'
        },
        {
          id: '1-4',
          name: 'Crown Fabrication',
          description: 'Custom crown creation and fitting',
          status: 'pending',
          scheduledDate: '2024-05-01'
        },
        {
          id: '1-5',
          name: 'Final Restoration',
          description: 'Crown placement and bite adjustment',
          status: 'pending',
          scheduledDate: '2024-06-01'
        }
      ]
    },
    {
      id: '2',
      title: 'Periodontal Maintenance',
      description: 'Ongoing gum health management and deep cleaning',
      status: 'planned',
      progress: 0,
      startDate: '2024-03-01',
      estimatedCompletion: '2024-12-01',
      phases: [
        {
          id: '2-1',
          name: 'Deep Cleaning Session 1',
          description: 'Scaling and root planing - quadrants 1 & 2',
          status: 'pending',
          scheduledDate: '2024-03-01'
        },
        {
          id: '2-2',
          name: 'Deep Cleaning Session 2',
          description: 'Scaling and root planing - quadrants 3 & 4',
          status: 'pending',
          scheduledDate: '2024-03-15'
        }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-optimal';
      case 'active': case 'in-progress': return 'status-warning';
      case 'pending': case 'planned': return 'bg-muted text-muted-foreground';
      case 'on-hold': return 'status-critical';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'active': case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': case 'planned': return <Target className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold medical-gradient">Treatment Portal</h2>
          <p className="text-muted-foreground">Track your treatment plans and progress</p>
        </div>
        <Button className="neural-pulse">
          <Brain className="w-4 h-4 mr-2" />
          AI Treatment Insights
        </Button>
      </div>

      {/* Treatment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">
                  {treatmentPlans.filter(p => p.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(treatmentPlans.reduce((acc, plan) => acc + plan.progress, 0) / treatmentPlans.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Next Appointment</p>
                <p className="text-lg font-semibold">Mar 1, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Plans */}
      <div className="space-y-6">
        {treatmentPlans.map((plan) => (
          <Card key={plan.id} className="medical-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(plan.status)}
                    {plan.title}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <Badge className={getStatusColor(plan.status)}>
                  {plan.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Overview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Treatment Progress</span>
                  <span className="text-sm text-primary">{plan.progress}%</span>
                </div>
                <Progress value={plan.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Started: {new Date(plan.startDate).toLocaleDateString()}</span>
                  <span>Est. Completion: {new Date(plan.estimatedCompletion).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Treatment Phases */}
              <div className="space-y-4">
                <h4 className="font-semibold">Treatment Phases</h4>
                <div className="space-y-3">
                  {plan.phases.map((phase) => (
                    <div key={phase.id} className="border border-border/50 rounded-lg p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(phase.status)}
                          <h5 className="font-medium">{phase.name}</h5>
                        </div>
                        <Badge variant="outline" className={getStatusColor(phase.status)}>
                          {phase.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                      
                      {phase.scheduledDate && (
                        <div className="text-xs text-muted-foreground">
                          {phase.status === 'completed' && phase.completedDate ? (
                            <span>Completed: {new Date(phase.completedDate).toLocaleDateString()}</span>
                          ) : (
                            <span>Scheduled: {new Date(phase.scheduledDate).toLocaleDateString()}</span>
                          )}
                        </div>
                      )}
                      
                      {phase.notes && (
                        <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                          <strong>Notes:</strong> {phase.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
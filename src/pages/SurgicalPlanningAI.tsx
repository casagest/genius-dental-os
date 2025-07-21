import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Scissors, 
  Brain, 
  Activity, 
  Calendar, 
  Users, 
  FileText, 
  Monitor, 
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const SurgicalPlanningAI = () => {
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  const surgicalProcedures = [
    {
      id: 1,
      name: "Implant Placement - Molar #14",
      patient: "Maria Popescu",
      date: "2025-01-25",
      duration: "45 min",
      complexity: "Medium",
      aiConfidence: 94,
      status: "Planned",
      riskFactors: ["Bone density", "Adjacent teeth"],
      instruments: ["Surgical Kit A", "Implant Driver", "Bone Graft"]
    },
    {
      id: 2,
      name: "Sinus Lift with Bone Graft",
      patient: "Ion Ionescu",
      date: "2025-01-26",
      duration: "90 min",
      complexity: "High",
      aiConfidence: 87,
      status: "AI Analysis",
      riskFactors: ["Sinus membrane", "Healing time"],
      instruments: ["Sinus Kit", "Membrane", "Graft Material"]
    },
    {
      id: 3,
      name: "Wisdom Tooth Extraction",
      patient: "Ana Georgescu",
      date: "2025-01-27",
      duration: "30 min",
      complexity: "Low",
      aiConfidence: 98,
      status: "Ready",
      riskFactors: ["Root proximity"],
      instruments: ["Extraction Kit", "Sutures"]
    }
  ];

  const aiInsights = [
    {
      title: "Success Rate Prediction",
      value: "96.8%",
      trend: "+2.1%",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Procedure Optimization",
      value: "15 min",
      trend: "saved avg",
      icon: Zap,
      color: "text-primary"
    },
    {
      title: "Risk Assessment",
      value: "Low",
      trend: "overall",
      icon: AlertCircle,
      color: "text-warning"
    },
    {
      title: "Recovery Time",
      value: "3.2 days",
      trend: "-0.8 days",
      icon: Activity,
      color: "text-info"
    }
  ];

  return (
    <PageLayout>
      <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background to-accent/5">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <Scissors className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Surgical Planning AI
              </h1>
              <p className="text-muted-foreground text-lg">
                AI-powered surgical planning and risk assessment
              </p>
            </div>
          </div>
          
          {/* AI Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {aiInsights.map((insight, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{insight.title}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{insight.value}</p>
                        <span className={`text-xs ${insight.color}`}>{insight.trend}</span>
                      </div>
                    </div>
                    <insight.icon className={`h-8 w-8 ${insight.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="planning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <Scissors className="h-4 w-4" />
              AI Planning
            </TabsTrigger>
            <TabsTrigger value="procedures" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Procedures
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Live Monitor
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Procedure List */}
              <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scissors className="h-5 w-5" />
                    Upcoming Procedures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {surgicalProcedures.map((procedure) => (
                    <div 
                      key={procedure.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedProcedure?.id === procedure.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedProcedure(procedure)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{procedure.name}</h4>
                          <p className="text-sm text-muted-foreground">{procedure.patient}</p>
                        </div>
                        <Badge 
                          variant={
                            procedure.status === 'Ready' ? 'default' :
                            procedure.status === 'Planned' ? 'secondary' : 'outline'
                          }
                        >
                          {procedure.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {procedure.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {procedure.duration}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>AI Confidence</span>
                          <span>{procedure.aiConfidence}%</span>
                        </div>
                        <Progress value={procedure.aiConfidence} className="h-1" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Procedure Details */}
              <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Analysis Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedProcedure ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">{selectedProcedure.name}</h4>
                        <p className="text-muted-foreground">Patient: {selectedProcedure.patient}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Complexity Assessment</h5>
                          <Badge variant="outline" className="mb-2">
                            {selectedProcedure.complexity} Complexity
                          </Badge>
                          <Progress 
                            value={
                              selectedProcedure.complexity === 'Low' ? 30 :
                              selectedProcedure.complexity === 'Medium' ? 65 : 90
                            } 
                            className="h-2" 
                          />
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Risk Factors</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedProcedure.riskFactors.map((risk, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {risk}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">Required Instruments</h5>
                          <div className="space-y-2">
                            {selectedProcedure.instruments.map((instrument, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-success" />
                                {instrument}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex gap-3">
                            <Button className="flex-1">
                              Start Procedure
                            </Button>
                            <Button variant="outline">
                              Modify Plan
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Brain className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Select a procedure to view AI analysis details
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="procedures">
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Procedure Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Procedure calendar coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Live Surgical Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Monitor className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Real-time monitoring system coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Surgical Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Reports and analytics coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default SurgicalPlanningAI;
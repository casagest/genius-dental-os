import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Scan, 
  Activity, 
  Clock, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Mic,
  Camera,
  FileImage,
  Zap,
  Target,
  Heart,
  Eye,
  Calendar,
  Award,
  BarChart3,
  Cpu,
  Database
} from "lucide-react";

// All-on-X Case Types
interface AllOnXCase {
  id: string;
  patientName: string;
  age: number;
  caseType: 'All-on-4' | 'All-on-6' | 'All-on-8';
  jawType: 'Upper' | 'Lower' | 'Both';
  stage: 'Planning' | 'Surgery' | 'Healing' | 'Prosthesis' | 'Completed';
  startDate: string;
  surgeryDate?: string;
  completionDate?: string;
  cbctAnalysis: {
    boneDensity: number;
    bonevolume: number;
    sinusProximity: boolean;
    nerveCanalDistance: number;
    aiRiskScore: number;
  };
  implants: {
    brand: string;
    positions: string[];
    torqueValues: number[];
    stabilityQuotient: number[];
  };
  aiPredictions: {
    successProbability: number;
    healingTime: number;
    complications: string[];
  };
  surgeon: string;
  status: 'active' | 'completed' | 'complicated';
}

// Mock data enhanced with real-world scenarios
const allOnXCases: AllOnXCase[] = [
  {
    id: "AOX-2024-001",
    patientName: "Maria Popescu",
    age: 58,
    caseType: "All-on-6",
    jawType: "Upper",
    stage: "Surgery",
    startDate: "2024-01-15",
    surgeryDate: "2024-01-20",
    cbctAnalysis: {
      boneDensity: 750, // HU units
      bonevolume: 85,
      sinusProximity: true,
      nerveCanalDistance: 12.5,
      aiRiskScore: 15 // Low risk
    },
    implants: {
      brand: "Nobel Biocare",
      positions: ["13", "11", "21", "23", "25", "27"],
      torqueValues: [45, 50, 48, 52, 47, 49],
      stabilityQuotient: [75, 82, 78, 85, 73, 80]
    },
    aiPredictions: {
      successProbability: 96.8,
      healingTime: 12,
      complications: ["Sinus proximity alert", "Monitor healing week 2-3"]
    },
    surgeon: "Dr. Ionescu",
    status: "active"
  },
  {
    id: "AOX-2024-002", 
    patientName: "Ion Georgescu",
    age: 65,
    caseType: "All-on-4",
    jawType: "Lower",
    stage: "Prosthesis",
    startDate: "2024-01-08",
    surgeryDate: "2024-01-12",
    cbctAnalysis: {
      boneDensity: 680,
      bonevolume: 78,
      sinusProximity: false,
      nerveCanalDistance: 8.5,
      aiRiskScore: 25 // Moderate risk
    },
    implants: {
      brand: "Straumann",
      positions: ["33", "31", "41", "43"],
      torqueValues: [42, 38, 40, 44],
      stabilityQuotient: [68, 65, 72, 75]
    },
    aiPredictions: {
      successProbability: 94.2,
      healingTime: 14,
      complications: ["Low bone density zone 31", "Extended healing protocol recommended"]
    },
    surgeon: "Dr. Marinescu",
    status: "active"
  },
  {
    id: "AOX-2024-003",
    patientName: "Ana Dumitrescu", 
    age: 72,
    caseType: "All-on-8",
    jawType: "Both",
    stage: "Completed",
    startDate: "2023-12-01",
    surgeryDate: "2023-12-05",
    completionDate: "2024-01-10",
    cbctAnalysis: {
      boneDensity: 820,
      bonevolume: 92,
      sinusProximity: false,
      nerveCanalDistance: 15.2,
      aiRiskScore: 8 // Very low risk
    },
    implants: {
      brand: "Nobel Biocare",
      positions: ["17", "15", "13", "11", "21", "23", "25", "27"],
      torqueValues: [55, 52, 58, 60, 57, 56, 53, 54],
      stabilityQuotient: [88, 85, 92, 95, 90, 87, 84, 89]
    },
    aiPredictions: {
      successProbability: 98.5,
      healingTime: 10,
      complications: ["None predicted - optimal case"]
    },
    surgeon: "Dr. Ionescu", 
    status: "completed"
  }
];

const AllOnXHub = () => {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [cbctAnalysisRunning, setCbctAnalysisRunning] = useState(false);
  const { toast } = useToast();

  // Statistics from MedicalCor's real data
  const clinicStats = {
    totalCBCT: 3000,
    totalAllOnX: 1000,
    successRate: 97.8,
    averageHealingTime: 12.5
  };

  const startCBCTAnalysis = (caseId: string) => {
    setCbctAnalysisRunning(true);
    toast({
      title: "CBCT AI Analysis Started",
      description: `Analizez CBCT pentru cazul ${caseId} cu AI-ul nostru medical...`,
    });

    setTimeout(() => {
      setCbctAnalysisRunning(false);
      toast({
        title: "CBCT Analysis Complete",
        description: "AI a identificat poziții optime pentru implanturi și risk factors",
      });
    }, 3000);
  };

  const startVoiceCommand = () => {
    setIsVoiceActive(true);
    
    setTimeout(() => {
      const commands = [
        "Afișează cazul Maria Popescu",
        "Analizează CBCT pentru următorul pacient", 
        "Care este success rate-ul pentru All-on-6?",
        "Programează follow-up pentru Ion Georgescu"
      ];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setVoiceCommand(randomCommand);
      setIsVoiceActive(false);
      
      toast({
        title: "Voice Command Recognized",
        description: `"${randomCommand}"`,
      });
    }, 2500);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Planning': return 'bg-blue-100 text-blue-800';
      case 'Surgery': return 'bg-red-100 text-red-800';
      case 'Healing': return 'bg-orange-100 text-orange-800';
      case 'Prosthesis': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 10) return 'text-green-600';
    if (riskScore <= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header - MedicalCor Branding */}
      <div className="bg-white border-b-2 border-blue-100 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
                  MedicalCor All-on-X Hub
                </h1>
                <p className="text-slate-600 text-lg">
                  State-of-the-Art Full Arch Rehabilitation • 3000+ CBCT • 1000+ Procedures
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm">
                <Activity className="w-4 h-4 mr-2" />
                AI System LIVE
              </Badge>
              <Button
                onClick={startVoiceCommand}
                disabled={isVoiceActive}
                className={`space-x-2 ${isVoiceActive ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                <Mic className="w-4 h-4" />
                <span>{isVoiceActive ? 'Listening...' : 'Voice Command'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Command Display */}
      {voiceCommand && (
        <div className="container mx-auto px-4 py-4">
          <Alert className="border-indigo-200 bg-indigo-50">
            <Mic className="h-4 w-4" />
            <AlertDescription className="text-indigo-800">
              <strong>Voice Command:</strong> "{voiceCommand}"
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* MedicalCor Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Database className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-600 text-white">Total</Badge>
              </div>
              <h3 className="text-3xl font-bold text-blue-900">{clinicStats.totalCBCT.toLocaleString()}</h3>
              <p className="text-blue-700 font-medium">CBCT Scans Archived</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-indigo-600" />
                <Badge className="bg-indigo-600 text-white">All-on-X</Badge>
              </div>
              <h3 className="text-3xl font-bold text-indigo-900">{clinicStats.totalAllOnX.toLocaleString()}</h3>
              <p className="text-indigo-700 font-medium">Full Arch Procedures</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-green-600" />
                <Badge className="bg-green-600 text-white">Success</Badge>
              </div>
              <h3 className="text-3xl font-bold text-green-900">{clinicStats.successRate}%</h3>
              <p className="text-green-700 font-medium">Success Rate</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-600 text-white">Average</Badge>
              </div>
              <h3 className="text-3xl font-bold text-purple-900">{clinicStats.averageHealingTime}</h3>
              <p className="text-purple-700 font-medium">Weeks Healing Time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active-cases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white border-2">
            <TabsTrigger value="active-cases">Active Cases</TabsTrigger>
            <TabsTrigger value="ai-planning">AI Planning</TabsTrigger>
            <TabsTrigger value="cbct-analysis">CBCT Analysis</TabsTrigger>
            <TabsTrigger value="live-surgery">Live Surgery</TabsTrigger>
            <TabsTrigger value="voice-control">Voice Control</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
          </TabsList>

          <TabsContent value="active-cases" className="space-y-6">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  <span>Active All-on-X Cases</span>
                </CardTitle>
                <CardDescription>
                  Live tracking pentru toate cazurile în desfășurare - MedicalCor Protocol
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {allOnXCases.map((case_) => (
                    <div 
                      key={case_.id}
                      className={`p-6 border-2 rounded-xl hover:shadow-lg transition-all cursor-pointer ${
                        selectedCase === case_.id ? 'border-blue-300 bg-blue-50' : 'border-slate-200 bg-white'
                      }`}
                      onClick={() => setSelectedCase(selectedCase === case_.id ? null : case_.id)}
                    >
                      {/* Case Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">
                            {case_.caseType.split('-')[2]}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{case_.patientName}</h3>
                            <p className="text-slate-600">{case_.caseType} • {case_.jawType} Jaw • Age {case_.age}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStageColor(case_.stage)}>
                            {case_.stage}
                          </Badge>
                          <Badge className="bg-slate-100 text-slate-700">
                            {case_.surgeon}
                          </Badge>
                        </div>
                      </div>

                      {/* Key Metrics Row */}
                      <div className="grid grid-cols-4 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {case_.aiPredictions.successProbability}%
                          </div>
                          <div className="text-sm text-slate-600">AI Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {case_.cbctAnalysis.boneDensity}
                          </div>
                          <div className="text-sm text-slate-600">Bone Density (HU)</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getRiskColor(case_.cbctAnalysis.aiRiskScore)}`}>
                            {case_.cbctAnalysis.aiRiskScore}
                          </div>
                          <div className="text-sm text-slate-600">AI Risk Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {case_.aiPredictions.healingTime}w
                          </div>
                          <div className="text-sm text-slate-600">Est. Healing</div>
                        </div>
                      </div>

                      {/* Implant Details */}
                      <div className="bg-slate-50 p-4 rounded-lg mb-4">
                        <h4 className="font-semibold text-slate-800 mb-2">Implant Configuration</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Brand:</span>
                            <div className="font-medium">{case_.implants.brand}</div>
                          </div>
                          <div>
                            <span className="text-slate-600">Positions:</span>
                            <div className="font-medium">{case_.implants.positions.join(', ')}</div>
                          </div>
                          <div>
                            <span className="text-slate-600">Avg Torque:</span>
                            <div className="font-medium">
                              {(case_.implants.torqueValues.reduce((a, b) => a + b, 0) / case_.implants.torqueValues.length).toFixed(1)} Ncm
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Predictions */}
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-indigo-800 mb-2 flex items-center">
                          <Brain className="w-4 h-4 mr-2" />
                          AI Clinical Insights
                        </h4>
                        <div className="space-y-2 text-sm">
                          {case_.aiPredictions.complications.map((complication, index) => (
                            <div key={index} className="flex items-center text-indigo-700">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              {complication}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {selectedCase === case_.id && (
                        <div className="mt-6 pt-6 border-t border-slate-200">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-3">CBCT Analysis Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Bone Volume:</span>
                                  <span className="font-medium">{case_.cbctAnalysis.bonevolume}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Sinus Proximity:</span>
                                  <span className={`font-medium ${case_.cbctAnalysis.sinusProximity ? 'text-red-600' : 'text-green-600'}`}>
                                    {case_.cbctAnalysis.sinusProximity ? 'Alert' : 'Safe'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Nerve Canal Distance:</span>
                                  <span className="font-medium">{case_.cbctAnalysis.nerveCanalDistance}mm</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-slate-800 mb-3">Timeline</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Case Started:</span>
                                  <span className="font-medium">{case_.startDate}</span>
                                </div>
                                {case_.surgeryDate && (
                                  <div className="flex justify-between">
                                    <span>Surgery Date:</span>
                                    <span className="font-medium">{case_.surgeryDate}</span>
                                  </div>
                                )}
                                {case_.completionDate && (
                                  <div className="flex justify-between">
                                    <span>Completed:</span>
                                    <span className="font-medium text-green-600">{case_.completionDate}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-3 mt-6">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              <Eye className="w-4 h-4 mr-2" />
                              View CBCT
                            </Button>
                            <Button variant="outline" onClick={() => startCBCTAnalysis(case_.id)}>
                              <Brain className="w-4 h-4 mr-2" />
                              AI Re-Analysis
                            </Button>
                            <Button variant="outline">
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule Follow-up
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-planning">
            <Card className="border-2 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-indigo-600" />
                  <span>AI-Powered Surgical Planning</span>
                </CardTitle>
                <CardDescription>
                  Advanced AI analysis pentru optimizarea pozițiilor implanturilor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Cpu className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">AI Planning Module</h3>
                  <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                    Bazat pe experiența MedicalCor cu 3000+ CBCT-uri și 1000+ proceduri All-on-X, 
                    sistemul nostru AI oferă planificare chirurgicală de precizie.
                  </p>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-3">
                    <Brain className="w-5 h-5 mr-2" />
                    Start AI Planning Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cbct-analysis">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scan className="w-6 h-6 text-purple-600" />
                  <span>CBCT AI Analysis Engine</span>
                </CardTitle>
                <CardDescription>
                  Analiză automată CBCT cu algoritmi antrenați pe 3000+ scanuri MedicalCor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">Upload & Analyze CBCT</h3>
                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center">
                      <FileImage className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-4">
                        Drag & drop CBCT files sau click pentru upload
                      </p>
                      <Button variant="outline" className="border-purple-300 text-purple-600">
                        <Camera className="w-4 h-4 mr-2" />
                        Select CBCT Files
                      </Button>
                    </div>
                    
                    {cbctAnalysisRunning && (
                      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                          <span className="font-medium text-purple-800">AI Analysis Running...</span>
                        </div>
                        <Progress value={65} className="mb-2" />
                        <p className="text-sm text-purple-600">
                          Analyzing bone density, implant positions, risk factors...
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">AI Capabilities</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-800">Bone Density Analysis</h4>
                          <p className="text-sm text-slate-600">Măsurare automată densitate osoasă în HU</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-800">Optimal Implant Positioning</h4>
                          <p className="text-sm text-slate-600">AI sugerează cele mai bune poziții pentru implanturi</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-800">Risk Assessment</h4>
                          <p className="text-sm text-slate-600">Identificare factori de risc și complicații potențiale</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                          <h4 className="font-medium text-slate-800">Success Prediction</h4>
                          <p className="text-sm text-slate-600">Predicție rata de succes bazată pe experiența MedicalCor</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="outcomes">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                  <span>Outcomes & Analytics</span>
                </CardTitle>
                <CardDescription>
                  Performanță clinică bazată pe 1000+ proceduri All-on-X MedicalCor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-green-800">97.8%</h3>
                    <p className="text-green-600 font-medium">Overall Success Rate</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-blue-800">12.5</h3>
                    <p className="text-blue-600 font-medium">Average Healing (weeks)</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-purple-800">2.1%</h3>
                    <p className="text-purple-600 font-medium">Complication Rate</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Key Performance Indicators</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">By Case Type</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>All-on-4:</span>
                          <span className="font-medium text-green-600">96.8% success</span>
                        </div>
                        <div className="flex justify-between">
                          <span>All-on-6:</span>
                          <span className="font-medium text-green-600">98.2% success</span>
                        </div>
                        <div className="flex justify-between">
                          <span>All-on-8:</span>
                          <span className="font-medium text-green-600">99.1% success</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">By Surgeon</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Dr. Ionescu:</span>
                          <span className="font-medium text-green-600">98.5% success</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dr. Marinescu:</span>
                          <span className="font-medium text-green-600">97.1% success</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dr. Popescu:</span>
                          <span className="font-medium text-green-600">97.9% success</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AllOnXHub;
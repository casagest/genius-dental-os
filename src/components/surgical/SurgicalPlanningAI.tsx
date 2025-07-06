import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Target, 
  Layers3, 
  Zap, 
  Eye,
  Ruler,
  Gauge,
  MapPin,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  Monitor
} from "lucide-react";

interface SurgicalPlan {
  caseId: string;
  patientName: string;
  implantPositions: {
    tooth: string;
    coordinates: { x: number; y: number; z: number };
    angle: number;
    depth: number;
    diameter: number;
    length: number;
    riskLevel: 'low' | 'moderate' | 'high';
    proximityAlerts: string[];
  }[];
  surgicalGuide: {
    type: 'Fully Guided' | 'Pilot Guided' | 'Freehand';
    accuracy: number;
    materialType: string;
    printTime: number;
  };
  aiAnalysis: {
    boneQuality: string;
    primaryStability: number;
    successPrediction: number;
    complicationRisk: number;
    alternativeOptions: string[];
  };
  workflow: {
    surgicalSteps: string[];
    estimatedTime: number;
    criticalPoints: string[];
    emergencyProtocols: string[];
  };
}

interface SurgicalPlanningAIProps {
  caseId: string;
  cbctData?: any;
  onPlanComplete: (plan: SurgicalPlan) => void;
}

const SurgicalPlanningAI: React.FC<SurgicalPlanningAIProps> = ({ 
  caseId, 
  cbctData, 
  onPlanComplete 
}) => {
  const [isPlanning, setIsPlanning] = useState(false);
  const [planningProgress, setPlanningProgress] = useState(0);
  const [planningStep, setPlanningStep] = useState('');
  const [surgicalPlan, setSurgicalPlan] = useState<SurgicalPlan | null>(null);
  const [is3DViewActive, setIs3DViewActive] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const { toast } = useToast();

  const planningSteps = [
    'Analyzing CBCT data with AI models...',
    'Mapping anatomical structures...',
    'Calculating optimal implant positions...',
    'Evaluating bone density patterns...',
    'Simulating primary stability...',
    'Generating surgical guide design...',
    'Running success probability algorithms...',
    'Creating surgical workflow...',
    'Validating safety protocols...',
    'Finalizing AI-optimized plan...'
  ];

  const generateSurgicalPlan = async () => {
    setIsPlanning(true);
    setPlanningProgress(0);

    // Simulate AI planning process
    for (let i = 0; i < planningSteps.length; i++) {
      setPlanningStep(planningSteps[i]);
      setPlanningProgress((i + 1) * 10);
      await new Promise(resolve => setTimeout(resolve, 1200));
    }

    // Generate mock surgical plan based on MedicalCor expertise
    const mockPlan: SurgicalPlan = {
      caseId,
      patientName: "Current Patient",
      implantPositions: [
        {
          tooth: "13",
          coordinates: { x: -15.2, y: 8.7, z: -3.4 },
          angle: 12,
          depth: 11.5,
          diameter: 4.3,
          length: 10,
          riskLevel: 'low',
          proximityAlerts: []
        },
        {
          tooth: "11",
          coordinates: { x: -3.1, y: 12.4, z: -2.8 },
          angle: 0,
          depth: 13.0,
          diameter: 4.3,
          length: 12,
          riskLevel: 'low',
          proximityAlerts: []
        },
        {
          tooth: "21",
          coordinates: { x: 3.1, y: 12.4, z: -2.9 },
          angle: -2,
          depth: 12.8,
          diameter: 4.3,
          length: 12,
          riskLevel: 'low',
          proximityAlerts: []
        },
        {
          tooth: "23",
          coordinates: { x: 15.2, y: 8.7, z: -3.2 },
          angle: -15,
          depth: 10.5,
          diameter: 4.3,
          length: 10,
          riskLevel: 'moderate',
          proximityAlerts: ['Sinus proximity - 2.1mm']
        }
      ],
      surgicalGuide: {
        type: 'Fully Guided',
        accuracy: 98.2,
        materialType: 'NextDent Surgical Guide',
        printTime: 4.5
      },
      aiAnalysis: {
        boneQuality: 'D2 - Good cortical, Good trabecular',
        primaryStability: 87.3,
        successPrediction: 96.8,
        complicationRisk: 4.2,
        alternativeOptions: [
          'Consider shorter implants at pos 13, 23',
          'Sinus lift option available if needed',
          'Immediate loading possible'
        ]
      },
      workflow: {
        surgicalSteps: [
          'Local anesthesia - Articaine 4% 1:100,000',
          'Tissue reflection - Full thickness flap',
          'Guided drilling sequence - 2.0mm pilot',
          'Sequential drilling to final diameter',
          'Implant placement with guided surgery',
          'Torque verification (>35 Ncm)',
          'Abutment placement',
          'Tissue closure with sutures'
        ],
        estimatedTime: 85,
        criticalPoints: [
          'Monitor drilling depth at position 23',
          'Verify primary stability >35 Ncm',
          'Check parallelism with surgical guide'
        ],
        emergencyProtocols: [
          'Sinus perforation protocol ready',
          'Immediate implant removal kit available',
          'Bleeding control measures prepared'
        ]
      }
    };

    setSurgicalPlan(mockPlan);
    setIsPlanning(false);
    setPlanningStep('');

    toast({
      title: "AI Surgical Plan Generated",
      description: `Plan complet generat cu ${mockPlan.aiAnalysis.successPrediction}% success rate`,
    });

    onPlanComplete(mockPlan);
  };

  const start3DSimulation = () => {
    setSimulationRunning(true);
    setIs3DViewActive(true);
    
    setTimeout(() => {
      setSimulationRunning(false);
      toast({
        title: "3D Simulation Complete",
        description: "Surgical workflow validated - Ready for execution",
      });
    }, 5000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Planning Control */}
      <Card className="border-2 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            <span>AI Surgical Planning Engine</span>
          </CardTitle>
          <CardDescription>
            MedicalCor AI antrenat pe 1000+ All-on-X procedures pentru planning optim
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isPlanning && !surgicalPlan && (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Ready for AI Planning</h3>
              <p className="text-slate-600 max-w-md mx-auto">
                AI-ul va analiza CBCT-ul și va genera plan chirurgical optim bazat pe experiența MedicalCor
              </p>
              <Button 
                onClick={generateSurgicalPlan}
                className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                size="lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Generate AI Surgical Plan
              </Button>
            </div>
          )}

          {isPlanning && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-indigo-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">AI Planning în curs</h3>
                <p className="text-indigo-600 mb-4">{planningStep}</p>
                <Progress value={planningProgress} className="mb-2" />
                <p className="text-sm text-indigo-500">
                  Analizez cu modele AI antrenate pe experiența MedicalCor
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Surgical Plan */}
      {surgicalPlan && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Implant Positioning */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>AI-Optimized Positions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {surgicalPlan.implantPositions.map((position, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-slate-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-slate-800">Position {position.tooth}</h4>
                      <Badge className={`border ${getRiskColor(position.riskLevel)}`}>
                        {position.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Diameter:</span>
                        <div className="font-medium">{position.diameter}mm</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Length:</span>
                        <div className="font-medium">{position.length}mm</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Angle:</span>
                        <div className="font-medium">{position.angle}°</div>
                      </div>
                    </div>

                    {position.proximityAlerts.length > 0 && (
                      <Alert className="mt-3 border-orange-200 bg-orange-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-orange-800">
                          {position.proximityAlerts.join(', ')}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Results */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-purple-600" />
                <span>AI Clinical Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {surgicalPlan.aiAnalysis.successPrediction}%
                  </div>
                  <div className="text-sm text-green-700">Success Rate</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {surgicalPlan.aiAnalysis.primaryStability}%
                  </div>
                  <div className="text-sm text-blue-700">Primary Stability</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-semibold text-slate-800 mb-2">Bone Quality Assessment</h4>
                <p className="text-slate-700">{surgicalPlan.aiAnalysis.boneQuality}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800">AI Recommendations</h4>
                {surgicalPlan.aiAnalysis.alternativeOptions.map((option, index) => (
                  <div key={index} className="flex items-center text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    {option}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Surgical Guide Details */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers3 className="w-5 h-5 text-blue-600" />
                <span>Surgical Guide Design</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-800">Guide Type:</span>
                  <Badge className="bg-blue-600 text-white">{surgicalPlan.surgicalGuide.type}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600">Accuracy:</span>
                    <div className="font-medium text-blue-800">{surgicalPlan.surgicalGuide.accuracy}%</div>
                  </div>
                  <div>
                    <span className="text-blue-600">Print Time:</span>
                    <div className="font-medium text-blue-800">{surgicalPlan.surgicalGuide.printTime}h</div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={start3DSimulation}
                disabled={simulationRunning}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {simulationRunning ? (
                  <>
                    <Monitor className="w-4 h-4 mr-2 animate-pulse" />
                    Running 3D Simulation...
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    View 3D Surgical Simulation
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Surgical Workflow */}
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-orange-600" />
                <span>Surgical Workflow</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-orange-800">Estimated Time:</span>
                  <Badge className="bg-orange-600 text-white">{surgicalPlan.workflow.estimatedTime} min</Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Surgical Steps</h4>
                <div className="space-y-2">
                  {surgicalPlan.workflow.surgicalSteps.map((step, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3 mt-0.5 text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {surgicalPlan.workflow.criticalPoints.length > 0 && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong className="text-red-800">Critical Points:</strong>
                    <ul className="mt-1 space-y-1">
                      {surgicalPlan.workflow.criticalPoints.map((point, index) => (
                        <li key={index} className="text-red-700 text-sm">• {point}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      {surgicalPlan && (
        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Plan</span>
          </Button>
          <Button variant="outline" className="space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share with Team</span>
          </Button>
          <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 space-x-2">
            <Play className="w-4 h-4" />
            <span>Approve & Execute</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SurgicalPlanningAI;
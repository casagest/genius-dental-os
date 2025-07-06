import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  Heart, 
  Gauge, 
  Monitor,
  AlertTriangle,
  CheckCircle,
  Zap,
  Volume2,
  Camera,
  Mic,
  Clock,
  Target,
  Eye,
  Brain,
  Wifi,
  Radio,
  Thermometer,
  Droplets
} from "lucide-react";

interface VitalSigns {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  oxygenSaturation: number;
  temperature: number;
  stress: number;
}

interface SurgicalMetrics {
  currentStep: number;
  totalSteps: number;
  stepName: string;
  elapsedTime: number;
  estimatedRemaining: number;
  torqueReading: number;
  drillingSpeed: number;
  irrigationFlow: number;
  accuracy: number;
}

interface QualityChecks {
  parallelism: { status: 'good' | 'warning' | 'error'; value: number };
  depth: { status: 'good' | 'warning' | 'error'; value: number };
  angulation: { status: 'good' | 'warning' | 'error'; value: number };
  primaryStability: { status: 'good' | 'warning' | 'error'; value: number };
}

interface RealTimeSurgicalMonitorProps {
  patientName: string;
  caseId: string;
  isActive: boolean;
  onAlert: (alert: string) => void;
}

const RealTimeSurgicalMonitor: React.FC<RealTimeSurgicalMonitorProps> = ({ 
  patientName, 
  caseId, 
  isActive,
  onAlert 
}) => {
  const [vitals, setVitals] = useState<VitalSigns>({
    heartRate: 72,
    bloodPressure: { systolic: 120, diastolic: 80 },
    oxygenSaturation: 98,
    temperature: 36.7,
    stress: 2
  });

  const [metrics, setMetrics] = useState<SurgicalMetrics>({
    currentStep: 3,
    totalSteps: 8,
    stepName: "Guided drilling - Position 11",
    elapsedTime: 28,
    estimatedRemaining: 52,
    torqueReading: 42,
    drillingSpeed: 800,
    irrigationFlow: 50,
    accuracy: 98.5
  });

  const [qualityChecks, setQualityChecks] = useState<QualityChecks>({
    parallelism: { status: 'good', value: 1.2 },
    depth: { status: 'good', value: 11.8 },
    angulation: { status: 'warning', value: 3.2 },
    primaryStability: { status: 'good', value: 45 }
  });

  const [voiceNotes, setVoiceNotes] = useState<string[]>([
    "Excellent primary stability achieved",
    "Bone quality better than expected", 
    "Patient tolerating procedure well"
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const { toast } = useToast();

  // Simulate real-time data updates
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Update vitals with small variations
      setVitals(prev => ({
        heartRate: prev.heartRate + (Math.random() - 0.5) * 4,
        bloodPressure: {
          systolic: prev.bloodPressure.systolic + (Math.random() - 0.5) * 2,
          diastolic: prev.bloodPressure.diastolic + (Math.random() - 0.5) * 2
        },
        oxygenSaturation: Math.max(95, prev.oxygenSaturation + (Math.random() - 0.5) * 0.5),
        temperature: prev.temperature + (Math.random() - 0.5) * 0.1,
        stress: Math.max(1, Math.min(5, prev.stress + (Math.random() - 0.5) * 0.5))
      }));

      // Update surgical metrics
      setMetrics(prev => ({
        ...prev,
        elapsedTime: prev.elapsedTime + 1,
        estimatedRemaining: Math.max(0, prev.estimatedRemaining - 1),
        torqueReading: prev.torqueReading + (Math.random() - 0.5) * 3,
        drillingSpeed: prev.drillingSpeed + (Math.random() - 0.5) * 50,
        irrigationFlow: prev.irrigationFlow + (Math.random() - 0.5) * 5,
        accuracy: Math.min(100, prev.accuracy + (Math.random() - 0.5) * 0.2)
      }));

      // Simulate quality check updates
      setQualityChecks(prev => ({
        parallelism: { 
          status: Math.random() > 0.9 ? 'warning' : 'good', 
          value: prev.parallelism.value + (Math.random() - 0.5) * 0.3 
        },
        depth: { 
          status: Math.random() > 0.95 ? 'warning' : 'good', 
          value: prev.depth.value + (Math.random() - 0.5) * 0.2 
        },
        angulation: { 
          status: Math.random() > 0.85 ? 'warning' : 'good', 
          value: prev.angulation.value + (Math.random() - 0.5) * 0.4 
        },
        primaryStability: { 
          status: prev.primaryStability.value > 35 ? 'good' : 'warning', 
          value: prev.primaryStability.value + (Math.random() - 0.5) * 2 
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Alert system
  useEffect(() => {
    const newAlerts: string[] = [];
    
    if (vitals.heartRate > 100) newAlerts.push("Elevated heart rate detected");
    if (vitals.oxygenSaturation < 95) newAlerts.push("Low oxygen saturation");
    if (qualityChecks.primaryStability.value < 30) newAlerts.push("Primary stability below threshold");
    if (metrics.torqueReading > 50) newAlerts.push("High torque - risk of bone fracture");
    
    if (newAlerts.length > 0 && newAlerts.some(alert => !alerts.includes(alert))) {
      setAlerts(newAlerts);
      newAlerts.forEach(alert => {
        if (!alerts.includes(alert)) {
          onAlert(alert);
          toast({
            title: "Real-time Alert",
            description: alert,
            variant: "destructive"
          });
        }
      });
    }
  }, [vitals, qualityChecks, metrics]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const startVoiceNote = () => {
    setIsRecording(true);
    setTimeout(() => {
      const sampleNotes = [
        "Perfect primary stability at 45 Ncm",
        "Bone response excellent, minimal bleeding",
        "Patient comfortable, procedure on schedule"
      ];
      const newNote = sampleNotes[Math.floor(Math.random() * sampleNotes.length)];
      setVoiceNotes(prev => [newNote, ...prev]);
      setIsRecording(false);
      
      toast({
        title: "Voice Note Recorded",
        description: newNote,
      });
    }, 3000);
  };

  if (!isActive) {
    return (
      <Card className="border-2 border-slate-200">
        <CardContent className="p-8 text-center">
          <Monitor className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">
            Real-time Monitoring Inactive
          </h3>
          <p className="text-slate-500">
            Start surgical procedure to activate live monitoring
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient & Case Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{patientName}</h2>
                <p className="text-slate-600">Case ID: {caseId} • Live Surgery Monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className="bg-green-100 text-green-800 animate-pulse">
                <Wifi className="w-4 h-4 mr-1" />
                LIVE
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Clock className="w-4 h-4 mr-1" />
                {Math.floor(metrics.elapsedTime / 60)}:{(metrics.elapsedTime % 60).toString().padStart(2, '0')}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Vitals */}
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-green-600" />
              <span>Patient Vitals</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Heart className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(vitals.heartRate)}
                </div>
                <div className="text-sm text-green-700">BPM</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Radio className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(vitals.oxygenSaturation)}%
                </div>
                <div className="text-sm text-blue-700">SpO2</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Blood Pressure:</span>
                <span className="font-medium">
                  {Math.round(vitals.bloodPressure.systolic)}/{Math.round(vitals.bloodPressure.diastolic)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Temperature:</span>
                <span className="font-medium">{vitals.temperature.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Stress Level:</span>
                <div className="flex items-center space-x-2">
                  <Progress value={vitals.stress * 20} className="w-16 h-2" />
                  <span className="font-medium">{vitals.stress.toFixed(1)}/5</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surgical Progress */}
        <Card className="border-2 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Surgical Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-slate-800 mb-2">
                {metrics.stepName}
              </div>
              <div className="text-sm text-slate-600 mb-3">
                Step {metrics.currentStep} of {metrics.totalSteps}
              </div>
              <Progress 
                value={(metrics.currentStep / metrics.totalSteps) * 100} 
                className="mb-2" 
              />
              <div className="text-xs text-slate-500">
                {Math.round((metrics.currentStep / metrics.totalSteps) * 100)}% Complete
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Elapsed:</span>
                <div className="font-medium">
                  {Math.floor(metrics.elapsedTime / 60)}:{(metrics.elapsedTime % 60).toString().padStart(2, '0')}
                </div>
              </div>
              <div>
                <span className="text-slate-600">Remaining:</span>
                <div className="font-medium">
                  {Math.floor(metrics.estimatedRemaining / 60)}:{(metrics.estimatedRemaining % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-indigo-700 font-medium">Accuracy:</span>
                <span className="text-indigo-900 font-bold">{metrics.accuracy.toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Monitoring */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gauge className="w-5 h-5 text-purple-600" />
              <span>Equipment Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Torque:</span>
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${metrics.torqueReading > 50 ? 'text-red-600' : 'text-green-600'}`}>
                    {Math.round(metrics.torqueReading)} Ncm
                  </span>
                  {metrics.torqueReading > 50 && <AlertTriangle className="w-4 h-4 text-red-600" />}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600">Drill Speed:</span>
                <span className="font-medium">{Math.round(metrics.drillingSpeed)} RPM</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-600">Irrigation:</span>
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{Math.round(metrics.irrigationFlow)} ml/min</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-purple-700 font-medium">System Status:</span>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Optimal
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quality Control Checks */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-orange-600" />
            <span>Real-time Quality Control</span>
          </CardTitle>
          <CardDescription>AI-powered quality assurance during surgery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className={`p-4 rounded-lg border-2 ${getStatusColor(qualityChecks.parallelism.status)}`}>
              <h4 className="font-semibold mb-2">Parallelism</h4>
              <div className="text-2xl font-bold">{qualityChecks.parallelism.value.toFixed(1)}°</div>
              <div className="text-sm">Deviation</div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${getStatusColor(qualityChecks.depth.status)}`}>
              <h4 className="font-semibold mb-2">Depth</h4>
              <div className="text-2xl font-bold">{qualityChecks.depth.value.toFixed(1)}mm</div>
              <div className="text-sm">Current</div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${getStatusColor(qualityChecks.angulation.status)}`}>
              <h4 className="font-semibold mb-2">Angulation</h4>
              <div className="text-2xl font-bold">{qualityChecks.angulation.value.toFixed(1)}°</div>
              <div className="text-sm">From Plan</div>
            </div>

            <div className={`p-4 rounded-lg border-2 ${getStatusColor(qualityChecks.primaryStability.status)}`}>
              <h4 className="font-semibold mb-2">Stability</h4>
              <div className="text-2xl font-bold">{Math.round(qualityChecks.primaryStability.value)} Ncm</div>
              <div className="text-sm">Primary</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Voice Notes & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-blue-600" />
              <span>Voice Notes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={startVoiceNote}
              disabled={isRecording}
              className={`w-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isRecording ? (
                <>
                  <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
                  Recording...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Record Voice Note
                </>
              )}
            </Button>

            <div className="space-y-2 max-h-32 overflow-y-auto">
              {voiceNotes.map((note, index) => (
                <div key={index} className="bg-slate-50 p-3 rounded-lg text-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <Volume2 className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-slate-500">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-slate-700">{note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Live Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-green-600 font-medium">All Parameters Normal</p>
                <p className="text-sm text-slate-500">No alerts at this time</p>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <Alert key={index} className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-red-800">
                      {alert}
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeSurgicalMonitor;
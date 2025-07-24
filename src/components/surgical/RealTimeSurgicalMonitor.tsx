import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Activity, 
  Heart, 
  Eye, 
  Brain, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Play,
  MonitorSpeaker,
  Thermometer,
  Gauge,
  Timer,
  Shield
} from 'lucide-react';

// Simulare monitorizare în timp real
const generateVitalSigns = () => ({
  heartRate: Math.floor(Math.random() * 30) + 60,
  bloodPressure: {
    systolic: Math.floor(Math.random() * 40) + 110,
    diastolic: Math.floor(Math.random() * 20) + 70
  },
  oxygenSaturation: Math.floor(Math.random() * 8) + 92,
  temperature: (36.0 + Math.random() * 2.5).toFixed(1),
  respiratoryRate: Math.floor(Math.random() * 10) + 12,
  stressLevel: Math.floor(Math.random() * 60) + 10,
  painLevel: Math.floor(Math.random() * 4) + 1,
  procedureProgress: Math.floor(Math.random() * 100),
  anesthesiaLevel: Math.floor(Math.random() * 20) + 80,
  bleedingControl: Math.floor(Math.random() * 15) + 85
});

const generateAlerts = () => {
  const alertTypes = [
    { type: 'warning', message: 'Slight increase in heart rate detected', icon: <Heart className="w-4 h-4" /> },
    { type: 'success', message: 'Optimal anesthesia levels maintained', icon: <CheckCircle className="w-4 h-4" /> },
    { type: 'info', message: 'Procedure 73% complete, estimated 15 min remaining', icon: <Timer className="w-4 h-4" /> },
    { type: 'warning', message: 'Patient stress level elevated, recommend comfort measures', icon: <Brain className="w-4 h-4" /> }
  ];
  
  return alertTypes[Math.floor(Math.random() * alertTypes.length)];
};

const RealTimeSurgicalMonitor = () => {
  const [vitalSigns, setVitalSigns] = useState(generateVitalSigns());
  const [currentAlert, setCurrentAlert] = useState(generateAlerts());
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Actualizare continuă a semnelor vitale
  useEffect(() => {
    if (!isMonitoring) return;
    
    const interval = setInterval(() => {
      setVitalSigns(generateVitalSigns());
      setTimeElapsed(prev => prev + 1);
      
      // Alertă aleatorie la fiecare 10 secunde
      if (Math.random() < 0.1) {
        const alert = generateAlerts();
        setCurrentAlert(alert);
        toast({
          title: "🔴 Real-Time Alert",
          description: alert.message,
          variant: alert.type === 'warning' ? 'destructive' : 'default'
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isMonitoring, toast]);

  // Simulare grafic EKG în timp real
  useEffect(() => {
    const canvas = chartRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationId: number;
    let x = 0;
    
    const drawEKG = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      
      // EKG Wave
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let i = 0; i < canvas.width; i++) {
        const heartbeat = Math.sin((i + x) * 0.02) * 20 + 
                         Math.sin((i + x) * 0.05) * 10 +
                         (Math.random() - 0.5) * 5;
        const y = canvas.height / 2 + heartbeat;
        
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      ctx.stroke();
      
      x += 2;
      if (x > canvas.width) x = 0;
      
      animationId = requestAnimationFrame(drawEKG);
    };
    
    drawEKG();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [vitalSigns.heartRate]);

  const getVitalStatus = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return 'normal';
    if (value < min * 0.8 || value > max * 1.2) return 'critical';
    return 'warning';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🔴 REAL-TIME SURGICAL MONITOR
          </h1>
          <p className="text-xl text-red-200 mb-6">
            Monitorizare avansată în timp real cu AI predictiv
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
              <Activity className="w-4 h-4 mr-2" />
              LIVE MONITORING
            </Badge>
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2">
              <Timer className="w-4 h-4 mr-2" />
              {formatTime(timeElapsed)}
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              99.9% Uptime
            </Badge>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-8 py-4 text-lg font-semibold rounded-full ${
              isMonitoring 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
            }`}
          >
            {isMonitoring ? (
              <>
                <Play className="w-5 h-5 mr-2 animate-pulse" />
                MONITORING ACTIVE
              </>
            ) : (
              <>
                <Activity className="w-5 h-5 mr-2" />
                START MONITORING
              </>
            )}
          </Button>
        </div>

        {/* Current Alert */}
        {currentAlert && (
          <Alert className={`mb-8 border-2 ${
            currentAlert.type === 'warning' 
              ? 'bg-orange-900/30 border-orange-500' 
              : currentAlert.type === 'success'
              ? 'bg-green-900/30 border-green-500'
              : 'bg-blue-900/30 border-blue-500'
          }`}>
            {currentAlert.icon}
            <AlertDescription className="text-lg font-medium">
              {currentAlert.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Vital Signs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {/* Heart Rate */}
          <Card className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-red-500/30">
            <CardContent className="p-6 text-center">
              <Heart className={`w-12 h-12 mx-auto mb-4 text-red-400 ${isMonitoring ? 'animate-pulse' : ''}`} />
              <div className="text-3xl font-bold text-red-400">{vitalSigns.heartRate}</div>
              <div className="text-sm text-red-200">BPM</div>
              <Badge className={`mt-2 ${
                getVitalStatus(vitalSigns.heartRate, 60, 100) === 'normal' 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-orange-500/20 text-orange-300'
              }`}>
                {getVitalStatus(vitalSigns.heartRate, 60, 100)}
              </Badge>
            </CardContent>
          </Card>

          {/* Blood Pressure */}
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Gauge className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <div className="text-2xl font-bold text-blue-400">
                {vitalSigns.bloodPressure.systolic}/{vitalSigns.bloodPressure.diastolic}
              </div>
              <div className="text-sm text-blue-200">mmHg</div>
              <Badge className="mt-2 bg-green-500/20 text-green-300">normal</Badge>
            </CardContent>
          </Card>

          {/* Oxygen Saturation */}
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
            <CardContent className="p-6 text-center">
              <Activity className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <div className="text-3xl font-bold text-green-400">{vitalSigns.oxygenSaturation}%</div>
              <div className="text-sm text-green-200">SpO2</div>
              <Badge className={`mt-2 ${
                vitalSigns.oxygenSaturation >= 95 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}>
                {vitalSigns.oxygenSaturation >= 95 ? 'optimal' : 'low'}
              </Badge>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card className="bg-gradient-to-br from-orange-900/50 to-yellow-900/50 border-orange-500/30">
            <CardContent className="p-6 text-center">
              <Thermometer className="w-12 h-12 mx-auto mb-4 text-orange-400" />
              <div className="text-3xl font-bold text-orange-400">{vitalSigns.temperature}°</div>
              <div className="text-sm text-orange-200">Celsius</div>
              <Badge className="mt-2 bg-green-500/20 text-green-300">normal</Badge>
            </CardContent>
          </Card>

          {/* Stress Level */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <div className="text-3xl font-bold text-purple-400">{vitalSigns.stressLevel}%</div>
              <div className="text-sm text-purple-200">Stress</div>
              <Badge className={`mt-2 ${
                vitalSigns.stressLevel < 30 
                  ? 'bg-green-500/20 text-green-300' 
                  : vitalSigns.stressLevel < 60
                  ? 'bg-orange-500/20 text-orange-300'
                  : 'bg-red-500/20 text-red-300'
              }`}>
                {vitalSigns.stressLevel < 30 ? 'low' : vitalSigns.stressLevel < 60 ? 'moderate' : 'high'}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* EKG Monitor */}
          <Card className="bg-slate-800/50 border-green-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-400">
                <Activity className="w-6 h-6" />
                <span>EKG Real-Time Monitor</span>
              </CardTitle>
              <CardDescription className="text-green-200">
                Electrocardiogramă în timp real cu analiză AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <canvas 
                ref={chartRef}
                width={600}
                height={200}
                className="w-full border border-green-500/30 rounded bg-slate-900"
              />
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">{vitalSigns.heartRate}</div>
                  <div className="text-sm text-green-200">Current BPM</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">Normal</div>
                  <div className="text-sm text-blue-200">Rhythm</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-400">Stable</div>
                  <div className="text-sm text-purple-200">Pattern</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Procedure Progress */}
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-400">
                <Zap className="w-6 h-6" />
                <span>Procedure Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-purple-300">Overall Progress</span>
                  <span className="text-purple-400 font-bold">{vitalSigns.procedureProgress}%</span>
                </div>
                <Progress value={vitalSigns.procedureProgress} className="h-4" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-blue-300">Anesthesia Level</span>
                  <span className="text-blue-400 font-bold">{vitalSigns.anesthesiaLevel}%</span>
                </div>
                <Progress value={vitalSigns.anesthesiaLevel} className="h-4" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-green-300">Bleeding Control</span>
                  <span className="text-green-400 font-bold">{vitalSigns.bleedingControl}%</span>
                </div>
                <Progress value={vitalSigns.bleedingControl} className="h-4" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{formatTime(timeElapsed)}</div>
                  <div className="text-sm text-orange-200">Time Elapsed</div>
                </div>
                <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400">{vitalSigns.painLevel}/10</div>
                  <div className="text-sm text-cyan-200">Pain Level</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealTimeSurgicalMonitor;
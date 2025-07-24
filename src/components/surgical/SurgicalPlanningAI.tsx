import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Eye, 
  Zap, 
  Mic, 
  Camera, 
  Cpu, 
  Activity,
  Target,
  Shield,
  Sparkles,
  Gauge,
  MonitorSpeaker,
  Microscope,
  Scan,
  HeartHandshake,
  Rocket,
  AlertTriangle
} from 'lucide-react';

interface SurgicalPlanningAIProps {
  caseId?: string;
  onPlanComplete?: (plan: any) => void;
}

// Simulare AI avansat pentru planificare chirurgicală
const generateAIRecommendations = () => ({
  riskAssessment: Math.floor(Math.random() * 30) + 70,
  successProbability: Math.floor(Math.random() * 15) + 85,
  complexityScore: Math.floor(Math.random() * 40) + 60,
  recommendedApproach: [
    "Implant placement at 45° angle",
    "Use guided surgery protocol",
    "Pre-drilling at 800 RPM",
    "Immediate loading possible"
  ],
  predictedHealingTime: "12-16 weeks",
  complications: ["Sinus proximity", "Bone density variation"],
  aiConfidence: Math.floor(Math.random() * 20) + 80
});

const generateRealTimeMetrics = () => ({
  patientStress: Math.floor(Math.random() * 30) + 20,
  bloodPressure: `${Math.floor(Math.random() * 20) + 110}/${Math.floor(Math.random() * 15) + 70}`,
  heartRate: Math.floor(Math.random() * 20) + 65,
  oxygenSaturation: Math.floor(Math.random() * 5) + 95,
  tissueTemperature: (36.2 + Math.random() * 1.8).toFixed(1),
  precisionLevel: Math.floor(Math.random() * 10) + 90,
  timeElapsed: "00:45:32",
  estimatedRemaining: "00:23:15"
});

const SurgicalPlanningAI = ({ caseId, onPlanComplete }: SurgicalPlanningAIProps = {}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState(generateAIRecommendations());
  const [realTimeMetrics, setRealTimeMetrics] = useState(generateRealTimeMetrics());
  const [surgicalMode, setSurgicalMode] = useState<'planning' | 'active' | 'monitoring'>('planning');
  const [voiceCommand, setVoiceCommand] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Simulare actualizare în timp real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(generateRealTimeMetrics());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulare analiză AI
  const startAIAnalysis = () => {
    setIsAnalyzing(true);
    setScanProgress(0);
    
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          const newRecommendations = generateAIRecommendations();
          setAiRecommendations(newRecommendations);
          
          // Call the onPlanComplete callback if provided
          if (onPlanComplete) {
            onPlanComplete({
              aiAnalysis: {
                successPrediction: newRecommendations.successProbability,
                recommendations: newRecommendations.recommendedApproach,
                confidence: newRecommendations.aiConfidence
              }
            });
          }
          
          toast({
            title: "🤖 AI Analysis Complete",
            description: "Advanced surgical plan generated with 97.3% confidence",
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  // Simulare comandă vocală avansată
  const startVoiceCommand = () => {
    setIsListening(true);
    
    setTimeout(() => {
      const commands = [
        "Show bone density analysis",
        "Calculate optimal torque settings",
        "Display 3D trajectory preview",
        "Adjust lighting by 15%",
        "Show nerve proximity warning",
        "Activate precision mode"
      ];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setVoiceCommand(randomCommand);
      setIsListening(false);
      
      toast({
        title: "🎙️ Voice Command Executed",
        description: `"${randomCommand}" - AI response in 0.3s`,
      });
    }, 2000);
  };

  // Simulare desenare 3D pe canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Simulare vizualizare 3D
    const animate = () => {
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Simulare grid 3D
      ctx.strokeStyle = '#00d4ff';
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
      
      // Simulare implant 3D
      ctx.fillStyle = '#ff6b35';
      ctx.beginPath();
      ctx.arc(canvas.width/2, canvas.height/2, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Simulare trajectory
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, 50);
      ctx.lineTo(canvas.width/2, canvas.height/2);
      ctx.stroke();
    };
    
    animate();
  }, [aiRecommendations]);

  const getMetricColor = (value: number, optimal: number) => {
    const diff = Math.abs(value - optimal);
    if (diff < 5) return 'text-green-600 bg-green-100';
    if (diff < 15) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Revolutionary Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🦄 GENIUS SURGICAL AI 3.0
          </h1>
          <p className="text-xl text-blue-200 mb-6">
            Primul sistem AI din lume pentru ghidare chirurgicală în timp real
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Revolutionary Technology
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              <Rocket className="w-4 h-4 mr-2" />
              Unicorn Status
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              99.7% Precision
            </Badge>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 rounded-full p-2 backdrop-blur-sm border border-cyan-500/30">
            <div className="flex space-x-2">
              {['planning', 'active', 'monitoring'].map((mode) => (
                <Button
                  key={mode}
                  onClick={() => setSurgicalMode(mode as any)}
                  className={`rounded-full px-6 py-3 transition-all duration-300 ${
                    surgicalMode === mode
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'bg-transparent text-cyan-300 hover:bg-cyan-500/20'
                  }`}
                >
                  {mode === 'planning' && <Brain className="w-4 h-4 mr-2" />}
                  {mode === 'active' && <Zap className="w-4 h-4 mr-2" />}
                  {mode === 'monitoring' && <Activity className="w-4 h-4 mr-2" />}
                  {mode.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="ai-analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-cyan-500/30">
            <TabsTrigger value="ai-analysis" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500">
              🧠 AI Analysis
            </TabsTrigger>
            <TabsTrigger value="3d-planning" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              🎯 3D Planning
            </TabsTrigger>
            <TabsTrigger value="real-time" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500">
              ⚡ Real-Time
            </TabsTrigger>
            <TabsTrigger value="voice-ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
              🎙️ Voice AI
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500">
              📊 Bio-Metrics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Assessment */}
              <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-cyan-400">
                    <Brain className="w-6 h-6" />
                    <span>Advanced AI Assessment</span>
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Quantum neural network analysis cu 50 miliarde parametri
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-300">Success Rate</span>
                        <span className="font-bold text-green-400">{aiRecommendations.successProbability}%</span>
                      </div>
                      <Progress value={aiRecommendations.successProbability} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-300">Risk Level</span>
                        <span className="font-bold text-orange-400">{100 - aiRecommendations.riskAssessment}%</span>
                      </div>
                      <Progress value={100 - aiRecommendations.riskAssessment} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-cyan-400">AI Recommendations:</h4>
                    {aiRecommendations.recommendedApproach.map((rec, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-slate-200">{rec}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    onClick={startAIAnalysis} 
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  >
                    {isAnalyzing ? (
                      <>
                        <Cpu className="w-4 h-4 mr-2 animate-spin" />
                        Processing Neural Networks... {scanProgress}%
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Run Deep AI Analysis
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Complexity Analysis */}
              <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-purple-400">
                    <Microscope className="w-6 h-6" />
                    <span>Quantum Complexity Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-300">AI Confidence Level</span>
                        <span className="text-2xl font-bold text-purple-400">{aiRecommendations.aiConfidence}%</span>
                      </div>
                      <Progress value={aiRecommendations.aiConfidence} className="h-3" />
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-400 mb-2">Healing Prediction</h4>
                      <p className="text-cyan-200">{aiRecommendations.predictedHealingTime}</p>
                    </div>

                    {aiRecommendations.complications.length > 0 && (
                      <Alert className="bg-orange-900/30 border-orange-500/50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-orange-200">
                          Potential complications detected: {aiRecommendations.complications.join(', ')}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="3d-planning">
            <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-cyan-400">
                  <Eye className="w-6 h-6" />
                  <span>Revolutionary 3D Surgical Planning</span>
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Holographic visualization cu AI trajectory optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <canvas 
                      ref={canvasRef}
                      width={600}
                      height={400}
                      className="w-full border-2 border-cyan-500/30 rounded-lg bg-slate-900"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <h4 className="font-semibold text-cyan-400 mb-3">3D Controls</h4>
                      <div className="space-y-2">
                        <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600">
                          <Scan className="w-4 h-4 mr-2" />
                          Rotate View
                        </Button>
                        <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600">
                          <Target className="w-4 h-4 mr-2" />
                          Set Trajectory
                        </Button>
                        <Button className="w-full justify-start bg-slate-700 hover:bg-slate-600">
                          <Gauge className="w-4 h-4 mr-2" />
                          Measure Distance
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-400 mb-2">Precision Status</h4>
                      <div className="text-2xl font-bold text-green-400">99.7%</div>
                      <div className="text-sm text-green-200">Quantum-level accuracy</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="real-time">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Real-time metrics cards */}
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <HeartHandshake className="w-8 h-8 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-300">LIVE</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-400">{realTimeMetrics.heartRate}</div>
                  <div className="text-sm text-green-200">Heart Rate (BPM)</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="w-8 h-8 text-blue-400" />
                    <Badge className="bg-blue-500/20 text-blue-300">LIVE</Badge>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{realTimeMetrics.bloodPressure}</div>
                  <div className="text-sm text-blue-200">Blood Pressure</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Gauge className="w-8 h-8 text-purple-400" />
                    <Badge className="bg-purple-500/20 text-purple-300">AI</Badge>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">{realTimeMetrics.precisionLevel}%</div>
                  <div className="text-sm text-purple-200">AI Precision</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <MonitorSpeaker className="w-8 h-8 text-orange-400" />
                    <Badge className="bg-orange-500/20 text-orange-300">STRESS</Badge>
                  </div>
                  <div className="text-2xl font-bold text-orange-400">{realTimeMetrics.patientStress}%</div>
                  <div className="text-sm text-orange-200">Patient Stress</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="voice-ai">
            <Card className="bg-slate-800/50 border-orange-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-orange-400">
                  <Mic className="w-6 h-6" />
                  <span>Advanced Voice AI Command Center</span>
                </CardTitle>
                <CardDescription className="text-orange-200">
                  Comenzi vocale cu înțelegere contextuală și execuție instantanee
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <Button
                    onClick={startVoiceCommand}
                    disabled={isListening}
                    className={`w-32 h-32 rounded-full ${
                      isListening 
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse' 
                        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                    }`}
                  >
                    <Mic className={`w-12 h-12 ${isListening ? 'animate-bounce' : ''}`} />
                  </Button>
                </div>

                {voiceCommand && (
                  <Alert className="bg-green-900/30 border-green-500/50">
                    <Mic className="h-4 w-4" />
                    <AlertDescription className="text-green-200">
                      <strong>Command Recognized:</strong> "{voiceCommand}"
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-400 mb-3">Available Commands</h4>
                    <div className="space-y-2 text-sm text-slate-200">
                      <div>• "Show bone density analysis"</div>
                      <div>• "Calculate optimal torque"</div>
                      <div>• "Adjust lighting intensity"</div>
                      <div>• "Display 3D trajectory"</div>
                      <div>• "Activate precision mode"</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-400 mb-3">AI Response Time</h4>
                    <div className="text-3xl font-bold text-orange-400">0.3s</div>
                    <div className="text-sm text-orange-200">Average processing time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-indigo-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-indigo-400">Bio-Metric Monitoring</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(realTimeMetrics).map(([key, value], i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-bold text-indigo-400">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-400">System Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-purple-300">Neural Network Load</span>
                        <span className="text-sm text-purple-400">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-purple-300">Quantum Processing</span>
                        <span className="text-sm text-purple-400">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-purple-300">Real-time Analysis</span>
                        <span className="text-sm text-purple-400">99%</span>
                      </div>
                      <Progress value={99} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SurgicalPlanningAI;
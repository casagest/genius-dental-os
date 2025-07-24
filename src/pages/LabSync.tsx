import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Scan, Cpu, Workflow, Mic, Clock, CheckCircle, AlertCircle, 
  Upload, Download, RefreshCw, Play, Pause, RotateCcw, Settings,
  FileText, Package, Truck, Eye, Camera, Volume2
} from 'lucide-react';

// Simulare date lab sync
const labCases = [
  {
    id: "LAB-2024-156",
    patient: "Popescu Ana",
    treatment: "All-on-6 Implant",
    status: "exocad_design",
    progress: 75,
    scanDate: "2024-01-15",
    deliveryDate: "2024-01-22",
    technician: "Marius Lab",
    priority: "high"
  },
  {
    id: "LAB-2024-157", 
    patient: "Ionescu George",
    treatment: "Coroană Zirconiu",
    status: "medit_scan",
    progress: 25,
    scanDate: "2024-01-16",
    deliveryDate: "2024-01-20",
    technician: "Diana Tech",
    priority: "normal"
  },
  {
    id: "LAB-2024-158",
    patient: "Marinescu Elena",
    treatment: "Punte 3 Unități",
    status: "production",
    progress: 90,
    scanDate: "2024-01-10",
    deliveryDate: "2024-01-18",
    technician: "Alex CAD",
    priority: "urgent"
  }
];

const LabSync = () => {
  const [isListening, setIsListening] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'connected' | 'syncing' | 'error'>('connected');
  const [voiceCommand, setVoiceCommand] = useState('');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const { toast } = useToast();

  // Simulare comenzi vocale
  const startVoiceCommand = () => {
    setIsListening(true);
    
    // Simulare voice recognition
    setTimeout(() => {
      const commands = [
        "Sincronizează caz LAB-2024-156",  
        "Status All-on-6 Popescu Ana",
        "Exportă design în Exocad",
        "Importă scan Medit pacient Ionescu"
      ];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setVoiceCommand(randomCommand);
      setIsListening(false);
      
      toast({
        title: "Comandă Vocală Recunoscută",
        description: `"${randomCommand}"`,
      });
    }, 3000);
  };

  const syncWithExocad = (caseId: string) => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('connected');
      toast({
        title: "Exocad Sync Completă",
        description: `Cazul ${caseId} sincronizat cu Exocad`,
      });
    }, 2000);
  };

  const syncWithMedit = (caseId: string) => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('connected');
      toast({
        title: "Medit Sync Completă", 
        description: `Scanul pentru ${caseId} importat din Medit`,
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'medit_scan': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'exocad_design': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'production': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Revolutionary Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🔗 LAB SYNC GENIUS
          </h1>
          <p className="text-xl text-blue-200 mb-6">
            Cea mai avansată sincronizare laborator din lume
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Exocad ↔ Medit ↔ ERP Live
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              <Mic className="w-4 h-4 mr-2" />
              Voice Control Active
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2">
              <Workflow className="w-4 h-4 mr-2" />
              99.9% Sync Rate
            </Badge>
          </div>
        </div>
        {/* Control Panel */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800/50 rounded-full p-2 backdrop-blur-sm border border-cyan-500/30">
            <div className="flex items-center space-x-4">
              <Badge className={`px-4 py-2 ${
                syncStatus === 'connected' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                  : syncStatus === 'syncing' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white animate-pulse' 
                  : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
              }`}>
                <RefreshCw className={`w-4 h-4 mr-2 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                {syncStatus === 'connected' ? 'LIVE SYNC ACTIVE' : 
                 syncStatus === 'syncing' ? 'SYNCING...' : 'CONNECTION ERROR'}
              </Badge>
              
              <Button
                onClick={startVoiceCommand}
                disabled={isListening}
                className={`px-6 py-3 rounded-full ${
                  isListening 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse' 
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                }`}
              >
                {isListening ? <Volume2 className="w-5 h-5 mr-2 animate-bounce" /> : <Mic className="w-5 h-5 mr-2" />}
                <span className="font-semibold">{isListening ? 'VOICE LISTENING...' : 'VOICE COMMAND'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Voice Command Display */}
        {voiceCommand && (
          <Alert className="mb-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
            <Mic className="h-5 w-5 text-green-400" />
            <AlertDescription className="text-lg font-medium text-green-200">
              <strong className="text-green-400">🎙️ Voice Command Executed:</strong> "{voiceCommand}"
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-cyan-500/30">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500">
              🏠 Dashboard
            </TabsTrigger>
            <TabsTrigger value="exocad" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500">
              🎯 Exocad Sync
            </TabsTrigger>
            <TabsTrigger value="medit" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500">
              📷 Medit Scan
            </TabsTrigger>
            <TabsTrigger value="workflow" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500">
              ⚡ Workflow ERP
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Revolutionary Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Scan className="w-12 h-12 text-blue-400" />
                    <Badge className="bg-blue-500/20 text-blue-300 animate-pulse">+15%</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-blue-400">12</h3>
                  <p className="text-blue-200">Cazuri Active Live</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Cpu className="w-12 h-12 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-300">LIVE</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-green-400">8</h3>
                  <p className="text-green-200">Exocad Sync Active</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Camera className="w-12 h-12 text-purple-400" />
                    <Badge className="bg-purple-500/20 text-purple-300">99.7%</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-purple-400">15</h3>
                  <p className="text-purple-200">Medit Scanuri HD</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Truck className="w-12 h-12 text-orange-400" />
                    <Badge className="bg-orange-500/20 text-orange-300">ON TIME</Badge>
                  </div>
                  <h3 className="text-3xl font-bold text-orange-400">6</h3>
                  <p className="text-orange-200">Livrări Astăzi</p>
                </CardContent>
              </Card>
            </div>

            {/* Cazuri Active */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Workflow className="w-5 h-5 text-blue-600" />
                  <span>Cazuri Lab Active</span>
                </CardTitle>
                <CardDescription>Status în timp real al cazurilor în laborator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labCases.map((labCase) => (
                    <div 
                      key={labCase.id} 
                      className={`p-4 border-2 rounded-lg hover:shadow-lg transition-all cursor-pointer ${
                        selectedCase === labCase.id ? 'border-blue-300 bg-blue-50' : 'border-slate-200'
                      }`}
                      onClick={() => setSelectedCase(selectedCase === labCase.id ? null : labCase.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                            {labCase.id}
                          </div>
                          <div>
                            <h3 className="font-semibold">{labCase.patient}</h3>
                            <p className="text-sm text-slate-600">{labCase.treatment}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(labCase.priority)}>
                            {labCase.priority}
                          </Badge>
                          <Badge className={getStatusColor(labCase.status)}>
                            {labCase.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Scan:</span>
                          <div className="font-medium">{labCase.scanDate}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Livrare:</span>
                          <div className="font-medium">{labCase.deliveryDate}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Tehnician:</span>
                          <div className="font-medium">{labCase.technician}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-600">Progress</span>
                          <span className="text-sm font-semibold">{labCase.progress}%</span>
                        </div>
                        <Progress value={labCase.progress} className="h-2" />
                      </div>

                      {selectedCase === labCase.id && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => syncWithExocad(labCase.id)}>
                              <Cpu className="w-4 h-4 mr-1" />
                              Sync Exocad
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => syncWithMedit(labCase.id)}>
                              <Camera className="w-4 h-4 mr-1" />
                              Import Medit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
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

          <TabsContent value="exocad">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    <span>Exocad Integration</span>
                  </CardTitle>
                  <CardDescription>CAD/CAM Design Workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Exocad Version</Label>
                      <Input value="3.1 Elefsina" disabled />
                    </div>
                    <div>
                      <Label>License Status</Label>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Project Path</Label>
                    <Input value="C:\Exocad\Projects\MedicalCor\" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Quick Actions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-1" />
                        Import STL
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export Design
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Auto Sync
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Design Templates</CardTitle>
                  <CardDescription>Șabloane predefinite pentru design rapid</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'All-on-4 Upper Jaw',
                      'All-on-6 Lower Jaw', 
                      'Single Crown Posterior',
                      'Bridge 3-Unit Anterior',
                      'Implant Crown Custom'
                    ].map((template, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="font-medium">{template}</span>
                        <Button size="sm" variant="outline">Load</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="medit">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-purple-600" />
                    <span>Medit Scanner</span>
                  </CardTitle>
                  <CardDescription>Intraoral Scanner Integration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Scanner Model</Label>
                      <Input value="Medit i700" disabled />
                    </div>
                    <div>
                      <Label>Connection</Label>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Scan Quality</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Progress value={95} className="flex-1" />
                      <span className="text-sm font-semibold">95%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button className="space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Start Scan</span>
                    </Button>
                    <Button variant="outline" className="space-x-2">
                      <Pause className="w-4 h-4" />
                      <span>Pause</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Recent Scans</CardTitle>
                  <CardDescription>Ultimele scanări realizate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { patient: 'Popescu Ana', date: '2024-01-16 10:30', quality: 98 },
                      { patient: 'Ionescu Mihai', date: '2024-01-16 09:15', quality: 95 },
                      { patient: 'Marinescu Elena', date: '2024-01-15 16:45', quality: 92 }
                    ].map((scan, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium">{scan.patient}</div>
                          <div className="text-sm text-slate-600">{scan.date}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{scan.quality}%</Badge>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workflow">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Workflow className="w-5 h-5 text-green-600" />
                  <span>ERP Workflow</span>
                </CardTitle>
                <CardDescription>Automatizare procese laborator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Workflow Steps */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Workflow Steps</h3>
                    {[
                      { step: 'Scan Import', status: 'completed', icon: <Camera className="w-4 h-4" /> },
                      { step: 'Design Review', status: 'active', icon: <Eye className="w-4 h-4" /> },
                      { step: 'CAD Modeling', status: 'pending', icon: <Cpu className="w-4 h-4" /> },
                      { step: 'Production', status: 'pending', icon: <Package className="w-4 h-4" /> },
                      { step: 'Quality Check', status: 'pending', icon: <CheckCircle className="w-4 h-4" /> },
                      { step: 'Delivery', status: 'pending', icon: <Truck className="w-4 h-4" /> }
                    ].map((workflow, index) => (
                      <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                        workflow.status === 'completed' ? 'bg-green-50 border border-green-200' :
                        workflow.status === 'active' ? 'bg-blue-50 border border-blue-200' :
                        'bg-slate-50 border border-slate-200'
                      }`}>
                        <div className={`p-2 rounded-lg ${
                          workflow.status === 'completed' ? 'bg-green-100 text-green-600' :
                          workflow.status === 'active' ? 'bg-blue-100 text-blue-600' :
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {workflow.icon}
                        </div>
                        <div>
                          <div className="font-medium">{workflow.step}</div>
                          <Badge className={`text-xs ${
                            workflow.status === 'completed' ? 'bg-green-100 text-green-700' :
                            workflow.status === 'active' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {workflow.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Automation Rules */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Automation Rules</h3>  
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="font-medium">Auto Import</div>
                        <div className="text-sm text-slate-600">Importă automat scanurile Medit</div>
                        <Badge className="bg-green-100 text-green-700 text-xs mt-1">Active</Badge>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="font-medium">Priority Alert</div>
                        <div className="text-sm text-slate-600">Notificare cazuri urgente</div>
                        <Badge className="bg-green-100 text-green-700 text-xs mt-1">Active</Badge>
                      </div>
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="font-medium">Quality Check</div>
                        <div className="text-sm text-slate-600">Verificare automată calitate</div>
                        <Badge className="bg-green-100 text-green-700 text-xs mt-1">Active</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Voice Commands */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Voice Commands</h3>
                    <div className="space-y-2">
                      {[
                        '"Sincronizează Exocad"',
                        '"Importă ultimul scan"', 
                        '"Status caz urgent"',
                        '"Exportă design finalizat"',
                        '"Notificare tehnician"'
                      ].map((command, index) => (
                        <div key={index} className="p-2 bg-slate-100 rounded font-mono text-sm">
                          {command}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" onClick={startVoiceCommand}>
                      <Mic className="w-4 h-4 mr-2" />
                      Test Voice Command
                    </Button>
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

export default LabSync;
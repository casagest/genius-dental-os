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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
              LabSync - Sincronizare Laborator
            </h1>
            <p className="text-slate-600 mt-2">
              Exocad ↔ Medit ↔ ERP + Comenzi Vocale
            </p>
          </div>
          
          {/* Status și Voice Control */}
          <div className="flex items-center space-x-4">
            <Badge className={`${
              syncStatus === 'connected' ? 'bg-green-100 text-green-800 border-green-200' :
              syncStatus === 'syncing' ? 'bg-blue-100 text-blue-800 border-blue-200' :
              'bg-red-100 text-red-800 border-red-200'
            }`}>
              <RefreshCw className="w-3 h-3 mr-1" />
              {syncStatus === 'connected' ? 'Conectat' : 
               syncStatus === 'syncing' ? 'Sincronizare...' : 'Eroare'}
            </Badge>
            
            <Button
              onClick={startVoiceCommand}
              disabled={isListening}
              className={`space-x-2 ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isListening ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? 'Ascult...' : 'Comandă Vocală'}</span>
            </Button>
          </div>
        </div>

        {/* Voice Command Display */}
        {voiceCommand && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Mic className="h-4 w-4" />
            <AlertDescription>
              <strong>Comandă Vocală:</strong> "{voiceCommand}"
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-fit grid-cols-4 bg-white border-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="exocad">Exocad Sync</TabsTrigger>
            <TabsTrigger value="medit">Medit Scan</TabsTrigger>
            <TabsTrigger value="workflow">Workflow ERP</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Scan className="w-8 h-8 text-blue-600" />
                    <Badge className="text-xs bg-blue-100 text-blue-700">+15%</Badge>
                  </div>
                  <h3 className="text-2xl font-bold">12</h3>
                  <p className="text-sm text-slate-600">Cazuri Active</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Cpu className="w-8 h-8 text-green-600" />
                    <Badge className="text-xs bg-green-100 text-green-700">Live</Badge>
                  </div>
                  <h3 className="text-2xl font-bold">8</h3>
                  <p className="text-sm text-slate-600">Exocad Sync</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Camera className="w-8 h-8 text-purple-600" />
                    <Badge className="text-xs bg-purple-100 text-purple-700">92%</Badge>
                  </div>
                  <h3 className="text-2xl font-bold">15</h3>
                  <p className="text-sm text-slate-600">Medit Scanuri</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Truck className="w-8 h-8 text-orange-600" />
                    <Badge className="text-xs bg-orange-100 text-orange-700">On Time</Badge>
                  </div>
                  <h3 className="text-2xl font-bold">6</h3>
                  <p className="text-sm text-slate-600">Livrări Astăzi</p>
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
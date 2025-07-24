import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Scan,
  FileImage,
  Printer,
  Microscope,
  Brain,
  Upload,
  Download,
  Share2,
  Zap,
  Monitor,
  Cpu
} from "lucide-react";
import { toast } from "sonner";

interface DigitalAsset {
  id: string;
  type: 'scan' | 'image' | 'model' | 'analysis';
  name: string;
  patient: string;
  date: string;
  status: 'processing' | 'completed' | 'failed';
  aiAnalysis?: any;
}

const DigitalWorkflowHub: React.FC = () => {
  const [assets, setAssets] = useState<DigitalAsset[]>([]);
  const [activeProcesses, setActiveProcesses] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Mock data for digital assets
    const mockAssets: DigitalAsset[] = [
      {
        id: '1',
        type: 'scan',
        name: 'CBCT Maxilar Superior - Ion Popescu',
        patient: 'Ion Popescu',
        date: '2024-01-24',
        status: 'completed',
        aiAnalysis: {
          findings: ['Densitate osoasă normală', 'Fără patologii vizibile'],
          implantRecommendations: 'Zona optimă pentru implant în 16'
        }
      },
      {
        id: '2',
        type: 'image',
        name: 'Fotografii Intraorale - Maria Ionescu',
        patient: 'Maria Ionescu',
        date: '2024-01-24',
        status: 'processing'
      },
      {
        id: '3',
        type: 'model',
        name: 'Model 3D Coroană 26 - Gheorghe Popescu',
        patient: 'Gheorghe Popescu',
        date: '2024-01-23',
        status: 'completed'
      }
    ];
    
    setAssets(mockAssets);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scan': return <Scan className="w-5 h-5 text-blue-500" />;
      case 'image': return <Camera className="w-5 h-5 text-green-500" />;
      case 'model': return <Printer className="w-5 h-5 text-purple-500" />;
      case 'analysis': return <Brain className="w-5 h-5 text-orange-500" />;
      default: return <FileImage className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing': return 'Se procesează';
      case 'completed': return 'Finalizat';
      case 'failed': return 'Eroare';
      default: return status;
    }
  };

  const processWithAI = async (assetId: string) => {
    setIsProcessing(true);
    toast.info('🧠 Procesare AI în curs...');
    
    // Simulate AI processing
    setTimeout(() => {
      setAssets(prev => prev.map(asset => 
        asset.id === assetId 
          ? { 
              ...asset, 
              status: 'completed' as const,
              aiAnalysis: {
                findings: ['Analiză AI completă', 'Detectare automată a structurilor'],
                confidence: 95,
                recommendations: 'Plan de tratament optimizat'
              }
            }
          : asset
      ));
      setIsProcessing(false);
      toast.success('✅ Analiză AI finalizată');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Real-time Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="w-6 h-6 text-primary" />
              <span>Hub Digital Workflow</span>
              <Badge variant="outline" className="animate-pulse">
                🔴 LIVE
              </Badge>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">{activeProcesses} procese active</span>
              </div>
              <Button className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Nou</span>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Access Tools */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4 text-center">
            <Scan className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-blue-900">CBCT Scan</div>
            <div className="text-xs text-blue-700">Scanare 3D</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4 text-center">
            <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-green-900">Fotografie</div>
            <div className="text-xs text-green-700">Intraorală/Extraorală</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-4 text-center">
            <Printer className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold text-purple-900">CAD/CAM</div>
            <div className="text-xs text-purple-700">Design & Print</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="font-semibold text-orange-900">AI Analysis</div>
            <div className="text-xs text-orange-700">Diagnostic automat</div>
          </CardContent>
        </Card>
      </div>

      {/* Digital Assets Management */}
      <Card>
        <CardHeader>
          <CardTitle>Asset-uri Digitale Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Toate</TabsTrigger>
              <TabsTrigger value="scans">Scanări</TabsTrigger>
              <TabsTrigger value="images">Imagini</TabsTrigger>
              <TabsTrigger value="models">Modele 3D</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(asset.type)}
                        <div>
                          <h3 className="font-semibold">{asset.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Pacient: {asset.patient}</span>
                            <span>•</span>
                            <span>{asset.date}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(asset.status)}>
                          {getStatusText(asset.status)}
                        </Badge>
                        
                        {asset.status === 'completed' && asset.aiAnalysis && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            🧠 AI Analyzed
                          </Badge>
                        )}
                        
                        <div className="flex space-x-1">
                          {asset.status === 'completed' && !asset.aiAnalysis && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => processWithAI(asset.id)}
                              disabled={isProcessing}
                            >
                              <Brain className="w-4 h-4 mr-1" />
                              Analizează AI
                            </Button>
                          )}
                          
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis Results */}
                    {asset.aiAnalysis && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <Brain className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">Analiză AI</span>
                        </div>
                        <div className="text-sm space-y-1">
                          {asset.aiAnalysis.findings?.map((finding: string, index: number) => (
                            <div key={index} className="text-blue-800">• {finding}</div>
                          ))}
                          {asset.aiAnalysis.recommendations && (
                            <div className="text-blue-800 font-medium mt-2">
                              📋 {asset.aiAnalysis.recommendations}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scans">
              <div className="text-center py-8 text-gray-500">
                <Scan className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Scanările CBCT vor fi afișate aici</p>
              </div>
            </TabsContent>

            <TabsContent value="images">
              <div className="text-center py-8 text-gray-500">
                <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Imaginile intraorale/extraorale vor fi afișate aici</p>
              </div>
            </TabsContent>

            <TabsContent value="models">
              <div className="text-center py-8 text-gray-500">
                <Printer className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Modelele 3D CAD/CAM vor fi afișate aici</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Voice Commands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">🎤 Comenzi Vocale pentru Workflow Digital</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div className="space-y-1">
              <div>• "Genius, începe scanare CBCT pentru [Nume Pacient]"</div>
              <div>• "Genius, procesează imaginile pentru [Nume Pacient]"</div>
              <div>• "Genius, analizează scan-ul cu AI"</div>
            </div>
            <div className="space-y-1">
              <div>• "Genius, exportă modelul 3D pentru laborator"</div>
              <div>• "Genius, trimite imagini către specialist"</div>
              <div>• "Genius, generează raport de analiză"</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalWorkflowHub;
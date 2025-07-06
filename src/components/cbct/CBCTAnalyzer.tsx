import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Scan, 
  Upload, 
  Eye, 
  Target, 
  AlertTriangle, 
  CheckCircle,
  Zap,
  Activity,
  Gauge,
  MapPin,
  Ruler,
  Volume2,
  FileImage,
  Download
} from "lucide-react";

interface CBCTAnalysis {
  patientId: string;
  scanDate: string;
  boneDensity: {
    average: number;
    regions: {
      anterior: number;
      posterior: number;
      maxilla: number;
      mandible: number;
    };
  };
  boneVolume: {
    total: number;
    available: number;
    quality: 'D1' | 'D2' | 'D3' | 'D4';
  };
  anatomicalFeatures: {
    sinusFloor: {
      height: number;
      proximity: 'safe' | 'caution' | 'high-risk';
    };
    nerveCanal: {
      distance: number;
      visibility: 'clear' | 'partial' | 'unclear';
    };
    corticalThickness: number;
  };
  implantRecommendations: {
    positions: string[];
    sizes: string[];
    angulations: number[];
    riskFactors: string[];
  };
  aiScore: {
    successProbability: number;
    riskLevel: 'low' | 'moderate' | 'high';
    confidence: number;
  };
}

interface CBCTAnalyzerProps {
  onAnalysisComplete: (analysis: CBCTAnalysis) => void;
}

const CBCTAnalyzer: React.FC<CBCTAnalyzerProps> = ({ onAnalysisComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [analysis, setAnalysis] = useState<CBCTAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock AI analysis steps
  const analysisSteps = [
    'Uploading CBCT scan...',
    'Initializing AI models...',
    'Segmenting anatomical structures...',
    'Measuring bone density...',
    'Calculating bone volume...',
    'Identifying nerve canal...',
    'Analyzing sinus floor...',
    'Determining optimal implant positions...',
    'Calculating success probability...',
    'Generating final report...'
  ];

  const runCBCTAnalysis = async (file?: File) => {
    setIsAnalyzing(true);
    setUploadProgress(0);
    
    // Simulate file upload
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Simulate AI analysis steps
    for (let i = 0; i < analysisSteps.length; i++) {
      setAnalysisStep(analysisSteps[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Generate mock analysis results
    const mockAnalysis: CBCTAnalysis = {
      patientId: "PAT-" + Date.now(),
      scanDate: new Date().toISOString().split('T')[0],
      boneDensity: {
        average: Math.floor(Math.random() * 300) + 500, // 500-800 HU
        regions: {
          anterior: Math.floor(Math.random() * 200) + 600,
          posterior: Math.floor(Math.random() * 200) + 550,
          maxilla: Math.floor(Math.random() * 150) + 550,
          mandible: Math.floor(Math.random() * 200) + 700
        }
      },
      boneVolume: {
        total: Math.floor(Math.random() * 20) + 80, // 80-100%
        available: Math.floor(Math.random() * 15) + 75, // 75-90%
        quality: ['D1', 'D2', 'D3', 'D4'][Math.floor(Math.random() * 4)] as 'D1' | 'D2' | 'D3' | 'D4'
      },
      anatomicalFeatures: {
        sinusFloor: {
          height: Math.floor(Math.random() * 8) + 8, // 8-16mm
          proximity: Math.random() > 0.7 ? 'high-risk' : Math.random() > 0.4 ? 'caution' : 'safe'
        },
        nerveCanal: {
          distance: Math.floor(Math.random() * 8) + 5, // 5-13mm
          visibility: Math.random() > 0.7 ? 'unclear' : Math.random() > 0.4 ? 'partial' : 'clear'
        },
        corticalThickness: Math.round((Math.random() * 2 + 1) * 10) / 10 // 1.0-3.0mm
      },
      implantRecommendations: {
        positions: ['13', '11', '21', '23', '25', '27'].slice(0, Math.floor(Math.random() * 3) + 4),
        sizes: ['4.3x10', '4.3x12', '5.0x10', '5.0x12', '4.3x8', '5.0x8'],
        angulations: Array.from({length: 6}, () => Math.floor(Math.random() * 30) - 15), // -15 to +15 degrees
        riskFactors: [
          'Proximity to sinus floor',
          'Limited bone height',
          'Dense cortical bone'
        ].filter(() => Math.random() > 0.6)
      },
      aiScore: {
        successProbability: Math.floor(Math.random() * 15) + 85, // 85-100%
        riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'moderate' : 'low',
        confidence: Math.floor(Math.random() * 10) + 90 // 90-100%
      }
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    setAnalysisStep('');
    
    toast({
      title: "CBCT Analysis Complete",
      description: `AI a analizat scanul cu ${mockAnalysis.aiScore.confidence}% confidence`,
    });

    onAnalysisComplete(mockAnalysis);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      runCBCTAnalysis(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      runCBCTAnalysis(file);
    }
  };

  const getBoneQualityColor = (quality: string) => {
    switch (quality) {
      case 'D1': return 'text-green-600';
      case 'D2': return 'text-blue-600';
      case 'D3': return 'text-orange-600';
      case 'D4': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'moderate': return 'text-orange-600';
      case 'high': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span>AI-Powered CBCT Analysis</span>
          </CardTitle>
          <CardDescription>
            Upload CBCT scan pentru analiză automată cu AI antrenat pe 3000+ scanuri MedicalCor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-400 bg-blue-50' 
                : isAnalyzing 
                ? 'border-blue-300 bg-blue-25' 
                : 'border-slate-300 hover:border-blue-300'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">AI Analysis în progres</h3>
                  <p className="text-blue-600 mb-4">{analysisStep}</p>
                  <Progress value={uploadProgress} className="mb-2" />
                  <p className="text-sm text-blue-500">Analizez cu modele AI antrenate pe experiența MedicalCor</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <FileImage className="w-16 h-16 text-slate-400 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Upload CBCT Scan</h3>
                  <p className="text-slate-600 mb-4">
                    Drag & drop DICOM files sau click pentru selecție
                  </p>
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select CBCT Files
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".dcm,.dicom,.zip"
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bone Analysis */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="w-5 h-5 text-green-600" />
                <span>Bone Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Bone Density</h4>
                  <p className="text-2xl font-bold text-green-900">{analysis.boneDensity.average} HU</p>
                  <p className="text-sm text-green-600">Average density</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Bone Volume</h4>
                  <p className="text-2xl font-bold text-blue-900">{analysis.boneVolume.available}%</p>
                  <p className="text-sm text-blue-600">Available volume</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Regional Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Anterior:</span>
                    <span className="font-medium">{analysis.boneDensity.regions.anterior} HU</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posterior:</span>
                    <span className="font-medium">{analysis.boneDensity.regions.posterior} HU</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maxilla:</span>
                    <span className="font-medium">{analysis.boneDensity.regions.maxilla} HU</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mandible:</span>
                    <span className="font-medium">{analysis.boneDensity.regions.mandible} HU</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Bone Quality:</span>
                  <Badge className={`${getBoneQualityColor(analysis.boneVolume.quality)} bg-transparent border`}>
                    {analysis.boneVolume.quality}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Anatomical Features */}
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                <span>Anatomical Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-orange-800">Sinus Floor</h4>
                    <p className="text-sm text-orange-600">{analysis.anatomicalFeatures.sinusFloor.height}mm height</p>
                  </div>
                  <Badge className={`${
                    analysis.anatomicalFeatures.sinusFloor.proximity === 'safe' ? 'bg-green-100 text-green-800' :
                    analysis.anatomicalFeatures.sinusFloor.proximity === 'caution' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {analysis.anatomicalFeatures.sinusFloor.proximity}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-purple-800">Nerve Canal</h4>
                    <p className="text-sm text-purple-600">{analysis.anatomicalFeatures.nerveCanal.distance}mm distance</p>
                  </div>
                  <Badge className={`${
                    analysis.anatomicalFeatures.nerveCanal.visibility === 'clear' ? 'bg-green-100 text-green-800' :
                    analysis.anatomicalFeatures.nerveCanal.visibility === 'partial' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {analysis.anatomicalFeatures.nerveCanal.visibility}
                  </Badge>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800">Cortical Thickness</h4>
                  <p className="text-lg font-bold text-blue-900">{analysis.anatomicalFeatures.corticalThickness}mm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="border-2 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-indigo-600" />
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-3">Optimal Implant Positions</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {analysis.implantRecommendations.positions.map((position, index) => (
                    <Badge key={index} variant="outline" className="bg-indigo-50 text-indigo-700">
                      Position {position}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">Recommended Sizes</h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  {analysis.implantRecommendations.sizes.slice(0, 6).map((size, index) => (
                    <div key={index} className="bg-slate-50 p-2 rounded text-center">
                      {size}mm
                    </div>
                  ))}
                </div>
              </div>

              {analysis.implantRecommendations.riskFactors.length > 0 && (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Risk Factors:</strong>
                    <ul className="mt-1 space-y-1">
                      {analysis.implantRecommendations.riskFactors.map((risk, index) => (
                        <li key={index} className="text-sm">• {risk}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* AI Score */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span>AI Success Prediction</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{analysis.aiScore.successProbability}%</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Success Probability</h3>
                <p className="text-slate-600">Based on MedicalCor's 1000+ All-on-X procedures</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-800">Risk Level</h4>
                  <p className={`text-lg font-bold ${getRiskColor(analysis.aiScore.riskLevel)}`}>
                    {analysis.aiScore.riskLevel.toUpperCase()}
                  </p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold text-slate-800">AI Confidence</h4>
                  <p className="text-lg font-bold text-indigo-600">{analysis.aiScore.confidence}%</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  3D View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CBCTAnalyzer;
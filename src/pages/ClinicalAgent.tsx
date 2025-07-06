import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mic, 
  MicOff, 
  Brain, 
  FileText, 
  User, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Stethoscope,
  Search,
  Download,
  Upload,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import useVoiceInterface from "@/hooks/useVoiceInterface";

interface DiagnosticSession {
  id: string;
  patientName: string;
  symptoms: string[];
  transcript: string;
  aiSuggestions: string[];
  diagnosis: string;
  timestamp: Date;
  confidence: number;
  status: 'active' | 'completed' | 'review';
}

interface VitalSigns {
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  oxygenSaturation: string;
}

const ClinicalAgent = () => {
  const [activeSession, setActiveSession] = useState<DiagnosticSession | null>(null);
  const [sessions, setSessions] = useState<DiagnosticSession[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    bloodPressure: '',
    heartRate: '',
    temperature: '',
    oxygenSaturation: ''
  });
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [voiceSettings, setVoiceSettings] = useState({
    autoTranscribe: true,
    language: 'ro' as 'ro' | 'en',
    sensitivity: 0.8
  });

  // Voice interface configuration
  const voiceConfig = {
    language: voiceSettings.language,
    elevenLabsApiKey: undefined,
    openAIApiKey: undefined,
    voiceId: 'pNInz6obpgDQGcFmaJgB',
    hotwordEnabled: true,
    micSensitivity: voiceSettings.sensitivity
  };

  const {
    isListening,
    isSpeaking,
    transcript,
    error: voiceError,
    startListening,
    stopListening,
    speak
  } = useVoiceInterface(voiceConfig);

  // Handle voice transcription
  useEffect(() => {
    if (transcript && voiceSettings.autoTranscribe && activeSession) {
      setActiveSession(prev => prev ? {
        ...prev,
        transcript: prev.transcript + ' ' + transcript
      } : null);
    }
  }, [transcript, voiceSettings.autoTranscribe, activeSession]);

  // Mock AI diagnostic suggestions based on symptoms
  const generateAISuggestions = (symptoms: string[]): string[] => {
    const suggestions = [];
    
    if (symptoms.some(s => s.toLowerCase().includes('durere') || s.toLowerCase().includes('pain'))) {
      suggestions.push('Evaluare pentru inflamație locală');
      suggestions.push('Verificare sensibilitate dentară');
    }
    
    if (symptoms.some(s => s.toLowerCase().includes('sângerare') || s.toLowerCase().includes('bleeding'))) {
      suggestions.push('Investigare boală parodontală');
      suggestions.push('Evaluare status coagulare');
    }
    
    if (symptoms.some(s => s.toLowerCase().includes('umflătură') || s.toLowerCase().includes('swelling'))) {
      suggestions.push('Excludere infecție acută');
      suggestions.push('Radiografie panoramică recomandată');
    }

    suggestions.push('Consultare specialist dacă persistă');
    suggestions.push('Monitorizare evoluție 24-48h');
    
    return suggestions.slice(0, 4);
  };

  const startDiagnosticSession = () => {
    if (!patientName.trim()) return;
    
    const newSession: DiagnosticSession = {
      id: Date.now().toString(),
      patientName,
      symptoms: symptoms.split(',').map(s => s.trim()).filter(Boolean),
      transcript: '',
      aiSuggestions: [],
      diagnosis: '',
      timestamp: new Date(),
      confidence: 0,
      status: 'active'
    };
    
    setActiveSession(newSession);
    if (voiceSettings.autoTranscribe) {
      setIsRecording(true);
      startListening();
      speak(`Sesiune de diagnostic începută pentru pacientul ${patientName}. Vă ascult acum.`);
    }
  };

  const completeDiagnosticSession = () => {
    if (!activeSession) return;
    
    const suggestions = generateAISuggestions(activeSession.symptoms);
    const updatedSession = {
      ...activeSession,
      aiSuggestions: suggestions,
      status: 'completed' as const,
      confidence: Math.random() * 0.3 + 0.7 // Mock confidence 70-100%
    };
    
    setSessions(prev => [updatedSession, ...prev]);
    setActiveSession(null);
    setIsRecording(false);
    stopListening();
    
    speak('Sesiunea de diagnostic a fost finalizată. Sugestiile AI sunt disponibile.');
  };

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      stopListening();
    } else {
      setIsRecording(true);
      await startListening();
    }
  };

  const mockPatients = [
    'Ion Popescu', 'Maria Ionescu', 'Alexandru Dumitrescu', 'Ana Gheorghe', 'Mihai Popa'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Clinical Agent</h1>
                <p className="text-slate-600">AI Diagnostics + Transcriere Vocală</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Activity className="w-3 h-3 mr-1" />
                LIVE System
              </Badge>
              <Badge variant="outline" className={isRecording ? 'border-red-300 bg-red-50' : 'border-slate-300'}>
                {isRecording ? <Mic className="w-3 h-3 mr-1" /> : <MicOff className="w-3 h-3 mr-1" />}
                {isRecording ? 'Recording' : 'Standby'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="diagnostic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="diagnostic">Diagnostic Session</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
            <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
            <TabsTrigger value="settings">Voice Settings</TabsTrigger>
          </TabsList>

          {/* Voice Error Display */}
          {voiceError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-700">
                Voice Error: {voiceError}
              </AlertDescription>
            </Alert>
          )}

          <TabsContent value="diagnostic" className="space-y-6">
            {!activeSession ? (
              /* New Session Setup */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Patient Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Patient Name</label>
                      <Input
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter patient name..."
                        list="patients"
                      />
                      <datalist id="patients">
                        {mockPatients.map(name => (
                          <option key={name} value={name} />
                        ))}
                      </datalist>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Initial Symptoms</label>
                      <Textarea
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="Enter initial symptoms (comma separated)..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Blood Pressure</label>
                        <Input
                          value={vitalSigns.bloodPressure}
                          onChange={(e) => setVitalSigns(prev => ({...prev, bloodPressure: e.target.value}))}
                          placeholder="120/80"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Heart Rate</label>
                        <Input
                          value={vitalSigns.heartRate}
                          onChange={(e) => setVitalSigns(prev => ({...prev, heartRate: e.target.value}))}
                          placeholder="72 bpm"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={startDiagnosticSession}
                      disabled={!patientName.trim()}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Start Diagnostic Session
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Clinical Assistant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Brain className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-slate-800 mb-2">AI Ready for Consultation</h3>
                        <p className="text-slate-600 text-sm">
                          Start a diagnostic session to begin AI-powered clinical analysis with voice transcription.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-slate-800 mb-2">AI Capabilities:</h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• Real-time voice transcription</li>
                          <li>• Symptom pattern analysis</li>
                          <li>• Diagnostic suggestions</li>
                          <li>• Clinical protocol recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Active Session Interface */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <FileText className="w-5 h-5" />
                          <span>Live Transcription</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleRecording}
                            className={isRecording ? 'border-red-300 bg-red-50' : ''}
                          >
                            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </Button>
                          {isSpeaking && (
                            <Badge variant="secondary" className="animate-pulse">
                              <Volume2 className="w-3 h-3 mr-1" />
                              AI Speaking
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardDescription>
                        Patient: {activeSession.patientName} • {activeSession.timestamp.toLocaleTimeString('ro-RO')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-50 p-4 rounded-lg min-h-[200px] max-h-[400px] overflow-y-auto">
                        <p className="text-slate-700 whitespace-pre-wrap">
                          {activeSession.transcript || 'Waiting for voice input...'}
                        </p>
                        {isListening && (
                          <div className="flex items-center space-x-2 mt-4 text-sm text-slate-500">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span>Listening...</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>Session Notes</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Add additional clinical notes..."
                        rows={4}
                        className="mb-4"
                      />
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Attach Files
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="w-5 h-5" />
                        <span>AI Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Current Symptoms:</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeSession.symptoms.map((symptom, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-slate-800">AI Recommendations:</h4>
                        <div className="text-sm text-slate-600 space-y-1">
                          <p>• Continue detailed examination</p>
                          <p>• Consider radiographic imaging</p>
                          <p>• Monitor patient response</p>
                          <p>• Document all findings</p>
                        </div>
                      </div>

                      <Button
                        onClick={completeDiagnosticSession}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Session
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>Session Timer</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-slate-800 mb-2">
                          {Math.floor((Date.now() - activeSession.timestamp.getTime()) / 60000)}:
                          {String(Math.floor(((Date.now() - activeSession.timestamp.getTime()) % 60000) / 1000)).padStart(2, '0')}
                        </div>
                        <p className="text-sm text-slate-600">Session Duration</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="grid gap-4">
              {sessions.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-slate-600 mb-2">No Sessions Yet</h3>
                    <p className="text-slate-500">Start your first diagnostic session to see history here.</p>
                  </CardContent>
                </Card>
              ) : (
                sessions.map(session => (
                  <Card key={session.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{session.patientName}</CardTitle>
                        <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
                          {session.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {session.timestamp.toLocaleString('ro-RO')} • 
                        Confidence: {Math.round(session.confidence * 100)}%
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-1">Symptoms:</h4>
                          <div className="flex flex-wrap gap-1">
                            {session.symptoms.map((symptom, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-1">AI Suggestions:</h4>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {session.aiSuggestions.map((suggestion, index) => (
                              <li key={index}>• {suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{sessions.length}</p>
                      <p className="text-slate-600 text-sm">Total Sessions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">
                        {sessions.filter(s => s.status === 'completed').length}
                      </p>
                      <p className="text-slate-600 text-sm">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">
                        {sessions.length > 0 ? Math.round(sessions.reduce((acc, s) => acc + s.confidence, 0) / sessions.length * 100) : 0}%
                      </p>
                      <p className="text-slate-600 text-sm">Avg Confidence</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>AI Performance Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">System Status</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">Voice Recognition:</span>
                        <span className="font-medium text-green-600 ml-2">Optimal</span>
                      </div>
                      <div>
                        <span className="text-slate-600">AI Analysis:</span>
                        <span className="font-medium text-green-600 ml-2">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Voice Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Auto-transcribe sessions</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setVoiceSettings(prev => ({...prev, autoTranscribe: !prev.autoTranscribe}))}
                    className={voiceSettings.autoTranscribe ? 'bg-green-50 border-green-300' : ''}
                  >
                    {voiceSettings.autoTranscribe ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <select
                    value={voiceSettings.language}
                    onChange={(e) => setVoiceSettings(prev => ({...prev, language: e.target.value as 'ro' | 'en'}))}
                    className="w-full p-2 border border-slate-300 rounded-md"
                  >
                    <option value="ro">Română</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Microphone Sensitivity: {Math.round(voiceSettings.sensitivity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={voiceSettings.sensitivity}
                    onChange={(e) => setVoiceSettings(prev => ({...prev, sensitivity: parseFloat(e.target.value)}))}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClinicalAgent;
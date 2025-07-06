import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Mic, 
  Brain, 
  Volume2, 
  Settings,
  Zap,
  Eye,
  Target,
  Activity,
  FileText,
  Calendar,
  Search,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  MapPin
} from "lucide-react";

interface VoiceCommand {
  id: string;
  command: string;
  category: 'surgical' | 'patient' | 'system' | 'emergency';
  confidence: number;
  timestamp: string;
  response: string;
  executed: boolean;
}

interface AdvancedVoiceCommandsProps {
  isActive: boolean;
  patientContext?: string;
  surgicalStep?: string;
  onCommandExecuted: (command: VoiceCommand) => void;
}

const AdvancedVoiceCommands: React.FC<AdvancedVoiceCommandsProps> = ({
  isActive,
  patientContext,
  surgicalStep,
  onCommandExecuted
}) => {
  const [isListening, setIsListening] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [recentCommands, setRecentCommands] = useState<VoiceCommand[]>([]);
  const [commandCategories, setCommandCategories] = useState({
    surgical: true,
    patient: true,
    system: true,
    emergency: true
  });
  const { toast } = useToast();

  // Predefined command patterns for Romanian medical context
  const commandPatterns = {
    surgical: [
      { pattern: /torque la (\d+)/i, action: 'set_torque', param: 'value' },
      { pattern: /următorul pas|next step/i, action: 'next_surgical_step' },
      { pattern: /oprește drilling|stop drilling/i, action: 'stop_drilling' },
      { pattern: /verifică paralelism|check parallelism/i, action: 'check_parallelism' },
      { pattern: /pozitia (\d+)|position (\d+)/i, action: 'select_position', param: 'position' },
      { pattern: /adâncime (\d+\.?\d*) mm/i, action: 'set_depth', param: 'depth' },
      { pattern: /unghi (\d+) grade/i, action: 'set_angle', param: 'angle' },
      { pattern: /irrigare (on|off|pornit|oprit)/i, action: 'toggle_irrigation', param: 'state' }
    ],
    patient: [
      { pattern: /caută pacientul (.+)/i, action: 'search_patient', param: 'name' },
      { pattern: /istoricul pacientului/i, action: 'show_patient_history' },
      { pattern: /programare pentru (.+)/i, action: 'schedule_appointment', param: 'patient' },
      { pattern: /alergii pacient/i, action: 'show_allergies' },
      { pattern: /tratamente anterioare/i, action: 'show_previous_treatments' },
      { pattern: /vârsta pacientului/i, action: 'show_patient_age' }
    ],
    system: [
      { pattern: /salvează planul|save plan/i, action: 'save_surgical_plan' },
      { pattern: /exportă raport|export report/i, action: 'export_report' },
      { pattern: /trimite în laborator|send to lab/i, action: 'send_to_lab' },
      { pattern: /sincronizare|sync/i, action: 'sync_data' },
      { pattern: /backup cazul|backup case/i, action: 'backup_case' },
      { pattern: /notificare echipă|notify team/i, action: 'notify_team' }
    ],
    emergency: [
      { pattern: /urgență|emergency/i, action: 'emergency_stop' },
      { pattern: /ajutor|help/i, action: 'request_help' },
      { pattern: /sângerare|bleeding/i, action: 'bleeding_protocol' },
      { pattern: /complicație|complication/i, action: 'complication_protocol' },
      { pattern: /oprire imediată|immediate stop/i, action: 'immediate_stop' }
    ]
  };

  // Mock voice recognition simulation
  const simulateVoiceRecognition = () => {
    const sampleCommands = [
      "Torque la 45",
      "Următorul pas",
      "Verifică paralelism",
      "Pozitia 11",
      "Adâncime 12.5 mm",
      "Caută pacientul Maria Popescu",
      "Salvează planul",
      "Trimite în laborator",
      "Istoricul pacientului"
    ];
    
    return sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
  };

  const processVoiceCommand = (command: string): VoiceCommand => {
    const timestamp = new Date().toISOString();
    let matchedCommand: VoiceCommand | null = null;

    // Try to match against patterns
    for (const [category, patterns] of Object.entries(commandPatterns)) {
      for (const pattern of patterns) {
        const match = command.match(pattern.pattern);
        if (match && commandCategories[category as keyof typeof commandCategories]) {
          const extractedParam = (pattern as any).param && match[1] ? match[1] : null;
          
          matchedCommand = {
            id: `cmd_${Date.now()}`,
            command,
            category: category as 'surgical' | 'patient' | 'system' | 'emergency',
            confidence: 0.85 + Math.random() * 0.15, // 85-100%
            timestamp,
            response: generateResponse((pattern as any).action, extractedParam),
            executed: true
          };
          break;
        }
      }
      if (matchedCommand) break;
    }

    // Fallback for unrecognized commands
    if (!matchedCommand) {
      matchedCommand = {
        id: `cmd_${Date.now()}`,
        command,
        category: 'system',
        confidence: 0.3,
        timestamp,
        response: "Comandă necunoscută. Vă rog repetiți sau folosiți o comandă validă.",
        executed: false
      };
    }

    return matchedCommand;
  };

  const generateResponse = (action: string, param?: string | null): string => {
    const responses: Record<string, string> = {
      set_torque: `Torque setat la ${param} Ncm`,
      next_surgical_step: "Trec la următorul pas chirurgical",
      stop_drilling: "Drilling oprit - în siguranță",
      check_parallelism: "Verific paralelismul implanturilor",
      select_position: `Poziția ${param} selectată`,
      set_depth: `Adâncime setată la ${param}mm`,
      set_angle: `Unghi setat la ${param} grade`,
      toggle_irrigation: `Irrigare ${param === 'on' || param === 'pornit' ? 'pornită' : 'oprită'}`,
      search_patient: `Caut pacientul ${param} în baza de date`,
      show_patient_history: "Afișez istoricul medical complet",
      schedule_appointment: `Programez consultație pentru ${param}`,
      show_allergies: "Afișez lista de alergii cunoscute",
      save_surgical_plan: "Plan chirurgical salvat cu succes",
      export_report: "Raport exportat în format PDF",
      send_to_lab: "Trimit cazul în laboratorul MedicalCor",
      sync_data: "Sincronizare completă cu serverul",
      emergency_stop: "OPRIRE DE URGENȚĂ ACTIVATĂ",
      bleeding_protocol: "Protocol de control al sângerării activat"
    };

    return responses[action] || "Comandă executată cu succes";
  };

  const startListening = () => {
    setIsListening(true);
    setCurrentCommand('');

    // Simulate listening process
    setTimeout(() => {
      const command = simulateVoiceRecognition();
      setCurrentCommand(command);
      
      setTimeout(() => {
        const processedCommand = processVoiceCommand(command);
        setRecentCommands(prev => [processedCommand, ...prev.slice(0, 9)]);
        onCommandExecuted(processedCommand);
        
        toast({
          title: "Voice Command Executed",
          description: processedCommand.response,
          variant: processedCommand.executed ? "default" : "destructive"
        });
        
        setIsListening(false);
        setCurrentCommand('');
      }, 1500);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'surgical': return <Target className="w-4 h-4" />;
      case 'patient': return <User className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'emergency': return <AlertTriangle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'surgical': return 'bg-blue-100 text-blue-800';
      case 'patient': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-purple-100 text-purple-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Voice Control Interface */}
      <Card className="border-2 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            <span>Advanced Voice Commands</span>
          </CardTitle>
          <CardDescription>
            Sistem vocal avansat pentru controlul chirurgical - MedicalCor AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Context Display */}
          {(patientContext || surgicalStep) && (
            <div className="bg-indigo-50 p-4 rounded-lg space-y-2">
              {patientContext && (
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span className="text-indigo-800">Patient: {patientContext}</span>
                </div>
              )}
              {surgicalStep && (
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span className="text-indigo-800">Step: {surgicalStep}</span>
                </div>
              )}
            </div>
          )}

          {/* Voice Control Button */}
          <div className="text-center">
            {isListening ? (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                  <Mic className="w-10 h-10 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800">Listening...</h3>
                  {currentCommand && (
                    <p className="text-red-600 mt-2">"{currentCommand}"</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Button 
                  onClick={startListening}
                  disabled={!isActive}
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Activate Voice Command
                </Button>
                {!isActive && (
                  <p className="text-sm text-slate-500">
                    Voice commands are available during active surgery
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Category Filters */}
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(commandCategories).map(([category, enabled]) => (
              <Button
                key={category}
                variant={enabled ? "default" : "outline"}
                size="sm"
                onClick={() => setCommandCategories(prev => ({
                  ...prev,
                  [category]: !prev[category as keyof typeof prev]
                }))}
                className="flex items-center space-x-1"
              >
                {getCategoryIcon(category)}
                <span className="capitalize">{category}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Commands */}
      <Card className="border-2 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-slate-600" />
            <span>Recent Voice Commands</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentCommands.length === 0 ? (
            <div className="text-center py-8">
              <Volume2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-500">No voice commands executed yet</p>
              <p className="text-sm text-slate-400">Start using voice commands during surgery</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentCommands.map((cmd) => (
                <div key={cmd.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(cmd.category)}>
                        {getCategoryIcon(cmd.category)}
                        <span className="ml-1 capitalize">{cmd.category}</span>
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {new Date(cmd.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {Math.round(cmd.confidence * 100)}% confidence
                      </Badge>
                      {cmd.executed ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Mic className="w-3 h-3 text-slate-400" />
                      <span className="text-sm font-medium text-slate-800">"{cmd.command}"</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-3 h-3 text-slate-400" />
                      <span className="text-sm text-slate-600">{cmd.response}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Commands Reference */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Available Voice Commands</span>
          </CardTitle>
          <CardDescription>
            Quick reference pentru comenzile vocale disponibile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Surgical Commands</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">"Torque la [număr]"</span>
                  <span className="text-blue-600">Set torque value</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">"Următorul pas"</span>
                  <span className="text-blue-600">Next surgical step</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">"Poziția [număr]"</span>
                  <span className="text-blue-600">Select position</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">"Verifică paralelism"</span>
                  <span className="text-blue-600">Check alignment</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center space-x-2">
                <User className="w-4 h-4 text-green-600" />
                <span>Patient Commands</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">"Caută pacientul [nume]"</span>
                  <span className="text-green-600">Search patient</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">"Istoricul pacientului"</span>
                  <span className="text-green-600">Patient history</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">"Alergii pacient"</span>
                  <span className="text-green-600">Show allergies</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">"Programare pentru [nume]"</span>
                  <span className="text-green-600">Schedule appointment</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedVoiceCommands;
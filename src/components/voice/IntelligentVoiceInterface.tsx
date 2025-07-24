import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Brain, Activity, User, Calendar, FileText, Stethoscope } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface VoiceCommand {
  id: string;
  text: string;
  intent: string;
  entities: Record<string, any>;
  confidence: number;
  timestamp: Date;
}

interface ContextualSuggestion {
  id: string;
  text: string;
  category: 'patient' | 'appointment' | 'treatment' | 'lab' | 'financial';
  priority: number;
}

const IntelligentVoiceInterface: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const [suggestions, setSuggestions] = useState<ContextualSuggestion[]>([]);
  const [currentContext, setCurrentContext] = useState<string>('dashboard');
  
  const recognitionRef = useRef<any | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ro-RO';
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Eroare recunoaștere vocală: ' + event.error);
      };
    }

    synthRef.current = window.speechSynthesis;
    
    // Load contextual suggestions
    loadContextualSuggestions();
  }, []);

  const loadContextualSuggestions = () => {
    const contextualSuggestions: ContextualSuggestion[] = [
      {
        id: '1',
        text: 'Genius, programează consultație pentru Ion Popescu mâine la 14:00',
        category: 'appointment',
        priority: 1
      },
      {
        id: '2', 
        text: 'Genius, caută pacientul Maria Ionescu',
        category: 'patient',
        priority: 2
      },
      {
        id: '3',
        text: 'Genius, adaugă tratament implant pentru pacientul curent',
        category: 'treatment',
        priority: 1
      },
      {
        id: '4',
        text: 'Genius, verifică comenzi laborator pentru săptămâna aceasta',
        category: 'lab',
        priority: 2
      },
      {
        id: '5',
        text: 'Genius, generează raport financiar pentru luna curentă',
        category: 'financial',
        priority: 3
      }
    ];
    
    setSuggestions(contextualSuggestions);
  };

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    
    try {
      // Extract intent and entities from the command
      const processedCommand = await analyzeCommand(command);
      
      // Store command in database
      await storeVoiceCommand(processedCommand);
      
      // Execute the command
      await executeCommand(processedCommand);
      
      // Update commands list
      setCommands(prev => [processedCommand, ...prev.slice(0, 4)]);
      
    } catch (error) {
      console.error('Error processing voice command:', error);
      toast.error('Eroare procesare comandă vocală');
    } finally {
      setIsProcessing(false);
      setTranscript('');
    }
  };

  const analyzeCommand = async (command: string): Promise<VoiceCommand> => {
    // Simple intent recognition - in production, use OpenAI or other NLP service
    let intent = 'unknown';
    const entities: Record<string, any> = {};
    
    if (command.toLowerCase().includes('programează') || command.toLowerCase().includes('consultație')) {
      intent = 'schedule_appointment';
      // Extract patient name, date, time
      const nameMatch = command.match(/pentru\s+([A-Za-z\s]+?)(?:\s+mâine|\s+pe|\s+la|\s*$)/i);
      if (nameMatch) entities.patientName = nameMatch[1].trim();
      
      const timeMatch = command.match(/la\s+(\d{1,2}):?(\d{0,2})/i);
      if (timeMatch) entities.time = `${timeMatch[1]}:${timeMatch[2] || '00'}`;
    } 
    else if (command.toLowerCase().includes('caută') || command.toLowerCase().includes('pacient')) {
      intent = 'search_patient';
      const nameMatch = command.match(/pacientul?\s+([A-Za-z\s]+)/i);
      if (nameMatch) entities.patientName = nameMatch[1].trim();
    }
    else if (command.toLowerCase().includes('adaugă') && command.toLowerCase().includes('tratament')) {
      intent = 'add_treatment';
      const treatmentMatch = command.match(/tratament\s+([A-Za-z\s]+?)(?:\s+pentru|\s*$)/i);
      if (treatmentMatch) entities.treatmentType = treatmentMatch[1].trim();
    }
    else if (command.toLowerCase().includes('laborator') || command.toLowerCase().includes('comenzi')) {
      intent = 'check_lab_orders';
    }
    else if (command.toLowerCase().includes('raport') || command.toLowerCase().includes('financiar')) {
      intent = 'generate_financial_report';
    }

    return {
      id: Date.now().toString(),
      text: command,
      intent,
      entities,
      confidence: 0.85, // Mock confidence score
      timestamp: new Date()
    };
  };

  const storeVoiceCommand = async (command: VoiceCommand) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('voice_commands').insert({
          user_id: user.id,
          command_text: command.text,
          command_type: command.intent,
          execution_result: { entities: command.entities },
          confidence_score: command.confidence
        });
      }
    } catch (error) {
      console.error('Error storing voice command:', error);
    }
  };

  const executeCommand = async (command: VoiceCommand) => {
    let response = '';
    
    switch (command.intent) {
      case 'schedule_appointment':
        response = `Programez consultația pentru ${command.entities.patientName || 'pacient'} ${command.entities.time ? 'la ' + command.entities.time : ''}`;
        // TODO: Integrate with appointment booking system
        break;
        
      case 'search_patient':
        response = `Caut pacientul ${command.entities.patientName || 'specificat'}`;
        // TODO: Integrate with patient search
        break;
        
      case 'add_treatment':
        response = `Adaug tratamentul ${command.entities.treatmentType || 'specificat'} în plan`;
        // TODO: Integrate with treatment planning
        break;
        
      case 'check_lab_orders':
        response = 'Verific comenzile de laborator în curs';
        // TODO: Integrate with lab management
        break;
        
      case 'generate_financial_report':
        response = 'Generez raportul financiar solicitat';
        // TODO: Integrate with financial reporting
        break;
        
      default:
        response = 'Nu am înțeles comanda. Vă rog să repetați.';
    }
    
    // Speak the response
    speakResponse(response);
    toast.success(response);
  };

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ro-RO';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
      toast.info('🎤 Ascult comenzile vocale...');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
      toast.info('⏹️ Opresc ascultarea');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'patient': return <User className="w-4 h-4" />;
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'treatment': return <Stethoscope className="w-4 h-4" />;
      case 'lab': return <Activity className="w-4 h-4" />;
      case 'financial': return <FileText className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-6 h-6 text-primary" />
          <span>GENIUS - Asistent Vocal Inteligent</span>
          <Badge variant={isListening ? "default" : "secondary"} className="ml-auto">
            {isListening ? 'Activ' : 'Inactiv'}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Voice Control */}
        <div className="flex justify-center">
          <Button
            onClick={isListening ? stopListening : startListening}
            variant={isListening ? "destructive" : "default"}
            size="lg"
            className="w-full max-w-md"
            disabled={isProcessing}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                Oprește Ascultarea
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Începe Ascultarea
              </>
            )}
          </Button>
        </div>

        {/* Current Transcript */}
        {transcript && (
          <div className="p-4 bg-blue-50 rounded-lg border">
            <div className="text-sm font-medium text-blue-800 mb-1">Comanda detectată:</div>
            <div className="text-blue-900">{transcript}</div>
          </div>
        )}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center justify-center space-x-2 text-primary">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span>Procesez comanda...</span>
          </div>
        )}

        {/* Recent Commands */}
        {commands.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">Comenzi Recente</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {commands.map((command) => (
                <div key={command.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-sm">
                  <Badge variant="outline" className="text-xs">
                    {command.intent.replace('_', ' ')}
                  </Badge>
                  <span className="flex-1 truncate">{command.text}</span>
                  <span className="text-xs text-gray-500">
                    {Math.round(command.confidence * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contextual Suggestions */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-700">Comenzi Sugerate</h4>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.slice(0, 3).map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => {
                  setTranscript(suggestion.text);
                  processVoiceCommand(suggestion.text);
                }}
                className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:border-blue-300 transition-all text-left"
              >
                {getCategoryIcon(suggestion.category)}
                <span className="flex-1 text-sm">{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Commands Help */}
        <div className="text-xs text-gray-600 space-y-1 p-3 bg-gray-50 rounded">
          <div className="font-medium">Exemple de comenzi vocale:</div>
          <div>• "Genius, programează consultație pentru [Nume] mâine la [oră]"</div>
          <div>• "Genius, caută pacientul [Nume]"</div>
          <div>• "Genius, adaugă tratament [tip] pentru pacientul curent"</div>
          <div>• "Genius, verifică comenzi laborator"</div>
          <div>• "Genius, generează raport financiar"</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligentVoiceInterface;
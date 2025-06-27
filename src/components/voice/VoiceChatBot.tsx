
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Volume2, VolumeX, Phone } from "lucide-react";
import useVoiceInterface from "@/hooks/useVoiceInterface";
import { ChatBotEngine } from "@/components/chat/ChatBotLogic";

interface VoiceChatBotProps {
  elevenLabsApiKey?: string;
  openAIApiKey?: string;
  language?: 'ro' | 'en';
  autoSpeak?: boolean;
}

const VoiceChatBot: React.FC<VoiceChatBotProps> = ({
  elevenLabsApiKey,
  openAIApiKey,
  language = 'ro',
  autoSpeak = true
}) => {
  const [isActive, setIsActive] = useState(false);
  const [chatEngine] = useState(new ChatBotEngine());
  const [conversation, setConversation] = useState<Array<{
    type: 'user' | 'bot';
    text: string;
    timestamp: Date;
  }>>([]);

  const voiceConfig = {
    language,
    elevenLabsApiKey,
    openAIApiKey,
    voiceId: language === 'ro' ? 'pNInz6obpgDQGcFmaJgB' : 'EXAVITQu4vr4xnSDxMaL',
    hotwordEnabled: true,
    micSensitivity: 0.8
  };

  const {
    isListening,
    isSpeaking,
    transcript,
    error,
    isHotwordActive,
    startListening,
    stopListening,
    speak,
    detectHotword,
    handleVoiceCommand
  } = useVoiceInterface(voiceConfig);

  // Process voice commands and generate responses
  useEffect(() => {
    if (transcript && isActive) {
      // Check for hotword activation
      if (!isHotwordActive && detectHotword(transcript)) {
        setIsActive(true);
        return;
      }

      // Process the voice input
      const userMessage = {
        type: 'user' as const,
        text: transcript,
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, userMessage]);

      // Get bot response
      const botResponse = chatEngine.processMessage(transcript);
      const botMessage = {
        type: 'bot' as const,
        text: botResponse,
        timestamp: new Date()
      };
      
      setConversation(prev => [...prev, botMessage]);

      // Auto-speak the response
      if (autoSpeak && botResponse) {
        speak(botResponse);
      }
    }
  }, [transcript, isActive, autoSpeak, detectHotword, chatEngine, speak]);

  // Start voice interaction
  const handleStartVoice = async () => {
    setIsActive(true);
    
    const welcomeMessage = language === 'ro' 
      ? 'Bună ziua! Sunt GENIUS, asistentul vocal MedicalCor. Cu ce vă pot ajuta astăzi?'
      : 'Hello! I am GENIUS, MedicalCor voice assistant. How can I help you today?';
    
    await speak(welcomeMessage);
    
    setTimeout(() => {
      startListening();
    }, 1000);
  };

  const handleStopVoice = () => {
    setIsActive(false);
    stopListening();
    speechSynthesis.cancel(); // Stop any ongoing speech
  };

  const getTexts = () => {
    if (language === 'ro') {
      return {
        title: 'GENIUS Assistant Vocal',
        start: 'Începeți conversația',
        stop: 'Opriți conversația',
        listening: 'Ascult...',
        speaking: 'Răspund...',
        inactive: 'Inactiv',
        active: 'Activ'
      };
    }
    return {
      title: 'GENIUS Voice Assistant',
      start: 'Start conversation',
      stop: 'Stop conversation',
      listening: 'Listening...',
      speaking: 'Speaking...',
      inactive: 'Inactive',
      active: 'Active'
    };
  };

  const texts = getTexts();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>{texts.title}</span>
          </CardTitle>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? texts.active : texts.inactive}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Voice Control */}
        <div className="flex justify-center">
          <Button
            onClick={isActive ? handleStopVoice : handleStartVoice}
            variant={isActive ? "destructive" : "default"}
            size="lg"
            className="w-full"
          >
            {isActive ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                {texts.stop}
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                {texts.start}
              </>
            )}
          </Button>
        </div>

        {/* Status Indicators */}
        {isActive && (
          <div className="flex justify-center space-x-4">
            {isListening && (
              <Badge variant="outline" className="animate-pulse">
                <Mic className="w-3 h-3 mr-1" />
                {texts.listening}
              </Badge>
            )}
            {isSpeaking && (
              <Badge variant="outline" className="animate-pulse">
                <Volume2 className="w-3 h-3 mr-1" />
                {texts.speaking}
              </Badge>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        {/* Recent Conversation */}
        {conversation.length > 0 && (
          <div className="max-h-40 overflow-y-auto space-y-2 p-3 bg-slate-50 rounded">
            {conversation.slice(-3).map((msg, index) => (
              <div
                key={index}
                className={`text-sm p-2 rounded ${
                  msg.type === 'user' 
                    ? 'bg-blue-100 text-blue-800 ml-4' 
                    : 'bg-white text-slate-700 mr-4'
                }`}
              >
                <strong>{msg.type === 'user' ? 'Tu:' : 'GENIUS:'}</strong> {msg.text}
              </div>
            ))}
          </div>
        )}

        {/* Voice Commands Help */}
        <div className="text-xs text-slate-600 space-y-1">
          <p><strong>Comenzi vocale:</strong></p>
          <p>• "Genius, programează pacientul..."</p>
          <p>• "Genius, caută în istoric..."</p>
          <p>• "Genius, ce consumabile lipsesc?"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChatBot;

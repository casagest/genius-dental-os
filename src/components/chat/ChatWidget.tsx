import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, User, Bot, Phone, Calendar, Clock, Mic, MicOff, Volume2 } from "lucide-react";
import useVoiceInterface from "@/hooks/useVoiceInterface";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'appointment' | 'contact';
}

interface QuickReply {
  id: string;
  text: string;
  response: string;
  category: 'general' | 'appointment' | 'pricing' | 'emergency';
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bună ziua! Sunt GENIUS, asistentul virtual MedicalCor. Cum vă pot ajuta astăzi? Puteți scrie sau apăsa butonul de microfon pentru a vorbi.',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice interface configuration
  const voiceConfig = {
    language: 'ro' as const,
    elevenLabsApiKey: undefined, // Will be set by user
    openAIApiKey: undefined, // Will be set by user
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Romanian voice
    hotwordEnabled: true,
    micSensitivity: 0.7
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

  // Handle voice input
  useEffect(() => {
    if (transcript && voiceMode) {
      setInputValue(transcript);
      // Auto-send after 2 seconds of no new input
      const timer = setTimeout(() => {
        if (transcript.trim()) {
          handleSendMessage(transcript);
          stopListening();
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [transcript, voiceMode]);

  const quickReplies: QuickReply[] = [
    {
      id: '1',
      text: 'Vreau o programare',
      response: 'Perfect! Pentru a vă programa, am nevoie de câteva informații. Ce tip de consultație doriți?',
      category: 'appointment'
    },
    {
      id: '2',
      text: 'Cât costă o consultație?',
      response: 'Consultația inițială costă 150 RON și include examinarea clinică completă, radiografia panoramică și planul de tratament. Programarea online beneficiază de 20% reducere!',
      category: 'pricing'
    },
    {
      id: '3',
      text: 'Este urgență!',
      response: 'Înțeleg că aveți o urgență dentară. Vă rog să mă contactați imediat la 0740-123-456 sau veniți direct la clinică. Suntem aici pentru dumneavoastră!',
      category: 'emergency'
    },
    {
      id: '4',
      text: 'Informații despre All-on-X',
      response: 'All-on-X este soluția revoluționară pentru înlocuirea completă a dinților. Costurile pornesc de la 12.000 EUR per arcadă, cu garanție 10 ani. Dorești să programezi o consultație gratuită?',
      category: 'general'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('programare') || lowerMessage.includes('program')) {
      return 'Excelent! Pot să vă ajut cu programarea. Aveți disponibile următoarele opțiuni:\n\n📅 Consultație inițială (150 RON)\n🦷 Igienizare dentară (200 RON)\n⚡ Urgență dentară (250 RON)\n\nCe doriți să programați?';
    }
    
    if (lowerMessage.includes('preț') || lowerMessage.includes('cost') || lowerMessage.includes('tarif')) {
      return 'Iată lista noastră de prețuri principale:\n\n💰 Consultație: 150 RON\n🧽 Igienizare: 200 RON\n🦷 Plombă: 300-500 RON\n👑 Coroană: 1200-2500 RON\n🦴 Implant: 3500-5000 RON\n\nPentru o estimare exactă, vă recomand o consultație. Programați online și beneficiați de 20% reducere!';
    }
    
    if (lowerMessage.includes('durere') || lowerMessage.includes('doare') || lowerMessage.includes('urgent')) {
      return '🚨 Înțeleg că aveți dureri dentare. Pentru urgențe:\n\n📞 Sunați: 0740-123-456\n⏰ Program urgențe: 24/7\n📍 Adresa: Bd. Aviatorilor 42, București\n\nPuteți veni direct la clinică sau vă programez în următoarele 2 ore?';
    }
    
    if (lowerMessage.includes('all-on') || lowerMessage.includes('implant') || lowerMessage.includes('proteză')) {
      return '🦷 All-on-X este specialitatea noastră! Beneficii:\n\n✅ Dinți noi în 24h\n✅ Fără proteze mobile\n✅ Garanție 10 ani\n✅ Tehnologie 3D avansată\n\n💰 Preț: 12.000-18.000 EUR/arcadă\n📅 Consultație GRATUITĂ disponibilă!\n\nDorești să te programez pentru evaluare?';
    }
    
    return 'Mulțumesc pentru întrebare! Pentru informații detaliate și personalizate, vă recomand să vorbiți cu unul din medicii noștri specialiști. Pot să vă programez o consultație gratuită?';
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: simulateBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Auto-speak bot response if voice mode is enabled
      if (voiceMode) {
        speak(botResponse.text);
      }
    }, 1500);
  };

  const handleVoiceToggle = async () => {
    if (voiceMode) {
      setVoiceMode(false);
      stopListening();
    } else {
      setVoiceMode(true);
      await speak('Modul vocal activat. Vă ascult acum.');
      setTimeout(() => {
        startListening();
      }, 1000);
    }
  };

  const handleQuickReply = (quickReply: QuickReply) => {
    handleSendMessage(quickReply.text);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency': return 'bg-red-100 text-red-700 border-red-300';
      case 'appointment': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'pricing': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </Button>
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] flex flex-col">
      <Card className="flex-1 shadow-2xl border-2 border-blue-200/50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">GENIUS Assistant</CardTitle>
                <p className="text-blue-100 text-sm">
                  MedicalCor AI • {voiceMode ? 'Mod vocal activ' : 'Online acum'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceToggle}
                className={`text-white hover:bg-white/20 ${voiceMode ? 'bg-white/30' : ''}`}
              >
                {voiceMode ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Voice Status */}
          {voiceMode && (
            <div className="flex items-center justify-center mt-2">
              {isListening && (
                <Badge variant="secondary" className="animate-pulse bg-white/20 text-white">
                  <Mic className="w-3 h-3 mr-1" />
                  Ascult...
                </Badge>
              )}
              {isSpeaking && (
                <Badge variant="secondary" className="animate-pulse bg-white/20 text-white">
                  <Volume2 className="w-3 h-3 mr-1" />
                  Vorbesc...
                </Badge>
              )}
            </div>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Voice Error Display */}
          {voiceError && (
            <div className="px-4 py-2 bg-red-50 text-red-600 text-sm border-b">
              {voiceError}
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border-2 border-blue-200 text-blue-600'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-slate-200 text-slate-800'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-200 text-blue-600 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && (
            <div className="p-4 border-t bg-white">
              <p className="text-sm text-slate-600 mb-3">Întrebări frecvente:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className={`text-xs h-auto py-2 px-3 border-2 hover:scale-105 transition-all ${getCategoryColor(reply.category)}`}
                  >
                    {reply.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={voiceMode ? "Vorbește sau scrie..." : "Scrieți întrebarea dumneavoastră..."}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(inputValue);
                  }
                }}
                className="flex-1 border-2 border-slate-200 focus:border-blue-400"
                disabled={isListening}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping || isListening}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>
                {voiceMode ? 'Mod vocal activ - Apăsați Enter sau vorbiți' : 'Apăsați Enter pentru a trimite'}
              </span>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${voiceMode ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <span>{voiceMode ? 'Vocal 24/7' : 'Online 24/7'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatWidget;

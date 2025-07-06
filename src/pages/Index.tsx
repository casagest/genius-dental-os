import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Clock, Plus, Search, Mic, Settings } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { Link } from "react-router-dom";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import AIInsights from "@/components/dashboard/AIInsights";
import ChatWidget from "@/components/chat/ChatWidget";
import VoiceChatBot from "@/components/voice/VoiceChatBot";
import VoiceSettings from "@/components/voice/VoiceSettings";

const Index = () => {
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [voiceSettings, setVoiceSettings] = useState({
    elevenLabsApiKey: '',
    openAIApiKey: '',
    voiceId: 'pNInz6obpgDQGcFmaJgB',
    language: 'ro' as const,
    hotwordEnabled: true,
    micSensitivity: 0.7
  });

  const handleVoiceSettingsSave = (settings: any) => {
    setVoiceSettings(settings);
    setShowVoiceSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            MedicalCor GENIUS v1.0 - AI Operating System cu Interfață Vocală
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent leading-tight">
            România's Most Advanced
            <br />
            <span className="text-slate-800">Dental Intelligence</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ecosistem AI complet pentru clinică și laborator - automatizează, optimizează, crește profitabilitatea cu 120%
          </p>
          
          {/* Voice Interface Controls */}
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              onClick={() => setShowVoiceSettings(true)}
              variant="outline"
              className="bg-white/80 hover:bg-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Configurare Voce
            </Button>
            <Badge variant="secondary" className="px-4 py-2">
              <Mic className="w-4 h-4 mr-2" />
              Interfață Vocală Activă
            </Badge>
          </div>
        </div>

        {/* Voice Settings Modal */}
        {showVoiceSettings && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Configurare Interfață Vocală</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVoiceSettings(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="p-4">
                <VoiceSettings onSettingsSave={handleVoiceSettingsSave} />
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <StatsGrid />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar & Appointments */}
          <div className="lg:col-span-2 space-y-6">
          <div className="text-center space-y-4">
            <p className="text-slate-600">Calendarul avansat de programări este disponibil în secțiunea dedicată.</p>
            <div className="flex justify-center space-x-4">
              <Link to="/appointments">
                <Button className="space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Calendarul Programări</span>
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <MessageSquare className="w-4 h-4" />
                  <span>Dashboard Medical</span>
                </Button>
              </Link>
              <Link to="/integrations">
                <Button variant="outline" className="space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Integrări</span>
                </Button>
              </Link>
            </div>
          </div>
            <RecentActivity />
          </div>

          {/* Right Column - Quick Actions, AI Insights & Voice Assistant */}
          <div className="space-y-6">
            <QuickActions />
            
            {/* Voice Assistant Widget */}
            <VoiceChatBot
              elevenLabsApiKey={voiceSettings.elevenLabsApiKey}
              openAIApiKey={voiceSettings.openAIApiKey}
              language={voiceSettings.language}
              autoSpeak={true}
            />
            
            <AIInsights />
          </div>
        </div>

        {/* AI Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <ModuleCard
            title="All-on-X Hub"
            description="State-of-Art Full Arch Rehabilitation + AI Analysis"
            status="LIVE"
            progress={100}
            icon={<Calendar className="w-6 h-6" />}
            color="bg-indigo-500"
            link="/allonx"
          />
          <ModuleCard
            title="GENIUS Hub"
            description="Scheduling 24/7 + Chatbot AI + Interfață Vocală"
            status="LIVE"
            progress={100}
            icon={<Mic className="w-6 h-6" />}
            color="bg-green-500"
          />
          <ModuleCard
            title="LabSync"
            description="Exocad ↔ Medit ↔ ERP + Comenzi Vocale"
            status="LIVE"
            progress={100}
            icon={<Clock className="w-6 h-6" />}
            color="bg-blue-500"
            link="/labsync"
          />
          <ModuleCard
            title="InventoryBrain"
            description="Auto-reorder + QR Scan + Voice Control"
            status="LIVE"
            progress={100}
            icon={<Search className="w-6 h-6" />}
            color="bg-orange-500"
            link="/inventory"
          />
          <ModuleCard
            title="Clinical Agent"
            description="AI Diagnostics + Transcriere Vocală"
            status="LIVE"
            progress={100}
            icon={<MessageSquare className="w-6 h-6" />}
            color="bg-purple-500"
            link="/clinical"
          />
          <ModuleCard
            title="AI Marketing"
            description="Lead Scoring + Campaigns + Voice Ads"
            status="LIVE"
            progress={100}
            icon={<MessageSquare className="w-6 h-6" />}
            color="bg-indigo-500"
            link="/marketing"
          />
          <ModuleCard
            title="CFO Dashboard"
            description="Analytics + ANAF Sync + Rapoarte Vocale"
            status="ROADMAP"
            progress={0}
            icon={<Plus className="w-6 h-6" />}
            color="bg-slate-500"
          />
        </div>
      </main>

      {/* Chat Widget - Available globally with voice */}
      <ChatWidget />
    </div>
  );
};

interface ModuleCardProps {
  title: string;
  description: string;
  status: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
  link?: string;
}

const ModuleCard = ({ title, description, status, progress, icon, color, link }: ModuleCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-green-100 text-green-800 border-green-200';
      case 'DEVELOPMENT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PLANNING': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CONCEPT': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${color} text-white`}>
            {icon}
          </div>
          <Badge className={`text-xs font-medium border ${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold text-slate-800">{title}</CardTitle>
        <CardDescription className="text-sm text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-semibold text-slate-800">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${color}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors"
            onClick={() => {
              if (link && progress === 100) {
                window.location.href = link;
              }
            }}
          >
            {progress === 100 ? 'Access Module' : progress > 0 ? 'View Progress' : 'Learn More'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Clock, Plus, Search, Mic, Settings, DollarSign } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { Link } from "react-router-dom";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import AIInsights from "@/components/dashboard/AIInsights";
import ChatWidget from "@/components/chat/ChatWidget";
import VoiceChatBot from "@/components/voice/VoiceChatBot";
import VoiceSettings from "@/components/voice/VoiceSettings";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const { t } = useLanguage();
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
      
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            {t('home.tagline')}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent leading-tight px-4">
            <span className="block">{t('home.title1')}</span>
            <span className="block text-slate-800">{t('home.title2')}</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4">
            {t('home.description')}
          </p>
          
          {/* Voice Interface Controls */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4">
            <Button
              onClick={() => setShowVoiceSettings(true)}
              variant="outline"
              className="bg-white/80 hover:bg-white w-full sm:w-auto"
            >
              <Settings className="w-4 h-4 mr-2" />
              {t('home.voiceConfig')}
            </Button>
            <Badge variant="secondary" className="px-4 py-2 w-full sm:w-auto justify-center">
              <Mic className="w-4 h-4 mr-2" />
              {t('home.voiceActive')}
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
            <p className="text-slate-600">{t('home.calendarSection')}</p>
            <div className="flex justify-center space-x-4">
              <Link to="/appointments">
                <Button className="space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{t('home.appointmentCalendar')}</span>
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('home.medicalDashboard')}</span>
                </Button>
              </Link>
              <Link to="/integrations">
                <Button variant="outline" className="space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>{t('home.integrations')}</span>
                </Button>
              </Link>
              <Link to="/istoma-integration">
                <Button className="space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  <MessageSquare className="w-4 h-4" />
                  <span>iStoma Integration</span>
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
            title={t('modules.allonx')}
            description={t('modules.allonxDesc')}
            status={t('status.live')}
            progress={100}
            icon={<Calendar className="w-6 h-6" />}
            color="bg-indigo-500"
            link="/allonx"
          />
          <ModuleCard
            title={t('modules.genius')}
            description={t('modules.geniusDesc')}
            status={t('status.live')}
            progress={100}
            icon={<Mic className="w-6 h-6" />}
            color="bg-green-500"
          />
          <ModuleCard
            title={t('modules.labsync')}
            description={t('modules.labsyncDesc')}
            status={t('status.live')}
            progress={100}
            icon={<Clock className="w-6 h-6" />}
            color="bg-blue-500"
            link="/labsync"
          />
          <ModuleCard
            title={t('modules.inventory')}
            description={t('modules.inventoryDesc')}
            status={t('status.live')}
            progress={100}
            icon={<Search className="w-6 h-6" />}
            color="bg-orange-500"
            link="/inventory"
          />
          <ModuleCard
            title={t('modules.clinical')}
            description={t('modules.clinicalDesc')}
            status={t('status.live')}
            progress={100}
            icon={<MessageSquare className="w-6 h-6" />}
            color="bg-purple-500"
            link="/clinical"
          />
          <ModuleCard
            title={t('modules.marketing')}
            description={t('modules.marketingDesc')}
            status={t('status.live')}
            progress={100}
            icon={<MessageSquare className="w-6 h-6" />}
            color="bg-indigo-500"
            link="/marketing"
          />
          <ModuleCard
            title={t('modules.cfo')}
            description={t('modules.cfoDesc')}
            status={t('status.live')}
            progress={100}
            icon={<DollarSign className="w-6 h-6" />}
            color="bg-emerald-500"
            link="/cfo"
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
  const { t } = useLanguage();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case t('status.live'): return 'bg-green-100 text-green-800 border-green-200';
      case t('status.development'): return 'bg-blue-100 text-blue-800 border-blue-200';
      case t('status.planning'): return 'bg-orange-100 text-orange-800 border-orange-200';
      case t('status.concept'): return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white">
      <CardHeader className="pb-3 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 sm:p-3 rounded-xl ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <Badge className={`text-xs font-medium border px-2 py-1 sm:px-3 sm:py-1.5 ${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
        <CardTitle className="text-base sm:text-lg font-bold text-slate-800 leading-tight">{title}</CardTitle>
        <CardDescription className="text-xs sm:text-sm text-slate-600 line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-600">{t('status.progress')}</span>
            <span className="font-semibold text-slate-800">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-700 ${color} shadow-sm`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-all duration-300 text-xs sm:text-sm py-2 sm:py-3"
            onClick={() => {
              if (link && progress === 100) {
                window.location.href = link;
              }
            }}
          >
            {progress === 100 ? t('status.accessModule') : progress > 0 ? t('status.viewProgress') : t('status.learnMore')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;

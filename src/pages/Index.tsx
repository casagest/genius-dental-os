import React, { useState } from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import AIInsights from "@/components/dashboard/AIInsights";
import ChatWidget from "@/components/chat/ChatWidget";
import VoiceChatBot from "@/components/voice/VoiceChatBot";
import HeroSection from "@/components/dashboard/HeroSection";
import VoiceSettingsModal from "@/components/dashboard/VoiceSettingsModal";
import NavigationSection from "@/components/dashboard/NavigationSection";
import AIModulesGrid from "@/components/dashboard/AIModulesGrid";

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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* 🌌 Quantum Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-accent rounded-full blur-3xl animate-float animate-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-secondary rounded-full blur-3xl animate-rotate-slow"></div>
      </div>

      <DashboardHeader />
      
      <main className="relative container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 lg:space-y-12">
        <HeroSection onVoiceSettingsClick={() => setShowVoiceSettings(true)} />
        
        <VoiceSettingsModal 
          isOpen={showVoiceSettings}
          onClose={() => setShowVoiceSettings(false)}
          onSettingsSave={handleVoiceSettingsSave}
        />

        {/* Stats Overview */}
        <StatsGrid />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <NavigationSection />
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

        <AIModulesGrid />
      </main>

      {/* Chat Widget - Available globally with voice */}
      <ChatWidget />
    </div>
  );
};

export default Index;

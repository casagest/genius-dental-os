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
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* 👋 WELCOME SECTION - Simple & Clear */}
        <div className="medical-card p-8 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <div className="status-indicator status-online mb-6 justify-center">
              <div className="activity-dot"></div>
              <span>Sistem MedicalCor ACTIV</span>
            </div>
            
            <h1 className="heading-primary text-4xl md:text-5xl mb-4">
              🏥 MedicalCor GENIUS 2.0
            </h1>
            <p className="text-large text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sistemul de management pentru clinici stomatologice - simplu, intuitiv și puternic
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowVoiceSettings(true)}
                className="btn-primary touch-target text-lg"
              >
                🎤 Configurează Vocea AI
              </button>
              
              <div className="status-indicator status-online text-lg">
                <div className="activity-dot"></div>
                <span>🧠 AI Pregătit</span>
              </div>
            </div>
          </div>
        </div>
        
        <VoiceSettingsModal 
          isOpen={showVoiceSettings}
          onClose={() => setShowVoiceSettings(false)}
          onSettingsSave={handleVoiceSettingsSave}
        />

        {/* 📊 STATISTICS - Visual & Easy */}
        <div className="animate-slide-up animate-delay-200">
          <StatsGrid />
        </div>

        {/* 🚀 MAIN DASHBOARD */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-slide-up animate-delay-300">
          <div className="xl:col-span-2 space-y-8">
            {/* Navigation Cards */}
            <div className="medical-card p-6">
              <h2 className="heading-secondary mb-6 text-center">🧭 Navigare Rapidă</h2>
              <NavigationSection />
            </div>
            
            {/* Recent Activity */}
            <div className="medical-card p-6">
              <h2 className="heading-secondary mb-6">📋 Activitate Recentă</h2>
              <RecentActivity />
            </div>
          </div>

          {/* 🤖 AI ASSISTANTS COLUMN */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="medical-card p-6">
              <h2 className="heading-secondary mb-6">⚡ Acțiuni Rapide</h2>
              <QuickActions />
            </div>
            
            {/* Voice Assistant */}
            <div className="medical-card p-6">
              <h2 className="heading-secondary mb-6">🎤 Asistent Vocal</h2>
              <VoiceChatBot
                elevenLabsApiKey={voiceSettings.elevenLabsApiKey}
                openAIApiKey={voiceSettings.openAIApiKey}
                language={voiceSettings.language}
                autoSpeak={true}
              />
            </div>
            
            {/* AI Insights */}
            <div className="medical-card p-6">
              <h2 className="heading-secondary mb-6">🧠 Sugestii AI</h2>
              <AIInsights />
            </div>
          </div>
        </div>

        {/* 🎯 ALL MODULES - Clear Grid */}
        <div className="animate-slide-up animate-delay-500">
          <div className="text-center mb-8">
            <h2 className="heading-primary">🔧 Module MedicalCor</h2>
            <p className="text-large text-muted-foreground">
              Toate funcțiile principale într-un singur loc
            </p>
          </div>
          <AIModulesGrid />
        </div>
      </main>

      {/* 💬 Global Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;

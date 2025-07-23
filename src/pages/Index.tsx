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
import { useRole } from "@/contexts/RoleContext";

const Index = () => {
  const { currentRole, getRoleConfig } = useRole();
  const roleConfig = getRoleConfig();
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
        {/* ⚡ DENTAL EXCELLENCE HUB - ROLE PERSONALIZED */}
        <div className={`relative bg-gradient-to-r ${roleConfig.gradientFrom} ${roleConfig.gradientTo} text-white p-12 rounded-2xl shadow-2xl animate-fade-in overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-semibold">Sistem {roleConfig.name} ACTIV</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              🦷 DENTAL OS
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8 text-center font-light opacity-90">
              {roleConfig.description}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-3xl font-bold">847</div>
                <div className="text-white/80">All-on-X Cases</div>
                <div className="text-green-300 text-sm">+23 this month</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-3xl font-bold">96.2%</div>
                <div className="text-white/80">Success Rate</div>
                <div className="text-green-300 text-sm">Industry Leading</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-3xl font-bold">4.8/5</div>
                <div className="text-white/80">Patient Satisfaction</div>
                <div className="text-green-300 text-sm">1,247 reviews</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowVoiceSettings(true)}
                className="bg-white text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                🎤 AI Voice Assistant
              </button>
              
              <div className="flex items-center justify-center bg-green-500/20 px-6 py-4 rounded-xl border border-green-400/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
                <span className="font-semibold">🧠 Neural Network Ready</span>
              </div>
            </div>
          </div>
        </div>
        
        <VoiceSettingsModal 
          isOpen={showVoiceSettings}
          onClose={() => setShowVoiceSettings(false)}
          onSettingsSave={handleVoiceSettingsSave}
        />

        {/* 📊 ROLE-BASED STATISTICS */}
        <div className="animate-slide-up animate-delay-200">
          <StatsGrid />
        </div>

        {/* 🚀 ROLE-BASED QUICK ACTIONS */}
        <div className="animate-slide-up animate-delay-250">
          <QuickActions />
        </div>

        {/* 🚀 CLINICAL EXCELLENCE DASHBOARD */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-slide-up animate-delay-300">
          {/* LEFT: Clinical Operations */}
          <div className="space-y-6">
            {/* Today's Surgery Schedule */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-900">🔬 Today's Operations</h2>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  3 All-on-X Cases
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-blue-900">Popescu Maria - All-on-4 Superior</div>
                      <div className="text-blue-600 text-sm">CBCT Analysis: Complete | Guide Ready: ✅</div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-900 font-bold">09:00</div>
                      <div className="text-green-600 text-sm">Estimated: 2.5h</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-blue-900">Ionescu Dan - All-on-6 Bilateral</div>
                      <div className="text-blue-600 text-sm">Pre-op Complete | Lab Coordination: ✅</div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-900 font-bold">13:30</div>
                      <div className="text-green-600 text-sm">Estimated: 3.5h</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-orange-200 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-orange-900">Georgescu Ana - Immediate Loading</div>
                      <div className="text-orange-600 text-sm">Final Check-up | Prosthetic Delivery</div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-900 font-bold">17:00</div>
                      <div className="text-green-600 text-sm">Follow-up: 45min</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Clinical Actions */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200/50">
              <h3 className="text-xl font-bold text-green-900 mb-4">⚡ Quick Clinical Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg text-sm font-semibold transition-all transform hover:scale-105">
                  📋 New Case Planning
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-sm font-semibold transition-all transform hover:scale-105">
                  🔬 CBCT Analysis
                </button>
                <button className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg text-sm font-semibold transition-all transform hover:scale-105">
                  🦷 Lab Communication
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg text-sm font-semibold transition-all transform hover:scale-105">
                  📊 Treatment Outcome
                </button>
              </div>
            </div>
            
            {/* Recent Patient Activity */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Recent Patient Activity</h3>
              <RecentActivity />
            </div>
          </div>

          {/* RIGHT: AI & Technology Column */}
          <div className="space-y-6">
            {/* AI Voice Assistant */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border-2 border-purple-200/50">
              <h3 className="text-xl font-bold text-purple-900 mb-4">🎤 AI Clinical Assistant</h3>
              <VoiceChatBot
                elevenLabsApiKey={voiceSettings.elevenLabsApiKey}
                openAIApiKey={voiceSettings.openAIApiKey}
                language={voiceSettings.language}
                autoSpeak={true}
              />
            </div>
            
            {/* AI Clinical Insights */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border-2 border-indigo-200/50">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">🧠 AI Clinical Insights</h3>
              <AIInsights />
            </div>
            
            {/* Navigation to Specialized Modules */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🧭 Specialized Modules</h3>
              <NavigationSection />
            </div>
          </div>
        </div>

        {/* 🎯 SPECIALIZED CLINICAL MODULES */}
        <div className="animate-slide-up animate-delay-500">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🔧 Full Arch Rehabilitation Suite
            </h2>
            <p className="text-xl text-muted-foreground mt-2">
              Advanced Clinical Modules for All-on-X Excellence
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

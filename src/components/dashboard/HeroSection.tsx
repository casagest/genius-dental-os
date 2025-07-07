import React from 'react';
import { Settings, Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  onVoiceSettingsClick: () => void;
}

const HeroSection = ({ onVoiceSettingsClick }: HeroSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
      <div className="holographic-border inline-block">
        <div className="holographic-content">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium ai-indicator">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-vital-pulse"></div>
            {t('home.tagline')}
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-holographic leading-tight px-4 animate-scale-in animate-delay-200">
        <span className="block">MedicalCor GENIUS 2.0</span>
        <span className="block text-neural">AI Operating System</span>
      </h1>
      
      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4 animate-slide-up animate-delay-300">
        Cel mai avansat sistem de operare AI pentru clinici stomatologice din lume
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4 animate-slide-up animate-delay-500">
        <button
          onClick={onVoiceSettingsClick}
          className="btn-neural px-6 py-3 w-full sm:w-auto ai-indicator"
        >
          <Settings className="w-4 h-4 mr-2" />
          {t('home.voiceConfig')}
        </button>
        <div className="neuro-card px-4 py-2 w-full sm:w-auto justify-center flex items-center">
          <Mic className="w-4 h-4 mr-2 animate-neural-pulse" />
          <span className="text-quantum font-medium">{t('home.voiceActive')}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
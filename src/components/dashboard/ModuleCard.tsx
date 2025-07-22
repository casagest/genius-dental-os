import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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

  const handleModuleClick = () => {
    if (link && progress === 100) {
      window.location.href = link;
    }
  };

  return (
    <div className="medical-card hover-lift cursor-pointer group" onClick={handleModuleClick}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 bg-medical-gradient rounded-xl flex items-center justify-center shadow-card group-hover:scale-105 transition-transform">
            <div className="text-white text-2xl">
              {icon}
            </div>
          </div>
          <div className="status-indicator status-online">
            <div className="activity-dot"></div>
            <span className="text-sm font-medium">{status}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progres</span>
            <span className="font-semibold text-success">{progress}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-success-gradient rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="pt-2">
            {progress === 100 ? (
              <div className="btn-primary w-full text-center py-3 text-sm font-semibold">
                🚀 Accesează Modulul
              </div>
            ) : (
              <div className="btn-outline w-full text-center py-3 text-sm font-semibold">
                📋 Vezi Progresul
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
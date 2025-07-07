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

export default ModuleCard;
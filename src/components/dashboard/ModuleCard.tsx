import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-success/10 text-success border-success/20';
      case 'BETA': return 'bg-primary/10 text-primary border-primary/20';
      case 'DEVELOPMENT': return 'bg-warning/10 text-warning border-warning/20';
      case 'PLANNING': return 'bg-secondary/10 text-secondary border-secondary/20';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  const handleModuleClick = () => {
    if (link && progress === 100) {
      navigate(link);
    } else if (progress < 100) {
      toast({
        title: "Modul în dezvoltare",
        description: `${title} este ${progress}% complet. Va fi disponibil în curând!`,
        variant: "default",
      });
    } else {
      toast({
        title: "Rută indisponibilă",
        description: "Această funcționalitate va fi disponibilă în curând.",
        variant: "default",
      });
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/80 border border-border/50 hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer" 
         onClick={handleModuleClick}>
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="text-white text-lg">
              {icon}
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
            {status}
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progres</span>
              <span className="font-semibold text-foreground">{progress}%</span>
            </div>
            
            <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="pt-2">
            <div className={`w-full text-center py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
              progress === 100 
                ? 'bg-gradient-primary text-white hover:shadow-md' 
                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}>
              {progress === 100 ? '🚀 Accesează' : `${progress}% Complet`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
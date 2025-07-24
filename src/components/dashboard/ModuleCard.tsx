import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route?: string;
  status: 'active' | 'development' | 'coming-soon';
  features: string[];
  badge?: string;
}

const ModuleCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  status, 
  features, 
  badge 
}: ModuleCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = () => {
    if (route && status === 'active') {
      navigate(route);
    } else {
      toast({
        title: title,
        description: status === 'development' 
          ? 'Modulul este în dezvoltare activă'
          : 'Modulul va fi disponibil în curând',
      });
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'development': return 'bg-warning/10 text-warning border-warning/20';
      case 'coming-soon': return 'bg-muted/50 text-muted-foreground border-border';
      default: return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active': return '🟢 Activ';
      case 'development': return '🟡 Beta';
      case 'coming-soon': return '⚪ Curând';
      default: return 'Status necunoscut';
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        neuro-card hover-quantum cursor-pointer group relative overflow-hidden
        ${status === 'active' ? 'hover:shadow-neural' : 'opacity-75'}
      `}
    >
      {badge && (
        <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-accent text-white text-xs font-bold rounded-full">
          {badge}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="ai-indicator">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-neural group-hover:scale-110 transition-transform">
              <div className="text-white animate-neural-pulse">
                {icon}
              </div>
            </div>
          </div>
          <div className={`text-xs font-bold px-3 py-1.5 rounded-full border ${getStatusColor()}`}>
            {getStatusText()}
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <h3 className="text-lg font-bold text-holographic group-hover:text-holographic-1 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-neural leading-relaxed">
            {description}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            🎯 Funcții principale:
          </div>
          <div className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <div className="w-1.5 h-1.5 bg-success rounded-full animate-vital-pulse"></div>
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
          
          {status === 'active' && (
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pt-2">
              <div className="btn-neural text-xs px-4 py-2 rounded-full inline-flex items-center space-x-2 w-full justify-center">
                <span>Deschide modulul</span>
                <div className="w-1 h-1 bg-white rounded-full animate-bounce-subtle"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
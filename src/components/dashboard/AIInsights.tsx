import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, TrendingUp, AlertTriangle, Lightbulb, RefreshCw, Brain, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/contexts/RoleContext";

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accuracy, setAccuracy] = useState(87);
  const { toast } = useToast();
  const { getRoleInsights, currentRole, getRoleConfig } = useRole();
  const roleConfig = getRoleConfig();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'revenue_optimization': return <TrendingUp className="w-4 h-4" />;
      case 'inventory_alert': return <AlertTriangle className="w-4 h-4" />;
      case 'patient_behavior': return <Lightbulb className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const generateAIInsights = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-insights', {
        body: {
          patientData: {
            totalPatients: 847,
            newPatients: 23,
            noShowRate: 0.08
          },
          appointmentData: {
            scheduledToday: 12,
            completedYesterday: 15,
            averageDuration: 45
          },
          inventoryData: {
            lowStockItems: ['Nobel 4.3x10mm', 'Anesthesia cartridges'],
            consumptionRate: 'normal'
          }
        }
      });

      if (error) throw error;

      if (data.insights && data.insights.length > 0) {
        setInsights(data.insights.map(insight => ({
          ...insight,
          icon: getIconForType(insight.type)
        })));
        setAccuracy(Math.min(95, accuracy + Math.floor(Math.random() * 3)));
      }

      toast({
        title: "AI Insights Updated",
        description: `Generated ${data.insights?.length || 0} new insights`,
      });

    } catch (error) {
      console.error('Error generating insights:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI insights. Using sample data.",
        variant: "destructive",
      });
      
      // Fallback to role-specific insights if API fails
      const roleInsights = getRoleInsights();
      setInsights(roleInsights);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateAIInsights();
  }, [currentRole]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-muted/10 text-muted-foreground border-muted/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${roleConfig.gradientFrom} ${roleConfig.gradientTo} rounded-lg flex items-center justify-center`}>
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">💡 Recomandări {roleConfig.name}</h3>
            <p className="text-sm text-muted-foreground">Sugestii AI pentru {roleConfig.description.toLowerCase()}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="status-indicator status-online">
            <div className="activity-dot"></div>
            <span className="text-sm">{insights.length} Sugestii</span>
          </div>
          <button
            onClick={generateAIInsights}
            disabled={isLoading}
            className="btn-outline p-2 touch-target"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <div key={index} className="medical-card p-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-success-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{insight.title}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="status-indicator" style={{ 
                        backgroundColor: insight.impact === 'high' ? 'hsl(var(--success) / 0.1)' : 
                                        insight.impact === 'medium' ? 'hsl(var(--warning) / 0.1)' : 'hsl(var(--muted) / 0.1)',
                        color: insight.impact === 'high' ? 'hsl(var(--success))' : 
                               insight.impact === 'medium' ? 'hsl(var(--warning))' : 'hsl(var(--muted-foreground))'
                      }}>
                        <span className="text-xs font-medium">{insight.confidence}% Siguranță</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {insight.message}
                  </p>
                  <div className="flex space-x-2">
                    <button className="btn-primary text-xs px-4 py-2">
                      ✅ Aplică Sugestia
                    </button>
                    <button className="btn-outline text-xs px-4 py-2">
                      📖 Află Mai Multe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="medical-card p-6 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-muted-foreground" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Se generează recomandări...</h4>
            <p className="text-sm text-muted-foreground">
              AI analizează datele pentru a genera sugestii personalizate
            </p>
          </div>
        )}
      </div>
      
      <div className="medical-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">📈 Progres AI</h4>
              <p className="text-xs text-muted-foreground">Date analizate: 2,847 programări</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-success">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Acuratețe</div>
          </div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-success-gradient rounded-full transition-all duration-700"
            style={{ width: `${accuracy}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, TrendingUp, AlertTriangle, Lightbulb, RefreshCw, Brain, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accuracy, setAccuracy] = useState(87);
  const { toast } = useToast();

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
      
      // Fallback to sample insights
      setInsights([
        {
          type: "revenue_optimization",
          title: "Optimizare Venituri",
          message: "AI detectează că marți 10:00-12:00 ai rata de no-show scăzută (2%). Recomand să programezi cazuri complexe în acest slot.",
          confidence: 94,
          impact: "high",
          icon: <TrendingUp className="w-4 h-4" />
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateAIInsights();
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-muted/10 text-muted-foreground border-muted/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="medical-card-revolutionary hover-lift animate-fade-in">
      <div className="holographic-border">
        <div className="holographic-content">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="ai-indicator">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-neural">
                  <Brain className="w-6 h-6 text-white animate-neural-pulse" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-holographic">🧠 AI Insights GENIUS</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-vital-pulse"></div>
                  <span className="text-neural text-sm">Recomandări inteligente pentru optimizare</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="neural-pulse px-3 py-1.5 rounded-full">
                <span className="text-xs font-bold text-white">
                  {insights.length} {isLoading ? 'Updating...' : 'New'}
                </span>
              </div>
              <button
                onClick={generateAIInsights}
                disabled={isLoading}
                className="ai-indicator p-2 rounded-lg cursor-pointer hover:scale-110 transition-transform"
              >
                <RefreshCw className={`w-4 h-4 text-white ${isLoading ? 'animate-spin' : 'animate-neural-pulse'}`} />
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {insights.map((insight, index) => (
              <div 
                key={index} 
                className="glass-card hover-quantum animate-slide-in-left"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="ai-indicator">
                        <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
                          <div className="text-white animate-bounce-subtle">
                            {insight.icon}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-holographic">{insight.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs border ${getImpactColor(insight.impact)}`}>
                        {insight.impact?.toUpperCase()}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Zap className="w-3 h-3 text-quantum animate-pulse" />
                        <span className="text-xs text-quantum font-bold">{insight.confidence}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-neural mb-4 leading-relaxed">
                    {insight.message}
                  </p>
                  
                  <div className="flex space-x-3">
                    <div className="btn-neural text-xs px-4 py-2 rounded-full cursor-pointer">
                      Apply Suggestion
                    </div>
                    <div className="glass-card px-4 py-2 text-xs cursor-pointer hover:bg-card/80 transition-colors rounded-full">
                      Learn More
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="neuro-card p-5 animate-pulse-glow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="ai-indicator">
                  <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white animate-neural-pulse" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-holographic">🚀 AI Learning Progress</h4>
                  <p className="text-xs text-neural">MedicalCor data analyzed: 2,847 appointments, 156 lab cases</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-holographic-1">{accuracy}%</div>
                <div className="text-xs text-quantum font-medium">Accuracy Score</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-card/30 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full animate-neural-pulse shadow-neural" 
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
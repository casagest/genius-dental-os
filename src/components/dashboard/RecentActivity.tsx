
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, Calendar, Search } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      type: "ai_insight",
      title: "AI a detectat pattern în no-shows",
      description: "Recomandă SMS reminder cu 2h înainte pentru pacienții sub 30 ani",
      time: "2 min ago",
      icon: <MessageSquare className="w-4 h-4" />,
      color: "text-purple-600 bg-purple-100"
    },
    {
      type: "appointment", 
      title: "Programare nou acceptată",
      description: "Maria Vasile - Implant consultation - 28 Iunie 10:00",
      time: "15 min ago",
      icon: <Calendar className="w-4 h-4" />,
      color: "text-green-600 bg-green-100"
    },
    {
      type: "lab_sync",
      title: "LabSync update",
      description: "Caz #2024-156 Popescu Ana - All-on-6 finalizat în Exocad",
      time: "32 min ago", 
      icon: <Search className="w-4 h-4" />,
      color: "text-blue-600 bg-blue-100"
    },
    {
      type: "system",
      title: "Inventory alert",
      description: "Stock redus: Implant Nobel Replace 4.3x10mm (7 bucăți rămase)",
      time: "1h ago",
      icon: <Clock className="w-4 h-4" />,
      color: "text-orange-600 bg-orange-100"
    }
  ];

  return (
    <div className="holographic-border animate-fade-in">
      <div className="holographic-content">
        <div className="flex items-center space-x-4 mb-6">
          <div className="ai-indicator">
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-neural">
              <Clock className="w-6 h-6 text-white animate-neural-pulse" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-holographic">🔄 Activitate Recentă AI</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-vital-pulse"></div>
              <span className="text-neural text-sm">AI insights și evenimente sistem în timp real</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="glass-card hover-quantum animate-slide-in-left cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start space-x-4 p-4">
                <div className="ai-indicator flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-primary/20 border border-primary/20">
                    <div className="text-primary animate-bounce-subtle">
                      {activity.icon}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-bold text-holographic">{activity.title}</h4>
                    {activity.type === 'ai_insight' && (
                      <div className="neural-pulse px-2 py-0.5 rounded-full">
                        <span className="text-xs font-bold text-white">AI</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-neural mb-2 leading-relaxed">{activity.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground font-mono bg-card/50 px-2 py-1 rounded">
                      {activity.time}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-quantum rounded-full animate-pulse"></div>
                      <span className="text-xs text-quantum font-medium">Live</span>
                    </div>
                  </div>
                </div>
                
                <div className="neural-pulse w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-vital-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;

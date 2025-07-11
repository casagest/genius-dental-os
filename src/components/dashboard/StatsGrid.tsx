
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useRole } from "@/contexts/RoleContext";
import { Button } from "@/components/ui/button";

const StatsGrid = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const { getRoleStats, getRoleConfig } = useRole();
  const stats = getRoleStats();
  const roleConfig = getRoleConfig();

  const handleStatClick = (stat) => {
    // Here you could navigate to detailed views or show drill-down data
    console.log(`Clicked on ${stat.label}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`group hover-quantum cursor-pointer animate-scale-in ${
            index === 0 ? 'neuro-card' : 
            index === 1 ? 'ai-card' : 
            index === 2 ? 'glass-card' : 
            'medical-card-revolutionary'
          }`}
          style={{ animationDelay: `${index * 200}ms` }}
          onClick={() => stat.clickable && handleStatClick(stat)}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="ai-indicator">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-neural group-hover:scale-110 transition-transform">
                  <div className="text-white animate-neural-pulse">
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                stat.changeType === 'positive' 
                  ? 'bg-success/10 text-success border-success/20' 
                  : stat.changeType === 'negative'
                  ? 'bg-destructive/10 text-destructive border-destructive/20'
                  : 'bg-quantum/10 text-quantum border-quantum/20'
              }`}>
                {stat.change}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="text-3xl font-black text-holographic group-hover:text-holographic-1 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-neural">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.context}</div>
              
              {stat.clickable && (
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="btn-neural text-xs px-3 py-1.5 rounded-full inline-flex items-center space-x-2">
                    <span>{stat.actionText}</span>
                    <div className="w-1 h-1 bg-white rounded-full animate-bounce-subtle"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

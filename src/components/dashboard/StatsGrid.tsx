
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Plus, Search, TrendingUp, Users, Wrench, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const StatsGrid = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const stats = [
    {
      label: "Programări Astăzi",
      value: "24",
      change: "+12% vs ieri",
      changeType: "positive",
      icon: <Calendar className="w-5 h-5" />,
      color: "text-blue-600",
      context: "8:30-18:00",
      clickable: true,
      actionText: "Vezi programul"
    },
    {
      label: "Pacienți Noi",
      value: "8",
      change: "+45% vs săpt. trecută",
      changeType: "positive", 
      icon: <Users className="w-5 h-5" />,
      color: "text-green-600",
      context: "Prima consultație",
      clickable: true,
      actionText: "Vezi detalii"
    },
    {
      label: "Lucrări Laborator",
      value: "15",
      change: "92% livrate la timp",
      changeType: "neutral",
      icon: <Wrench className="w-5 h-5" />,
      color: "text-orange-600",
      context: "5 coroani, 3 punți, 7 diverse",
      clickable: true,
      actionText: "Status lab"
    },
    {
      label: "Conversie Consultații",
      value: "38%",
      change: "+15% această lună",
      changeType: "positive",
      icon: <Target className="w-5 h-5" />,
      color: "text-purple-600",
      context: "Consultație → Plan tratament",
      clickable: true,
      actionText: "Analiză conversie"
    }
  ];

  const handleStatClick = (stat) => {
    // Here you could navigate to detailed views or show drill-down data
    console.log(`Clicked on ${stat.label}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`group hover:shadow-xl hover:shadow-blue-100/20 transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/90 backdrop-blur-sm ${
            stat.clickable ? 'cursor-pointer hover:shadow-lg' : ''
          }`}
          onClick={() => stat.clickable && handleStatClick(stat)}
        >
          <CardContent className="p-4 sm:p-5 lg:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-xl bg-slate-100 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'bg-green-100 text-green-700' 
                  : stat.changeType === 'negative'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.context}</div>
              {stat.clickable && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button variant="ghost" size="sm" className="text-xs p-1 h-6 text-blue-600 hover:text-blue-700">
                    {stat.actionText} →
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;

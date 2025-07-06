
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Plus, Search } from "lucide-react";

const StatsGrid = () => {
  const stats = [
    {
      label: "Programări Astăzi",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: <Calendar className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      label: "Lead-uri Noi",
      value: "8",
      change: "+45%",
      changeType: "positive", 
      icon: <Plus className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      label: "Cazuri Lab Active",
      value: "15",
      change: "92% on-time",
      changeType: "neutral",
      icon: <Clock className="w-5 h-5" />,
      color: "text-orange-600"
    },
    {
      label: "Conversie Lead→Treatment",
      value: "38%",
      change: "+15%",
      changeType: "positive",
      icon: <Search className="w-5 h-5" />,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="group hover:shadow-xl hover:shadow-blue-100/20 transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/90 backdrop-blur-sm">
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
            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-600 line-clamp-2">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;

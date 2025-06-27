
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg bg-slate-100 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'positive' 
                  ? 'bg-green-100 text-green-700' 
                  : stat.changeType === 'negative'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;

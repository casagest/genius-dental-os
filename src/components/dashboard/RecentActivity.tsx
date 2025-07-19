
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, Calendar, Search } from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      type: "revenue",
      title: "Revenue Target Hit", 
      description: "Daily target €4,200 exceeded by 18%",
      time: "5 min ago",
      icon: <MessageSquare className="w-4 h-4" />,
      priority: "high"
    },
    {
      type: "efficiency", 
      title: "Patient Flow Optimized",
      description: "Avg waiting time reduced to 8 min (-35%)",
      time: "22 min ago",
      icon: <Calendar className="w-4 h-4" />,
      priority: "medium"
    },
    {
      type: "conversion",
      title: "Lead Conversion",
      description: "3/4 consultations converted to treatment",
      time: "1h ago", 
      icon: <Search className="w-4 h-4" />,
      priority: "high"
    },
    {
      type: "alert",
      title: "Stock Alert",
      description: "Implant stock low - reorder needed",
      time: "2h ago",
      icon: <Clock className="w-4 h-4" />,
      priority: "medium"
    }
  ];

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-3 p-3 rounded-lg bg-card/30 hover:bg-card/60 border border-border/30 transition-all duration-300 hover:shadow-md cursor-pointer hover-lift"
          onClick={() => {
            console.log(`Clicked activity: ${activity.title}`);
          }}
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            activity.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}>
            {activity.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground">{activity.title}</h4>
            <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;

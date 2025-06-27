
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
    <Card className="border-2 hover:border-blue-200 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800 flex items-center">
          <div className="p-2 bg-slate-100 rounded-lg mr-3">
            <Clock className="w-5 h-5 text-slate-600" />
          </div>
          Activitate Recentă
        </CardTitle>
        <CardDescription>
          AI insights și evenimente sistem în timp real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-slate-800">{activity.title}</div>
                <div className="text-sm text-slate-600">{activity.description}</div>
                <div className="text-xs text-slate-500 mt-1">{activity.time}</div>
              </div>
              {activity.type === 'ai_insight' && (
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                  AI
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;

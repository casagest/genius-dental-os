
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Plus, Search, Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (actionTitle: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      toast({
        title: actionTitle,
        description: "Funcționalitatea va fi disponibilă în curând",
      });
    }
  };

  const actions = [
    {
      title: "AI Chat Support",
      description: "Întreabă GENIUS orice despre clinic",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
      shortcut: "Cmd+K",
      route: "/clinical"
    },
    {
      title: "Programare Rapidă",
      description: "Slot nou în calendarul liber",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-green-600 hover:bg-green-700",
      shortcut: "Cmd+N",
      route: "/appointments"
    },
    {
      title: "Case Lab Nou",
      description: "Inițiază workflow tehnică dentară",
      icon: <Plus className="w-5 h-5" />,
      color: "bg-orange-600 hover:bg-orange-700",
      shortcut: "Cmd+L",
      route: "/labsync"
    },
    {
      title: "Inventory Scan",
      description: "QR scan consumabile",
      icon: <Search className="w-5 h-5" />,
      color: "bg-purple-600 hover:bg-purple-700",
      shortcut: "Cmd+I",
      route: "/inventory"
    },
    {
      title: "Treatment Plans",
      description: "AI-generated cu cost estimates",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-indigo-600 hover:bg-indigo-700",
      shortcut: "Cmd+T",
      route: "/allonx"
    },
    {
      title: "Analytics",
      description: "CFO dashboard & reports",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-slate-600 hover:bg-slate-700",
      shortcut: "Cmd+A",
      route: "/dashboard"
    }
  ];

  return (
    <Card className="border-2 hover:border-blue-200 transition-colors">
      <CardHeader>
        <CardTitle className="text-xl text-slate-800">Quick Actions</CardTitle>
        <CardDescription>
          Funcții principale la un click distanță
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleAction(action.title, action.route)}
              className={`h-auto p-4 justify-start hover:shadow-md transition-all duration-200 ${action.color} hover:text-white border-2 hover:border-transparent group cursor-pointer`}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="group-hover:text-white">
                  {action.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium group-hover:text-white">{action.title}</div>
                  <div className="text-xs text-slate-500 group-hover:text-slate-200">
                    {action.description}
                  </div>
                </div>
                <div className="text-xs text-slate-400 group-hover:text-slate-200 font-mono">
                  {action.shortcut}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;

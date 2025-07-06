
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNotifications = () => {
    toast({
      title: "Notificări",
      description: "3 notificări noi disponibile",
    });
  };

  const handleSettings = () => {
    navigate("/integrations");
  };

  const handleChat = () => {
    navigate("/clinical");
  };

  const handleProfile = () => {
    toast({
      title: "Profil Utilizator",
      description: "Dr. Marin - Configurări profil disponibile în curând",
    });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">MedicalCor GENIUS</h1>
              <p className="text-sm text-slate-600">AI Operating System</p>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center space-x-4">
            {/* Live Status */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">System Online</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                24/7 Active
              </Badge>
            </div>

            {/* Action Buttons */}
            <Button 
              variant="outline" 
              size="sm" 
              className="relative"
              onClick={handleNotifications}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleChat}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              AI Chat
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSettings}
            >
              <Settings className="w-4 h-4" />
            </Button>

            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              onClick={handleProfile}
            >
              <User className="w-4 h-4 mr-2" />
              Dr. Marin
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

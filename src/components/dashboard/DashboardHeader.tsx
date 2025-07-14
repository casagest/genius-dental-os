import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Settings, User, MessageSquare, Mic, MicOff, Stethoscope, Users, Calendar, BarChart3, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRole } from "@/contexts/RoleContext";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { currentRole, setCurrentRole, getRoleConfig } = useRole();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const roles = {
    'medic': { icon: <Stethoscope className="w-4 h-4" />, label: 'Medic Stomatolog', color: 'bg-blue-500' },
    'asistent': { icon: <Users className="w-4 h-4" />, label: 'Asistent Medical', color: 'bg-green-500' },
    'receptie': { icon: <Calendar className="w-4 h-4" />, label: 'Recepție', color: 'bg-purple-500' },
    'tehnician': { icon: <Settings className="w-4 h-4" />, label: 'Tehnician Laborator', color: 'bg-orange-500' },
    'ceo': { icon: <BarChart3 className="w-4 h-4" />, label: 'CEO/Manager', color: 'bg-red-500' },
    'marketing': { icon: <Megaphone className="w-4 h-4" />, label: 'Marketing', color: 'bg-pink-500' }
  };

  const roleInfo = roles[currentRole];
  const roleConfig = getRoleConfig();

  const handleNotifications = () => {
    toast({
      title: "Notificări de sistem",
      description: "3 noi: 2 programări confirmate, 1 rezultat laborator gata",
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
      title: t('common.profile'),
      description: "Dr. Marin - Configurări profil disponibile în curând",
    });
  };

  return (
    <div className="flex items-center justify-between py-4 px-2">
      {/* Revolutionary Logo & Branding - Desktop Only */}
      <Link to="/" className="hidden md:flex items-center space-x-4 hover:opacity-80 transition-all duration-300 group">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl flex items-center justify-center shadow-glow group-hover:shadow-primary/60 transition-all duration-300 cursor-pointer">
            <span className="text-white font-black text-2xl">M</span>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            MedicalCor GENIUS
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            {roleConfig.description}
          </p>
        </div>
      </Link>

      {/* Mobile Title */}
      <div className="md:hidden flex-1 text-center">
        <h1 className="text-lg font-black bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
          MedicalCor
        </h1>
        <p className="text-xs text-muted-foreground">
          {roleConfig.name}
        </p>
      </div>

      {/* Role Selector & Voice Interface - Desktop Only */}
      <div className="hidden lg:flex items-center space-x-4">
        <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-card to-muted rounded-2xl border border-primary/30 backdrop-blur-xl">
          <div className={`w-4 h-4 rounded-full ${roleInfo.color} animate-pulse shadow-lg`}></div>
          <Select value={currentRole} onValueChange={setCurrentRole}>
            <SelectTrigger className="w-52 border-0 bg-transparent shadow-none focus:ring-0 h-10">
              <div className="flex items-center space-x-3">
                {roleInfo.icon}
                <span className="text-sm font-semibold">{roleConfig.name}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/30">
              {Object.entries(roles).map(([key, role]) => (
                <SelectItem key={key} value={key} className="focus:bg-primary/20">
                  <div className="flex items-center space-x-3">
                    {role.icon}
                    <span>{role.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Voice Interface Toggle */}
        <Button
          onClick={() => setIsVoiceActive(!isVoiceActive)}
          variant={isVoiceActive ? "default" : "outline"}
          size="sm"
          className={`transition-all duration-300 rounded-2xl px-4 py-3 ${
            isVoiceActive 
              ? 'bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/80 hover:to-secondary shadow-lg shadow-secondary/30' 
              : 'border-primary/30 hover:bg-primary/10 hover:border-primary/50'
          }`}
        >
          {isVoiceActive ? (
            <>
              <Mic className="w-4 h-4 mr-2 animate-pulse" />
              <span className="text-sm font-semibold">Voce Activă</span>
            </>
          ) : (
            <>
              <MicOff className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Activează Voce</span>
            </>
          )}
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2 flex-shrink-0">
        {/* Live Status - Desktop Only */}
        <div className="hidden lg:flex items-center space-x-3 px-3 py-2 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-2xl border border-secondary/30">
          <div className="w-3 h-3 bg-secondary rounded-full animate-pulse shadow-lg shadow-secondary/50"></div>
          <span className="text-sm text-foreground font-medium">Online</span>
        </div>

        <div className="hidden sm:block">
          <LanguageSwitcher />
        </div>

        {/* Notification Button */}
        <Button 
          variant="outline" 
          size="sm" 
          className="relative p-2 md:p-3 rounded-2xl border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          onClick={handleNotifications}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs text-white flex items-center justify-center animate-pulse">
            3
          </span>
        </Button>
        
        {/* Chat Button - Desktop Only */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleChat}
          className="hidden sm:flex px-3 md:px-4 py-2 md:py-3 rounded-2xl border-accent/30 hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          <span className="hidden lg:inline font-semibold">AI Chat</span>
        </Button>

        {/* Settings Button */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSettings}
          className="p-2 md:p-3 rounded-2xl border-muted-foreground/30 hover:bg-muted/20 hover:border-muted-foreground/50 transition-all duration-300"
        >
          <Settings className="w-4 h-4" />
        </Button>

        {/* Profile Button */}
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 px-3 md:px-4 py-2 md:py-3 rounded-2xl shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50"
          onClick={handleProfile}
        >
          <User className="w-4 h-4 sm:mr-2" />
          <span className="hidden sm:inline font-semibold">Profil</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
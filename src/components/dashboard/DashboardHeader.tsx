
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
    <header className="bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
      <div className="relative container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Revolutionary Logo & Branding */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity duration-200">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300 cursor-pointer">
                <span className="text-white font-black text-xl">M</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                MedicalCor GENIUS
              </h1>
              <p className="text-sm text-blue-200/80 font-medium">
                {roleConfig.description}
              </p>
            </div>
          </Link>

          {/* Role Selector & Voice Interface */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-3 px-3 py-2 bg-slate-50 rounded-lg border border-slate-200">
              <div className={`w-3 h-3 rounded-full ${roleInfo.color}`}></div>
              <Select value={currentRole} onValueChange={setCurrentRole}>
                <SelectTrigger className="w-48 border-0 bg-transparent shadow-none focus:ring-0 h-8">
                  <div className="flex items-center space-x-2">
                    {roleInfo.icon}
                    <span className="text-sm font-medium">{roleConfig.name}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roles).map(([key, role]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center space-x-2">
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
              className={`transition-all duration-300 ${
                isVoiceActive 
                  ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200' 
                  : 'hover:bg-green-50 hover:border-green-300'
              }`}
            >
              {isVoiceActive ? (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  <span className="text-sm">Voce Activă</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4 mr-2" />
                  <span className="text-sm">Activează Voce</span>
                </>
              )}
            </Button>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
            {/* Live Status - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-600">{t('header.systemOnline')}</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                {t('header.active24')}
              </Badge>
            </div>

            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Action Buttons */}
            <Button 
              variant="outline" 
              size="sm" 
              className="relative p-2 sm:px-3"
              onClick={handleNotifications}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                <span className="hidden sm:inline">3</span>
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleChat}
              className="hidden sm:flex"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">{t('header.aiChat')}</span>
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSettings}
              className="p-2 sm:px-3"
            >
              <Settings className="w-4 h-4" />
            </Button>

            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-2 sm:px-3"
              onClick={handleProfile}
            >
              <User className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">{t('header.profile')}</span>
            </Button>
          </div>
        </div>
        
        {/* Mobile-only bottom section for language switcher */}
        <div className="sm:hidden pb-3 border-t border-slate-200/50 pt-3 flex justify-center">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

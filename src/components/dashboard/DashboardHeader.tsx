
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, MessageSquare, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/components/auth/AuthProvider";
import LanguageSwitcher from "@/components/ui/language-switcher";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  const handleNotifications = () => {
    toast({
      title: t('common.notifications'),
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
      title: t('common.profile'),
      description: user?.email ? `Conectat ca: ${user.email}` : "Profil utilizator",
    });
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo & Title */}
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1 sm:flex-none">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm sm:text-lg">M</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-bold text-slate-800 truncate">{t('header.title')}</h1>
              <p className="text-xs sm:text-sm text-slate-600 truncate hidden sm:block">{t('header.subtitle')}</p>
            </div>
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
              <span className="hidden sm:inline">{user?.email ? user.email.split('@')[0] : t('header.profile')}</span>
            </Button>

            <Button 
              variant="outline"
              size="sm" 
              className="p-2 sm:px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
              title="Deconectare"
            >
              <LogOut className="w-4 h-4" />
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

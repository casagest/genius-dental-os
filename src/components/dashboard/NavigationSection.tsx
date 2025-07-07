import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NavigationSection = () => {
  const { t } = useLanguage();

  return (
    <div className="text-center space-y-4">
      <p className="text-slate-600">{t('home.calendarSection')}</p>
      <div className="flex justify-center space-x-4">
        <Link to="/appointments">
          <Button className="space-x-2">
            <Calendar className="w-4 h-4" />
            <span>{t('home.appointmentCalendar')}</span>
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button className="space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
            <MessageSquare className="w-4 h-4" />
            <span>{t('home.medicalDashboard')}</span>
          </Button>
        </Link>
        <Link to="/integrations">
          <Button variant="outline" className="space-x-2">
            <Settings className="w-4 h-4" />
            <span>{t('home.integrations')}</span>
          </Button>
        </Link>
        <Link to="/istoma-integration">
          <Button className="space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
            <MessageSquare className="w-4 h-4" />
            <span>iStoma Integration</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavigationSection;
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const NavigationSection = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <p className="text-center text-muted-foreground text-large">
        Accesează rapid toate secțiunile importante
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/appointments" className="group">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">📅 Programări</h3>
                <p className="text-sm text-gray-600">Gestionează programările</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/dashboard" className="group">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-400/50 transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">🏥 Dashboard Medical</h3>
                <p className="text-sm text-gray-600">Monitorizează activitatea</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/integrations" className="group">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-orange-400/50 transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">🔧 Integrări</h3>
                <p className="text-sm text-gray-600">Conectează servicii</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/istoma-integration" className="group">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">🦷 iStoma Integration</h3>
                <p className="text-sm text-gray-600">Integrare sistem iStoma</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/patient-portal" className="group">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-400/50 transition-all group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">👥 Portal Pacienți</h3>
                <p className="text-sm text-gray-600">Acces pacienți la dosare</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavigationSection;
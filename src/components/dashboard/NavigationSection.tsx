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
        {/* GENIUS 3.0 Premium Card */}
        <Link to="/medical-workflow" className="group md:col-span-2 lg:col-span-3">
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 rounded-2xl border-2 border-purple-300/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">🦄 MEDICALCOR GENIUS 3.0</h3>
                    <p className="text-white/90 text-lg">Interfața Revolulționară cu Control Vocal AI</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    🌟 UNICORN
                  </span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                    ✨ NEW
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <div className="text-white/90 text-sm">🎤 Voice Control</div>
                  <div className="text-white font-bold">AI Assistant</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <div className="text-white/90 text-sm">🦷 Treatment Planning</div>
                  <div className="text-white font-bold">Smart Workflows</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <div className="text-white/90 text-sm">📊 Real-time Analytics</div>
                  <div className="text-white font-bold">Live Monitoring</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                  <div className="text-white/90 text-sm">🔬 Digital Hub</div>
                  <div className="text-white font-bold">All-in-One</div>
                </div>
              </div>
            </div>
          </div>
        </Link>

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
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/appointments" className="group">
          <div className="medical-card p-6 hover-lift group-hover:border-primary/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-medical-gradient rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">📅 Programări</h3>
                <p className="text-sm text-muted-foreground">Gestionează programările</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/dashboard" className="group">
          <div className="medical-card p-6 hover-lift group-hover:border-secondary/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-success-gradient rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">🏥 Dashboard Medical</h3>
                <p className="text-sm text-muted-foreground">Monitorizează activitatea</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/integrations" className="group">
          <div className="medical-card p-6 hover-lift group-hover:border-accent/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">🔧 Integrări</h3>
                <p className="text-sm text-muted-foreground">Conectează servicii</p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/istoma-integration" className="group">
          <div className="medical-card p-6 hover-lift group-hover:border-primary/30">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-medical-gradient rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">🦷 iStoma</h3>
                <p className="text-sm text-muted-foreground">Integrare iStoma</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavigationSection;
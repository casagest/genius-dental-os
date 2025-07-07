import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MessageSquare, Plus, Search, Clock, FileText, Stethoscope, Users, Wrench, BarChart3, Megaphone, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState('medic');

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

  const roleActions = {
    medic: [
      {
        title: "Consultație Nouă",
        description: "Adaugă pacient și plan de tratament",
        icon: <Stethoscope className="w-5 h-5" />,
        shortcut: "Ctrl+N",
        route: "/appointments"
      },
      {
        title: "Note Vocale",
        description: "Dictează observații clinical",
        icon: <MessageSquare className="w-5 h-5" />,
        shortcut: "Ctrl+V",
        route: "/clinical"
      },
      {
        title: "Trimitere Laborator",
        description: "Coroană/punte/proteza noua",
        icon: <Wrench className="w-5 h-5" />,
        shortcut: "Ctrl+L",
        route: "/labsync"
      },
      {
        title: "Planificare All-on-X",
        description: "Caz implant complet",
        icon: <Plus className="w-5 h-5" />,
        shortcut: "Ctrl+A",
        route: "/allonx"
      }
    ],
    asistent: [
      {
        title: "Confirmare Programări",
        description: "SMS/WhatsApp reminder pacienți",
        icon: <Phone className="w-5 h-5" />,
        shortcut: "Ctrl+C",
      },
      {
        title: "Gestionare Sterilizare",
        description: "Urmărire instrumente și cicli",
        icon: <Clock className="w-5 h-5" />,
        shortcut: "Ctrl+S",
      },
      {
        title: "Stoc Materiale",
        description: "Verificare și comandă consumabile",
        icon: <Search className="w-5 h-5" />,
        shortcut: "Ctrl+M",
        route: "/inventory"
      },
      {
        title: "Programări Urgențe",
        description: "Slot-uri libere pentru urgențe",
        icon: <Calendar className="w-5 h-5" />,
        shortcut: "Ctrl+U",
        route: "/appointments"
      }
    ],
    receptie: [
      {
        title: "Programare Nouă",
        description: "Adaugă pacient în calendar",
        icon: <Calendar className="w-5 h-5" />,
        shortcut: "Ctrl+P",
        route: "/appointments"
      },
      {
        title: "Lead Management",
        description: "Urmărire telefoane și conversii",
        icon: <Users className="w-5 h-5" />,
        shortcut: "Ctrl+L",
      },
      {
        title: "Facturare & Plăți",
        description: "Emisie facturi și încasări",
        icon: <FileText className="w-5 h-5" />,
        shortcut: "Ctrl+F",
      },
      {
        title: "Reminder Pacienți",
        description: "Apeluri confirmare și follow-up",
        icon: <Phone className="w-5 h-5" />,
        shortcut: "Ctrl+R",
      }
    ],
    tehnician: [
      {
        title: "Comandă Nouă",
        description: "Preluare cerere de la medic",
        icon: <Plus className="w-5 h-5" />,
        shortcut: "Ctrl+N",
        route: "/labsync"
      },
      {
        title: "Upload Progres",
        description: "Fotografii și status lucrare",
        icon: <FileText className="w-5 h-5" />,
        shortcut: "Ctrl+U",
      },
      {
        title: "CAD/CAM Design",
        description: "Design digital și simulare",
        icon: <Wrench className="w-5 h-5" />,
        shortcut: "Ctrl+D",
      },
      {
        title: "Notificare Finalizare",
        description: "Anunță medicul când e gata",
        icon: <MessageSquare className="w-5 h-5" />,
        shortcut: "Ctrl+F",
      }
    ],
    ceo: [
      {
        title: "Dashboard Financiar",
        description: "KPI-uri și profit în timp real",
        icon: <BarChart3 className="w-5 h-5" />,
        shortcut: "Ctrl+D",
        route: "/cfo"
      },
      {
        title: "Analiză Performanță",
        description: "Medici, conversii, eficiență",
        icon: <Search className="w-5 h-5" />,
        shortcut: "Ctrl+A",
      },
      {
        title: "Marketing ROI",
        description: "Campanii și lead sources",
        icon: <Megaphone className="w-5 h-5" />,
        shortcut: "Ctrl+M",
      },
      {
        title: "Rapoarte Executive",
        description: "Export Excel și prezentări",
        icon: <FileText className="w-5 h-5" />,
        shortcut: "Ctrl+R",
      }
    ],
    marketing: [
      {
        title: "Campanie Nouă",
        description: "Facebook Ads / Google Ads",
        icon: <Megaphone className="w-5 h-5" />,
        shortcut: "Ctrl+C",
      },
      {
        title: "Lead Tracking",
        description: "Urmărire surse și conversii",
        icon: <Search className="w-5 h-5" />,
        shortcut: "Ctrl+T",
      },
      {
        title: "Content Creator",
        description: "Postări social media",
        icon: <Plus className="w-5 h-5" />,
        shortcut: "Ctrl+P",
      },
      {
        title: "Analytics Report",
        description: "Performance și ROI campanii",
        icon: <BarChart3 className="w-5 h-5" />,
        shortcut: "Ctrl+A",
      }
    ]
  };

  const currentActions = roleActions[selectedRole] || roleActions.medic;

  return (
    <div className="ai-card quantum-glow animate-fade-in">
      <div className="holographic-border">
        <div className="holographic-content">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-holographic">🚀 Acțiuni Rapide AI</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-vital-pulse"></div>
                <span className="text-neural text-sm">Funcții personalizate pentru rolul tău</span>
              </div>
            </div>
            <div className="neuro-card">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40 border-quantum bg-card/50 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-md border-quantum">
                  <SelectItem value="medic">🔬 Medic</SelectItem>
                  <SelectItem value="asistent">👨‍⚕️ Asistent</SelectItem>
                  <SelectItem value="receptie">📞 Recepție</SelectItem>
                  <SelectItem value="tehnician">🛠️ Tehnician</SelectItem>
                  <SelectItem value="ceo">💼 CEO/Manager</SelectItem>
                  <SelectItem value="marketing">📢 Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentActions.map((action, index) => (
              <div
                key={index}
                onClick={() => handleAction(action.title, action.route)}
                className="glass-card hover-quantum cursor-pointer animate-slide-in-right"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center space-x-4 p-4">
                  <div className="ai-indicator flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-neural">
                      <div className="text-white animate-neural-pulse">
                        {action.icon}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-holographic">{action.title}</h4>
                      <div className="w-1 h-1 bg-quantum rounded-full animate-pulse"></div>
                    </div>
                    <p className="text-sm text-neural mb-2">{action.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground font-mono bg-card/50 px-2 py-1 rounded">
                        {action.shortcut}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-success rounded-full animate-bounce-subtle"></div>
                        <span className="text-xs text-success font-medium">AI Assisté</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="neural-pulse w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-vital-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
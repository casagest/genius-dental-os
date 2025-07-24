import React from 'react';
import { Calendar, MessageSquare, Plus, Search, Clock, FileText, Stethoscope, Users, Wrench, BarChart3, Megaphone, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRole } from "@/contexts/RoleContext";

const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { currentRole } = useRole();

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

  const currentActions = roleActions[currentRole] || roleActions.medic;

  return (
    <div className="bg-card rounded-xl border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">🚀 Acțiuni Rapide</h3>
          <p className="text-sm text-muted-foreground">Funcții personalizate pentru rolul {currentRole}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentActions.map((action, index) => (
          <div
            key={index}
            onClick={() => handleAction(action.title, (action as any).route)}
            className="bg-background border rounded-lg p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all transform hover:scale-105"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                {action.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground">{action.title}</h4>
                <p className="text-sm text-muted-foreground">{action.description}</p>
                <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded mt-1 inline-block">
                  {action.shortcut}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
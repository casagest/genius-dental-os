import React from 'react';
import { Calendar, MessageSquare, Plus, Search, Clock, FileText, Stethoscope, Users, Wrench, BarChart3, Megaphone, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/contexts/RoleContext";

const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  interface QuickAction {
    title: string;
    description: string;
    icon: React.ReactNode;
    shortcut: string;
    route?: string;
  }

  const roleActions: Record<string, QuickAction[]> = {
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
        route: "/appointments"
      },
      {
        title: "Gestionare Sterilizare",
        description: "Urmărire instrumente și cicli",
        icon: <Clock className="w-5 h-5" />,
        shortcut: "Ctrl+S",
        route: "/sterilization"
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
        route: "/patient-acquisition"
      },
      {
        title: "Facturare & Plăți",
        description: "Emisie facturi și încasări",
        icon: <FileText className="w-5 h-5" />,
        shortcut: "Ctrl+F",
        route: "/payments"
      },
      {
        title: "Reminder Pacienți",
        description: "Apeluri confirmare și follow-up",
        icon: <Phone className="w-5 h-5" />,
        shortcut: "Ctrl+R",
        route: "/appointments"
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
        route: "/labsync"
      },
      {
        title: "CAD/CAM Design",
        description: "Design digital și simulare",
        icon: <Wrench className="w-5 h-5" />,
        shortcut: "Ctrl+D",
        route: "/materials"
      },
      {
        title: "Notificare Finalizare",
        description: "Anunță medicul când e gata",
        icon: <MessageSquare className="w-5 h-5" />,
        shortcut: "Ctrl+F",
        route: "/labsync"
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
        route: "/business-intelligence"
      },
      {
        title: "Marketing ROI",
        description: "Campanii și lead sources",
        icon: <Megaphone className="w-5 h-5" />,
        shortcut: "Ctrl+M",
        route: "/marketing"
      },
      {
        title: "Rapoarte Executive",
        description: "Export Excel și prezentări",
        icon: <FileText className="w-5 h-5" />,
        shortcut: "Ctrl+R",
        route: "/staff"
      }
    ],
    marketing: [
      {
        title: "Campanie Nouă",
        description: "Facebook Ads / Google Ads",
        icon: <Megaphone className="w-5 h-5" />,
        shortcut: "Ctrl+C",
        route: "/marketing"
      },
      {
        title: "Lead Tracking",
        description: "Urmărire surse și conversii",
        icon: <Search className="w-5 h-5" />,
        shortcut: "Ctrl+T",
        route: "/patient-acquisition"
      },
      {
        title: "Content Creator",
        description: "Postări social media",
        icon: <Plus className="w-5 h-5" />,
        shortcut: "Ctrl+P",
        route: "/social-media"
      },
      {
        title: "Analytics Report",
        description: "Performance și ROI campanii",
        icon: <BarChart3 className="w-5 h-5" />,
        shortcut: "Ctrl+A",
        route: "/business-intelligence"
      }
    ]
  };

  const currentActions = roleActions[currentRole] || roleActions.medic;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-sm text-muted-foreground">Acțiuni pentru rolul tău</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {currentActions.slice(0, 4).map((action, index) => (
          <div
            key={index}
            onClick={() => handleAction(action.title, action.route)}
            className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 cursor-pointer border border-border/50 hover:border-primary/30 transition-all duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <div className="text-white text-sm">
                {action.icon}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground">{action.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{action.description}</p>
            </div>
            
            <div className="text-xs text-muted-foreground font-mono px-2 py-1 bg-muted/50 rounded">
              {action.shortcut}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
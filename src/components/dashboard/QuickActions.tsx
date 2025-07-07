import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        color: "bg-blue-600 hover:bg-blue-700",
        shortcut: "Ctrl+N",
        route: "/appointments"
      },
      {
        title: "Note Vocale",
        description: "Dictează observații clinical",
        icon: <MessageSquare className="w-5 h-5" />,
        color: "bg-green-600 hover:bg-green-700",
        shortcut: "Ctrl+V",
        route: "/clinical"
      },
      {
        title: "Trimitere Laborator",
        description: "Coroană/punte/proteza noua",
        icon: <Wrench className="w-5 h-5" />,
        color: "bg-orange-600 hover:bg-orange-700",
        shortcut: "Ctrl+L",
        route: "/labsync"
      },
      {
        title: "Planificare All-on-X",
        description: "Caz implant complet",
        icon: <Plus className="w-5 h-5" />,
        color: "bg-purple-600 hover:bg-purple-700",
        shortcut: "Ctrl+A",
        route: "/allonx"
      }
    ],
    asistent: [
      {
        title: "Confirmare Programări",
        description: "SMS/WhatsApp reminder pacienți",
        icon: <Phone className="w-5 h-5" />,
        color: "bg-green-600 hover:bg-green-700",
        shortcut: "Ctrl+C",
      },
      {
        title: "Gestionare Sterilizare",
        description: "Urmărire instrumente și cicli",
        icon: <Clock className="w-5 h-5" />,
        color: "bg-blue-600 hover:bg-blue-700",
        shortcut: "Ctrl+S",
      },
      {
        title: "Stoc Materiale",
        description: "Verificare și comandă consumabile",
        icon: <Search className="w-5 h-5" />,
        color: "bg-orange-600 hover:bg-orange-700",
        shortcut: "Ctrl+M",
        route: "/inventory"
      },
      {
        title: "Programări Urgențe",
        description: "Slot-uri libere pentru urgențe",
        icon: <Calendar className="w-5 h-5" />,
        color: "bg-red-600 hover:bg-red-700",
        shortcut: "Ctrl+U",
        route: "/appointments"
      }
    ],
    receptie: [
      {
        title: "Programare Nouă",
        description: "Adaugă pacient în calendar",
        icon: <Calendar className="w-5 h-5" />,
        color: "bg-blue-600 hover:bg-blue-700",
        shortcut: "Ctrl+P",
        route: "/appointments"
      },
      {
        title: "Lead Management",
        description: "Urmărire telefoane și conversii",
        icon: <Users className="w-5 h-5" />,
        color: "bg-green-600 hover:bg-green-700",
        shortcut: "Ctrl+L",
      },
      {
        title: "Facturare & Plăți",
        description: "Emisie facturi și încasări",
        icon: <FileText className="w-5 h-5" />,
        color: "bg-purple-600 hover:bg-purple-700",
        shortcut: "Ctrl+F",
      },
      {
        title: "Reminder Pacienți",
        description: "Apeluri confirmare și follow-up",
        icon: <Phone className="w-5 h-5" />,
        color: "bg-orange-600 hover:bg-orange-700",
        shortcut: "Ctrl+R",
      }
    ],
    tehnician: [
      {
        title: "Comandă Nouă",
        description: "Preluare cerere de la medic",
        icon: <Plus className="w-5 h-5" />,
        color: "bg-blue-600 hover:bg-blue-700",
        shortcut: "Ctrl+N",
        route: "/labsync"
      },
      {
        title: "Upload Progres",
        description: "Fotografii și status lucrare",
        icon: <FileText className="w-5 h-5" />,
        color: "bg-green-600 hover:bg-green-700",
        shortcut: "Ctrl+U",
      },
      {
        title: "CAD/CAM Design",
        description: "Design digital și simulare",
        icon: <Wrench className="w-5 h-5" />,
        color: "bg-purple-600 hover:bg-purple-700",
        shortcut: "Ctrl+D",
      },
      {
        title: "Notificare Finalizare",
        description: "Anunță medicul când e gata",
        icon: <MessageSquare className="w-5 h-5" />,
        color: "bg-orange-600 hover:bg-orange-700",
        shortcut: "Ctrl+F",
      }
    ],
    ceo: [
      {
        title: "Dashboard Financiar",
        description: "KPI-uri și profit în timp real",
        icon: <BarChart3 className="w-5 h-5" />,
        color: "bg-green-600 hover:bg-green-700",
        shortcut: "Ctrl+D",
        route: "/cfo"
      },
      {
        title: "Analiză Performanță",
        description: "Medici, conversii, eficiență",
        icon: <Search className="w-5 h-5" />,
        color: "bg-blue-600 hover:bg-blue-700",
        shortcut: "Ctrl+A",
      },
      {
        title: "Marketing ROI",
        description: "Campanii și lead sources",
        icon: <Megaphone className="w-5 h-5" />,
        color: "bg-purple-600 hover:bg-purple-700",
        shortcut: "Ctrl+M",
      },
      {
        title: "Rapoarte Executive",
        description: "Export Excel și prezentări",
        icon: <FileText className="w-5 h-5" />,
        color: "bg-orange-600 hover:bg-orange-700",
        shortcut: "Ctrl+R",
      }
    ],
    marketing: [
      {
        title: "Campanie Nouă",
        description: "Facebook Ads / Google Ads",
        icon: <Megaphone className="w-5 h-5" />,
        color: "bg-pink-600 hover:bg-pink-700",
        shortcut: "Ctrl+C",
      },
      {
        title: "Lead Tracking",
        description: "Urmărire surse și conversii",
        icon: <Search className="w-5 h-5" />,
        color: "bg-blue-600 hover:bg-blue-700",
        shortcut: "Ctrl+T",
      },
      {
        title: "Content Creator",
        description: "Postări social media",
        icon: <Plus className="w-5 h-5" />,
        color: "bg-purple-600 hover:bg-purple-700",
        shortcut: "Ctrl+P",
      },
      {
        title: "Analytics Report",
        description: "Performance și ROI campanii",
        icon: <BarChart3 className="w-5 h-5" />,
        color: "bg-green-600 hover:bg-green-700",
        shortcut: "Ctrl+A",
      }
    ]
  };

  const currentActions = roleActions[selectedRole] || roleActions.medic;

  return (
    <Card className="border-2 hover:border-blue-200 transition-colors animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-slate-800">Acțiuni Rapide</CardTitle>
            <CardDescription>
              Funcții personalizate pentru rolul tău
            </CardDescription>
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medic">Medic</SelectItem>
              <SelectItem value="asistent">Asistent</SelectItem>
              <SelectItem value="receptie">Recepție</SelectItem>
              <SelectItem value="tehnician">Tehnician</SelectItem>
              <SelectItem value="ceo">CEO/Manager</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {currentActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleAction(action.title, action.route)}
              className={`h-auto p-4 justify-start hover:shadow-md transition-all duration-200 hover-scale ${action.color} hover:text-white border-2 hover:border-transparent group cursor-pointer animate-scale-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="group-hover:text-white">
                  {action.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium group-hover:text-white">{action.title}</div>
                  <div className="text-xs text-slate-500 group-hover:text-slate-200">
                    {action.description}
                  </div>
                </div>
                <div className="text-xs text-slate-400 group-hover:text-slate-200 font-mono">
                  {action.shortcut}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Calendar, MessageSquare, Clock, Search, Mic, DollarSign, Users, Settings, BarChart3, Megaphone, Stethoscope, Wrench, Shield, Heart, Database, Palette } from "lucide-react";

export type UserRole = 'medic' | 'asistent' | 'receptie' | 'tehnician' | 'ceo' | 'marketing';

export interface RoleModule {
  title: string;
  description: string;
  status: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
  link?: string;
  priority: number;
}

export interface RoleStat {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  color: string;
  context: string;
  clickable: boolean;
  actionText: string;
}

export interface RoleInsight {
  type: string;
  title: string;
  message: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  icon: React.ReactNode;
}

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  getRoleModules: () => RoleModule[];
  getRoleStats: () => RoleStat[];
  getRoleInsights: () => RoleInsight[];
  getRoleConfig: () => {
    name: string;
    description: string;
    primaryColor: string;
    secondaryColor: string;
    gradientFrom: string;
    gradientTo: string;
  };
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}

const roleConfigs = {
  medic: {
    name: "Medic Stomatolog",
    description: "Diagnostic, tratament și planificare chirurgicală",
    primaryColor: "hsl(221, 83%, 53%)",
    secondaryColor: "hsl(221, 70%, 40%)",
    gradientFrom: "from-blue-500",
    gradientTo: "to-blue-700"
  },
  asistent: {
    name: "Asistent Medical",
    description: "Asistență medicală și gestionare pacienți",
    primaryColor: "hsl(142, 76%, 36%)",
    secondaryColor: "hsl(142, 70%, 25%)",
    gradientFrom: "from-green-500",
    gradientTo: "to-green-700"
  },
  receptie: {
    name: "Recepție",
    description: "Programări și comunicare cu pacienții",
    primaryColor: "hsl(262, 83%, 58%)",
    secondaryColor: "hsl(262, 70%, 45%)",
    gradientFrom: "from-purple-500",
    gradientTo: "to-purple-700"
  },
  tehnician: {
    name: "Tehnician Laborator",
    description: "Producție și control calitate lucrări",
    primaryColor: "hsl(25, 95%, 53%)",
    secondaryColor: "hsl(25, 85%, 40%)",
    gradientFrom: "from-orange-500",
    gradientTo: "to-orange-700"
  },
  ceo: {
    name: "CEO/Manager",
    description: "Management strategic și analiză business",
    primaryColor: "hsl(0, 84%, 60%)",
    secondaryColor: "hsl(0, 75%, 45%)",
    gradientFrom: "from-red-500",
    gradientTo: "to-red-700"
  },
  marketing: {
    name: "Marketing",
    description: "Campanii și achiziție pacienți",
    primaryColor: "hsl(330, 81%, 60%)",
    secondaryColor: "hsl(330, 70%, 45%)",
    gradientFrom: "from-pink-500",
    gradientTo: "to-pink-700"
  }
};

const roleModules = {
  medic: [
    {
      title: "AllOnX Hub",
      description: "Planificare implantologie și ghidare chirurgicală",
      status: "LIVE",
      progress: 100,
      icon: <Stethoscope className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "/allonx",
      priority: 1
    },
    {
      title: "Clinical Agent",
      description: "Diagnostice AI și analiză imagistică",
      status: "LIVE",
      progress: 100,
      icon: <Heart className="w-6 h-6" />,
      color: "bg-red-500",
      link: "/clinical",
      priority: 2
    },
    {
      title: "Lab Sync",
      description: "Comunicare directă cu laboratorul protetic",
      status: "LIVE", 
      progress: 100,
      icon: <Clock className="w-6 h-6" />,
      color: "bg-orange-500",
      link: "/labsync",
      priority: 3
    }
  ],
  asistent: [
    {
      title: "Inventory Brain",
      description: "Gestionare stoc materiale și instrumente",
      status: "LIVE",
      progress: 100,
      icon: <Search className="w-6 h-6" />,
      color: "bg-green-500",
      link: "/inventory",
      priority: 1
    },
    {
      title: "Programări",
      description: "Management programări și dosare pacienți",
      status: "LIVE",
      progress: 100,
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "/appointments",
      priority: 2
    },
    {
      title: "Sterilizare AI",
      description: "Urmărire și validare procese sterilizare",
      status: "LIVE",
      progress: 100,
      icon: <Shield className="w-6 h-6" />,
      color: "bg-purple-500",
      link: "/sterilization",
      priority: 3
    }
  ],
  receptie: [
    {
      title: "Programări Avansate",
      description: "Optimizare calendar și confirmare programări",
      status: "LIVE",
      progress: 100,
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-purple-500",
      link: "/appointments",
      priority: 1
    },
    {
      title: "Comunicare Pacienți",
      description: "SMS/Email automat și reminder-uri",
      status: "LIVE",
      progress: 100,
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-blue-500",
      priority: 2
    },
    {
      title: "Gestionare Plăți",
      description: "Facturare și urmărire încasări",
      status: "LIVE",
      progress: 100,
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-green-500",
      link: "/payments",
      priority: 3
    }
  ],
  tehnician: [
    {
      title: "Lab Sync PRO",
      description: "Gestionare comenzi și program producție",
      status: "LIVE",
      progress: 100,
      icon: <Wrench className="w-6 h-6" />,
      color: "bg-orange-500",
      link: "/labsync",
      priority: 1
    },
    {
      title: "Control Calitate",
      description: "Validare lucrări și urmărire defecte",
      status: "LIVE",
      progress: 100,
      icon: <Shield className="w-6 h-6" />,
      color: "bg-red-500",
      priority: 2
    },
    {
      title: "Urmărire Materiale",
      description: "Stoc materie primă și consum",
      status: "LIVE",
      progress: 100,
      icon: <Database className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "/materials",
      priority: 3
    }
  ],
  ceo: [
    {
      title: "CFO Dashboard",
      description: "Analiză financiară și KPI-uri business",
      status: "LIVE",
      progress: 100,
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-red-500",
      link: "/cfo",
      priority: 1
    },
    {
      title: "Management Personal",
      description: "Performanță echipă și planificare resurse",
      status: "LIVE",
      progress: 100,
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "/staff",
      priority: 2
    },
    {
      title: "Business Intelligence",
      description: "Analize predictive și optimizare procese",
      status: "LIVE",
      progress: 100,
      icon: <Database className="w-6 h-6" />,
      color: "bg-purple-500",
      link: "/business-intelligence",
      priority: 3
    }
  ],
  marketing: [
    {
      title: "AI Marketing",
      description: "Campanii inteligente și segmentare pacienți",
      status: "LIVE",
      progress: 100,
      icon: <Megaphone className="w-6 h-6" />,
      color: "bg-pink-500",
      link: "/marketing",
      priority: 1
    },
    {
      title: "Achiziție Pacienți",
      description: "Lead generation și conversie online",
      status: "LIVE",
      progress: 100,
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500",
      link: "/patient-acquisition",
      priority: 2
    },
    {
      title: "Social Media AI",
      description: "Automatizare postări și engagement",
      status: "LIVE",
      progress: 100,
      icon: <Palette className="w-6 h-6" />,
      color: "bg-purple-500",
      link: "/social-media",
      priority: 3
    }
  ]
};

const roleStats = {
  medic: [
    {
      label: "Cazuri Complexe Astăzi",
      value: "8",
      change: "+2 vs ieri",
      changeType: "positive" as const,
      icon: <Stethoscope className="w-5 h-5" />,
      color: "text-blue-600",
      context: "Implantologie și chirurgie",
      clickable: true,
      actionText: "Vezi planificări"
    },
    {
      label: "Timp Mediu / Pacient",
      value: "45min",
      change: "-5min vs săpt. trecută",
      changeType: "positive" as const,
      icon: <Clock className="w-5 h-5" />,
      color: "text-green-600",
      context: "Eficiență îmbunătățită",
      clickable: true,
      actionText: "Analiză timp"
    },
    {
      label: "Rate Succes Tratamente",
      value: "96.2%",
      change: "+1.8% această lună",
      changeType: "positive" as const,
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-600",
      context: "Monitorizare follow-up",
      clickable: true,
      actionText: "Raport rezultate"
    },
    {
      label: "Satisfacție Pacienți",
      value: "4.8/5",
      change: "98% recomandări",
      changeType: "positive" as const,
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-600",
      context: "Feedback real-time",
      clickable: true,
      actionText: "Vezi review-uri"
    }
  ],
  asistent: [
    {
      label: "Pregătiri Cabinet",
      value: "12",
      change: "100% la timp",
      changeType: "positive" as const,
      icon: <Settings className="w-5 h-5" />,
      color: "text-green-600",
      context: "Setup complet",
      clickable: true,
      actionText: "Check-list"
    },
    {
      label: "Stoc Materiale",
      value: "85%",
      change: "3 alerte active",
      changeType: "neutral" as const,
      icon: <Search className="w-5 h-5" />,
      color: "text-orange-600",
      context: "Nivele optime",
      clickable: true,
      actionText: "Gestionare stoc"
    },
    {
      label: "Sterilizare Completă",
      value: "24",
      change: "Zero incidente",
      changeType: "positive" as const,
      icon: <Shield className="w-5 h-5" />,
      color: "text-blue-600",
      context: "Ciclu de 45min",
      clickable: true,
      actionText: "Validare procese"
    },
    {
      label: "Asistență Eficientă",
      value: "18",
      change: "+15% cooperare",
      changeType: "positive" as const,
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-600",
      context: "Intervenții asistate",
      clickable: true,
      actionText: "Evaluare performanță"
    }
  ],
  receptie: [
    {
      label: "Programări Astăzi",
      value: "28",
      change: "+5 vs ieri",
      changeType: "positive" as const,
      icon: <Calendar className="w-5 h-5" />,
      color: "text-purple-600",
      context: "8:30-19:00",
      clickable: true,
      actionText: "Vezi agenda"
    },
    {
      label: "Confirmări Primite",
      value: "24/28",
      change: "86% rata confirmare",
      changeType: "positive" as const,
      icon: <MessageSquare className="w-5 h-5" />,
      color: "text-green-600",
      context: "SMS + telefon",
      clickable: true,
      actionText: "Contact restul"
    },
    {
      label: "Încasări Astăzi",
      value: "€2,450",
      change: "+18% vs ieri",
      changeType: "positive" as const,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-blue-600",
      context: "Cash + card + transfer",
      clickable: true,
      actionText: "Detalii financiare"
    },
    {
      label: "Pacienți Mulțumiți",
      value: "26/26",
      change: "Zero reclamații",
      changeType: "positive" as const,
      icon: <Users className="w-5 h-5" />,
      color: "text-pink-600",
      context: "Feedback la plecare",
      clickable: true,
      actionText: "Review-uri"
    }
  ],
  tehnician: [
    {
      label: "Lucrări în Producție",
      value: "22",
      change: "Program respectat",
      changeType: "positive" as const,
      icon: <Wrench className="w-5 h-5" />,
      color: "text-orange-600",
      context: "8 coroani, 5 punți, 9 diverse",
      clickable: true,
      actionText: "Status detaliat"
    },
    {
      label: "Livrări Programate",
      value: "15",
      change: "100% la timp",
      changeType: "positive" as const,
      icon: <Clock className="w-5 h-5" />,
      color: "text-green-600",
      context: "Urmează 3 zile",
      clickable: true,
      actionText: "Planificare livrări"
    },
    {
      label: "Control Calitate",
      value: "98.5%",
      change: "Zero refaceri",
      changeType: "positive" as const,
      icon: <Shield className="w-5 h-5" />,
      color: "text-blue-600",
      context: "Inspecție finală",
      clickable: true,
      actionText: "Raport calitate"
    },
    {
      label: "Eficiență Echipă",
      value: "92%",
      change: "+8% această săptămână",
      changeType: "positive" as const,
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-purple-600",
      context: "Productivitate optimă",
      clickable: true,
      actionText: "Analiză performanță"
    }
  ],
  ceo: [
    {
      label: "Profit Lunar",
      value: "€45,200",
      change: "+22% vs luna trecută",
      changeType: "positive" as const,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-green-600",
      context: "EBITDA 28%",
      clickable: true,
      actionText: "Analiză financiară"
    },
    {
      label: "Pacienți Noi/Lună",
      value: "156",
      change: "+31% vs anul trecut",
      changeType: "positive" as const,
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
      context: "Achiziție sustenabilă",
      clickable: true,
      actionText: "Strategie marketing"
    },
    {
      label: "Eficiență Echipă",
      value: "94%",
      change: "Toate KPI-urile verzi",
      changeType: "positive" as const,
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-purple-600",
      context: "Performanță exceptională",
      clickable: true,
      actionText: "Management HR"
    },
    {
      label: "ROI Marketing",
      value: "8.5x",
      change: "CAC €45, LTV €385",
      changeType: "positive" as const,
      icon: <Megaphone className="w-5 h-5" />,
      color: "text-pink-600",
      context: "Investiție eficientă",
      clickable: true,
      actionText: "Optimizare campanii"
    }
  ],
  marketing: [
    {
      label: "Lead-uri Generate",
      value: "89",
      change: "+34% vs săpt. trecută",
      changeType: "positive" as const,
      icon: <Megaphone className="w-5 h-5" />,
      color: "text-pink-600",
      context: "Google Ads + Facebook",
      clickable: true,
      actionText: "Analiză campanii"
    },
    {
      label: "Conversie Lead→Pacient",
      value: "32%",
      change: "+8% îmbunătățire",
      changeType: "positive" as const,
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
      context: "Follow-up optimizat",
      clickable: true,
      actionText: "Optimizare funnel"
    },
    {
      label: "Cost per Achiziție",
      value: "€42",
      change: "-15% vs luna trecută",
      changeType: "positive" as const,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-green-600",
      context: "Eficiență îmbunătățită",
      clickable: true,
      actionText: "Strategie costuri"
    },
    {
      label: "Engagement Rate",
      value: "7.8%",
      change: "150% peste medie industrie",
      changeType: "positive" as const,
      icon: <Palette className="w-5 h-5" />,
      color: "text-purple-600",
      context: "Social media activ",
      clickable: true,
      actionText: "Content strategy"
    }
  ]
};

const roleInsights = {
  medic: [
    {
      type: "treatment_optimization",
      title: "🦷 Optimizare Tratamente",
      message: "AI detectează că implanturile anterioare au o rată de succes cu 15% mai mare când sunt planificate cu ghidare chirurgicală. Recomand această abordare pentru următoarele 3 cazuri.",
      confidence: 96,
      impact: "high" as const,
      icon: <Stethoscope className="w-4 h-4" />
    },
    {
      type: "patient_scheduling", 
      title: "⏰ Planificare Inteligentă",
      message: "Pacienții cu anxietate dentară se prezintă mai rar la programările de dimineață. Recomand să programezi aceste cazuri după ora 14:00 pentru o rată de prezentare mai bună.",
      confidence: 91,
      impact: "medium" as const,
      icon: <Calendar className="w-4 h-4" />
    },
    {
      type: "case_complexity",
      title: "🧠 Analiză Complexitate",
      message: "Următorul pacient (14:30) prezintă indicatori pentru complicații potențiale. AI recomandă alocarea a 30 min suplimentare și pregătirea protocolului de urgență.",
      confidence: 88,
      impact: "high" as const,
      icon: <Heart className="w-4 h-4" />
    }
  ],
  asistent: [
    {
      type: "inventory_alert",
      title: "📦 Alertă Stoc Critic",
      message: "Frazele pentru anasteze sunt pe sfârșite (doar 12 bucăți). Același furnizor are și ampule articaină. Recomand comandă combinată pentru discount 15%.",
      confidence: 95,
      impact: "high" as const,
      icon: <Search className="w-4 h-4" />
    },
    {
      type: "sterilization_optimization",
      title: "🛡️ Optimizare Sterilizare",
      message: "Ciclul de sterilizare de la 15:00 va fi plin. Recomand să începi pregătirea instrumentelor pentru ciclul următor cu 20 min mai devreme.",
      confidence: 92,
      impact: "medium" as const,
      icon: <Shield className="w-4 h-4" />
    },
    {
      type: "patient_preparation",
      title: "👥 Pregătire Pacienți",
      message: "Următorul pacient (Maria T., 14:00) are istoric de sincope. AI recomandă pregătirea scaunului în poziție semi-verticală și kit-ul de urgență.",
      confidence: 87,
      impact: "high" as const,
      icon: <Users className="w-4 h-4" />
    }
  ],
  receptie: [
    {
      type: "appointment_optimization",
      title: "📅 Optimizare Programări",
      message: "Ai 2 slot-uri libere mâine 10:00-11:00. 3 pacienți au cerut reprogramare săptămâna aceasta. Recomand contactarea lor pentru aceste intervalele.",
      confidence: 94,
      impact: "medium" as const,
      icon: <Calendar className="w-4 h-4" />
    },
    {
      type: "payment_follow",
      title: "💰 Urmărire Plăți",
      message: "Pacientul Ion P. are factură restantă de €350 din 15 septembrie. AI recomandă un apel amical astăzi pentru a evita trecerea la colectare.",
      confidence: 89,
      impact: "high" as const,
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      type: "communication_timing",
      title: "📱 Timing Comunicare",
      message: "Confirmările pentru mâine au o rată de răspuns cu 40% mai mare dacă sunt trimise între 18:00-20:00. Programez trimiterea automată la 18:30.",
      confidence: 93,
      impact: "medium" as const,
      icon: <MessageSquare className="w-4 h-4" />
    }
  ],
  tehnician: [
    {
      type: "production_efficiency",
      title: "⚙️ Eficiență Producție",
      message: "Coroana pentru pacientul Mihai D. poate fi finalizată cu 6 ore mai devreme dacă schimbi ordinea de ardere cu celelalte 2 lucrări în curs.",
      confidence: 91,
      impact: "medium" as const,
      icon: <Wrench className="w-4 h-4" />
    },
    {
      type: "quality_prediction",
      title: "🔍 Predicție Calitate",
      message: "Temperatura cuptorului a variat cu ±8°C în ultimul ciclu. Recomand recalibrare pentru a evita defecte de email pe următoarele restaurări ceramice.",
      confidence: 96,
      impact: "high" as const,
      icon: <Shield className="w-4 h-4" />
    },
    {
      type: "material_optimization",
      title: "🧪 Optimizare Materiale",
      message: "Folosind aliajul premium pentru următoarele 3 punți (în loc de standardul actual) vei reduce timpul de finisare cu 40% și îmbunătățești durabilitatea.",
      confidence: 88,
      impact: "medium" as const,
      icon: <Database className="w-4 h-4" />
    }
  ],
  ceo: [
    {
      type: "revenue_optimization",
      title: "💎 Optimizare Venituri",
      message: "Implementarea planurilor de tratament în etape a crescut acceptarea cu 28%. Recomand extinderea acestei strategii la toate cazurile >€1,500.",
      confidence: 95,
      impact: "high" as const,
      icon: <DollarSign className="w-4 h-4" />
    },
    {
      type: "staff_performance",
      title: "👥 Performanță Echipă",
      message: "Dr. Maria are cea mai mare rată de acceptare pentru tratamente complexe (89%). Recomand organizarea unei sesiuni de training pentru echipă cu ea ca mentor.",
      confidence: 92,
      impact: "high" as const,
      icon: <Users className="w-4 h-4" />
    },
    {
      type: "market_expansion",
      title: "🎯 Expansiune Piață",
      message: "Zona Pipera are o cerere neacoperită pentru ortodonție invizibilă. ROI estimat: 2.3x în primul an cu o investiție de €45,000 în echipamente.",
      confidence: 87,
      impact: "high" as const,
      icon: <BarChart3 className="w-4 h-4" />
    }
  ],
  marketing: [
    {
      type: "campaign_optimization",
      title: "🎯 Optimizare Campanii",
      message: "Anunțurile pentru implantologie au un CTR cu 45% mai mare când includ 'before/after'. Recomand actualizarea creativelor pentru următoarea săptămână.",
      confidence: 94,
      impact: "high" as const,
      icon: <Megaphone className="w-4 h-4" />
    },
    {
      type: "audience_insights",
      title: "👥 Insights Audiență",
      message: "Segmentul 35-45 ani are cea mai mare probabilitate de conversie pentru tratamente estetice (38%). Recomand creșterea bugetului cu 25% pentru acest target.",
      confidence: 91,
      impact: "medium" as const,
      icon: <Users className="w-4 h-4" />
    },
    {
      type: "seasonal_trends",
      title: "📈 Tendințe Sezoniere",
      message: "Perioada noiembrie-ianuarie e optimă pentru campanii albire dinți (+60% cerere). Recomand lansarea campaniei 'Zâmbet de sărbători' săptămâna viitoare.",
      confidence: 89,
      impact: "high" as const,
      icon: <Palette className="w-4 h-4" />
    }
  ]
};

interface RoleProviderProps {
  children: ReactNode;
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [currentRole, setCurrentRole] = useState<UserRole>('medic');

  const getRoleModules = (): RoleModule[] => {
    return roleModules[currentRole] || [];
  };

  const getRoleStats = (): RoleStat[] => {
    return roleStats[currentRole] || [];
  };

  const getRoleInsights = (): RoleInsight[] => {
    return roleInsights[currentRole] || [];
  };

  const getRoleConfig = () => {
    return roleConfigs[currentRole];
  };

  const value: RoleContextType = {
    currentRole,
    setCurrentRole,
    getRoleModules,
    getRoleStats,
    getRoleInsights,
    getRoleConfig
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}
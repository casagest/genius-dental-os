import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ro' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  ro: {
    // Header
    'header.title': 'MedicalCor GENIUS',
    'header.subtitle': 'AI Operating System',
    'header.systemOnline': 'System Online',
    'header.active24': '24/7 Active',
    'header.aiChat': 'AI Chat',
    'header.profile': 'Dr. Marin',
    
    // Homepage
    'home.tagline': 'MedicalCor GENIUS v1.0 - AI Operating System cu Interfață Vocală',
    'home.title1': 'România\'s Most Advanced',
    'home.title2': 'Dental Intelligence',
    'home.description': 'Ecosistem AI complet pentru clinică și laborator - automatizează, optimizează, crește profitabilitatea cu 120%',
    'home.voiceConfig': 'Configurare Voce',
    'home.voiceActive': 'Interfață Vocală Activă',
    'home.calendarSection': 'Calendarul avansat de programări este disponibil în secțiunea dedicată.',
    'home.appointmentCalendar': 'Calendarul Programări',
    'home.medicalDashboard': 'Dashboard Medical',
    'home.integrations': 'Integrări',
    
    // Quick Actions
    'quickActions.title': 'Quick Actions',
    'quickActions.description': 'Funcții principale la un click distanță',
    'quickActions.aiChat': 'AI Chat Support',
    'quickActions.aiChatDesc': 'Întreabă GENIUS orice despre clinică',
    'quickActions.appointment': 'Programare Rapidă',
    'quickActions.appointmentDesc': 'Slot nou în calendarul liber',
    'quickActions.labCase': 'Case Lab Nou',
    'quickActions.labCaseDesc': 'Inițiază workflow tehnică dentară',
    'quickActions.inventory': 'Inventory Scan',
    'quickActions.inventoryDesc': 'QR scan consumabile',
    'quickActions.treatments': 'Treatment Plans',
    'quickActions.treatmentsDesc': 'AI-generated cu cost estimates',
    'quickActions.analytics': 'Analytics',
    'quickActions.analyticsDesc': 'CFO dashboard & reports',
    
    // Modules
    'modules.allonx': 'All-on-X Hub',
    'modules.allonxDesc': 'State-of-Art Full Arch Rehabilitation + AI Analysis',
    'modules.genius': 'GENIUS Hub',
    'modules.geniusDesc': 'Scheduling 24/7 + Chatbot AI + Interfață Vocală',
    'modules.labsync': 'LabSync',
    'modules.labsyncDesc': 'Exocad ↔ Medit ↔ ERP + Comenzi Vocale',
    'modules.inventory': 'InventoryBrain',
    'modules.inventoryDesc': 'Auto-reorder + QR Scan + Voice Control',
    'modules.clinical': 'Clinical Agent',
    'modules.clinicalDesc': 'AI Diagnostics + Transcriere Vocală',
    'modules.marketing': 'AI Marketing',
    'modules.marketingDesc': 'Lead Scoring + Campaigns + Voice Ads',
    'modules.cfo': 'CFO Dashboard',
    'modules.cfoDesc': 'Analytics + ANAF Sync + Rapoarte Vocale',
    
    // Status
    'status.live': 'LIVE',
    'status.development': 'DEVELOPMENT',
    'status.planning': 'PLANNING',
    'status.concept': 'CONCEPT',
    'status.roadmap': 'ROADMAP',
    'status.progress': 'Progress',
    'status.accessModule': 'Access Module',
    'status.viewProgress': 'View Progress',
    'status.learnMore': 'Learn More',
    
    // CFO Dashboard
    'cfo.title': 'CFO Dashboard - Financial Intelligence',
    'cfo.subtitle': 'AI-Powered Financial Analytics - Last update',
    'cfo.refresh': 'Actualizează',
    'cfo.export': 'Export Report',
    'cfo.monthlyRevenue': 'Venit Lunar',
    'cfo.expenses': 'Cheltuieli',
    'cfo.netProfit': 'Profit Net',
    'cfo.profitMargin': 'Marja Profit',
    'cfo.avgValue': 'Valoare Medie',
    'cfo.collectionRate': 'Rata Colectare',
    'cfo.cashFlow': 'Cash Flow',
    'cfo.patientGrowth': 'Cresc. Pacienți',
    'cfo.financialTrends': 'Tendințe Financiare',
    'cfo.profitMarginEvolution': 'Evoluția Marjei de Profit',
    'cfo.dailyPerformance': 'Performanță Zilnică',
    'cfo.monthlyTargets': 'Obiective Lunare',
    'cfo.financialAlerts': 'Alerte Financiare',
    'cfo.revenueByCategory': 'Venit pe Categorii de Tratament',
    'cfo.topTreatments': 'Top Tratamente - Venit',
    'cfo.expenseDistribution': 'Distribuția Cheltuielilor',
    'cfo.expenseAnalysis': 'Analiza Cheltuielilor',
    'cfo.aiPredictions': 'Predicții AI - Cash Flow',
    'cfo.aiInsights': 'AI Insights',
    'cfo.opportunities': 'Oportunități',
    'cfo.riskFactors': 'Factori de Risc',
    'cfo.nextMonthPrediction': 'Predicție venit luna viitoare',
    'cfo.financialReports': 'Rapoarte Financiare',
    'cfo.monthlyReport': 'Raport Lunar',
    'cfo.plStatement': 'P&L Statement',
    'cfo.cashFlowReport': 'Cash Flow Report',
    'cfo.balanceSheet': 'Balance Sheet',
    'cfo.kpiDashboard': 'KPI Dashboard',
    'cfo.exportAnaf': 'Export ANAF',
    
    // Medical Dashboard
    'medical.title': 'Dashboard Medical - Live KPIs',
    'medical.subtitle': 'Monitorizare în timp real - ultimul update',
    'medical.patientsToday': 'Pacienți Astăzi',
    'medical.appointmentsCompleted': 'Programări Finalizate',
    'medical.todayRevenue': 'Venit Astăzi',
    'medical.waitTime': 'Timp Așteptare',
    'medical.satisfaction': 'Satisfacție',
    'medical.emergencies': 'Urgențe',
    'medical.generalOverview': 'Vizualizare Generală',
    'medical.patients': 'Pacienți',
    'medical.treatments': 'Tratamente',
    'medical.financial': 'Financiar',
    'medical.weeklyTrends': 'Tendințe Săptămânale',
    'medical.treatmentDistribution': 'Distribuția Tratamentelor',
    'medical.monthlyPerformance': 'Performanță Lunară',
    'medical.patientFlow': 'Fluxul Pacienților',
    'medical.keyIndicators': 'Indicatori Cheie Pacienți',
    'medical.attendanceRate': 'Rata de prezentare',
    'medical.newPatients': 'Pacienți noi',
    'medical.reschedules': 'Reprogramări',
    'medical.treatmentAnalysis': 'Analiza Tratamentelor',
    'medical.treatmentSuccess': 'Distribuția și succesul tratamentelor',
    'medical.topTreatments': 'Top Tratamente',
    'medical.financialPerformance': 'Performanță Financiară',
    'medical.revenueAndProfitability': 'Analiza veniturilor și profitabilității',
    
    // Navigation
    'nav.overview': 'Overview',
    'nav.revenue': 'Analiza Veniturilor',
    'nav.expenses': 'Managementul Cheltuielilor',
    'nav.predictions': 'Predicții AI',
    'nav.reports': 'Rapoarte Financiare',
    
    // Common
    'common.today': 'Astăzi',
    'common.thisMonth': 'Luna aceasta',
    'common.thisWeek': 'Săptămâna aceasta',
    'common.settings': 'Setări',
    'common.notifications': 'Notificări',
    'common.profile': 'Profil',
    'common.close': 'Închide',
    'common.save': 'Salvează',
    'common.cancel': 'Anulează',
    'common.loading': 'Se încarcă...',
    'common.error': 'Eroare',
    'common.success': 'Succes',
    'common.comingSoon': 'Funcționalitatea va fi disponibilă în curând',
    'common.refresh': 'Actualizează',
    'common.export': 'Exportă',
    'common.import': 'Importă',
    'common.delete': 'Șterge',
    'common.edit': 'Editează',
    'common.view': 'Vizualizează',
    'common.add': 'Adaugă',
    'common.search': 'Caută',
    'common.filter': 'Filtrează',
    'common.sort': 'Sortează',
  },
  en: {
    // Header
    'header.title': 'MedicalCor GENIUS',
    'header.subtitle': 'AI Operating System',
    'header.systemOnline': 'System Online',
    'header.active24': '24/7 Active',
    'header.aiChat': 'AI Chat',
    'header.profile': 'Dr. Marin',
    
    // Homepage
    'home.tagline': 'MedicalCor GENIUS v1.0 - AI Operating System with Voice Interface',
    'home.title1': 'Romania\'s Most Advanced',
    'home.title2': 'Dental Intelligence',
    'home.description': 'Complete AI ecosystem for clinic and laboratory - automate, optimize, increase profitability by 120%',
    'home.voiceConfig': 'Voice Configuration',
    'home.voiceActive': 'Voice Interface Active',
    'home.calendarSection': 'Advanced appointment calendar is available in the dedicated section.',
    'home.appointmentCalendar': 'Appointment Calendar',
    'home.medicalDashboard': 'Medical Dashboard',
    'home.integrations': 'Integrations',
    
    // Quick Actions
    'quickActions.title': 'Quick Actions',
    'quickActions.description': 'Main functions at one click away',
    'quickActions.aiChat': 'AI Chat Support',
    'quickActions.aiChatDesc': 'Ask GENIUS anything about the clinic',
    'quickActions.appointment': 'Quick Appointment',
    'quickActions.appointmentDesc': 'New slot in free calendar',
    'quickActions.labCase': 'New Lab Case',
    'quickActions.labCaseDesc': 'Initiate dental technique workflow',
    'quickActions.inventory': 'Inventory Scan',
    'quickActions.inventoryDesc': 'QR scan consumables',
    'quickActions.treatments': 'Treatment Plans',
    'quickActions.treatmentsDesc': 'AI-generated with cost estimates',
    'quickActions.analytics': 'Analytics',
    'quickActions.analyticsDesc': 'CFO dashboard & reports',
    
    // Modules
    'modules.allonx': 'All-on-X Hub',
    'modules.allonxDesc': 'State-of-Art Full Arch Rehabilitation + AI Analysis',
    'modules.genius': 'GENIUS Hub',
    'modules.geniusDesc': 'Scheduling 24/7 + AI Chatbot + Voice Interface',
    'modules.labsync': 'LabSync',
    'modules.labsyncDesc': 'Exocad ↔ Medit ↔ ERP + Voice Commands',
    'modules.inventory': 'InventoryBrain',
    'modules.inventoryDesc': 'Auto-reorder + QR Scan + Voice Control',
    'modules.clinical': 'Clinical Agent',
    'modules.clinicalDesc': 'AI Diagnostics + Voice Transcription',
    'modules.marketing': 'AI Marketing',
    'modules.marketingDesc': 'Lead Scoring + Campaigns + Voice Ads',
    'modules.cfo': 'CFO Dashboard',
    'modules.cfoDesc': 'Analytics + Tax Sync + Voice Reports',
    
    // Status
    'status.live': 'LIVE',
    'status.development': 'DEVELOPMENT',
    'status.planning': 'PLANNING',
    'status.concept': 'CONCEPT',
    'status.roadmap': 'ROADMAP',
    'status.progress': 'Progress',
    'status.accessModule': 'Access Module',
    'status.viewProgress': 'View Progress',
    'status.learnMore': 'Learn More',
    
    // CFO Dashboard
    'cfo.title': 'CFO Dashboard - Financial Intelligence',
    'cfo.subtitle': 'AI-Powered Financial Analytics - Last update',
    'cfo.refresh': 'Refresh',
    'cfo.export': 'Export Report',
    'cfo.monthlyRevenue': 'Monthly Revenue',
    'cfo.expenses': 'Expenses',
    'cfo.netProfit': 'Net Profit',
    'cfo.profitMargin': 'Profit Margin',
    'cfo.avgValue': 'Average Value',
    'cfo.collectionRate': 'Collection Rate',
    'cfo.cashFlow': 'Cash Flow',
    'cfo.patientGrowth': 'Patient Growth',
    'cfo.financialTrends': 'Financial Trends',
    'cfo.profitMarginEvolution': 'Profit Margin Evolution',
    'cfo.dailyPerformance': 'Daily Performance',
    'cfo.monthlyTargets': 'Monthly Targets',
    'cfo.financialAlerts': 'Financial Alerts',
    'cfo.revenueByCategory': 'Revenue by Treatment Category',
    'cfo.topTreatments': 'Top Treatments - Revenue',
    'cfo.expenseDistribution': 'Expense Distribution',
    'cfo.expenseAnalysis': 'Expense Analysis',
    'cfo.aiPredictions': 'AI Predictions - Cash Flow',
    'cfo.aiInsights': 'AI Insights',
    'cfo.opportunities': 'Opportunities',
    'cfo.riskFactors': 'Risk Factors',
    'cfo.nextMonthPrediction': 'Next month revenue prediction',
    'cfo.financialReports': 'Financial Reports',
    'cfo.monthlyReport': 'Monthly Report',
    'cfo.plStatement': 'P&L Statement',
    'cfo.cashFlowReport': 'Cash Flow Report',
    'cfo.balanceSheet': 'Balance Sheet',
    'cfo.kpiDashboard': 'KPI Dashboard',
    'cfo.exportAnaf': 'Export Tax',
    
    // Medical Dashboard
    'medical.title': 'Medical Dashboard - Live KPIs',
    'medical.subtitle': 'Real-time monitoring - last update',
    'medical.patientsToday': 'Patients Today',
    'medical.appointmentsCompleted': 'Appointments Completed',
    'medical.todayRevenue': 'Today Revenue',
    'medical.waitTime': 'Wait Time',
    'medical.satisfaction': 'Satisfaction',
    'medical.emergencies': 'Emergencies',
    'medical.generalOverview': 'General Overview',
    'medical.patients': 'Patients',
    'medical.treatments': 'Treatments',
    'medical.financial': 'Financial',
    'medical.weeklyTrends': 'Weekly Trends',
    'medical.treatmentDistribution': 'Treatment Distribution',
    'medical.monthlyPerformance': 'Monthly Performance',
    'medical.patientFlow': 'Patient Flow',
    'medical.keyIndicators': 'Key Patient Indicators',
    'medical.attendanceRate': 'Attendance rate',
    'medical.newPatients': 'New patients',
    'medical.reschedules': 'Reschedules',
    'medical.treatmentAnalysis': 'Treatment Analysis',
    'medical.treatmentSuccess': 'Treatment distribution and success',
    'medical.topTreatments': 'Top Treatments',
    'medical.financialPerformance': 'Financial Performance',
    'medical.revenueAndProfitability': 'Revenue and profitability analysis',
    
    // Navigation
    'nav.overview': 'Overview',
    'nav.revenue': 'Revenue Analysis',
    'nav.expenses': 'Expense Management',
    'nav.predictions': 'AI Predictions',
    'nav.reports': 'Financial Reports',
    
    // Common
    'common.today': 'Today',
    'common.thisMonth': 'This Month',
    'common.thisWeek': 'This Week',
    'common.settings': 'Settings',
    'common.notifications': 'Notifications',
    'common.profile': 'Profile',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.comingSoon': 'Feature will be available soon',
    'common.refresh': 'Refresh',
    'common.export': 'Export',
    'common.import': 'Import',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    return savedLang || 'ro';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ro']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
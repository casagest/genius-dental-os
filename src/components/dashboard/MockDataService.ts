/**
 * Mock Data Service - Provides realistic test data for dashboard components
 * Replaces Lorem Ipsum and static placeholders with dental clinic specific data
 */

export interface MockModuleData {
  id: string;
  name: string;
  status: 'active' | 'maintenance' | 'offline' | 'processing';
  performanceScore: number;
  lastUpdate: string;
  category: string;
  usageCount: number;
  errorRate: number;
}

export interface MockPatientData {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  treatmentPlan: string;
  status: 'programat' | 'in_tratament' | 'finalizat' | 'urmarire';
  phone: string;
  nextAppointment?: string;
}

export interface MockTreatmentData {
  id: string;
  patientId: string;
  patientName: string;
  treatmentType: string;
  startDate: string;
  estimatedCompletion: string;
  progress: number;
  cost: number;
  status: 'planificat' | 'in_curs' | 'finalizat' | 'suspendat';
  doctor: string;
}

export interface MockAppointmentData {
  id: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  duration: number;
  treatmentType: string;
  doctor: string;
  status: 'confirmat' | 'neconfirmat' | 'anulat' | 'finalizat';
  notes?: string;
}

export interface MockLabOrderData {
  id: string;
  patientName: string;
  orderType: 'coroana' | 'punte' | 'proteza' | 'implant' | 'ghituri';
  orderDate: string;
  estimatedDelivery: string;
  status: 'comanda_noua' | 'in_productie' | 'finalizat' | 'livrat';
  priority: 'normal' | 'urgent' | 'foarte_urgent';
  cost: number;
  notes?: string;
}

class MockDataService {
  // Module data with realistic performance metrics
  static getModuleData(): MockModuleData[] {
    return [
      {
        id: "surgical-ai",
        name: "AI Planificare Chirurgicală",
        status: "active",
        performanceScore: 98.5,
        lastUpdate: "2024-01-24T10:30:00Z",
        category: "Chirurgie",
        usageCount: 247,
        errorRate: 0.2
      },
      {
        id: "cbct-analyzer",
        name: "Analizor CBCT 3D",
        status: "active",
        performanceScore: 96.8,
        lastUpdate: "2024-01-24T09:15:00Z",
        category: "Imagistică",
        usageCount: 189,
        errorRate: 0.5
      },
      {
        id: "lab-sync",
        name: "Lab Sync Manager",
        status: "processing",
        performanceScore: 94.2,
        lastUpdate: "2024-01-24T11:45:00Z",
        category: "Laborator",
        usageCount: 156,
        errorRate: 1.2
      },
      {
        id: "voice-assistant",
        name: "Asistent Vocal Medical",
        status: "active",
        performanceScore: 97.1,
        lastUpdate: "2024-01-24T12:10:00Z",
        category: "Automatizare",
        usageCount: 342,
        errorRate: 0.8
      },
      {
        id: "patient-portal",
        name: "Portal Pacienți",
        status: "maintenance",
        performanceScore: 91.5,
        lastUpdate: "2024-01-24T08:30:00Z",
        category: "Comunicare",
        usageCount: 89,
        errorRate: 2.1
      },
      {
        id: "financial-ai",
        name: "AI Analiză Financiară",
        status: "active",
        performanceScore: 99.2,
        lastUpdate: "2024-01-24T12:05:00Z",
        category: "Financiar",
        usageCount: 67,
        errorRate: 0.1
      }
    ];
  }

  // Patient data with Romanian names and realistic medical info
  static getPatientData(): MockPatientData[] {
    return [
      {
        id: "p001",
        name: "Ionescu Maria",
        age: 34,
        lastVisit: "2024-01-20",
        treatmentPlan: "Coroană molară superioară dreaptă",
        status: "in_tratament",
        phone: "0745123456",
        nextAppointment: "2024-01-26"
      },
      {
        id: "p002", 
        name: "Popescu Alexandru",
        age: 45,
        lastVisit: "2024-01-18",
        treatmentPlan: "Implant + coroană incisiv central",
        status: "programat",
        phone: "0732987654",
        nextAppointment: "2024-01-25"
      },
      {
        id: "p003",
        name: "Vasilescu Elena",
        age: 28,
        lastVisit: "2024-01-15",
        treatmentPlan: "Detartraj + albire dentară",
        status: "finalizat",
        phone: "0756234567"
      },
      {
        id: "p004",
        name: "Constantinescu Radu",
        age: 52,
        lastVisit: "2024-01-22",
        treatmentPlan: "Proteza parțială superioară",
        status: "urmarire",
        phone: "0723456789",
        nextAppointment: "2024-02-05"
      },
      {
        id: "p005",
        name: "Andreescu Mihaela",
        age: 67,
        lastVisit: "2024-01-19",
        treatmentPlan: "Proteza totală inferioară",
        status: "in_tratament",
        phone: "0744567890",
        nextAppointment: "2024-01-29"
      }
    ];
  }

  // Treatment data with realistic progress and costs
  static getTreatmentData(): MockTreatmentData[] {
    return [
      {
        id: "t001",
        patientId: "p001",
        patientName: "Ionescu Maria",
        treatmentType: "Coroană ceramică",
        startDate: "2024-01-15",
        estimatedCompletion: "2024-02-01", 
        progress: 75,
        cost: 1200,
        status: "in_curs",
        doctor: "Dr. Marin"
      },
      {
        id: "t002",
        patientId: "p002",
        patientName: "Popescu Alexandru", 
        treatmentType: "Implant + coroană",
        startDate: "2024-01-10",
        estimatedCompletion: "2024-03-15",
        progress: 45,
        cost: 2800,
        status: "in_curs",
        doctor: "Dr. Georgescu"
      },
      {
        id: "t003",
        patientId: "p003",
        patientName: "Vasilescu Elena",
        treatmentType: "Detartraj profesional",
        startDate: "2024-01-15",
        estimatedCompletion: "2024-01-15",
        progress: 100,
        cost: 250,
        status: "finalizat",
        doctor: "Dr. Marin"
      },
      {
        id: "t004",
        patientId: "p004",
        patientName: "Constantinescu Radu",
        treatmentType: "Proteza parțială",
        startDate: "2024-01-08",
        estimatedCompletion: "2024-02-20",
        progress: 60,
        cost: 1800,
        status: "in_curs",
        doctor: "Dr. Popovici"
      }
    ];
  }

  // Appointment data with realistic scheduling
  static getAppointmentData(): MockAppointmentData[] {
    return [
      {
        id: "a001",
        patientName: "Ionescu Maria",
        patientPhone: "0745123456",
        date: "2024-01-26",
        time: "09:00",
        duration: 60,
        treatmentType: "Control coroană",
        doctor: "Dr. Marin",
        status: "confirmat",
        notes: "Verificare adaptare și ocluzie"
      },
      {
        id: "a002",
        patientName: "Popescu Alexandru",
        patientPhone: "0732987654", 
        date: "2024-01-25",
        time: "14:30",
        duration: 90,
        treatmentType: "Amplasare implant",
        doctor: "Dr. Georgescu",
        status: "confirmat"
      },
      {
        id: "a003",
        patientName: "Dumitrescu Ana",
        patientPhone: "0765432109",
        date: "2024-01-24",
        time: "16:00", 
        duration: 45,
        treatmentType: "Consultație inițială",
        doctor: "Dr. Marin",
        status: "neconfirmat"
      },
      {
        id: "a004",
        patientName: "Andreescu Mihaela", 
        patientPhone: "0744567890",
        date: "2024-01-29",
        time: "10:30",
        duration: 75,
        treatmentType: "Probă proteza",
        doctor: "Dr. Popovici",
        status: "confirmat",
        notes: "A doua probă - ajustări fine"
      }
    ];
  }

  // Lab order data with realistic workflow
  static getLabOrderData(): MockLabOrderData[] {
    return [
      {
        id: "l001",
        patientName: "Ionescu Maria",
        orderType: "coroana",
        orderDate: "2024-01-16",
        estimatedDelivery: "2024-01-30",
        status: "in_productie",
        priority: "normal",
        cost: 450,
        notes: "Culoare A2, ceramică IPS Empress"
      },
      {
        id: "l002", 
        patientName: "Popescu Alexandru",
        orderType: "implant",
        orderDate: "2024-01-18",
        estimatedDelivery: "2024-02-15", 
        status: "comanda_noua",
        priority: "urgent",
        cost: 800,
        notes: "Implant Straumann 4.1mm x 10mm"
      },
      {
        id: "l003",
        patientName: "Constantinescu Radu", 
        orderType: "proteza",
        orderDate: "2024-01-12",
        estimatedDelivery: "2024-02-05",
        status: "finalizat",
        priority: "normal",
        cost: 950,
        notes: "Proteza parțială acrilică cu cleme"
      },
      {
        id: "l004",
        patientName: "Gheorghiu Cristina",
        orderType: "ghituri",
        orderDate: "2024-01-20",
        estimatedDelivery: "2024-01-27",
        status: "in_productie", 
        priority: "foarte_urgent",
        cost: 300,
        notes: "Ghituri pentru bruxism nocturn"
      }
    ];
  }

  // Search suggestions for search inputs
  static getSearchSuggestions(): string[] {
    return [
      "Caută după nume pacient...",
      "Caută după tip tratament...", 
      "Caută după număr comandă lab...",
      "Caută după data programării...",
      "Caută după status...",
      "Caută după nume doctor..."
    ];
  }

  // Status options for dropdowns
  static getStatusOptions() {
    return {
      treatments: [
        { value: "planificat", label: "Planificat" },
        { value: "in_curs", label: "În curs" },
        { value: "finalizat", label: "Finalizat" },
        { value: "suspendat", label: "Suspendat" }
      ],
      appointments: [
        { value: "confirmat", label: "Confirmat" },
        { value: "neconfirmat", label: "Neconfirmat" },
        { value: "anulat", label: "Anulat" },
        { value: "finalizat", label: "Finalizat" }
      ],
      labOrders: [
        { value: "comanda_noua", label: "Comandă nouă" },
        { value: "in_productie", label: "În producție" },
        { value: "finalizat", label: "Finalizat" },
        { value: "livrat", label: "Livrat" }
      ]
    };
  }
}

export default MockDataService;
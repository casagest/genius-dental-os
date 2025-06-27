
export interface ChatContext {
  patientName?: string;
  phoneNumber?: string;
  selectedService?: string;
  appointmentDate?: string;
  urgencyLevel?: 'low' | 'medium' | 'high' | 'emergency';
  language?: 'ro' | 'en';
}

export interface ServiceOption {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  duration: number; // minutes
  description: string;
  category: 'consultation' | 'treatment' | 'surgery' | 'cosmetic' | 'emergency';
}

export const services: ServiceOption[] = [
  {
    id: 'consultation',
    name: 'Consultație inițială',
    nameEn: 'Initial consultation',
    price: 150,
    duration: 45,
    description: 'Examinare clinică completă + radiografie panoramică + plan tratament',
    category: 'consultation'
  },
  {
    id: 'cleaning',
    name: 'Igienizare profesională',
    nameEn: 'Professional cleaning',
    price: 200,
    duration: 60,
    description: 'Detartraj + airflow + fluorurare + recomandări îngrijire',
    category: 'treatment'
  },
  {
    id: 'filling',
    name: 'Plombă estetică',
    nameEn: 'Aesthetic filling',
    price: 350,
    duration: 90,
    description: 'Plombă cu material compozit de ultima generație',
    category: 'treatment'
  },
  {
    id: 'crown',
    name: 'Coroană ceramică',
    nameEn: 'Ceramic crown',
    price: 1800,
    duration: 120,
    description: 'Coroană din ceramică premium cu tehnologie CAD-CAM',
    category: 'treatment'
  },
  {
    id: 'implant',
    name: 'Implant dentar',
    nameEn: 'Dental implant',
    price: 4500,
    duration: 90,
    description: 'Implant titanium + cicatrizare + coroană provizorie',
    category: 'surgery'
  },
  {
    id: 'all-on-x',
    name: 'All-on-X (per arcadă)',
    nameEn: 'All-on-X (per arch)',
    price: 15000,
    duration: 180,
    description: 'Soluție completă pentru înlocuirea tuturor dinților',
    category: 'surgery'
  },
  {
    id: 'emergency',
    name: 'Urgență dentară',
    nameEn: 'Dental emergency',
    price: 250,
    duration: 30,
    description: 'Intervenție de urgență pentru dureri acute',
    category: 'emergency'
  }
];

export class ChatBotEngine {
  private context: ChatContext = { language: 'ro' };

  constructor() {
    this.context = { language: 'ro' };
  }

  public processMessage(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Detect language
    if (this.containsEnglish(message)) {
      this.context.language = 'en';
    }

    // Emergency detection
    if (this.isEmergency(lowerMessage)) {
      this.context.urgencyLevel = 'emergency';
      return this.getEmergencyResponse();
    }

    // Appointment flow
    if (this.isAppointmentRequest(lowerMessage)) {
      return this.handleAppointmentFlow(lowerMessage);
    }

    // Pricing inquiries
    if (this.isPricingInquiry(lowerMessage)) {
      return this.handlePricingInquiry(lowerMessage);
    }

    // Service information
    if (this.isServiceInquiry(lowerMessage)) {
      return this.handleServiceInquiry(lowerMessage);
    }

    // Contact information
    if (this.isContactInquiry(lowerMessage)) {
      return this.getContactInfo();
    }

    // Default response
    return this.getDefaultResponse();
  }

  private containsEnglish(message: string): boolean {
    const englishWords = ['hello', 'appointment', 'price', 'cost', 'help', 'emergency', 'dental', 'tooth'];
    return englishWords.some(word => message.toLowerCase().includes(word));
  }

  private isEmergency(message: string): boolean {
    const emergencyKeywords = ['urgent', 'urgență', 'durere', 'pain', 'doare', 'emergency', 'ajutor', 'help'];
    return emergencyKeywords.some(keyword => message.includes(keyword));
  }

  private isAppointmentRequest(message: string): boolean {
    const appointmentKeywords = ['programare', 'program', 'appointment', 'book', 'schedule', 'întâlnire'];
    return appointmentKeywords.some(keyword => message.includes(keyword));
  }

  private isPricingInquiry(message: string): boolean {
    const pricingKeywords = ['preț', 'cost', 'price', 'tarif', 'cât costă', 'how much', 'bani', 'money'];
    return pricingKeywords.some(keyword => message.includes(keyword));
  }

  private isServiceInquiry(message: string): boolean {
    const serviceKeywords = ['implant', 'all-on', 'coroană', 'crown', 'plombă', 'filling', 'igienizare', 'cleaning'];
    return serviceKeywords.some(keyword => message.includes(keyword));
  }

  private isContactInquiry(message: string): boolean {
    const contactKeywords = ['contact', 'telefon', 'phone', 'adresă', 'address', 'unde', 'where', 'program'];
    return contactKeywords.some(keyword => message.includes(keyword));
  }

  private getEmergencyResponse(): string {
    return this.context.language === 'en' 
      ? `🚨 DENTAL EMERGENCY - We're here to help!\n\n📞 Call NOW: +40 740 123 456\n⏰ Emergency hours: 24/7\n📍 Address: Bd. Aviatorilor 42, Bucharest\n\nYou can come directly to our clinic or I can schedule you within the next 2 hours. Don't wait - dental emergencies need immediate attention!`
      : `🚨 URGENȚĂ DENTARĂ - Suntem aici să vă ajutăm!\n\n📞 Sunați ACUM: 0740-123-456\n⏰ Program urgențe: 24/7\n📍 Adresa: Bd. Aviatorilor 42, București\n\nPuteți veni direct la clinică sau vă programez în următoarele 2 ore. Nu așteptați - urgențele dentare necesită atenție imediată!`;
  }

  private handleAppointmentFlow(message: string): string {
    if (this.context.language === 'en') {
      return `Perfect! I'd love to help you schedule an appointment. 📅\n\nOur available services:\n${this.getServicesListEn()}\n\nWhich service interests you? Or would you prefer to start with a consultation to discuss your needs?`;
    }
    
    return `Excelent! Vă ajut cu mare plăcere să vă programați. 📅\n\nServiciile noastre disponibile:\n${this.getServicesList()}\n\nCe serviciu vă interesează? Sau preferați să începeți cu o consultație pentru a discuta nevoile dumneavoastră?`;
  }

  private handlePricingInquiry(message: string): string {
    const priceList = services.map(service => 
      this.context.language === 'en' 
        ? `💰 ${service.nameEn}: ${service.price} RON`
        : `💰 ${service.name}: ${service.price} RON`
    ).join('\n');

    if (this.context.language === 'en') {
      return `Here are our main service prices:\n\n${priceList}\n\n🎁 ONLINE BOOKING BONUS: 20% discount on consultations!\n\nWould you like to schedule an appointment?`;
    }

    return `Iată lista noastră de prețuri principale:\n\n${priceList}\n\n🎁 BONUS PROGRAMARE ONLINE: 20% reducere la consultații!\n\nDorești să programezi o vizită?`;
  }

  private handleServiceInquiry(message: string): string {
    // Find relevant services based on keywords
    const relevantServices = services.filter(service => 
      message.toLowerCase().includes(service.name.toLowerCase()) ||
      message.toLowerCase().includes(service.nameEn.toLowerCase())
    );

    if (relevantServices.length > 0) {
      const serviceInfo = relevantServices.map(service => 
        this.context.language === 'en'
          ? `🦷 **${service.nameEn}**\n💰 Price: ${service.price} RON\n⏱️ Duration: ${service.duration} min\n📝 ${service.description}`
          : `🦷 **${service.name}**\n💰 Preț: ${service.price} RON\n⏱️ Durată: ${service.duration} min\n📝 ${service.description}`
      ).join('\n\n');

      return this.context.language === 'en'
        ? `${serviceInfo}\n\nWould you like to schedule a consultation for this service?`
        : `${serviceInfo}\n\nDorești să programezi o consultație pentru acest serviciu?`;
    }

    return this.getDefaultResponse();
  }

  private getContactInfo(): string {
    return this.context.language === 'en'
      ? `📍 **MedicalCor Dental Clinic**\n\n📧 Email: contact@medicalcor.ro\n📞 Phone: +40 740 123 456\n📍 Address: Bd. Aviatorilor 42, Sector 1, Bucharest\n⏰ Schedule: Mon-Fri 8:00-20:00, Sat 9:00-17:00\n🚗 Parking: Available\n🚇 Metro: Aviatorilor Station (5 min walk)\n\nWe're here for you! 🦷✨`
      : `📍 **Clinica Dentară MedicalCor**\n\n📧 Email: contact@medicalcor.ro\n📞 Telefon: 0740-123-456\n📍 Adresa: Bd. Aviatorilor 42, Sector 1, București\n⏰ Program: Lun-Vin 8:00-20:00, Sâm 9:00-17:00\n🚗 Parcare: Disponibilă\n🚇 Metrou: Stația Aviatorilor (5 min pe jos)\n\nSuntem aici pentru dumneavoastră! 🦷✨`;
  }

  private getDefaultResponse(): string {
    return this.context.language === 'en'
      ? `Thank you for your question! 😊\n\nI'm here to help with:\n🦷 Service information\n📅 Appointment scheduling\n💰 Pricing details\n📞 Contact information\n🚨 Dental emergencies\n\nWhat would you like to know more about?`
      : `Mulțumesc pentru întrebare! 😊\n\nVă pot ajuta cu:\n🦷 Informații servicii\n📅 Programări\n💰 Detalii prețuri\n📞 Date de contact\n🚨 Urgențe dentare\n\nCu ce vă pot ajuta?`;
  }

  private getServicesList(): string {
    return services.map((service, index) => 
      `${index + 1}. ${service.name} - ${service.price} RON`
    ).join('\n');
  }

  private getServicesListEn(): string {
    return services.map((service, index) => 
      `${index + 1}. ${service.nameEn} - ${service.price} RON`
    ).join('\n');
  }

  public getContext(): ChatContext {
    return { ...this.context };
  }

  public updateContext(updates: Partial<ChatContext>): void {
    this.context = { ...this.context, ...updates };
  }
}

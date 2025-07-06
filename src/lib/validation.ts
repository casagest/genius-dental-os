import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^(\+4|0)[0-9]{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// API Key validation schemas
export const ApiKeySchema = z.object({
  elevenLabsApiKey: z.string()
    .min(1, 'ElevenLabs API key este obligatorie')
    .refine(key => key.startsWith('sk-'), 'API key invalid - trebuie să înceapă cu sk-')
    .refine(key => key.length >= 32, 'API key prea scurt'),
  
  openAIApiKey: z.string()
    .min(1, 'OpenAI API key este obligatorie')
    .refine(key => key.startsWith('sk-'), 'API key invalid - trebuie să înceapă cu sk-')
    .refine(key => key.length >= 32, 'API key prea scurt'),
  
  notionApiKey: z.string()
    .min(1, 'Notion API key este obligatorie')
    .refine(key => key.startsWith('secret_'), 'API key invalid - trebuie să înceapă cu secret_')
    .refine(key => key.length >= 32, 'API key prea scurt')
});

// Patient data validation
export const PatientSchema = z.object({
  name: z.string()
    .min(2, 'Numele trebuie să aibă minim 2 caractere')
    .max(100, 'Numele trebuie să aibă maxim 100 caractere')
    .regex(/^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/, 'Numele conține caractere invalide'),
  
  phone: z.string()
    .regex(phoneRegex, 'Numărul de telefon nu este valid (format: +40XXXXXXXXX sau 0XXXXXXXXX)'),
  
  email: z.string()
    .email('Adresa de email nu este validă')
    .optional()
    .or(z.literal('')),
  
  service: z.string()
    .min(2, 'Serviciul trebuie să aibă minim 2 caractere')
    .max(200, 'Serviciul trebuie să aibă maxim 200 caractere'),
  
  notes: z.string()
    .max(1000, 'Notițele trebuie să aibă maxim 1000 caractere')
    .optional()
});

// Appointment validation
export const AppointmentSchema = z.object({
  patientName: z.string()
    .min(2, 'Numele pacientului este obligatoriu')
    .max(100, 'Numele prea lung'),
  
  date: z.string()
    .refine(date => !isNaN(Date.parse(date)), 'Data nu este validă')
    .refine(date => new Date(date) > new Date(), 'Data trebuie să fie în viitor'),
  
  time: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Ora nu este validă (format: HH:MM)'),
  
  service: z.string()
    .min(2, 'Serviciul este obligatoriu'),
  
  duration: z.number()
    .min(15, 'Durata minimă este 15 minute')
    .max(480, 'Durata maximă este 8 ore'),
  
  notes: z.string()
    .max(500, 'Notițele sunt prea lungi')
    .optional()
});

// Voice settings validation
export const VoiceSettingsSchema = z.object({
  elevenLabsApiKey: z.string()
    .min(1, 'ElevenLabs API key este obligatorie'),
  
  openAIApiKey: z.string()
    .min(1, 'OpenAI API key este obligatorie'),
  
  voiceId: z.string()
    .min(1, 'Voice ID este obligatoriu'),
  
  language: z.enum(['ro', 'en'], {
    errorMap: () => ({ message: 'Limba trebuie să fie ro sau en' })
  }),
  
  hotwordEnabled: z.boolean(),
  
  micSensitivity: z.number()
    .min(0.1, 'Sensibilitatea minimă este 0.1')
    .max(1, 'Sensibilitatea maximă este 1')
});

// Search and filter validation
export const SearchSchema = z.object({
  query: z.string()
    .max(200, 'Căutarea este prea lungă')
    .regex(/^[a-zA-Z0-9\săâîșțĂÂÎȘȚ\-_.@]+$/, 'Căutarea conține caractere invalide'),
  
  category: z.enum(['patients', 'appointments', 'inventory', 'all'])
    .optional(),
  
  dateFrom: z.string()
    .refine(date => !date || !isNaN(Date.parse(date)), 'Data de început nu este validă')
    .optional(),
  
  dateTo: z.string()
    .refine(date => !date || !isNaN(Date.parse(date)), 'Data de sfârșit nu este validă')
    .optional()
});

// Medical data validation (basic GDPR compliance)
export const MedicalDataSchema = z.object({
  diagnosis: z.string()
    .max(1000, 'Diagnosticul este prea lung'),
  
  treatment: z.string()
    .max(2000, 'Tratamentul este prea lung'),
  
  medications: z.array(z.string().max(100))
    .max(20, 'Prea multe medicamente'),
  
  allergies: z.array(z.string().max(100))
    .max(10, 'Prea multe alergii'),
  
  vitalSigns: z.object({
    bloodPressure: z.string()
      .regex(/^\d{2,3}\/\d{2,3}$/, 'Tensiunea arterială trebuie să fie în format XXX/XX')
      .optional(),
    
    heartRate: z.number()
      .min(30, 'Pulsul este prea mic')
      .max(250, 'Pulsul este prea mare')
      .optional(),
    
    temperature: z.number()
      .min(30, 'Temperatura este prea mică')
      .max(45, 'Temperatura este prea mare')
      .optional()
  }).optional()
});

// Form validation helper
export function validateFormData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: z.ZodError;
} {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error };
    }
    throw error;
  }
}

// Get user-friendly error messages
export function getValidationErrorMessage(error: z.ZodError): string {
  const firstError = error.errors[0];
  return firstError?.message || 'Date invalide';
}
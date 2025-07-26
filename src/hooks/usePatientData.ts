import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PatientProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  medical_record_number?: string;
  allergies?: string[];
  medical_conditions?: string[];
  current_medications?: string[];
  dental_history?: any;
  insurance_provider?: string;
  insurance_id?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export interface PatientAppointment {
  id: string;
  appointment_date: string;
  appointment_type: string;
  status: string;
  duration_minutes?: number;
  notes?: string;
  treatment_plan?: string;
  cost?: number;
}

export interface PatientMessage {
  id: string;
  subject: string;
  message: string;
  attachment_url?: string;
  response?: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  responded_at?: string;
}

export interface PatientDocument {
  id: string;
  document_name: string;
  document_type: string;
  file_url: string;
  file_size?: number;
  category: string;
  created_at: string;
}

export interface PatientNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
  expires_at?: string;
}

export const usePatientData = () => {
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);
  const [messages, setMessages] = useState<PatientMessage[]>([]);
  const [documents, setDocuments] = useState<PatientDocument[]>([]);
  const [notifications, setNotifications] = useState<PatientNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch patient profile
  const fetchPatientProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        // Create a basic patient profile if it doesn't exist
        const { data: newPatient, error: createError } = await supabase
          .from('patients')
          .insert({
            user_id: user.id,
            first_name: user.user_metadata?.first_name || 'Utilizator',
            last_name: user.user_metadata?.last_name || 'Nou',
            email: user.email || ''
          })
          .select()
          .single();

        if (createError) {
          console.error('Error creating patient profile:', createError);
          return;
        }
        setPatient(newPatient);
      } else {
        setPatient(data);
      }
    } catch (err) {
      console.error('Error fetching patient profile:', err);
      setError('Failed to load patient profile');
    }
  };

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      if (!patient) return;

      const { data, error } = await supabase
        .from('patient_appointments')
        .select('*')
        .eq('patient_id', patient.id)
        .order('appointment_date', { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    try {
      if (!patient) return;

      const { data, error } = await supabase
        .from('patient_messages')
        .select('*')
        .eq('patient_id', patient.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // Fetch documents
  const fetchDocuments = async () => {
    try {
      if (!patient) return;

      const { data, error } = await supabase
        .from('patient_documents')
        .select('*')
        .eq('patient_id', patient.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      if (!patient) return;

      const { data, error } = await supabase
        .from('patient_notifications')
        .select('*')
        .eq('patient_id', patient.id)
        .or('expires_at.is.null,expires_at.gt.now()')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  // Send message
  const sendMessage = async (subject: string, message: string, priority: string = 'normal') => {
    try {
      if (!patient) throw new Error('Patient profile not loaded');

      const { error } = await supabase
        .from('patient_messages')
        .insert({
          patient_id: patient.id,
          subject,
          message,
          priority,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Mesaj trimis",
        description: "Mesajul a fost trimis cu succes. Vă vom răspunde în curând.",
      });

      fetchMessages(); // Refresh messages
    } catch (err) {
      console.error('Error sending message:', err);
      toast({
        title: "Eroare",
        description: "Nu am putut trimite mesajul. Încercați din nou.",
        variant: "destructive",
      });
    }
  };

  // Mark notification as read
  const markNotificationAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('patient_notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('patient_appointments')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId);

      if (error) throw error;

      toast({
        title: "Programare anulată",
        description: "Programarea a fost anulată cu succes.",
      });

      fetchAppointments(); // Refresh appointments
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      toast({
        title: "Eroare",
        description: "Nu am putut anula programarea. Încercați din nou.",
        variant: "destructive",
      });
    }
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchPatientProfile();
      setLoading(false);
    };

    loadData();
  }, []);

  // Fetch other data when patient is loaded
  useEffect(() => {
    if (patient) {
      fetchAppointments();
      fetchMessages();
      fetchDocuments();
      fetchNotifications();
    }
  }, [patient]);

  // Real-time subscriptions
  useEffect(() => {
    if (!patient) return;

    const messagesSubscription = supabase
      .channel('patient_messages_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'patient_messages'
      }, () => {
        fetchMessages();
      })
      .subscribe();

    const notificationsSubscription = supabase
      .channel('patient_notifications_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'patient_notifications'
      }, () => {
        fetchNotifications();
      })
      .subscribe();

    const appointmentsSubscription = supabase
      .channel('patient_appointments_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'patient_appointments'
      }, () => {
        fetchAppointments();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messagesSubscription);
      supabase.removeChannel(notificationsSubscription);
      supabase.removeChannel(appointmentsSubscription);
    };
  }, [patient]);

  return {
    patient,
    appointments,
    messages,
    documents,
    notifications,
    loading,
    error,
    sendMessage,
    markNotificationAsRead,
    cancelAppointment,
    refreshData: () => {
      fetchPatientProfile();
      fetchAppointments();
      fetchMessages();
      fetchDocuments();
      fetchNotifications();
    }
  };
};
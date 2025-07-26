-- Create enhanced patient portal tables

-- Create patient messages table for communication
CREATE TABLE public.patient_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  attachment_url TEXT,
  response TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  priority TEXT NOT NULL DEFAULT 'normal',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID
);

-- Create patient documents table
CREATE TABLE public.patient_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL,
  document_name TEXT NOT NULL,
  document_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  category TEXT NOT NULL DEFAULT 'general',
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by UUID
);

-- Create patient reviews table for feedback
CREATE TABLE public.patient_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL,
  appointment_id UUID,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  treatment_satisfaction INTEGER CHECK (treatment_satisfaction >= 1 AND treatment_satisfaction <= 5),
  staff_rating INTEGER CHECK (staff_rating >= 1 AND staff_rating <= 5),
  facility_rating INTEGER CHECK (facility_rating >= 1 AND facility_rating <= 5),
  would_recommend BOOLEAN,
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table for patient alerts
CREATE TABLE public.patient_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN NOT NULL DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on all tables
ALTER TABLE public.patient_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for patient_messages
CREATE POLICY "Patients can view their own messages"
ON public.patient_messages
FOR SELECT
USING (patient_id IN (
  SELECT id FROM patients WHERE user_id = auth.uid()
));

CREATE POLICY "Patients can create their own messages"
ON public.patient_messages
FOR INSERT
WITH CHECK (patient_id IN (
  SELECT id FROM patients WHERE user_id = auth.uid()
));

CREATE POLICY "Staff can view all messages"
ON public.patient_messages
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Staff can update message responses"
ON public.patient_messages
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- RLS Policies for patient_documents
CREATE POLICY "Patients can view their own documents"
ON public.patient_documents
FOR SELECT
USING (patient_id IN (
  SELECT id FROM patients WHERE user_id = auth.uid()
));

CREATE POLICY "Staff can manage all patient documents"
ON public.patient_documents
FOR ALL
USING (auth.uid() IS NOT NULL);

-- RLS Policies for patient_reviews
CREATE POLICY "Patients can manage their own reviews"
ON public.patient_reviews
FOR ALL
USING (patient_id IN (
  SELECT id FROM patients WHERE user_id = auth.uid()
));

CREATE POLICY "Staff can view all reviews"
ON public.patient_reviews
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- RLS Policies for patient_notifications
CREATE POLICY "Patients can view their own notifications"
ON public.patient_notifications
FOR SELECT
USING (patient_id IN (
  SELECT id FROM patients WHERE user_id = auth.uid()
));

CREATE POLICY "Patients can update their notification read status"
ON public.patient_notifications
FOR UPDATE
USING (patient_id IN (
  SELECT id FROM patients WHERE user_id = auth.uid()
) AND (is_read IS DISTINCT FROM OLD.is_read));

CREATE POLICY "Staff can create notifications"
ON public.patient_notifications
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Add triggers for updated_at
CREATE TRIGGER update_patient_messages_updated_at
  BEFORE UPDATE ON public.patient_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add some indexes for performance
CREATE INDEX idx_patient_messages_patient_id ON public.patient_messages(patient_id);
CREATE INDEX idx_patient_documents_patient_id ON public.patient_documents(patient_id);
CREATE INDEX idx_patient_reviews_patient_id ON public.patient_reviews(patient_id);
CREATE INDEX idx_patient_notifications_patient_id ON public.patient_notifications(patient_id);
CREATE INDEX idx_patient_notifications_unread ON public.patient_notifications(patient_id, is_read) WHERE is_read = false;
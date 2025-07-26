-- Add foreign key constraints and fix relationships

-- Add foreign key constraints to link new tables to patients table
ALTER TABLE public.patient_messages 
ADD CONSTRAINT patient_messages_patient_id_fkey 
FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;

ALTER TABLE public.patient_documents 
ADD CONSTRAINT patient_documents_patient_id_fkey 
FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;

ALTER TABLE public.patient_reviews 
ADD CONSTRAINT patient_reviews_patient_id_fkey 
FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;

ALTER TABLE public.patient_notifications 
ADD CONSTRAINT patient_notifications_patient_id_fkey 
FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;

-- Add optional foreign key for appointment reviews
ALTER TABLE public.patient_reviews 
ADD CONSTRAINT patient_reviews_appointment_id_fkey 
FOREIGN KEY (appointment_id) REFERENCES public.patient_appointments(id) ON DELETE SET NULL;
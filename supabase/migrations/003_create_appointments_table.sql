-- Create appointments table for storing appointment data from iStoma
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    istoma_appointment_id TEXT,
    title TEXT NOT NULL,
    description TEXT,
    appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    appointment_type TEXT, -- consultation, treatment, surgery, etc.
    status TEXT DEFAULT 'scheduled', -- scheduled, confirmed, completed, cancelled
    doctor_name TEXT,
    treatment_plan JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    synced_from_istoma BOOLEAN DEFAULT false,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, istoma_appointment_id)
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own appointments
CREATE POLICY "Users can manage their own appointments" ON appointments
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_istoma_id ON appointments(istoma_appointment_id);
CREATE INDEX idx_appointments_sync ON appointments(synced_from_istoma, last_sync_at);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
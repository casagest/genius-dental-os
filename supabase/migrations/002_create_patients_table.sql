-- Create patients table for storing patient data from iStoma
CREATE TABLE IF NOT EXISTS patients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    istoma_patient_id TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    date_of_birth DATE,
    address TEXT,
    medical_history JSONB DEFAULT '{}',
    insurance_info JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    synced_from_istoma BOOLEAN DEFAULT false,
    last_sync_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, istoma_patient_id)
);

-- Enable RLS
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own patients
CREATE POLICY "Users can manage their own patients" ON patients
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_patients_user_id ON patients(user_id);
CREATE INDEX idx_patients_istoma_id ON patients(istoma_patient_id);
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_sync ON patients(synced_from_istoma, last_sync_at);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_patients_updated_at
    BEFORE UPDATE ON patients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
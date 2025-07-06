-- Create lab_data table for LabSync module
CREATE TABLE IF NOT EXISTS lab_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    lab_order_id TEXT UNIQUE,
    test_type TEXT NOT NULL,
    test_name TEXT NOT NULL,
    result_value TEXT,
    reference_range TEXT,
    unit TEXT,
    status TEXT DEFAULT 'pending', -- pending, completed, cancelled
    ordered_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    completed_date TIMESTAMP WITH TIME ZONE,
    lab_name TEXT,
    technician_notes TEXT,
    doctor_notes TEXT,
    priority_level TEXT DEFAULT 'normal', -- urgent, high, normal, low
    test_category TEXT, -- blood, urine, imaging, etc.
    raw_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE lab_data ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own lab data
CREATE POLICY "Users can manage their own lab data" ON lab_data
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_lab_data_user_id ON lab_data(user_id);
CREATE INDEX idx_lab_data_patient_id ON lab_data(patient_id);
CREATE INDEX idx_lab_data_status ON lab_data(status);
CREATE INDEX idx_lab_data_test_type ON lab_data(test_type);
CREATE INDEX idx_lab_data_ordered_date ON lab_data(ordered_date);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_lab_data_updated_at
    BEFORE UPDATE ON lab_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
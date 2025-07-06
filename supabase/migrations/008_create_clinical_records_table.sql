-- Create clinical_records table for ClinicalAgent module
CREATE TABLE IF NOT EXISTS clinical_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    record_type TEXT NOT NULL, -- consultation, diagnosis, treatment, follow_up
    chief_complaint TEXT,
    history_of_present_illness TEXT,
    physical_examination JSONB DEFAULT '{}',
    vital_signs JSONB DEFAULT '{}',
    diagnosis TEXT,
    treatment_plan TEXT,
    medications JSONB DEFAULT '[]',
    procedures JSONB DEFAULT '[]',
    follow_up_instructions TEXT,
    next_appointment_date TIMESTAMP WITH TIME ZONE,
    doctor_name TEXT,
    ai_insights JSONB DEFAULT '{}',
    voice_notes TEXT,
    attachments JSONB DEFAULT '[]',
    status TEXT DEFAULT 'active', -- active, archived, amended
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create ai_analysis table for storing AI insights
CREATE TABLE IF NOT EXISTS ai_analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    clinical_record_id UUID REFERENCES clinical_records(id) ON DELETE CASCADE,
    analysis_type TEXT NOT NULL, -- risk_assessment, drug_interaction, diagnosis_suggestion
    input_data JSONB NOT NULL,
    ai_response JSONB NOT NULL,
    confidence_score DECIMAL(3,2),
    model_used TEXT,
    processing_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE clinical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own clinical records" ON clinical_records
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own AI analysis" ON ai_analysis
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_clinical_records_user_id ON clinical_records(user_id);
CREATE INDEX idx_clinical_records_patient_id ON clinical_records(patient_id);
CREATE INDEX idx_clinical_records_appointment_id ON clinical_records(appointment_id);
CREATE INDEX idx_clinical_records_type ON clinical_records(record_type);
CREATE INDEX idx_clinical_records_date ON clinical_records(created_at);

CREATE INDEX idx_ai_analysis_user_id ON ai_analysis(user_id);
CREATE INDEX idx_ai_analysis_patient_id ON ai_analysis(patient_id);
CREATE INDEX idx_ai_analysis_type ON ai_analysis(analysis_type);
CREATE INDEX idx_ai_analysis_created ON ai_analysis(created_at);

-- Add triggers
CREATE TRIGGER update_clinical_records_updated_at
    BEFORE UPDATE ON clinical_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
-- Create allonx_procedures table for AllOnXHub module
CREATE TABLE IF NOT EXISTS allonx_procedures (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
    procedure_name TEXT NOT NULL,
    procedure_type TEXT NOT NULL, -- consultation, planning, surgery, follow_up
    jaw_location TEXT, -- upper, lower, both
    number_of_implants INTEGER DEFAULT 4,
    implant_brand TEXT,
    implant_specifications JSONB DEFAULT '{}',
    surgical_plan JSONB DEFAULT '{}',
    cbct_scan_data JSONB DEFAULT '{}',
    pre_operative_photos JSONB DEFAULT '[]',
    post_operative_photos JSONB DEFAULT '[]',
    procedure_date TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    surgeon_name TEXT,
    assistant_name TEXT,
    complications TEXT,
    post_op_instructions TEXT,
    healing_progress JSONB DEFAULT '{}',
    prosthetic_timeline JSONB DEFAULT '{}',
    total_cost DECIMAL(10,2),
    insurance_coverage DECIMAL(10,2) DEFAULT 0,
    payment_plan JSONB DEFAULT '{}',
    status TEXT DEFAULT 'planned', -- planned, in_progress, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create allonx_monitoring table for tracking patient progress
CREATE TABLE IF NOT EXISTS allonx_monitoring (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    procedure_id UUID NOT NULL REFERENCES allonx_procedures(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    monitoring_date DATE DEFAULT CURRENT_DATE,
    healing_stage TEXT, -- immediate, early, intermediate, late, maintenance
    pain_level INTEGER CHECK (pain_level >= 0 AND pain_level <= 10),
    swelling_level INTEGER CHECK (swelling_level >= 0 AND swelling_level <= 10),
    bleeding_status TEXT DEFAULT 'none', -- none, minimal, moderate, concerning
    implant_stability TEXT DEFAULT 'stable', -- stable, mobile, failed
    soft_tissue_healing TEXT DEFAULT 'normal', -- normal, delayed, complicated
    patient_compliance TEXT DEFAULT 'good', -- excellent, good, fair, poor
    next_appointment DATE,
    notes TEXT,
    photos JSONB DEFAULT '[]',
    recommendations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create allonx_templates table for procedure templates
CREATE TABLE IF NOT EXISTS allonx_templates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    template_name TEXT NOT NULL,
    template_type TEXT NOT NULL, -- surgical_plan, post_op_care, patient_education
    template_content JSONB NOT NULL,
    is_default BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE allonx_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE allonx_monitoring ENABLE ROW LEVEL SECURITY;
ALTER TABLE allonx_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own AllOnX procedures" ON allonx_procedures
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own AllOnX monitoring" ON allonx_monitoring
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own AllOnX templates" ON allonx_templates
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_allonx_procedures_user_id ON allonx_procedures(user_id);
CREATE INDEX idx_allonx_procedures_patient_id ON allonx_procedures(patient_id);
CREATE INDEX idx_allonx_procedures_status ON allonx_procedures(status);
CREATE INDEX idx_allonx_procedures_date ON allonx_procedures(procedure_date);
CREATE INDEX idx_allonx_procedures_type ON allonx_procedures(procedure_type);

CREATE INDEX idx_allonx_monitoring_user_id ON allonx_monitoring(user_id);
CREATE INDEX idx_allonx_monitoring_procedure_id ON allonx_monitoring(procedure_id);
CREATE INDEX idx_allonx_monitoring_patient_id ON allonx_monitoring(patient_id);
CREATE INDEX idx_allonx_monitoring_date ON allonx_monitoring(monitoring_date);
CREATE INDEX idx_allonx_monitoring_stage ON allonx_monitoring(healing_stage);

CREATE INDEX idx_allonx_templates_user_id ON allonx_templates(user_id);
CREATE INDEX idx_allonx_templates_type ON allonx_templates(template_type);

-- Add triggers
CREATE TRIGGER update_allonx_procedures_updated_at
    BEFORE UPDATE ON allonx_procedures
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_allonx_templates_updated_at
    BEFORE UPDATE ON allonx_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
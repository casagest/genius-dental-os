-- Create enhanced medical workflow schema for MEDICALCOR GENIUS 3.0

-- Medical specializations enum
CREATE TYPE medical_specialization AS ENUM (
  'oral_surgery',
  'orthodontics', 
  'periodontics',
  'endodontics',
  'prosthodontics',
  'pedodontics',
  'oral_pathology',
  'general_dentistry'
);

-- Treatment status enum
CREATE TYPE treatment_status AS ENUM (
  'planned',
  'in_progress', 
  'completed',
  'cancelled',
  'follow_up_required'
);

-- Enhanced patients table with medical workflow
ALTER TABLE patients ADD COLUMN IF NOT EXISTS medical_record_photo TEXT;
ALTER TABLE patients ADD COLUMN IF NOT EXISTS allergies TEXT[];
ALTER TABLE patients ADD COLUMN IF NOT EXISTS medical_conditions TEXT[];
ALTER TABLE patients ADD COLUMN IF NOT EXISTS current_medications TEXT[];
ALTER TABLE patients ADD COLUMN IF NOT EXISTS dental_history JSONB DEFAULT '{}';
ALTER TABLE patients ADD COLUMN IF NOT EXISTS voice_profile_id TEXT;

-- Treatments table
CREATE TABLE IF NOT EXISTS treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) NOT NULL,
  treatment_name TEXT NOT NULL,
  specialization medical_specialization NOT NULL,
  description TEXT,
  estimated_duration INTEGER, -- minutes
  estimated_cost DECIMAL(10,2),
  status treatment_status DEFAULT 'planned',
  priority INTEGER DEFAULT 1, -- 1-5 scale
  notes JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Medical imaging and scans
CREATE TABLE IF NOT EXISTS medical_imaging (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) NOT NULL,
  treatment_id UUID REFERENCES treatments(id),
  image_type TEXT NOT NULL, -- 'xray', 'cbct', 'intraoral', 'panoramic'
  image_url TEXT NOT NULL,
  analysis_results JSONB DEFAULT '{}',
  ai_annotations JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Voice commands history
CREATE TABLE IF NOT EXISTS voice_commands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  command_text TEXT NOT NULL,
  command_type TEXT NOT NULL,
  execution_result JSONB DEFAULT '{}',
  confidence_score DECIMAL(3,2),
  processing_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Lab work orders
CREATE TABLE IF NOT EXISTS lab_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) NOT NULL,
  treatment_id UUID REFERENCES treatments(id),
  order_type TEXT NOT NULL, -- 'crown', 'bridge', 'implant', 'denture'
  specifications JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  due_date DATE,
  lab_notes TEXT,
  digital_files JSONB DEFAULT '{}', -- CAD/CAM files
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Financial transactions
CREATE TABLE IF NOT EXISTS financial_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) NOT NULL,
  treatment_id UUID REFERENCES treatments(id),
  amount DECIMAL(10,2) NOT NULL,
  transaction_type TEXT NOT NULL, -- 'payment', 'insurance', 'refund'
  payment_method TEXT,
  status TEXT DEFAULT 'pending',
  invoice_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_imaging ENABLE ROW LEVEL SECURITY;
ALTER TABLE voice_commands ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for treatments
CREATE POLICY "Staff can view all treatments" ON treatments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Staff can create treatments" ON treatments
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Staff can update treatments" ON treatments
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for medical imaging
CREATE POLICY "Staff can view all medical imaging" ON medical_imaging
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Staff can upload medical imaging" ON medical_imaging
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- RLS Policies for voice commands
CREATE POLICY "Users can view their voice commands" ON voice_commands
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create voice commands" ON voice_commands
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for lab orders
CREATE POLICY "Staff can view all lab orders" ON lab_orders
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Staff can create lab orders" ON lab_orders
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Staff can update lab orders" ON lab_orders
  FOR UPDATE USING (auth.role() = 'authenticated');

-- RLS Policies for financial transactions
CREATE POLICY "Staff can view all transactions" ON financial_transactions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Staff can create transactions" ON financial_transactions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Triggers for updated_at
CREATE TRIGGER update_treatments_updated_at
  BEFORE UPDATE ON treatments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lab_orders_updated_at
  BEFORE UPDATE ON lab_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
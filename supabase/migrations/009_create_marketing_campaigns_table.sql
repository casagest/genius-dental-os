-- Create marketing_campaigns table for AIMarketing module
CREATE TABLE IF NOT EXISTS marketing_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    campaign_name TEXT NOT NULL,
    campaign_type TEXT NOT NULL, -- email, sms, social_media, ads
    target_audience JSONB DEFAULT '{}',
    campaign_content JSONB NOT NULL,
    ai_generated_content JSONB DEFAULT '{}',
    status TEXT DEFAULT 'draft', -- draft, active, paused, completed, cancelled
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    budget DECIMAL(10,2),
    spent_amount DECIMAL(10,2) DEFAULT 0,
    performance_metrics JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create marketing_analytics table for tracking campaign performance
CREATE TABLE IF NOT EXISTS marketing_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    campaign_id UUID NOT NULL REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
    metric_type TEXT NOT NULL, -- impressions, clicks, conversions, appointments_booked
    metric_value INTEGER DEFAULT 0,
    metric_date DATE DEFAULT CURRENT_DATE,
    additional_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create patient_segments table for audience targeting
CREATE TABLE IF NOT EXISTS patient_segments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    segment_name TEXT NOT NULL,
    segment_criteria JSONB NOT NULL,
    patient_count INTEGER DEFAULT 0,
    last_calculated TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE patient_segments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own marketing campaigns" ON marketing_campaigns
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own marketing analytics" ON marketing_analytics
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own patient segments" ON patient_segments
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_marketing_campaigns_user_id ON marketing_campaigns(user_id);
CREATE INDEX idx_marketing_campaigns_status ON marketing_campaigns(status);
CREATE INDEX idx_marketing_campaigns_type ON marketing_campaigns(campaign_type);
CREATE INDEX idx_marketing_campaigns_dates ON marketing_campaigns(start_date, end_date);

CREATE INDEX idx_marketing_analytics_user_id ON marketing_analytics(user_id);
CREATE INDEX idx_marketing_analytics_campaign_id ON marketing_analytics(campaign_id);
CREATE INDEX idx_marketing_analytics_type ON marketing_analytics(metric_type);
CREATE INDEX idx_marketing_analytics_date ON marketing_analytics(metric_date);

CREATE INDEX idx_patient_segments_user_id ON patient_segments(user_id);

-- Add triggers
CREATE TRIGGER update_marketing_campaigns_updated_at
    BEFORE UPDATE ON marketing_campaigns
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_patient_segments_updated_at
    BEFORE UPDATE ON patient_segments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
-- Create financial_transactions table for CFODashboard module
CREATE TABLE IF NOT EXISTS financial_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
    patient_id UUID REFERENCES patients(id) ON DELETE SET NULL,
    transaction_type TEXT NOT NULL, -- income, expense, refund, adjustment
    category TEXT NOT NULL, -- treatment, supplies, equipment, marketing, etc.
    subcategory TEXT,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'RON',
    transaction_date DATE DEFAULT CURRENT_DATE,
    description TEXT,
    payment_method TEXT, -- cash, card, transfer, insurance
    reference_number TEXT,
    status TEXT DEFAULT 'completed', -- pending, completed, cancelled
    tax_amount DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(10,2),
    attachments JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create financial_budgets table for budget planning
CREATE TABLE IF NOT EXISTS financial_budgets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    budget_name TEXT NOT NULL,
    budget_period TEXT NOT NULL, -- monthly, quarterly, yearly
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    categories JSONB NOT NULL,
    total_budget DECIMAL(10,2) NOT NULL,
    spent_amount DECIMAL(10,2) DEFAULT 0,
    remaining_amount DECIMAL(10,2),
    status TEXT DEFAULT 'active', -- active, completed, cancelled
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create financial_reports table for storing generated reports
CREATE TABLE IF NOT EXISTS financial_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    report_type TEXT NOT NULL, -- profit_loss, cash_flow, budget_analysis, tax_summary
    report_period TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    report_data JSONB NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    file_path TEXT,
    status TEXT DEFAULT 'completed' -- generating, completed, failed
);

-- Enable RLS
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_reports ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own financial transactions" ON financial_transactions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own financial budgets" ON financial_budgets
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own financial reports" ON financial_reports
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_financial_transactions_user_id ON financial_transactions(user_id);
CREATE INDEX idx_financial_transactions_type ON financial_transactions(transaction_type);
CREATE INDEX idx_financial_transactions_category ON financial_transactions(category);
CREATE INDEX idx_financial_transactions_date ON financial_transactions(transaction_date);
CREATE INDEX idx_financial_transactions_status ON financial_transactions(status);

CREATE INDEX idx_financial_budgets_user_id ON financial_budgets(user_id);
CREATE INDEX idx_financial_budgets_period ON financial_budgets(start_date, end_date);
CREATE INDEX idx_financial_budgets_status ON financial_budgets(status);

CREATE INDEX idx_financial_reports_user_id ON financial_reports(user_id);
CREATE INDEX idx_financial_reports_type ON financial_reports(report_type);
CREATE INDEX idx_financial_reports_period ON financial_reports(start_date, end_date);

-- Add triggers
CREATE TRIGGER update_financial_transactions_updated_at
    BEFORE UPDATE ON financial_transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_financial_budgets_updated_at
    BEFORE UPDATE ON financial_budgets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Add trigger to calculate remaining budget amount
CREATE OR REPLACE FUNCTION calculate_remaining_budget()
RETURNS TRIGGER AS $$
BEGIN
    NEW.remaining_amount = NEW.total_budget - NEW.spent_amount;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_financial_budgets_remaining
    BEFORE INSERT OR UPDATE ON financial_budgets
    FOR EACH ROW
    EXECUTE FUNCTION calculate_remaining_budget();
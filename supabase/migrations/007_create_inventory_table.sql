-- Create inventory table for InventoryBrain module
CREATE TABLE IF NOT EXISTS inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    item_code TEXT UNIQUE,
    category TEXT NOT NULL,
    subcategory TEXT,
    description TEXT,
    current_quantity INTEGER DEFAULT 0,
    minimum_stock INTEGER DEFAULT 0,
    maximum_stock INTEGER,
    unit_of_measure TEXT DEFAULT 'pcs',
    unit_cost DECIMAL(10,2),
    supplier_name TEXT,
    supplier_contact TEXT,
    expiry_date DATE,
    batch_number TEXT,
    location TEXT,
    status TEXT DEFAULT 'active', -- active, discontinued, out_of_stock
    last_restocked TIMESTAMP WITH TIME ZONE,
    auto_reorder BOOLEAN DEFAULT false,
    reorder_point INTEGER DEFAULT 0,
    item_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create inventory_transactions table for tracking stock movements
CREATE TABLE IF NOT EXISTS inventory_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    inventory_id UUID NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
    transaction_type TEXT NOT NULL, -- in, out, adjustment, expired
    quantity INTEGER NOT NULL,
    reference_id TEXT, -- could reference an appointment, sale, etc.
    notes TEXT,
    performed_by TEXT,
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own inventory" ON inventory
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own inventory transactions" ON inventory_transactions
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_inventory_user_id ON inventory(user_id);
CREATE INDEX idx_inventory_category ON inventory(category);
CREATE INDEX idx_inventory_status ON inventory(status);
CREATE INDEX idx_inventory_expiry ON inventory(expiry_date);
CREATE INDEX idx_inventory_stock_level ON inventory(current_quantity, minimum_stock);

CREATE INDEX idx_inventory_transactions_user_id ON inventory_transactions(user_id);
CREATE INDEX idx_inventory_transactions_inventory_id ON inventory_transactions(inventory_id);
CREATE INDEX idx_inventory_transactions_type ON inventory_transactions(transaction_type);
CREATE INDEX idx_inventory_transactions_date ON inventory_transactions(transaction_date);

-- Add triggers
CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
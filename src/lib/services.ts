import { supabase } from './supabase';

// Generic service interface for all modules
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Lab Sync Service
export class LabSyncService {
  static async createLabOrder(labData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('lab-sync', {
        body: { action: 'create_order', lab_data: labData }
      });

      return data?.success ? { success: true, data } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async processResults(labData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('lab-sync', {
        body: { action: 'process_results', lab_data: labData }
      });

      return data?.success ? { success: true, data } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async getPendingOrders(): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('lab-sync', {
        body: { action: 'get_pending_orders' }
      });

      return data?.success ? { success: true, data: data.data } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

// Inventory Brain Service
export class InventoryService {
  static async addItem(itemData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('inventory-brain', {
        body: { action: 'add_item', inventory_data: itemData }
      });

      return data?.success ? { success: true, data } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async updateStock(transactionData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('inventory-brain', {
        body: { action: 'update_stock', inventory_data: transactionData }
      });

      return data?.success ? { success: true, data } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async getLowStockItems(): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('inventory-brain', {
        body: { action: 'get_low_stock' }
      });

      return data?.success ? { success: true, data: data.low_stock_items } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

// Clinical Agent Service
export class ClinicalService {
  static async createRecord(recordData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('clinical-agent', {
        body: { action: 'create_record', clinical_data: recordData }
      });

      return data?.success ? { success: true, data } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async getDiagnosisAssist(clinicalData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('clinical-agent', {
        body: { action: 'ai_diagnosis_assist', clinical_data: { ...clinicalData, start_time: Date.now() } }
      });

      return data?.success ? { success: true, data: data.ai_insights } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async checkDrugInteractions(medicationData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('clinical-agent', {
        body: { action: 'drug_interaction_check', clinical_data: medicationData }
      });

      return data?.success ? { success: true, data: data.interactions } : { success: false, error: data?.error };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

// Appointments Service
export class AppointmentsService {
  static async getAppointments(filters?: any): Promise<ServiceResponse> {
    try {
      let query = supabase
        .from('appointments')
        .select(`
          *,
          patients(first_name, last_name, email, phone)
        `)
        .order('appointment_date', { ascending: true });

      if (filters?.date_from) {
        query = query.gte('appointment_date', filters.date_from);
      }
      if (filters?.date_to) {
        query = query.lte('appointment_date', filters.date_to);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async createAppointment(appointmentData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          ...appointmentData,
          synced_from_istoma: false
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async updateAppointment(id: string, updateData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

// Patients Service  
export class PatientsService {
  static async getPatients(filters?: any): Promise<ServiceResponse> {
    try {
      let query = supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.search) {
        query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async createPatient(patientData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert({
          ...patientData,
          synced_from_istoma: false
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async updatePatient(id: string, updateData: any): Promise<ServiceResponse> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

// Financial Service
export class FinancialService {
  static async getTransactions(filters?: any): Promise<ServiceResponse> {
    try {
      let query = supabase
        .from('financial_transactions')
        .select('*')
        .order('transaction_date', { ascending: false });

      if (filters?.start_date) {
        query = query.gte('transaction_date', filters.start_date);
      }
      if (filters?.end_date) {
        query = query.lte('transaction_date', filters.end_date);
      }
      if (filters?.transaction_type) {
        query = query.eq('transaction_type', filters.transaction_type);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async createTransaction(transactionData: any): Promise<ServiceResponse> {
    try {
      const netAmount = transactionData.amount - (transactionData.tax_amount || 0);
      
      const { data, error } = await supabase
        .from('financial_transactions')
        .insert({
          ...transactionData,
          net_amount: netAmount
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  static async getDashboardStats(period: string = 'month'): Promise<ServiceResponse> {
    try {
      const startDate = new Date();
      if (period === 'month') {
        startDate.setMonth(startDate.getMonth() - 1);
      } else if (period === 'year') {
        startDate.setFullYear(startDate.getFullYear() - 1);
      }

      const { data, error } = await supabase
        .from('financial_transactions')
        .select('transaction_type, amount, transaction_date')
        .gte('transaction_date', startDate.toISOString().split('T')[0])
        .eq('status', 'completed');

      if (error) throw error;

      const income = data.filter(t => t.transaction_type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
      const expenses = data.filter(t => t.transaction_type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);

      return { 
        success: true, 
        data: {
          income,
          expenses,
          profit: income - expenses,
          transaction_count: data.length
        }
      };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}
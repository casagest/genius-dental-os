import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

export const useRealData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    appointments: [],
    patients: [],
    treatments: [],
    labOrders: [],
    financialTransactions: []
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [appointments, patients, treatments, labOrders, financialTransactions] = await Promise.all([
        supabase.from('patient_appointments').select('*'),
        supabase.from('patients').select('*'),
        supabase.from('treatments').select('*'),
        supabase.from('lab_orders').select('*'),
        supabase.from('financial_transactions').select('*')
      ]);

      setData({
        appointments: appointments.data || [],
        patients: patients.data || [],
        treatments: treatments.data || [],
        labOrders: labOrders.data || [],
        financialTransactions: financialTransactions.data || []
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStats = () => {
    const today = new Date().toDateString();
    const todayAppointments = data.appointments.filter(apt => 
      new Date(apt.appointment_date).toDateString() === today
    );
    
    const totalRevenue = data.financialTransactions
      .filter(t => t.transaction_type === 'payment')
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    return {
      appointmentsToday: todayAppointments.length,
      totalPatients: data.patients.length,
      totalTreatments: data.treatments.length,
      pendingLabOrders: data.labOrders.filter(order => order.status === 'pending').length,
      totalRevenue: totalRevenue.toFixed(2),
      activeTreatments: data.treatments.filter(t => t.status === 'in_progress').length
    };
  };

  return {
    data,
    stats: getStats(),
    isLoading,
    refreshData: fetchAllData
  };
};
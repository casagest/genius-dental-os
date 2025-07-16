// DEPRECATED: Use useCFODataOptimized.ts for better performance
// This file is kept for backwards compatibility

import { useState, useEffect } from 'react';

// Generare date financiare live pentru clinica dentară (LEGACY VERSION)
const generateFinancialData = () => ({
  kpis: {
    monthlyRevenue: Math.floor(Math.random() * 100000) + 150000,
    monthlyExpenses: Math.floor(Math.random() * 60000) + 80000,
    profit: Math.floor(Math.random() * 40000) + 70000,
    patientGrowth: Math.floor(Math.random() * 20) + 12,
    avgTreatmentValue: Math.floor(Math.random() * 500) + 2500,
    collectionRate: Math.floor(Math.random() * 10) + 85,
    operatingMargin: Math.floor(Math.random() * 15) + 25,
    cashFlow: Math.floor(Math.random() * 30000) + 50000
  },
  monthlyTrends: [
    { month: 'Ian', revenue: 180000, expenses: 95000, profit: 85000, patients: 320, margin: 47 },
    { month: 'Feb', revenue: 165000, expenses: 88000, profit: 77000, patients: 285, margin: 47 },
    { month: 'Mar', revenue: 195000, expenses: 102000, profit: 93000, patients: 340, margin: 48 },
    { month: 'Apr', revenue: 175000, expenses: 91000, profit: 84000, patients: 310, margin: 48 },
    { month: 'Mai', revenue: 210000, expenses: 108000, profit: 102000, patients: 360, margin: 49 },
    { month: 'Iun', revenue: 225000, expenses: 115000, profit: 110000, patients: 375, margin: 49 }
  ],
  treatmentRevenue: [
    { name: 'Implant All-on-X', value: 45, revenue: 95000, color: '#0088FE', avgPrice: 15000 },
    { name: 'Implant Single', value: 25, revenue: 52000, color: '#00C49F', avgPrice: 3500 },
    { name: 'Proteze', value: 15, revenue: 28000, color: '#FFBB28', avgPrice: 2800 },
    { name: 'Ortodontie', value: 10, revenue: 18000, color: '#FF8042', avgPrice: 4500 },
    { name: 'Cosmetice', value: 5, revenue: 12000, color: '#8884d8', avgPrice: 1200 }
  ],
  expenseBreakdown: [
    { category: 'Salarii', amount: 45000, percentage: 38, color: '#8884d8' },
    { category: 'Materiale', amount: 25000, percentage: 21, color: '#82ca9d' },
    { category: 'Echipamente', amount: 18000, percentage: 15, color: '#ffc658' },
    { category: 'Marketing', amount: 12000, percentage: 10, color: '#ff7300' },
    { category: 'Utilități', amount: 8000, percentage: 7, color: '#00C49F' },
    { category: 'Altele', amount: 10000, percentage: 9, color: '#8dd1e1' }
  ],
  aiPredictions: {
    nextMonthRevenue: 240000,
    growthPrediction: 15.5,
    riskFactors: ['Concurență crescută', 'Sezon estival scăzut'],
    opportunities: ['All-on-X campaigns', 'Corporate partnerships'],
    cashFlowForecast: [
      { month: 'Iul', predicted: 85000, actual: null },
      { month: 'Aug', predicted: 92000, actual: null },
      { month: 'Sep', predicted: 105000, actual: null },
      { month: 'Oct', predicted: 115000, actual: null }
    ]
  },
  dailyMetrics: {
    todayRevenue: 8500,
    completedTreatments: 12,
    pendingPayments: 15000,
    avgDailyRevenue: 7200
  }
});

export const useCFOData = () => {
  const [financialData, setFinancialData] = useState(generateFinancialData());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setFinancialData(generateFinancialData());
      setLastUpdate(new Date());
    }, 45000); // Update every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setFinancialData(generateFinancialData());
    setLastUpdate(new Date());
  };

  const profitMargin = (financialData.kpis.profit / financialData.kpis.monthlyRevenue * 100).toFixed(1);

  return { financialData, lastUpdate, refreshData, profitMargin };
};
import { useState, useEffect, useMemo, useCallback } from 'react';

// Optimized data structures using Maps and Sets for O(1) lookups
const CACHE_DURATION = 45000; // 45 seconds
const CALCULATION_PRECISION = 2;

// Use Map for faster lookups and better memory management
const createDataCache = () => new Map<string, { data: any; timestamp: number }>();

// Memoized calculation functions for better performance
const calculateKPIs = (() => {
  // Cache for expensive calculations
  const cache = new Map<string, number>();
  
  return () => {
    const cacheKey = 'kpis';
    
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    
    const result = {
      monthlyRevenue: Math.floor(Math.random() * 100000) + 150000,
      monthlyExpenses: Math.floor(Math.random() * 60000) + 80000,
      profit: Math.floor(Math.random() * 40000) + 70000,
      patientGrowth: Math.floor(Math.random() * 20) + 12,
      avgTreatmentValue: Math.floor(Math.random() * 500) + 2500,
      collectionRate: Math.floor(Math.random() * 10) + 85,
      operatingMargin: Math.floor(Math.random() * 15) + 25,
      cashFlow: Math.floor(Math.random() * 30000) + 50000
    };
    
    cache.set(cacheKey, result);
    
    // Clean cache if it gets too large (memory optimization)
    if (cache.size > 100) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  };
})();

// Pre-computed monthly trends using efficient array operations
const generateMonthlyTrends = () => {
  const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun'];
  const baseRevenue = 180000;
  const trends = [];
  
  // Use array methods for better performance than manual loops
  trends.push(
    ...months.map((month, index) => {
      const variance = (Math.random() - 0.5) * 0.2; // ±10% variance
      const seasonalMultiplier = 1 + Math.sin((index / 6) * Math.PI * 2) * 0.1;
      
      const revenue = Math.round(baseRevenue * seasonalMultiplier * (1 + variance));
      const expenses = Math.round(revenue * (0.52 + Math.random() * 0.08)); // 52-60%
      const profit = revenue - expenses;
      const patients = Math.round((revenue / 580) + (Math.random() - 0.5) * 40); // ~580 RON per patient
      const margin = Math.round((profit / revenue) * 100);
      
      return { month, revenue, expenses, profit, patients, margin };
    })
  );
  
  return trends;
};

// Optimized treatment revenue calculation using weighted algorithms
const generateTreatmentRevenue = () => {
  const treatments = [
    { name: 'Implant All-on-X', weight: 0.45, avgPrice: 15000, color: '#0088FE' },
    { name: 'Implant Single', weight: 0.25, avgPrice: 3500, color: '#00C49F' },
    { name: 'Proteze', weight: 0.15, avgPrice: 2800, color: '#FFBB28' },
    { name: 'Ortodontie', weight: 0.10, avgPrice: 4500, color: '#FF8042' },
    { name: 'Cosmetice', weight: 0.05, avgPrice: 1200, color: '#8884d8' }
  ];
  
  const totalRevenue = 225000; // Monthly total
  
  // Use reduce for functional approach - more efficient than loops
  return treatments.map(treatment => {
    const revenue = Math.round(totalRevenue * treatment.weight);
    const value = Math.round(treatment.weight * 100);
    
    return {
      name: treatment.name,
      value,
      revenue,
      color: treatment.color,
      avgPrice: treatment.avgPrice
    };
  });
};

// Efficient expense breakdown using normalized data structure
const generateExpenseBreakdown = () => {
  const expenseCategories = new Map([
    ['Salarii', { percentage: 38, color: '#8884d8' }],
    ['Materiale', { percentage: 21, color: '#82ca9d' }],
    ['Echipamente', { percentage: 15, color: '#ffc658' }],
    ['Marketing', { percentage: 10, color: '#ff7300' }],
    ['Utilități', { percentage: 7, color: '#00C49F' }],
    ['Altele', { percentage: 9, color: '#8dd1e1' }]
  ]);
  
  const totalExpenses = 118000;
  
  return Array.from(expenseCategories.entries()).map(([category, config]) => ({
    category,
    amount: Math.round(totalExpenses * (config.percentage / 100)),
    percentage: config.percentage,
    color: config.color
  }));
};

// Memoized financial data generator with caching
const generateFinancialData = (() => {
  let lastGenerated = 0;
  let cachedData: any = null;
  
  return () => {
    const now = Date.now();
    
    // Return cached data if within cache duration
    if (cachedData && (now - lastGenerated) < CACHE_DURATION) {
      return cachedData;
    }
    
    const kpis = calculateKPIs();
    
    cachedData = {
      kpis,
      monthlyTrends: generateMonthlyTrends(),
      treatmentRevenue: generateTreatmentRevenue(),
      expenseBreakdown: generateExpenseBreakdown(),
      aiPredictions: {
        nextMonthRevenue: Math.round(kpis.monthlyRevenue * 1.08),
        growthPrediction: +(Math.random() * 10 + 10).toFixed(1),
        riskFactors: ['Concurență crescută', 'Sezon estival scăzut'],
        opportunities: ['All-on-X campaigns', 'Corporate partnerships'],
        cashFlowForecast: ['Iul', 'Aug', 'Sep', 'Oct'].map((month, index) => ({
          month,
          predicted: Math.round(85000 * (1 + index * 0.08)),
          actual: null
        }))
      },
      dailyMetrics: {
        todayRevenue: Math.round(kpis.monthlyRevenue / 30 + (Math.random() - 0.5) * 2000),
        completedTreatments: Math.floor(Math.random() * 8) + 8,
        pendingPayments: Math.round(kpis.monthlyRevenue * 0.08),
        avgDailyRevenue: Math.round(kpis.monthlyRevenue / 30)
      }
    };
    
    lastGenerated = now;
    return cachedData;
  };
})();

export const useCFOData = () => {
  const [financialData, setFinancialData] = useState(() => generateFinancialData());
  const [lastUpdate, setLastUpdate] = useState(() => new Date());
  
  // Memoized refresh function to prevent unnecessary re-renders
  const refreshData = useCallback(() => {
    setFinancialData(generateFinancialData());
    setLastUpdate(new Date());
  }, []);
  
  // Optimized profit margin calculation with memoization
  const profitMargin = useMemo(() => {
    const margin = (financialData.kpis.profit / financialData.kpis.monthlyRevenue * 100);
    return margin.toFixed(1);
  }, [financialData.kpis.profit, financialData.kpis.monthlyRevenue]);
  
  useEffect(() => {
    const interval = setInterval(refreshData, CACHE_DURATION);
    return () => clearInterval(interval);
  }, [refreshData]);
  
  return { financialData, lastUpdate, refreshData, profitMargin };
};
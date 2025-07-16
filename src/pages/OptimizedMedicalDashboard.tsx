import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Activity, TrendingUp, Users, Calendar, DollarSign, Clock, 
  AlertTriangle, Heart, Stethoscope, Pill, RefreshCw
} from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

// Optimized data structures and algorithms

// Use Map for O(1) lookups instead of object properties
const createDataTemplate = () => new Map([
  ['patientsToday', 0],
  ['appointmentsCompleted', 0],
  ['revenue', 0],
  ['avgWaitTime', 0],
  ['patientSatisfaction', 0],
  ['emergencyCases', 0]
]);

// Efficient random data generation with caching
const DataGenerator = (() => {
  // Cache for performance optimization
  const cache = new Map<string, { data: any; timestamp: number }>();
  const CACHE_DURATION = 30000; // 30 seconds
  
  // Pre-computed base values for consistent variance
  const baseValues = {
    patients: { min: 20, max: 70, base: 35 },
    revenue: { min: 8000, max: 23000, base: 12500 },
    satisfaction: { min: 85, max: 100, base: 92 },
    waitTime: { min: 5, max: 25, base: 15 },
    emergencies: { min: 1, max: 6, base: 2 }
  };
  
  // Optimized random generation with normal distribution
  const generateNormalRandom = (mean: number, variance: number): number => {
    // Box-Muller transformation for normal distribution
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return mean + z0 * Math.sqrt(variance);
  };
  
  // Daily stats generation with temporal patterns
  const generateDailyStats = (): Map<string, number> => {
    const hour = new Date().getHours();
    const dayOfWeek = new Date().getDay();
    
    // Temporal modifiers for realistic data
    const hourModifier = 0.8 + 0.4 * Math.sin((hour - 6) / 24 * 2 * Math.PI);
    const weekdayModifier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1.0;
    
    const stats = new Map<string, number>();
    
    stats.set('patientsToday', Math.floor(
      generateNormalRandom(baseValues.patients.base * hourModifier * weekdayModifier, 25)
    ));
    
    stats.set('appointmentsCompleted', Math.floor(
      stats.get('patientsToday')! * (0.7 + Math.random() * 0.25)
    ));
    
    stats.set('revenue', Math.floor(
      generateNormalRandom(baseValues.revenue.base * hourModifier * weekdayModifier, 2000)
    ));
    
    stats.set('avgWaitTime', Math.floor(
      generateNormalRandom(baseValues.waitTime.base / hourModifier, 16)
    ));
    
    stats.set('patientSatisfaction', Math.floor(
      generateNormalRandom(baseValues.satisfaction.base, 9)
    ));
    
    stats.set('emergencyCases', Math.floor(
      generateNormalRandom(baseValues.emergencies.base, 1)
    ));
    
    return stats;
  };
  
  // Weekly trends with temporal patterns
  const generateWeeklyTrends = () => {
    const days = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'];
    const weekModifiers = [1.0, 1.1, 0.95, 1.05, 1.15, 0.8, 0.6]; // Weekly pattern
    
    return days.map((day, index) => {
      const modifier = weekModifiers[index];
      return {
        day,
        patients: Math.floor(generateNormalRandom(35 * modifier, 16)),
        revenue: Math.floor(generateNormalRandom(12500 * modifier, 1500)),
        satisfaction: Math.floor(generateNormalRandom(92, 9))
      };
    });
  };
  
  // Treatment distribution with weighted random selection
  const generateTreatmentDistribution = () => {
    const treatments = [
      { name: 'Implant', baseValue: 35, color: '#0088FE', weight: 0.35 },
      { name: 'Proteza', baseValue: 25, color: '#00C49F', weight: 0.25 },
      { name: 'Obturații', baseValue: 20, color: '#FFBB28', weight: 0.20 },
      { name: 'Parodonto', baseValue: 15, color: '#FF8042', weight: 0.15 },
      { name: 'Urgențe', baseValue: 5, color: '#8884d8', weight: 0.05 }
    ];
    
    // Normalize values to ensure they sum to 100
    let total = 0;
    const generated = treatments.map(treatment => {
      const variance = treatment.baseValue * 0.2; // 20% variance
      const value = Math.max(1, generateNormalRandom(treatment.baseValue, variance));
      total += value;
      return { ...treatment, value };
    });
    
    // Normalize to 100%
    return generated.map(item => ({
      ...item,
      value: Math.round((item.value / total) * 100)
    }));
  };
  
  // Monthly performance with seasonal trends
  const generateMonthlyPerformance = () => {
    const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun'];
    const seasonalModifiers = [0.9, 0.85, 1.0, 0.95, 1.1, 1.05]; // Seasonal variation
    
    return months.map((month, index) => {
      const modifier = seasonalModifiers[index];
      return {
        month,
        pacienti: Math.floor(generateNormalRandom(320 * modifier, 400)),
        venit: Math.floor(generateNormalRandom(180000 * modifier, 15000)),
        satisfactie: Math.floor(generateNormalRandom(92, 9))
      };
    });
  };
  
  return {
    generateLiveData: () => {
      const cacheKey = 'liveData';
      const now = Date.now();
      
      // Check cache first
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)!;
        if (now - cached.timestamp < CACHE_DURATION) {
          return cached.data;
        }
      }
      
      // Generate new data
      const data = {
        dailyStats: Object.fromEntries(generateDailyStats()),
        weeklyTrends: generateWeeklyTrends(),
        treatmentDistribution: generateTreatmentDistribution(),
        monthlyPerformance: generateMonthlyPerformance()
      };
      
      // Cache the result
      cache.set(cacheKey, { data, timestamp: now });
      
      // Clean old cache entries
      if (cache.size > 10) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
      }
      
      return data;
    }
  };
})();

// Memoized component for better performance
const OptimizedStatsCard = React.memo<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  color: string;
}>(({ title, value, icon, trend, color }) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <Card className="border-2 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
          <Badge
            variant="secondary"
            className={`text-xs ${
              isPositive 
                ? 'bg-green-100 text-green-700' 
                : trend === '0%'
                ? 'bg-slate-100 text-slate-600'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend}
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
          <p className="text-sm text-slate-600">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
});

const OptimizedMedicalDashboard = () => {
  const [liveData, setLiveData] = useState(() => DataGenerator.generateLiveData());
  const [lastUpdate, setLastUpdate] = useState(() => new Date());
  const { t } = useLanguage();
  
  // Memoized refresh function to prevent unnecessary re-renders
  const refreshData = useCallback(() => {
    setLiveData(DataGenerator.generateLiveData());
    setLastUpdate(new Date());
  }, []);
  
  // Optimized interval management
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);
  
  // Memoized stats cards for better performance
  const statsCards = useMemo(() => [
    {
      title: t('medical.patientsToday'),
      value: liveData.dailyStats.patientsToday,
      icon: <Users className="w-5 h-5" />,
      trend: "+12%",
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: t('medical.appointmentsCompleted'),
      value: liveData.dailyStats.appointmentsCompleted,
      icon: <Calendar className="w-5 h-5" />,
      trend: "+8%",
      color: "text-green-600 bg-green-100"
    },
    {
      title: t('medical.todayRevenue'),
      value: `${liveData.dailyStats.revenue.toLocaleString()} RON`,
      icon: <DollarSign className="w-5 h-5" />,
      trend: "+15%",
      color: "text-emerald-600 bg-emerald-100"
    },
    {
      title: t('medical.waitTime'),
      value: `${liveData.dailyStats.avgWaitTime} min`,
      icon: <Clock className="w-5 h-5" />,
      trend: "-5%",
      color: "text-orange-600 bg-orange-100"
    },
    {
      title: t('medical.satisfaction'),
      value: `${liveData.dailyStats.patientSatisfaction}%`,
      icon: <Heart className="w-5 h-5" />,
      trend: "+3%",
      color: "text-pink-600 bg-pink-100"
    },
    {
      title: t('medical.emergencies'),
      value: liveData.dailyStats.emergencyCases,
      icon: <AlertTriangle className="w-5 h-5" />,
      trend: "0%",
      color: "text-red-600 bg-red-100"
    }
  ], [liveData.dailyStats, t]);
  
  // Memoized chart components
  const weeklyTrendsChart = useMemo(() => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={liveData.weeklyTrends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2} name="Pacienți" />
        <Line type="monotone" dataKey="satisfaction" stroke="#16a34a" strokeWidth={2} name="Satisfacție %" />
      </LineChart>
    </ResponsiveContainer>
  ), [liveData.weeklyTrends]);
  
  const treatmentPieChart = useMemo(() => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={liveData.treatmentDistribution}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {liveData.treatmentDistribution.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  ), [liveData.treatmentDistribution]);
  
  const monthlyPerformanceChart = useMemo(() => (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={liveData.monthlyPerformance}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="pacienti" stackId="1" stroke="#8884d8" fill="#8884d8" name="Pacienți" />
        <Area type="monotone" dataKey="venit" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Venit (RON)" />
      </AreaChart>
    </ResponsiveContainer>
  ), [liveData.monthlyPerformance]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
              {t('medical.title')} - Optimized
            </h1>
            <p className="text-slate-600 mt-2">
              {t('medical.subtitle')}: {lastUpdate.toLocaleTimeString('ro-RO')} • Enhanced Performance
            </p>
          </div>
          <Button onClick={refreshData} className="space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>{t('common.refresh')}</span>
          </Button>
        </div>

        {/* Optimized Live Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {statsCards.map((card, index) => (
            <OptimizedStatsCard key={index} {...card} />
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-fit grid-cols-4 bg-white border-2">
            <TabsTrigger value="overview">{t('medical.generalOverview')}</TabsTrigger>
            <TabsTrigger value="patients">{t('medical.patients')}</TabsTrigger>
            <TabsTrigger value="treatments">{t('medical.treatments')}</TabsTrigger>
            <TabsTrigger value="financial">{t('medical.financial')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Trends */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Tendințe Săptămânale - Optimized</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {weeklyTrendsChart}
                </CardContent>
              </Card>

              {/* Treatment Distribution */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                    <span>Distribuția Tratamentelor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {treatmentPieChart}
                </CardContent>
              </Card>
            </div>

            {/* Monthly Performance */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Performanță Lunară - Enhanced</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {monthlyPerformanceChart}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same but with optimized data */}
          <TabsContent value="patients">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Fluxul Pacienților - Optimized</CardTitle>
                  <CardDescription>Analiza zilnică a programărilor cu algoritmi îmbunătățiți</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={liveData.weeklyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="patients" fill="#3b82f6" name="Pacienți" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Indicatori Cheie Pacienți</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Rata de prezentare</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={87} className="w-20" />
                      <span className="text-sm">87%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pacienți noi</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={23} className="w-20" />
                      <span className="text-sm">23%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Reprogramări</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={12} className="w-20" />
                      <span className="text-sm">12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treatments">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Analiza Tratamentelor - Enhanced Algorithms</CardTitle>
                <CardDescription>Distribuția și succesul tratamentelor cu analiză optimizată</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={liveData.treatmentDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#6366f1" name="Numărul tratamentelor" />
                    </BarChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Top Tratamente - Optimized</h3>
                    {liveData.treatmentDistribution.map((treatment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: treatment.color }}
                          />
                          <span className="font-medium">{treatment.name}</span>
                        </div>
                        <Badge variant="secondary">{treatment.value}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Performanță Financiară - Advanced Analytics</CardTitle>
                <CardDescription>Analiza veniturilor și profitabilității cu algoritmi avansați</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={liveData.monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="venit" stroke="#059669" strokeWidth={3} name="Venit (RON)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OptimizedMedicalDashboard;

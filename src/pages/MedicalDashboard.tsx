import React, { useState, useEffect } from 'react';
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

// Sample live data - în realitate ar veni de la API
const generateLiveData = () => ({
  dailyStats: {
    patientsToday: Math.floor(Math.random() * 50) + 20,
    appointmentsCompleted: Math.floor(Math.random() * 45) + 15,
    revenue: Math.floor(Math.random() * 15000) + 8000,
    avgWaitTime: Math.floor(Math.random() * 20) + 5,
    patientSatisfaction: Math.floor(Math.random() * 15) + 85,
    emergencyCases: Math.floor(Math.random() * 5) + 1
  },
  weeklyTrends: [
    { day: 'Lun', patients: 28, revenue: 12500, satisfaction: 94 },
    { day: 'Mar', patients: 32, revenue: 15200, satisfaction: 91 },
    { day: 'Mie', patients: 25, revenue: 11800, satisfaction: 96 },
    { day: 'Joi', patients: 30, revenue: 14300, satisfaction: 89 },
    { day: 'Vin', patients: 35, revenue: 16800, satisfaction: 93 },
    { day: 'Sâm', patients: 22, revenue: 9200, satisfaction: 95 },
    { day: 'Dum', patients: 18, revenue: 7500, satisfaction: 92 }
  ],
  treatmentDistribution: [
    { name: 'Implant', value: 35, color: '#0088FE' },
    { name: 'Proteza', value: 25, color: '#00C49F' },
    { name: 'Obturații', value: 20, color: '#FFBB28' },
    { name: 'Parodonto', value: 15, color: '#FF8042' },
    { name: 'Urgențe', value: 5, color: '#8884d8' }
  ],
  monthlyPerformance: [
    { month: 'Ian', pacienti: 320, venit: 180000, satisfactie: 92 },
    { month: 'Feb', pacienti: 285, venit: 165000, satisfactie: 89 },
    { month: 'Mar', pacienti: 340, venit: 195000, satisfactie: 94 },
    { month: 'Apr', pacienti: 310, venit: 175000, satisfactie: 91 },
    { month: 'Mai', pacienti: 360, venit: 210000, satisfactie: 96 },
    { month: 'Iun', pacienti: 345, venit: 198000, satisfactie: 93 }
  ]
});

const MedicalDashboard = () => {
  const [liveData, setLiveData] = useState(generateLiveData());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const { t } = useLanguage();

  // Simulare actualizare live data
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(generateLiveData());
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setLiveData(generateLiveData());
    setLastUpdate(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
              {t('medical.title')}
            </h1>
            <p className="text-slate-600 mt-2">
              {t('medical.subtitle')}: {lastUpdate.toLocaleTimeString('ro-RO')}
            </p>
          </div>
          <Button onClick={refreshData} className="space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>{t('common.refresh')}</span>
          </Button>
        </div>

        {/* Live Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <StatsCard
            title={t('medical.patientsToday')}
            value={liveData.dailyStats.patientsToday}
            icon={<Users className="w-5 h-5" />}
            trend="+12%"
            color="text-blue-600 bg-blue-100"
          />
          <StatsCard
            title={t('medical.appointmentsCompleted')}
            value={liveData.dailyStats.appointmentsCompleted}
            icon={<Calendar className="w-5 h-5" />}
            trend="+8%"
            color="text-green-600 bg-green-100"
          />
          <StatsCard
            title={t('medical.todayRevenue')}
            value={`${liveData.dailyStats.revenue.toLocaleString()} RON`}
            icon={<DollarSign className="w-5 h-5" />}
            trend="+15%"
            color="text-emerald-600 bg-emerald-100"
          />
          <StatsCard
            title={t('medical.waitTime')}
            value={`${liveData.dailyStats.avgWaitTime} min`}
            icon={<Clock className="w-5 h-5" />}
            trend="-5%"
            color="text-orange-600 bg-orange-100"
          />
          <StatsCard
            title={t('medical.satisfaction')}
            value={`${liveData.dailyStats.patientSatisfaction}%`}
            icon={<Heart className="w-5 h-5" />}
            trend="+3%"
            color="text-pink-600 bg-pink-100"
          />
          <StatsCard
            title={t('medical.emergencies')}
            value={liveData.dailyStats.emergencyCases}
            icon={<AlertTriangle className="w-5 h-5" />}
            trend="0%"
            color="text-red-600 bg-red-100"
          />
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
                    <span>Tendințe Săptămânale</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>

            {/* Monthly Performance */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Performanță Lunară</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Fluxul Pacienților</CardTitle>
                  <CardDescription>Analiza zilnică a programărilor</CardDescription>
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
                <CardTitle>Analiza Tratamentelor</CardTitle>
                <CardDescription>Distribuția și succesul tratamentelor</CardDescription>
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
                    <h3 className="text-lg font-semibold">Top Tratamente</h3>
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
                <CardTitle>Performanță Financiară</CardTitle>
                <CardDescription>Analiza veniturilor și profitabilității</CardDescription>
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

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

const StatsCard = ({ title, value, icon, trend, color }: StatsCardProps) => {
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
};

export default MedicalDashboard;
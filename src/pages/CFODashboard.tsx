import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart
} from 'recharts';
import { 
  DollarSign, TrendingUp, TrendingDown, Users, Calendar, 
  CreditCard, Target, AlertTriangle, PiggyBank, Building,
  FileText, Calculator, Zap, Brain, RefreshCw, Download
} from 'lucide-react';

// Generare date financiare live pentru clinica dentară
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

const CFODashboard = () => {
  const [financialData, setFinancialData] = useState(generateFinancialData());
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('month');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-900 via-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              CFO Dashboard - Financial Intelligence
            </h1>
            <p className="text-slate-600 mt-2 flex items-center space-x-2">
              <Brain className="w-4 h-4 text-emerald-600" />
              <span>AI-Powered Financial Analytics - Last update: {lastUpdate.toLocaleTimeString('ro-RO')}</span>
            </p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={refreshData} variant="outline" className="space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <Button className="space-x-2 bg-emerald-600 hover:bg-emerald-700">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* Real-time KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
          <FinancialKPI
            title="Venit Lunar"
            value={`${financialData.kpis.monthlyRevenue.toLocaleString()} RON`}
            icon={<DollarSign className="w-5 h-5" />}
            trend="+12.5%"
            color="text-emerald-600 bg-emerald-100"
          />
          <FinancialKPI
            title="Cheltuieli"
            value={`${financialData.kpis.monthlyExpenses.toLocaleString()} RON`}
            icon={<CreditCard className="w-5 h-5" />}
            trend="+8.2%"
            color="text-red-600 bg-red-100"
          />
          <FinancialKPI
            title="Profit Net"
            value={`${financialData.kpis.profit.toLocaleString()} RON`}
            icon={<TrendingUp className="w-5 h-5" />}
            trend="+18.7%"
            color="text-green-600 bg-green-100"
          />
          <FinancialKPI
            title="Marja Profit"
            value={`${profitMargin}%`}
            icon={<Target className="w-5 h-5" />}
            trend="+2.1%"
            color="text-blue-600 bg-blue-100"
          />
          <FinancialKPI
            title="Valoare Medie"
            value={`${financialData.kpis.avgTreatmentValue} RON`}
            icon={<Calculator className="w-5 h-5" />}
            trend="+15.3%"
            color="text-purple-600 bg-purple-100"
          />
          <FinancialKPI
            title="Rata Colectare"
            value={`${financialData.kpis.collectionRate}%`}
            icon={<PiggyBank className="w-5 h-5" />}
            trend="+5.2%"
            color="text-orange-600 bg-orange-100"
          />
          <FinancialKPI
            title="Cash Flow"
            value={`${financialData.kpis.cashFlow.toLocaleString()} RON`}
            icon={<Building className="w-5 h-5" />}
            trend="+22.1%"
            color="text-indigo-600 bg-indigo-100"
          />
          <FinancialKPI
            title="Cresc. Pacienți"
            value={`+${financialData.kpis.patientGrowth}%`}
            icon={<Users className="w-5 h-5" />}
            trend="+3.2%"
            color="text-teal-600 bg-teal-100"
          />
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-fit grid-cols-5 bg-white border-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="expenses">Expense Management</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue vs Expenses Trend */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span>Tendințe Financiare</span>
                  </CardTitle>
                  <CardDescription>Analiza performanței financiare lunare</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <ComposedChart data={financialData.monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Venit (RON)" />
                      <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Cheltuieli (RON)" />
                      <Line type="monotone" dataKey="profit" stroke="#059669" strokeWidth={3} name="Profit (RON)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Profit Margin Tracking */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>Evoluția Marjei de Profit</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={financialData.monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="margin" stroke="#2563eb" strokeWidth={4} name="Marja %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Performanță Zilnică</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Venit Astăzi</span>
                    <span className="text-lg font-bold text-emerald-600">
                      {financialData.dailyMetrics.todayRevenue.toLocaleString()} RON
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Tratamente Finalizate</span>
                    <span className="text-lg font-bold">{financialData.dailyMetrics.completedTreatments}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Plăți în Așteptare</span>
                    <span className="text-lg font-bold text-orange-600">
                      {financialData.dailyMetrics.pendingPayments.toLocaleString()} RON
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Obiective Lunare</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Venit Target</span>
                      <span className="text-sm font-semibold">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Profit Target</span>
                      <span className="text-sm font-semibold">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Pacienți Noi</span>
                      <span className="text-sm font-semibold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span>Alerte Financiare</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-800">Cheltuieli crescute cu 8.2%</p>
                    <p className="text-xs text-yellow-600">vs. luna trecută</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium text-green-800">Venit All-on-X exceptional</p>
                    <p className="text-xs text-green-600">+25% față de target</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-800">Cash Flow optim</p>
                    <p className="text-xs text-blue-600">Rezerve pentru 3 luni</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Venit pe Categorii de Tratament</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={financialData.treatmentRevenue}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {financialData.treatmentRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Top Tratamente - Venit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {financialData.treatmentRevenue.map((treatment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: treatment.color }}
                        />
                        <div>
                          <span className="font-medium">{treatment.name}</span>
                          <p className="text-xs text-slate-500">Preț mediu: {treatment.avgPrice} RON</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="mb-1">
                          {treatment.revenue.toLocaleString()} RON
                        </Badge>
                        <p className="text-xs text-slate-500">{treatment.value}% din total</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Distribuția Cheltuielilor</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={financialData.expenseBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#ef4444" name="Sumă (RON)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Analiza Cheltuielilor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {financialData.expenseBreakdown.map((expense, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{expense.category}</span>
                        <span className="text-sm font-semibold">
                          {expense.amount.toLocaleString()} RON
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={expense.percentage} className="flex-1" />
                        <span className="text-xs text-slate-500 w-12">{expense.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span>Predicții AI - Cash Flow</span>
                  </CardTitle>
                  <CardDescription>Prognoze bazate pe machine learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={financialData.aiPredictions.cashFlowForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Predicție (RON)" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">Oportunități</h4>
                    {financialData.aiPredictions.opportunities.map((opp, index) => (
                      <div key={index} className="p-2 bg-green-50 rounded text-sm text-green-800 mb-2">
                        • {opp}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">Factori de Risc</h4>
                    {financialData.aiPredictions.riskFactors.map((risk, index) => (
                      <div key={index} className="p-2 bg-red-50 rounded text-sm text-red-800 mb-2">
                        ⚠ {risk}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {financialData.aiPredictions.nextMonthRevenue.toLocaleString()} RON
                      </p>
                      <p className="text-sm text-slate-600">Predicție venit luna viitoare</p>
                      <Badge className="mt-2 bg-purple-100 text-purple-800">
                        +{financialData.aiPredictions.growthPrediction}% growth
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span>Rapoarte Financiare</span>
                </CardTitle>
                <CardDescription>Generare automată de rapoarte ANAF-ready</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <FileText className="w-6 h-6" />
                    <span>Raport Lunar</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Calculator className="w-6 h-6" />
                    <span>P&L Statement</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <TrendingUp className="w-6 h-6" />
                    <span>Cash Flow Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Building className="w-6 h-6" />
                    <span>Balance Sheet</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Target className="w-6 h-6" />
                    <span>KPI Dashboard</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col space-y-2">
                    <Download className="w-6 h-6" />
                    <span>Export ANAF</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface FinancialKPIProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

const FinancialKPI = ({ title, value, icon, trend, color }: FinancialKPIProps) => {
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
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend}
          </Badge>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-800">{value}</h3>
          <p className="text-xs text-slate-600">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CFODashboard;
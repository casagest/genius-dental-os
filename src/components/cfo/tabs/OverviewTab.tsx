import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, Line, AreaChart, Area, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Target, AlertTriangle } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

interface OverviewTabProps {
  financialData: any;
}

export const OverviewTab = ({ financialData }: OverviewTabProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses Trend */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>{t('cfo.financialTrends')}</span>
            </CardTitle>
            <CardDescription>{t('medical.monthlyPerformance')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={financialData.monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
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
              <span>{t('cfo.profitMarginEvolution')}</span>
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
    </div>
  );
};
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, RefreshCw, Download } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";
import { useCFOData } from "@/hooks/useCFOData";
import { CFOKPIGrid } from "@/components/cfo/CFOKPIGrid";
import { OverviewTab } from "@/components/cfo/tabs/OverviewTab";
import { RevenueTab } from "@/components/cfo/tabs/RevenueTab";
import { ExpensesTab } from "@/components/cfo/tabs/ExpensesTab";
import { PredictionsTab } from "@/components/cfo/tabs/PredictionsTab";
import { ReportsTab } from "@/components/cfo/tabs/ReportsTab";

const CFODashboard = () => {
  const { financialData, lastUpdate, refreshData, profitMargin } = useCFOData();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-900 via-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              {t('cfo.title')}
            </h1>
            <p className="text-slate-600 mt-2 flex items-center space-x-2">
              <Brain className="w-4 h-4 text-emerald-600" />
              <span>{t('cfo.subtitle')}: {lastUpdate.toLocaleTimeString('ro-RO')}</span>
            </p>
          </div>
          <div className="flex space-x-3">
            <Button onClick={refreshData} variant="outline" className="space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>{t('cfo.refresh')}</span>
            </Button>
            <Button className="space-x-2 bg-emerald-600 hover:bg-emerald-700">
              <Download className="w-4 h-4" />
              <span>{t('cfo.export')}</span>
            </Button>
          </div>
        </div>

        {/* Real-time KPIs */}
        <CFOKPIGrid financialData={financialData} profitMargin={profitMargin} />

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-fit grid-cols-5 bg-white border-2">
            <TabsTrigger value="overview">{t('nav.overview')}</TabsTrigger>
            <TabsTrigger value="revenue">{t('nav.revenue')}</TabsTrigger>
            <TabsTrigger value="expenses">{t('nav.expenses')}</TabsTrigger>
            <TabsTrigger value="predictions">{t('nav.predictions')}</TabsTrigger>
            <TabsTrigger value="reports">{t('nav.reports')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab financialData={financialData} />
          </TabsContent>

          <TabsContent value="revenue">
            <RevenueTab financialData={financialData} />
          </TabsContent>

          <TabsContent value="expenses">
            <ExpensesTab financialData={financialData} />
          </TabsContent>

          <TabsContent value="predictions">
            <PredictionsTab financialData={financialData} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CFODashboard;
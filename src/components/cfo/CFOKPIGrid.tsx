import React from 'react';
import { 
  DollarSign, TrendingUp, Users, CreditCard, Target, 
  PiggyBank, Building, Calculator
} from 'lucide-react';
import { FinancialKPI } from './FinancialKPI';
import { useLanguage } from "@/contexts/LanguageContext";

interface CFOKPIGridProps {
  financialData: any;
  profitMargin: string;
}

export const CFOKPIGrid = ({ financialData, profitMargin }: CFOKPIGridProps) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-8">
      <FinancialKPI
        title={t('cfo.monthlyRevenue')}
        value={`${financialData.kpis.monthlyRevenue.toLocaleString()} RON`}
        icon={<DollarSign className="w-5 h-5" />}
        trend="+12.5%"
        color="text-emerald-600 bg-emerald-100"
      />
      <FinancialKPI
        title={t('cfo.expenses')}
        value={`${financialData.kpis.monthlyExpenses.toLocaleString()} RON`}
        icon={<CreditCard className="w-5 h-5" />}
        trend="+8.2%"
        color="text-red-600 bg-red-100"
      />
      <FinancialKPI
        title={t('cfo.netProfit')}
        value={`${financialData.kpis.profit.toLocaleString()} RON`}
        icon={<TrendingUp className="w-5 h-5" />}
        trend="+18.7%"
        color="text-green-600 bg-green-100"
      />
      <FinancialKPI
        title={t('cfo.profitMargin')}
        value={`${profitMargin}%`}
        icon={<Target className="w-5 h-5" />}
        trend="+2.1%"
        color="text-blue-600 bg-blue-100"
      />
      <FinancialKPI
        title={t('cfo.avgValue')}
        value={`${financialData.kpis.avgTreatmentValue} RON`}
        icon={<Calculator className="w-5 h-5" />}
        trend="+15.3%"
        color="text-purple-600 bg-purple-100"
      />
      <FinancialKPI
        title={t('cfo.collectionRate')}
        value={`${financialData.kpis.collectionRate}%`}
        icon={<PiggyBank className="w-5 h-5" />}
        trend="+5.2%"
        color="text-orange-600 bg-orange-100"
      />
      <FinancialKPI
        title={t('cfo.cashFlow')}
        value={`${financialData.kpis.cashFlow.toLocaleString()} RON`}
        icon={<Building className="w-5 h-5" />}
        trend="+22.1%"
        color="text-indigo-600 bg-indigo-100"
      />
      <FinancialKPI
        title={t('cfo.patientGrowth')}
        value={`+${financialData.kpis.patientGrowth}%`}
        icon={<Users className="w-5 h-5" />}
        trend="+3.2%"
        color="text-teal-600 bg-teal-100"
      />
    </div>
  );
};
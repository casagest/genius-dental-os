import React from 'react';
import { 
  DollarSign, TrendingUp, Users, CreditCard, Target, 
  PiggyBank, Building, Calculator, Activity, Zap
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-8">
      <div className="neuro-card hover-lift animate-fade-in">
        <FinancialKPI
          title={t('cfo.monthlyRevenue')}
          value={`${financialData.kpis.monthlyRevenue.toLocaleString()} RON`}
          icon={<DollarSign className="w-5 h-5" />}
          trend="+12.5%"
          color="text-primary bg-primary/10"
        />
      </div>
      
      <div className="neuro-card hover-lift animate-fade-in animate-delay-100">
        <FinancialKPI
          title={t('cfo.expenses')}
          value={`${financialData.kpis.monthlyExpenses.toLocaleString()} RON`}
          icon={<CreditCard className="w-5 h-5" />}
          trend="+8.2%"
          color="text-destructive bg-destructive/10"
        />
      </div>
      
      <div className="neuro-card hover-lift animate-fade-in animate-delay-200">
        <FinancialKPI
          title={t('cfo.netProfit')}
          value={`${financialData.kpis.profit.toLocaleString()} RON`}
          icon={<TrendingUp className="w-5 h-5 animate-neural-pulse" />}
          trend="+18.7%"
          color="text-success bg-success/10"
        />
      </div>
      
      <div className="ai-card hover-lift animate-scale-in animate-delay-300">
        <FinancialKPI
          title={t('cfo.profitMargin')}
          value={`${profitMargin}%`}
          icon={<Target className="w-5 h-5" />}
          trend="+2.1%"
          color="text-accent bg-accent/10"
        />
      </div>
      
      <div className="glass-card hover-quantum animate-slide-in-left animate-delay-500">
        <FinancialKPI
          title={t('cfo.avgValue')}
          value={`${financialData.kpis.avgTreatmentValue} RON`}
          icon={<Calculator className="w-5 h-5" />}
          trend="+15.3%"
          color="text-holographic-2 bg-holographic-2/10"
        />
      </div>
      
      <div className="medical-card-revolutionary hover-lift animate-slide-in-right animate-delay-700">
        <FinancialKPI
          title={t('cfo.collectionRate')}
          value={`${financialData.kpis.collectionRate}%`}
          icon={<PiggyBank className="w-5 h-5 animate-bounce-subtle" />}
          trend="+5.2%"
          color="text-warning bg-warning/10"
        />
      </div>
      
      <div className="holographic-border animate-fade-in animate-delay-1000">
        <div className="holographic-content">
          <FinancialKPI
            title={t('cfo.cashFlow')}
            value={`${financialData.kpis.cashFlow.toLocaleString()} RON`}
            icon={<Building className="w-5 h-5" />}
            trend="+22.1%"
            color="text-holographic-1 bg-holographic-1/10"
          />
        </div>
      </div>
      
      <div className="ai-card quantum-glow animate-scale-in animate-delay-1000">
        <FinancialKPI
          title={t('cfo.patientGrowth')}
          value={`+${financialData.kpis.patientGrowth}%`}
          icon={<Users className="w-5 h-5 animate-vital-pulse" />}
          trend="+3.2%"
          color="text-secondary bg-secondary/10"
        />
      </div>
    </div>
  );
};
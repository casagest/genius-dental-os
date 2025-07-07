import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FinancialKPIProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}

export const FinancialKPI = ({ title, value, icon, trend, color }: FinancialKPIProps) => {
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
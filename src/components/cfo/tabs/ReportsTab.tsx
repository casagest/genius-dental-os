import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, Calculator, TrendingUp, Building, 
  Target, Download 
} from 'lucide-react';

export const ReportsTab = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
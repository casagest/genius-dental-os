import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ExpensesTabProps {
  financialData: any;
}

export const ExpensesTab = ({ financialData }: ExpensesTabProps) => {
  return (
    <div className="space-y-6">
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
            {financialData.expenseBreakdown.map((expense: any, index: number) => (
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
    </div>
  );
};
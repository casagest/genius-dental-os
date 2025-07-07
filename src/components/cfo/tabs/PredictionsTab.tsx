import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Zap } from 'lucide-react';

interface PredictionsTabProps {
  financialData: any;
}

export const PredictionsTab = ({ financialData }: PredictionsTabProps) => {
  return (
    <div className="space-y-6">
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
              {financialData.aiPredictions.opportunities.map((opp: string, index: number) => (
                <div key={index} className="p-2 bg-green-50 rounded text-sm text-green-800 mb-2">
                  • {opp}
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Factori de Risc</h4>
              {financialData.aiPredictions.riskFactors.map((risk: string, index: number) => (
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
    </div>
  );
};
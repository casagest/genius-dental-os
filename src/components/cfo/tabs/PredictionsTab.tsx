import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Zap, RefreshCw } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PredictionsTabProps {
  financialData: any;
}

export const PredictionsTab = ({ financialData }: PredictionsTabProps) => {
  const [aiPredictions, setAiPredictions] = useState(financialData.aiPredictions);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateAIPredictions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-financial-analysis', {
        body: {
          financialData: financialData,
          historicalData: financialData.monthlyTrends,
          marketData: {
            sector: 'dental',
            location: 'Romania',
            marketConditions: 'stable'
          }
        }
      });

      if (error) throw error;

      setAiPredictions(data.aiPredictions);
      
      toast({
        title: "AI Predictions Updated",
        description: "Financial forecasts have been refreshed with latest AI analysis",
      });

    } catch (error) {
      console.error('Error generating AI predictions:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI predictions. Using existing data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">Predicții AI - Cash Flow</span>
              </div>
              <Button
                onClick={generateAIPredictions}
                disabled={isLoading}
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <CardDescription>Prognoze bazate pe machine learning {isLoading && '(Updating...)'}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={aiPredictions.cashFlowForecast}>
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
              {aiPredictions.opportunities.map((opp: string, index: number) => (
                <div key={index} className="p-2 bg-green-50 rounded text-sm text-green-800 mb-2">
                  • {opp}
                </div>
              ))}
            </div>
            <div>
              <h4 className="font-semibold text-red-700 mb-2">Factori de Risc</h4>
              {aiPredictions.riskFactors.map((risk: string, index: number) => (
                <div key={index} className="p-2 bg-red-50 rounded text-sm text-red-800 mb-2">
                  ⚠ {risk}
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {aiPredictions.nextMonthRevenue.toLocaleString()} RON
                </p>
                <p className="text-sm text-slate-600">Predicție venit luna viitoare</p>
                <Badge className="mt-2 bg-purple-100 text-purple-800">
                  +{aiPredictions.growthPrediction}% growth
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

const AIInsights = () => {
  const insights = [
    {
      type: "revenue_optimization",
      title: "Optimizare Venituri",
      message: "AI detectează că marți 10:00-12:00 ai rata de no-show scăzută (2%). Recomand să programezi cazuri complexe în acest slot.",
      confidence: 94,
      impact: "high",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "border-green-500 bg-green-50"
    },
    {
      type: "inventory_alert",
      title: "Predicție Stock",
      message: "Bazat pe consumul ultitmelor 30 zile, vei rămâne fără implanturile Nobel 4.3x10mm în următoarele 8 zile.",
      confidence: 87,
      impact: "medium",
      icon: <AlertTriangle className="w-4 h-4" />,
      color: "border-orange-500 bg-orange-50"
    },
    {
      type: "patient_behavior",
      title: "Insight Pacienți",
      message: "Pacienții care primesc SMS reminder cu link de confirmare au rata de prezență cu 23% mai mare decât cei care primesc doar SMS text.",
      confidence: 91,
      impact: "high",
      icon: <Lightbulb className="w-4 h-4" />,
      color: "border-blue-500 bg-blue-50"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <Card className="border-2 hover:border-blue-200 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              AI Insights
            </CardTitle>
            <CardDescription>
              Recomandări inteligente pentru optimizare
            </CardDescription>
          </div>
          <Badge className="bg-purple-100 text-purple-700 border-purple-200">
            3 New
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${insight.color} hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="text-slate-600">
                    {insight.icon}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">{insight.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${getImpactColor(insight.impact)}`}>
                    {insight.impact.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-slate-500">{insight.confidence}% confidence</span>
                </div>
              </div>
              <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                {insight.message}
              </p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-xs">
                  Apply Suggestion
                </Button>
                <Button size="sm" variant="ghost" className="text-xs">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-800">AI Learning Progress</h4>
              <p className="text-sm text-slate-600">MedicalCor data analyzed: 2,847 appointments, 156 lab cases</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-600">87%</div>
              <div className="text-xs text-slate-500">Accuracy Score</div>
            </div>
          </div>
          <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '87%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;

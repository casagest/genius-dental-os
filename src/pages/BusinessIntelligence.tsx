import React, { useState } from 'react';
import { BarChart3, TrendingUp, Brain, Target, Zap, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const BusinessIntelligence = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const aiInsights = [
    {
      type: 'prediction',
      title: 'Predicție Venituri Q1',
      message: 'Veniturile vor crește cu 15-18% în primul trimestru bazat pe tendințele actuale.',
      confidence: 92,
      impact: 'high',
      action: 'Planificare capacitate suplimentară'
    },
    {
      type: 'optimization',
      title: 'Optimizare Program',
      message: 'Reducerea timpilor morți cu 12% prin reorganizarea programului.',
      confidence: 88,
      impact: 'medium',
      action: 'Implementare program dinamic'
    },
    {
      type: 'risk',
      title: 'Risc Pierdere Pacienți',
      message: 'Identificați 8 pacienți cu risc ridicat de abandon tratament.',
      confidence: 85,
      impact: 'high',
      action: 'Campanie de retenție țintită'
    }
  ];

  const kpiPredictions = [
    { metric: 'Venituri Lunare', current: 52000, predicted: 59800, growth: 15, confidence: 94 },
    { metric: 'Pacienți Noi', current: 156, predicted: 180, growth: 15.4, confidence: 89 },
    { metric: 'Rata Conversie', current: 68, predicted: 74, growth: 8.8, confidence: 91 },
    { metric: 'Valoare Medie Tratament', current: 425, predicted: 465, growth: 9.4, confidence: 87 }
  ];

  const marketAnalysis = [
    { segment: 'Implantologie', market_share: 12, growth_potential: 85, opportunity: 'high' },
    { segment: 'Ortodonție', market_share: 8, growth_potential: 92, opportunity: 'very_high' },
    { segment: 'Protetică', market_share: 25, growth_potential: 65, opportunity: 'medium' },
    { segment: 'Chirurgie', market_share: 18, growth_potential: 78, opportunity: 'high' }
  ];

  const optimizationSuggestions = [
    {
      area: 'Eficiență Operațională',
      suggestion: 'Implementarea sistemului de pre-verificare a echipamentelor',
      impact: '15% reducere timp pregătire',
      effort: 'Scăzut',
      roi: '285%'
    },
    {
      area: 'Experiența Pacientului',
      suggestion: 'Aplicație mobilă pentru urmărirea tratamentelor',
      impact: '22% îmbunătățirea satisfacției',
      effort: 'Mediu',
      roi: '340%'
    },
    {
      area: 'Marketing Digital',
      suggestion: 'Campanii AI-driven pe segmente specifice',
      impact: '35% creșterea conversiilor',
      effort: 'Mediu',
      roi: '420%'
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'very_high': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Business Intelligence</h1>
              <p className="text-muted-foreground">Analize predictive și optimizare procese</p>
            </div>
          </div>
        </div>

        {/* AI Insights Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {aiInsights.map((insight, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{insight.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{insight.message}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={getImpactColor(insight.impact)}>
                        {insight.impact === 'high' ? 'Impact Mare' : 'Impact Mediu'}
                      </Badge>
                      <span className="text-xs font-medium">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions">Predicții</TabsTrigger>
            <TabsTrigger value="market">Analiză Piață</TabsTrigger>
            <TabsTrigger value="optimization">Optimizări</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarii</TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Predicții KPI Următoarele 3 Luni
                </CardTitle>
                <CardDescription>Analize bazate pe algoritmi de machine learning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {kpiPredictions.map((prediction, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{prediction.metric}</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          +{prediction.growth.toFixed(1)}%
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Valoare Actuală</p>
                          <p className="text-lg font-bold">
                            {prediction.metric.includes('Venituri') || prediction.metric.includes('Valoare') 
                              ? `€${prediction.current.toLocaleString()}` 
                              : prediction.current.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Predicție</p>
                          <p className="text-lg font-bold text-green-600">
                            {prediction.metric.includes('Venituri') || prediction.metric.includes('Valoare') 
                              ? `€${prediction.predicted.toLocaleString()}` 
                              : prediction.predicted.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Creștere</p>
                          <p className="text-lg font-bold text-blue-600">+{prediction.growth.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Încredere</p>
                          <p className="text-lg font-bold">{prediction.confidence}%</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Încredere predicție</span>
                          <span>{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Analiză Segmente de Piață
                </CardTitle>
                <CardDescription>Oportunități de creștere și poziționare competitivă</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketAnalysis.map((segment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{segment.segment}</h3>
                        <Badge className={getOpportunityColor(segment.opportunity)}>
                          {segment.opportunity === 'very_high' ? 'Oportunitate Foarte Mare' :
                           segment.opportunity === 'high' ? 'Oportunitate Mare' : 'Oportunitate Medie'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Cota de Piață</p>
                          <div className="flex items-center gap-2">
                            <Progress value={segment.market_share * 4} className="flex-1" />
                            <span className="text-sm font-medium">{segment.market_share}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Potențial Creștere</p>
                          <div className="flex items-center gap-2">
                            <Progress value={segment.growth_potential} className="flex-1" />
                            <span className="text-sm font-medium">{segment.growth_potential}%</span>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        <Target className="w-4 h-4 mr-2" />
                        Dezvoltă Strategie
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Recomandări de Optimizare
                </CardTitle>
                <CardDescription>Sugestii AI pentru îmbunătățirea performanței</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {optimizationSuggestions.map((suggestion, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium">{suggestion.area}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{suggestion.suggestion}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          ROI {suggestion.roi}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Impact</p>
                          <p className="text-sm font-medium">{suggestion.impact}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Efort</p>
                          <p className="text-sm font-medium">{suggestion.effort}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">ROI</p>
                          <p className="text-sm font-medium text-green-600">{suggestion.roi}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Database className="w-4 h-4 mr-2" />
                          Analiză Detaliată
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Zap className="w-4 h-4 mr-2" />
                          Implementează
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scenarii Optimiste</CardTitle>
                  <CardDescription>Proiecții în condiții favorabile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">Creștere Accelerată</h4>
                      <p className="text-sm text-green-600 mt-1">+25% venituri în 6 luni</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Prin implementarea tuturor optimizărilor AI
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800">Expansiune Servicii</h4>
                      <p className="text-sm text-blue-600 mt-1">+40% pacienți noi</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Lansarea serviciilor de ortodonție
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scenarii Prudente</CardTitle>
                  <CardDescription>Proiecții conservative</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800">Creștere Stabilă</h4>
                      <p className="text-sm text-yellow-600 mt-1">+12% venituri în 12 luni</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Menținerea trendurilor actuale
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <h4 className="font-medium text-orange-800">Consolidare</h4>
                      <p className="text-sm text-orange-600 mt-1">+8% eficiență operațională</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Focus pe optimizarea proceselor
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessIntelligence;